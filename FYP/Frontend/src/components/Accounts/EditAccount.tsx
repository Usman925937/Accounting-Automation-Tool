import { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../../api/api';
import useAlertStore from '../../store/alertStore';
import Spinner from '../Layout/Spinner';
import useAuthStore from '../../store/authStore';
import NotFound from '../Layout/NotFound';

const EditAccount = () => {
    const { accountId } = useParams();
    const { user } = useAuthStore();
    const [account, setAccount] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { addAlert } = useAlertStore();
    const nav = useNavigate();

    // fetch account details
    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const res = await api.get(`companies/${user.company._id}/accounts/${accountId}`);
                setAccount(res.data.account);
                addAlert('Account fetched successfully', 'success');

            } catch {
                addAlert('Failed to fetch account details', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchAccount();
    }, [accountId]);

    // handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/companies/${user.company._id}/accounts/${accountId}/edit`, account);
            addAlert('Account updated successfully', 'success');
            nav('/accounts');

        } catch {
            addAlert('Failed to update account', 'error');
        }
    };

    // return
    if (loading) return <Spinner />;

    // account not found
    if (!account) return <NotFound />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
            <div className="relative max-w-2xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
                <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                    Edit Account
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">Account Name</label>
                        <input
                            type="text"
                            value={account.accountName}
                            onChange={(e) => setAccount({ ...account, accountName: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Type</label>
                            <select
                                value={account.accountType}
                                onChange={(e) => setAccount({ ...account, accountType: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                            >
                                <option>debit</option>
                                <option>credit</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Financial Statement</label>
                            <select
                                value={account.financialStatement}
                                onChange={(e) => setAccount({ ...account, financialStatement: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                            >
                                <option>Balance Sheet</option>
                                <option>Income Statement</option>
                                <option>Comprehensive Income</option>
                                <option>Owner's Equity</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Category</label>
                            <input
                                type="text"
                                value={account.category}
                                onChange={(e) => setAccount({ ...account, category: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Subcategory</label>
                            <input
                                type="text"
                                value={account.subCategory}
                                onChange={(e) => setAccount({ ...account, subCategory: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-8">
                        <Link
                            to="/accounts"
                            className="inline-flex items-center gap-2 px-5 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back
                        </Link>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition"
                        >
                            <Save className="w-5 h-5" /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAccount;
