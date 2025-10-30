
// Cash Flow Statement Component
const CashFlowStatement = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-900">Cash Flow Statement</h2>
    <div className="bg-white rounded-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Statement of Cash Flows</h3>
        <p className="text-gray-600">For the period ending {new Date().toLocaleDateString('en-GB')}</p>
      </div>
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-blue-700 mb-4 pb-2 border-b-2 border-blue-200">
            CASH FLOWS FROM OPERATING ACTIVITIES
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-700">Net Income</span>
              <span className="font-medium">PKR {netIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-gray-200 font-bold">
              <span className="text-blue-700">Net Cash from Operating Activities</span>
              <span className="text-blue-700">PKR {netIncome.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-green-700 mb-4 pb-2 border-b-2 border-green-200">
            CASH FLOWS FROM INVESTING ACTIVITIES
          </h4>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700">No investing activities recorded</span>
            <span className="font-medium">PKR 0</span>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-purple-700 mb-4 pb-2 border-b-2 border-purple-200">
            CASH FLOWS FROM FINANCING ACTIVITIES
          </h4>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700">No financing activities recorded</span>
            <span className="font-medium">PKR 0</span>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center font-bold text-lg">
            <span className="text-gray-900">Net Change in Cash</span>
            <span className="text-gray-900">PKR {netIncome.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CashFlowStatement;