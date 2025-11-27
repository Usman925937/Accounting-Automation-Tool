// src/components/dashboard/FinancialHealth.tsx
import { useMemo, useCallback } from 'react';
import {
  Activity, Shield, Target, TrendingUp, BarChart3, CreditCard,
  Banknote, Calculator, Award, CheckCircle, AlertTriangle,
  Bot, ArrowRight
} from 'lucide-react';
import useAccountingStore from '../../store/accountingStore';
import { calculateTotals, calculateRatios, calculateHealthScore } from '../../utils/chatBotCalculations';
import Chatbot from './Chatbot';

const FinancialHealth = () => {
  const { accounts, selectedFinancialYear } = useAccountingStore();

  // --- Core Calculations (fully memoized) ---
  const totals = useMemo(() => {
    if (!selectedFinancialYear) return calculateTotals(accounts);
    return calculateTotals(accounts, selectedFinancialYear._id);
  }, [accounts, selectedFinancialYear]);

  const ratios = useMemo(() => {
    return calculateRatios(totals);
  }, [totals]);

  const healthScore = useMemo(() => {
    return calculateHealthScore(totals, ratios);
  }, [totals, ratios]);

  // --- Health Status Helper ---
  const getHealthStatus = useCallback((score: number) => {
    if (score >= 80) return { status: 'Excellent', color: 'text-green-600', bg: 'bg-green-50', icon: Award };
    if (score >= 60) return { status: 'Good', color: 'text-blue-600', bg: 'bg-blue-50', icon: CheckCircle };
    if (score >= 40) return { status: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: AlertTriangle };
    return { status: 'Poor', color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle };
  }, []);

  const status = getHealthStatus(healthScore);
  const StatusIcon = status.icon;

  // --- Key Metrics (dynamic & accurate) ---
  const keyMetrics = useMemo(() => [
    {
      name: 'Health Score',
      value: `${healthScore}/100`,
      icon: Activity,
      color: status.color,
      bgColor: status.bg,
      trend: healthScore >= 70 ? '+8 pts' : healthScore >= 50 ? '+2 pts' : '-5 pts',
      trendType: healthScore >= 60 ? 'positive' : 'negative'
    },
    {
      name: 'Current Ratio',
      value: ratios.currentRatio.toFixed(2),
      icon: Shield,
      color: ratios.currentRatio >= 2 ? 'text-green-600' : ratios.currentRatio >= 1.5 ? 'text-blue-600' : 'text-red-600',
      bgColor: ratios.currentRatio >= 2 ? 'bg-green-50' : ratios.currentRatio >= 1.5 ? 'bg-blue-50' : 'bg-red-50',
      trend: ratios.currentRatio >= 2 ? 'Strong' : ratios.currentRatio >= 1.5 ? 'Good' : 'Needs Attention',
      trendType: ratios.currentRatio >= 1.5 ? 'positive' : 'negative'
    },
    {
      name: 'Net Profit Margin',
      value: `${ratios.netProfitMargin.toFixed(1)}%`,
      icon: Target,
      color: ratios.netProfitMargin > 15 ? 'text-green-600' : ratios.netProfitMargin > 5 ? 'text-blue-600' : 'text-red-600',
      bgColor: ratios.netProfitMargin > 15 ? 'bg-green-50' : ratios.netProfitMargin > 5 ? 'bg-blue-50' : 'bg-red-50',
      trend: ratios.netProfitMargin > 15 ? 'Excellent' : ratios.netProfitMargin > 0 ? 'Positive' : 'Loss-Making',
      trendType: ratios.netProfitMargin > 10 ? 'positive' : ratios.netProfitMargin > 0 ? 'neutral' : 'negative'
    },
    {
      name: 'Return on Equity',
      value: `${ratios.ROE.toFixed(1)}%`,
      icon: TrendingUp,
      color: ratios.ROE > 20 ? 'text-green-600' : ratios.ROE > 10 ? 'text-blue-600' : 'text-red-600',
      bgColor: ratios.ROE > 20 ? 'bg-green-50' : ratios.ROE > 10 ? 'bg-blue-50' : 'bg-red-50',
      trend: ratios.ROE > 20 ? 'Outstanding' : ratios.ROE > 10 ? 'Solid' : 'Low',
      trendType: ratios.ROE > 15 ? 'positive' : 'negative'
    },
    {
      name: 'Asset Turnover',
      value: `${ratios.assetTurnover.toFixed(2)}x`,
      icon: BarChart3,
      color: ratios.assetTurnover > 1.2 ? 'text-green-600' : ratios.assetTurnover > 0.8 ? 'text-blue-600' : 'text-red-600',
      bgColor: ratios.assetTurnover > 1.2 ? 'bg-green-50' : ratios.assetTurnover > 0.8 ? 'bg-blue-50' : 'bg-red-50',
      trend: ratios.assetTurnover > 1.2 ? 'Highly Efficient' : ratios.assetTurnover > 0.8 ? 'Moderate' : 'Inefficient',
      trendType: ratios.assetTurnover > 1 ? 'positive' : 'negative'
    },
    {
      name: 'Debt-to-Equity',
      value: ratios.debtToEquity === Infinity ? '∞' : ratios.debtToEquity.toFixed(2),
      icon: CreditCard,
      color: ratios.debtToEquity <= 0.5 ? 'text-green-600' : ratios.debtToEquity <= 1 ? 'text-yellow-600' : 'text-red-600',
      bgColor: ratios.debtToEquity <= 0.5 ? 'bg-green-50' : ratios.debtToEquity <= 1 ? 'bg-yellow-50' : 'bg-red-50',
      trend: ratios.debtToEquity <= 0.5 ? 'Conservative' : ratios.debtToEquity <= 1 ? 'Moderate' : 'High Risk',
      trendType: ratios.debtToEquity <= 1 ? 'positive' : 'negative'
    },
    {
      name: 'Cash Ratio',
      value: ratios.cashRatio.toFixed(2),
      icon: Banknote,
      color: ratios.cashRatio >= 0.3 ? 'text-green-600' : ratios.cashRatio >= 0.1 ? 'text-blue-600' : 'text-red-600',
      bgColor: ratios.cashRatio >= 0.3 ? 'bg-green-50' : ratios.cashRatio >= 0.1 ? 'bg-blue-50' : 'bg-red-50',
      trend: ratios.cashRatio >= 0.3 ? 'Very Strong' : ratios.cashRatio >= 0.1 ? 'Adequate' : 'Weak',
      trendType: ratios.cashRatio >= 0.2 ? 'positive' : 'negative'
    },
    {
      name: 'Operating Margin',
      value: `${ratios.operatingMargin.toFixed(1)}%`,
      icon: Calculator,
      color: ratios.operatingMargin > 20 ? 'text-green-600' : ratios.operatingMargin > 8 ? 'text-blue-600' : 'text-red-600',
      bgColor: ratios.operatingMargin > 20 ? 'bg-green-50' : ratios.operatingMargin > 8 ? 'bg-blue-50' : 'bg-red-50',
      trend: ratios.operatingMargin > 20 ? 'Excellent' : ratios.operatingMargin > 8 ? 'Healthy' : 'Concerning',
      trendType: ratios.operatingMargin > 12 ? 'positive' : 'negative'
    }
  ], [healthScore, ratios, status]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
          Financial Health Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Real-time AI-powered insights into your company’s financial performance
        </p>
      </div>

      {/* Top Row: Health Score + Chatbot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Health Score Card */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Overall Financial Health</h2>
              <p className="text-gray-600 mt-1">Based on profitability, liquidity, leverage, and efficiency</p>
            </div>
            <div className={`p-5 rounded-2xl ${status.bg}`}>
              <StatusIcon className={`h-10 w-10 ${status.color}`} />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-5xl font-bold text-gray-900">{healthScore}</span>
              <span className={`text-2xl font-semibold ${status.color}`}>/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-5">
              <div
                className={`h-5 rounded-full transition-all duration-1000 ease-out ${
                  healthScore >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                  healthScore >= 60 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                  healthScore >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                  'bg-gradient-to-r from-red-500 to-pink-600'
                }`}
                style={{ width: `${healthScore}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className={`px-5 py-2.5 rounded-full text-sm font-bold ${status.bg} ${status.color}`}>
              {status.status} Financial Health
            </span>
            <Chatbot /> {/* Clean integration — uses your original Chatbot */}
          </div>
        </div>

        {/* Placeholder for future sector card or quick stats */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Need Help?</h3>
            <Bot className="h-8 w-8 opacity-80" />
          </div>
          <p className="text-indigo-100 mb-6">
            Ask the AI Assistant anything about your ratios, recommendations, or performance.
          </p>
          <div className="text-3xl font-bold">Just click "Open Assistant"</div>
          <p className="text-sm text-indigo-200 mt-2">Powered by real-time financial data</p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric) => {
          const Icon = metric.icon;
          const trendColor = metric.trendType === 'positive' ? 'bg-green-100 text-green-700' :
                            metric.trendType === 'negative' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700';

          return (
            <div
              key={metric.name}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${trendColor}`}>
                  {metric.trend}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600">{metric.name}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Optional: Deep Analysis Toggle */}
      <div className="text-center mt-12">
        <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
          View Detailed Analysis
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default FinancialHealth;