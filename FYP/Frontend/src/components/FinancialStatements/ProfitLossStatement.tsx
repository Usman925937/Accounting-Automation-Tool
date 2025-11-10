import { useMemo } from "react";
import useAccountingStore from "../../store/accountingStore";

const ProfitLossStatement = () => {
  const { journalEntries, selectedFinancialYear } = useAccountingStore();

  // Compute grouped revenue and expense data efficiently
  const { groupedData, totals } = useMemo(() => {
    const map: Record<string, Record<string, number>> = {};
    const totals = {
      Revenue: 0,
      ContraRevenue: 0,
      COGS: 0,
      OperatingExpenses: 0,
      NonOperatingRevenue: 0,
      NonOperatingExpenses: 0,
      FinanceIncome: 0,
      FinanceCost: 0,
      TaxExpense: 0,
    };

    for (const entry of journalEntries) {
      const { debitAccount, creditAccount, amount } = entry;

      // EXPENSE SIDE
      if (
        debitAccount.category === "Expense" &&
        debitAccount.financialStatement === "Income Statement"
      ) {
        const sub = debitAccount.subCategory ?? "Other Expenses";
        const acc = debitAccount.accountName;
        if (!map[sub]) map[sub] = {};
        map[sub][acc] = (map[sub][acc] || 0) + amount;

        if (sub === "Cost of Goods Sold") totals.COGS += amount;
        else if (sub.includes("Interest Expense")) totals.FinanceCost += amount;
        else if (sub.includes("Tax Expense")) totals.TaxExpense += amount;
        else if (sub.toLowerCase().includes("non")) totals.NonOperatingExpenses += amount;
        else totals.OperatingExpenses += amount;
      }

      // CONTRA REVENUE
      if (
        debitAccount.category === "Revenue" &&
        debitAccount.financialStatement === "Income Statement"
      ) {
        const sub = debitAccount.subCategory ?? "Contra Revenue";
        const acc = debitAccount.accountName;
        if (!map[sub]) map[sub] = {};
        map[sub][acc] = (map[sub][acc] || 0) + amount;
        if (sub === "Contra Revenue") totals.ContraRevenue += amount;
      }

      // REVENUE SIDE
      if (
        creditAccount.category === "Revenue" &&
        creditAccount.financialStatement === "Income Statement"
      ) {
        const sub = creditAccount.subCategory ?? "Other Revenue";
        const acc = creditAccount.accountName;
        if (!map[sub]) map[sub] = {};
        map[sub][acc] = (map[sub][acc] || 0) + amount;

        if (sub === "Revenue") totals.Revenue += amount;
        else if (sub.includes("Interest Income")) totals.FinanceIncome += amount;
        else if (sub.toLowerCase().includes("non")) totals.NonOperatingRevenue += amount;
      }
    }

    return { groupedData: map, totals };
  }, [journalEntries]);

  // STEPWISE CALCULATIONS
  const netRevenue = totals.Revenue - totals.ContraRevenue;
  const grossProfit = netRevenue - totals.COGS;
  const operatingIncome = grossProfit - totals.OperatingExpenses;
  const netFinance = totals.FinanceIncome - totals.FinanceCost;
  const incomeBeforeTax =
    operatingIncome + netFinance + totals.NonOperatingRevenue - totals.NonOperatingExpenses;
  const netIncome = incomeBeforeTax - totals.TaxExpense;

  // RENDER SECTION HELPER
  const renderSection = (title: string, subCategory: string, color: string) => {
    const accounts = groupedData[subCategory];
    if (!accounts) return null;
    return (
      <div className="mb-6">
        <h5 className={`font-semibold text-${color}-700 mb-2`}>
          {title || subCategory}
        </h5>
        {Object.entries(accounts).map(([account, amount]) => (
          <div
            key={account}
            className="flex justify-between items-center py-1 pl-4 text-gray-700"
          >
            <span>{account}</span>
            <span>PKR {amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  };

  // RETURN UI
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Profit & Loss Statement</h2>
        <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <svg
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export
        </button>
      </div>

      <div className="bg-white rounded-lg p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Income Statement</h3>
          <p className="text-gray-600">
            For the period ending {selectedFinancialYear?.endDate.slice(0, 10)}
          </p>
        </div>

        {/* 1. REVENUE */}
        <h4 className="text-lg font-semibold text-green-700 mb-4 border-b-2 border-green-200">
          REVENUE
        </h4>
        {renderSection("Revenue", "Revenue", "green")}
        {renderSection("Contra Revenue", "Contra Revenue", "red")}
        <div className="flex justify-between items-center py-2 border-t-2 border-green-300 font-bold mt-4">
          <span className="text-green-700">Net Revenue</span>
          <span className="text-green-700">
            PKR {netRevenue.toLocaleString()}
          </span>
        </div>

        {/* 2. COST OF GOODS SOLD */}
        {renderSection("Cost of Goods Sold", "Cost of Goods Sold", "red")}
        <div className="flex justify-between items-center py-2 border-t-2 border-gray-300 font-bold mt-4">
          <span className="text-gray-800">Gross Profit</span>
          <span className="text-gray-800">
            PKR {grossProfit.toLocaleString()}
          </span>
        </div>

        {/* 3. OPERATING EXPENSES */}
        <h4 className="text-lg font-semibold text-blue-700 mb-4 border-b-2 border-blue-200 mt-6">
          OPERATING EXPENSES
        </h4>
        {[
          "Operating Expense",
          "Other Expense"
        ].map((sub) => renderSection(sub, sub, "blue"))}


        <div className="flex justify-between items-center py-2 border-t-2 border-blue-300 font-bold mt-4">
          <span className="text-blue-700">Operating Income</span>
          <span className="text-blue-700">
            PKR {operatingIncome.toLocaleString()}
          </span>
        </div>

        {/* 4. FINANCE INCOME / COST */}
        <h4 className="text-lg font-semibold text-yellow-700 mb-4 border-b-2 border-yellow-200 mt-6">
          FINANCE INCOME / COST
        </h4>
        {renderSection("Finance Income", "Interest Income", "yellow")}
        {renderSection("Finance Cost", "Interest Expense", "yellow")}
        <div className="flex justify-between items-center py-2 border-t-2 border-yellow-300 font-bold mt-4">
          <span className="text-yellow-700">Net Finance Income / (Cost)</span>
          <span className="text-yellow-700">
            PKR {netFinance.toLocaleString()}
          </span>
        </div>

        {/* 5. OTHER INCOME / EXPENSES */}
        <h4 className="text-lg font-semibold text-purple-700 mb-4 border-b-2 border-purple-200 mt-6">
          OTHER INCOME / EXPENSES
        </h4>
        {renderSection("Other Income", "Non-operating Income", "purple")}
        {renderSection("Non-operating Expenses", "Non-operating Expense", "purple")}

        <div className="flex justify-between items-center py-2 border-t-2 border-purple-300 font-bold mt-4">
          <span className="text-purple-700">Income Before Tax</span>
          <span className="text-purple-700">
            PKR {incomeBeforeTax.toLocaleString()}
          </span>
        </div>

        {/* 6. TAX EXPENSE */}
        {renderSection("Tax Expense", "Tax Expense", "red")}

        {/* FINAL NET INCOME */}
        <div
          className={`p-4 rounded-lg mt-4 ${netIncome >= 0
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
            }`}
        >
          <div className="flex justify-between items-center">
            <span
              className={`text-lg font-bold ${netIncome >= 0 ? "text-green-700" : "text-red-700"
                }`}
            >
              Net {netIncome >= 0 ? "Profit" : "Loss"}
            </span>
            <span
              className={`text-xl font-bold ${netIncome >= 0 ? "text-green-700" : "text-red-700"
                }`}
            >
              PKR {Math.abs(netIncome).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossStatement;
