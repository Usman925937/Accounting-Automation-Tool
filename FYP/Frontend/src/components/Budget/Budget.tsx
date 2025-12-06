import { useState, useEffect } from 'react';
import { Edit2, Plus, Calendar, DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { Link } from 'react-router';
import api from '../../api/api';
import useCalculationsStore from '../../store/calculationsStore';
import Spinner from '../Layout/Spinner';
import type { BudgetType } from '../../store/types';

const Budget = () => {
    const [budget, setBudget] = useState<BudgetType | null>(null);
    const [loading, setLoading] = useState(true);
    const { totals } = useCalculationsStore();

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const res = await api.get('/budgets/current');
                setBudget(res.data.budget);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBudget();
    }, []);

    if (loading) return <Spinner />;

    const fmt = (num: number) => `$${Math.abs(num).toLocaleString()}`;

    const budgetRows = budget ? [
        { label: "Revenue", budgeted: budget.revenue?.budgetedAmount, actual: totals.revenue, icon: <TrendingUp className="w-5 h-5" />, favorableWhen: "higher" },
        { label: "COGS", budgeted: budget.cogs?.budgetedAmount, actual: totals.cogs, icon: <TrendingDown className="w-5 h-5" />, favorableWhen: "lower" },
        { 
            label: "Operating Expenses", 
            budgeted: budget.operatingExpenses?.budgetedAmount || 0, 
            actual: totals.operatingExpenses,
            icon: <TrendingDown className="w-5 h-5" />, 
            favorableWhen: "lower" 
        },
        { label: "Net Income", budgeted: budget.netIncome?.budgetedAmount, actual: totals.netIncome, icon: <DollarSign className="w-5 h-5" />, favorableWhen: "higher" },
        { 
            label: "Capex", 
            budgeted: budget.capex?.budgetedAmount || 0, 
            actual: Math.abs(totals.netFixedAssets),
            icon: <TrendingDown className="w-5 h-5" />, 
            favorableWhen: "lower" 
        },
        { 
            label: "Cash Inflows", 
            budgeted: budget.cashInflows?.budgetedAmount || 0, 
            actual: totals.cashInflows,
            icon: <ArrowUpRight className="w-5 h-5" />, 
            favorableWhen: "higher" 
        },
        { 
            label: "Cash Outflows", 
            budgeted: budget.cashOutflows?.budgetedAmount || 0, 
            actual: totals.cashOutflows,
            icon: <ArrowDownRight className="w-5 h-5" />, 
            favorableWhen: "lower" 
        }
    ] : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5 pointer-events-none"></div>
            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl">
                            <DollarSign className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                Annual Budget vs Actual
                            </h1>
                            <p className="text-gray-600 mt-1">Financial Year {budget?.financialYear.name || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {budget ? (
                            <Link to="/admin/budget/edit" className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105">
                                <Edit2 className="w-5 h-5" /> Edit Budget
                            </Link>
                        ) : (
                            <Link to="/admin/budget/create" className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105">
                                <Plus className="w-5 h-5" /> Create Budget
                            </Link>
                        )}
                    </div>
                </div>

                {!budget ? (
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-12 text-center">
                        <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Budget Created Yet</h3>
                        <p className="text-gray-600">Set your financial targets for the year to get started.</p>
                    </div>
                ) : (
                    <>
                        {/* Main Table */}
                        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden mb-8">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10">
                                            <th className="px-8 py-6 text-left text-sm font-semibold text-gray-700">Category</th>
                                            <th className="px-8 py-6 text-right text-sm font-semibold text-gray-700">Budget</th>
                                            <th className="px-8 py-6 text-right text-sm font-semibold text-gray-700">Actual</th>
                                            <th className="px-8 py-6 text-right text-sm font-semibold text-gray-700">Difference</th>
                                            <th className="px-8 py-6 text-center text-sm font-semibold text-gray-700">Variance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200/60">
                                        {budgetRows.map((row, i) => {
                                            const diff = row.actual - row.budgeted;
                                            const isFavorable = row.favorableWhen === "higher" ? diff >= 0 : diff <= 0;
                                            const absDiff = Math.abs(diff);

                                            return (
                                                <tr key={i} className="hover:bg-white/50 transition-colors">
                                                    <td className="px-8 py-6 flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg ${isFavorable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                            {row.icon}
                                                        </div>
                                                        <span className="font-medium text-gray-800">{row.label}</span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right font-semibold text-gray-700">{fmt(row.budgeted)}</td>
                                                    <td className="px-8 py-6 text-right font-semibold text-gray-900">{fmt(row.actual)}</td>
                                                    <td className={`px-8 py-6 text-right font-bold ${diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {diff >= 0 ? '+' : '-'}{fmt(absDiff)}
                                                    </td>
                                                    <td className="px-8 py-6 text-center">
                                                        {isFavorable ? (
                                                            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium text-sm">
                                                                <TrendingUp className="w-4 h-4" /> Favorable
                                                            </div>
                                                        ) : (
                                                            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-800 font-medium text-sm">
                                                                <TrendingDown className="w-4 h-4" /> Unfavorable
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Beautiful Assumptions & Notes Section */}
                        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/40 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                                    <Info className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Calculation Assumptions & Methodology
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Revenue</h4>
                                        <p className="text-sm leading-relaxed">Sales Revenue - Sales returns</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">COGS</h4>
                                        <p className="text-sm leading-relaxed">-</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Operating Expenses</h4>
                                        <p className="text-sm leading-relaxed">-</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Net Income</h4>
                                        <p className="text-sm leading-relaxed">-</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Capex</h4>
                                        <p className="text-sm leading-relaxed">Total net fixed assets used (proxy until direct tracking)</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Cash Inflows / Outflows</h4>
                                        <p className="text-sm leading-relaxed">-</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">Variance Logic</h4>
                                        <p className="text-sm leading-relaxed">
                                            Green = Favorable<br />
                                            • Revenue & Income: Actual ≥ Budget<br />
                                            • All Expenses & Outflows: Actual ≤ Budget
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200/60 flex items-center gap-2 text-sm text-gray-500">
                                <Info className="w-4 h-4" />
                                <span>Data is calculated in real-time from journal entries. Last updated: {new Date().toLocaleDateString()}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Budget;