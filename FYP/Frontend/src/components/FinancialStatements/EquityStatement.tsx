
// Equity Statement Component
const EquityStatement = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-900">Statement of Changes in Equity</h2>
    <div className="bg-white rounded-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Statement of Changes in Equity</h3>
        <p className="text-gray-600">For the period ending {new Date().toLocaleDateString('en-GB')}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Beginning Balance</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Changes</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ending Balance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Owner's Capital</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">PKR {equity.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">PKR 0</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">PKR {equity.toLocaleString()}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Retained Earnings</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">PKR 0</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">PKR {netIncome.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">PKR {netIncome.toLocaleString()}</td>
            </tr>
            <tr className="bg-gray-50 border-t-2 border-gray-300">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">Total Equity</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold">PKR {equity.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold">PKR {netIncome.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold">PKR {totalEquity.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default EquityStatement;