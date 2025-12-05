import { useState, useEffect } from 'react';
import { Edit2, Plus, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router';
import api from '../../api/api';
import useCalculationsStore from '../../store/calculationsStore';
import Spinner from '../Layout/Spinner';
import type { Budget } from '../../store/types';

const Budget = () => {
    const [budget, setBudget] = useState<Budget | null>(null);
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

    if (loading) {
        return <Spinner />    
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5 pointer-events-none"></div>
            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="inline-flex items-center w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl">
                            <DollarSign className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent">
                                Annual Budget
                            </h1>
                            <p className="text-gray-600 mt-1">Financial Year {budget?.financialYear.name || '2025'}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {budget ? (
                            <Link
                                to="/budget/edit"
                                className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
                            >
                                <Edit2 className="w-5 h-5" />
                                Edit Budget
                            </Link>
                        ) : (
                            <Link
                                to="/budget/create"
                                className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
                            >
                                <Plus className="w-5 h-5" />
                                Create Budget
                            </Link>
                        )}
                    </div>
                </div>

                {!budget ? (
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 text-center">
                        <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Budget Created Yet</h3>
                        <p className="text-gray-600">Set your financial targets for the year to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Key Metrics */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Revenue Target</h3>
                                <TrendingUp className="w-6 h-6 text-emerald-600" />
                            </div>
                            <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                ${Number(budget.revenue).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">Actual: ${totals.revenue.toLocaleString()}</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">COGS</h3>
                                <TrendingDown className="w-6 h-6 text-red-600" />
                            </div>
                            <p className="text-3xl font-bold text-red-600">
                                ${Number(budget.cogs).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">Actual: ${totals.cogs.toLocaleString()}</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Net Income Target</h3>
                            </div>
                            <p className={`text-3xl font-bold ${budget.netIncome >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                ${Number(budget.netIncome).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">Actual: ${totals.netIncome.toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Budget;
