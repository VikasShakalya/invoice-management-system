import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
              isAuth ? (
                <Layout>
                  <Dashboard />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuth ? (
                <Layout>
                  <Dashboard />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/invoices" 
            element={
              isAuth ? (
                <Layout>
                  <InvoiceList />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/invoices/new" 
            element={
              isAuth ? (
                <Layout>
                  <InvoiceForm />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/invoices/edit/:id" 
            element={
              isAuth ? (
                <Layout>
                  <InvoiceForm />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/users" 
            element={
              isAuth ? (
                <Layout>
                  <UserList />
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;