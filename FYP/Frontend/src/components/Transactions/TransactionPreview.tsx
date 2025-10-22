import React, { useState } from "react";
import { CheckCircle, Save, Edit3 } from "lucide-react";

interface Props {
  data: {
    description: string;
    debitAccount: string;
    creditAccount: string;
    amount: number;
  };
  onSave: (data: any) => void;
}

const TransactionPreview: React.FC<Props> = ({ data, onSave }) => {
  const [editableData, setEditableData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(editableData);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-l-8 border-green-500 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-green-100 rounded-xl mr-4">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Transaction Ready</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-3">
          {["description", "debitAccount", "creditAccount", "amount"].map(
            (key) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <span className="capitalize text-gray-600">
                  {key === "debitAccount"
                    ? "Debit Account"
                    : key === "creditAccount"
                    ? "Credit Account"
                    : key.charAt(0).toUpperCase() + key.slice(1)}
                  :
                </span>
                {isEditing ? (
                  <input
                    required
                    type={key === "amount" ? "number" : "text"}
                    value={(editableData as any)[key]}
                    min={key === "amount" ? "0" : undefined}
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        [key]:
                          key === "amount"
                            ? parseFloat(e.target.value)
                            : e.target.value,
                      })
                    }
                    className="ml-2 border-b border-gray-300 focus:border-blue-500 outline-none text-right w-40"
                  />
                ) : (
                  <span className="font-medium text-gray-800 text-right ml-2">
                    {(editableData as any)[key]}
                  </span>
                )}
              </div>
            )
          )}
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Edit3 className="h-5 w-5" />
            {isEditing ? "Stop Editing" : "Edit Transaction"}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Save className="h-5 w-5" />
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPreview;
