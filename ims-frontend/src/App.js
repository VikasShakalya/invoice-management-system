import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { isAuthenticated } from './api/auth';

// Components
import Login from './components/Auth/Login';
import Dashboard from './components/Home/Dashboard';
import InvoiceForm from './components/Invoices/InvoiceForm';
import InvoiceList from './components/Invoices/InvoiceList';
import UserList from './components/Users/UserList';
import Layout from './components/Layout/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
      setAuthChecked(true);
    };
    
    checkAuth();
    
    // Listen for storage changes to handle login/logout across tabs
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (!authChecked) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          backgroundColor: '#f5f5f5'
        }}>
          <div>Loading...</div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsAuth(true)} />} />
          <Route 
            path="/" 
            element={
              isAuth ? <Layout /> : <Navigate to="/login" replace />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="invoices" element={<InvoiceList />} />
            <Route path="invoices/new" element={<InvoiceForm />} />
            <Route path="invoices/edit/:id" element={<InvoiceForm />} />
            <Route path="users" element={<UserList />} />
          </Route>
          </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
