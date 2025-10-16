import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';
import useAuthStore from './store/authStore';
import api from './api/api';

import Layout from './components/Layout/Layout'
import Dashboard from './components/Dashboard/Dashboard';
import Spinner from './components/Layout/Spinner';
import Alert from './components/Layout/Alert';
import FinancialHealth from './components/FinancialHealth/FinancialHealth';
import FinancialStatements from './components/FinancialStatements/FinancialStatements';
import Accounts from './components/Accounts/Accounts';
import AddAccount from './components/Accounts/AddAcount';
import EditAccount from './components/Accounts/EditAccount';
import Company from './components/Auth/Company';
import Profile from './components/Auth/Profile';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import JournalEntries from './components/Transactions/JournalEntries';
import TransactionInput from './components/Transactions/TransactionInput';
import Ledgers from './components/Transactions/Ledgers';
import TrialBalance from './components/Transactions/TrialBalance';
import AdminRoute from './components/Auth/AdminRoute';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import GuestRoute from './components/Auth/GuestRoute';
import Admin from './components/Auth/Admin';
import NotFound from './components/Layout/NotFound';
import AccountDetails from './components/Accounts/AccountDetails';

const App = () => {
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await api.get('/users/me');
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [])

  //return
  if (loading) {
    return <Spinner />
  }

  return (
    <BrowserRouter>
      <Alert />
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="financial-health" element={<FinancialHealth />} />
          <Route path="financial-statements" element={<FinancialStatements />} />
          
          <Route path="accounts/add" element={<AddAccount />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="accounts/:id" element={<AccountDetails />} />

          <Route path="company" element={<Company />} />
          <Route path="profile" element={<Profile />} />
          <Route path="journal" element={<JournalEntries />} />
          <Route path="add-transaction" element={<TransactionInput />} />
          <Route path="ledgers" element={<Ledgers />} />
          <Route path="trial-balance" element={<TrialBalance />} />
        </Route>

        {/* Profile */}
        <Route path="auth/profile" element={<Profile />} />

        {/* Guest Routes */}
        <Route path="auth/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="auth/register" element={<GuestRoute><Register /></GuestRoute>} />

        {/* Admin Routes */}
        <Route path="admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="accounts/:accountId/edit" element={<AdminRoute><EditAccount /></AdminRoute>} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App