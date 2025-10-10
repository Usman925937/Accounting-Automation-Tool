import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Spinner from './components/Layout/Spinner';
import useAuthStore from './store/authStore';
import api from './api/api';

const App = () => {
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false); //set true

  // fetch user
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await api.get('/users/me');
  //       setUser(response.data.user);
  //     } catch (error) {
  //       console.error("Failed to fetch user:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUser();
  // }, [])

  //return
  if (loading) {
    return <Spinner />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App