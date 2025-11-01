import { useMemo } from "react";
import useAccountingStore from "../../store/accountingStore";
import { calculateTotals } from "../../utils/CalculateTotals";

const CashFlowStatement = () => {
  const { journalEntries, selectedFinancialYear } = useAccountingStore();

  const {
    netIncome,
    cashFromOperating,
    cashFromInvesting,
    cashFromFinancing,
    netChangeInCash,
  } = useMemo(() => {
    const calculated = calculateTotals(journalEntries);

    let cashFromOperating = 0;
    let cashFromInvesting = 0;
    let cashFromFinancing = 0;

    // 🔹 Detect cash transactions dynamically
    for (const entry of journalEntries) {
      const { debitAccount, creditAccount, amount } = entry;

      const involvesCash =
        debitAccount.accountName.toLowerCase().includes("cash") ||
        creditAccount.accountName.toLowerCase().includes("cash");

      if (!involvesCash) continue;

      // Simple categorization based on subcategory
      const type =
        debitAccount.subCategory || creditAccount.subCategory || "";

      if (
        type.includes("Revenue") ||
        type.includes("Expense") ||
        debitAccount.category === "Expense" ||
        creditAccount.category === "Expense"
      ) {
        cashFromOperating +=
          debitAccount.accountName.toLowerCase().includes("cash")
            ? -amount
            : amount;
      } else if (
        type.includes("Investment") ||
        debitAccount.category === "Asset" ||
        creditAccount.category === "Asset"
      ) {
        cashFromInvesting +=
          debitAccount.accountName.toLowerCase().includes("cash")
            ? -amount
            : amount;
      } else if (debitAccount.category === "Equity" || creditAccount.category === "Equity" || debitAccount.category === "Liability" || creditAccount.category === "Liability") {
        cashFromFinancing +=
          debitAccount.accountName.toLowerCase().includes("cash")
            ? -amount
            : amount;
      }
    }

    const netChangeInCash =
      cashFromOperating + cashFromInvesting + cashFromFinancing;

    return {
      netIncome: calculated.netIncome || 0,
      cashFromOperating,
      cashFromInvesting,
      cashFromFinancing,
      netChangeInCash,
    };
  }, [journalEntries]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Statement of Cash Flows</h2>

      <div className="bg-white rounded-lg p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            Statement of Cash Flows
          </h3>
          <p className="text-gray-600">
            For the year ended{" "}
            {selectedFinancialYear?.endDate.slice(0, 10) ??
              new Date().toLocaleDateString("en-GB")}
          </p>
        </div>

        <div className="space-y-6">
          {/* OPERATING ACTIVITIES */}
          <div>
            <h4 className="text-lg font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">
              CASH FLOWS FROM OPERATING ACTIVITIES
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Net Income</span>
                <span className="font-medium">
                  PKR {netIncome.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-200 font-bold">
                <span className="text-blue-700">
                  Net Cash from Operating Activities
                </span>
                <span className="text-blue-700">
                  PKR {cashFromOperating.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* INVESTING ACTIVITIES */}
          <div>
            <h4 className="text-lg font-semibold text-green-700 mb-4 pb-2 border-b-2 border-green-200">
              CASH FLOWS FROM INVESTING ACTIVITIES
            </h4>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-700">
                {cashFromInvesting === 0
                  ? "No investing activities recorded"
                  : "Net Cash Used in Investing"}
              </span>
              <span className="font-medium">
                PKR {cashFromInvesting.toLocaleString()}
              </span>
            </div>
          </div>

          {/* FINANCING ACTIVITIES */}
          <div>
            <h4 className="text-lg font-semibold text-purple-700 mb-4 pb-2 border-b-2 border-purple-200">
              CASH FLOWS FROM FINANCING ACTIVITIES
            </h4>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-700">
                {cashFromFinancing === 0
                  ? "No financing activities recorded"
                  : "Net Cash from Financing"}
              </span>
              <span className="font-medium">
                PKR {cashFromFinancing.toLocaleString()}
              </span>
            </div>
          </div>

          {/* NET CHANGE IN CASH */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center font-bold text-lg">
              <span className="text-gray-900">Net Change in Cash</span>
              <span className="text-gray-900">
                PKR {netChangeInCash.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowStatement;
