import React, { useEffect, useState } from "react";
import { Loader2, Cpu, Pencil, CheckCircle } from "lucide-react";
import TransactionForm from "./TransactionForm";
import TransactionPreview from "./TransactionPreview";
import api from "../../api/api";
import parseTransaction from "../../utils/TransactionParser";
import useAuthStore from "../../store/authStore";
import Spinner from "../Layout/Spinner";

const TransactionInput: React.FC = () => {
  const [parsedData, setParsedData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [financialYear, setFinancialYear] = useState<string>("");
  const [mode, setMode] = useState<"ai" | "manual">("ai");
  const { user } = useAuthStore();

  // fetch active fy
  useEffect(() => {
    const fetchFinancialYear = async () => {
      try {
        const res = await api.get("/financial-years/active");
        const data = res.data.financialYear;
        setFinancialYear(data.name || "No Active Year");
      } catch (err) {
        console.error("Error fetching active financial year:", err);
        setFinancialYear("Error loading year");
      }
    };
    fetchFinancialYear();
  }, []);

  // parse transaction
  const handleParse = async (prompt: string) => {
    setLoading(true);
    try {
      const data = await parseTransaction(prompt, user);
      setParsedData(data);
    } catch (err) {
      console.error("Error parsing transaction:", err);
    } finally {
      setLoading(false);
    }
  };

  // save entry
  const handleSave = (entry: any) => {
    // validate negative amount
    // validate account name
    console.log("Saved Entry:", { ...entry, date: new Date().toISOString() });
    setParsedData(null);
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Smart Transaction Entry
        </h1>
        <p className="text-gray-600">
          Active Financial Year:{" "}
          <span className="font-semibold text-blue-700">{financialYear}</span>
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center gap-4">
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-200 ${
            mode === "ai"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setMode("ai")}
        >
          <Cpu className="h-5 w-5" /> AI Mode
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-200 ${
            mode === "manual"
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setMode("manual")}
        >
          <Pencil className="h-5 w-5" /> Manual Mode
        </button>
      </div>

      {/* Input Form */}
      <TransactionForm
        mode={mode}
        onParse={handleParse}
        loading={loading}
        onManualSubmit={setParsedData}
      />

      {/* Preview */}
      {parsedData && (
        <div className="animate-fadeIn">
          <TransactionPreview data={parsedData} onSave={handleSave} />
        </div>
      )}
    </div>
  );
};

export default TransactionInput;
