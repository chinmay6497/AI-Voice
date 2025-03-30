import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import MockInterview from './pages/MockInterview';
import CodingPractice from './pages/CodingPractice';
import Learning from './pages/Learning';
import CompanyPrep from './pages/CompanyPrep';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/mock-interview" element={
              <PrivateRoute>
                <MockInterview />
              </PrivateRoute>
            } />
            <Route path="/coding-practice" element={
              <PrivateRoute>
                <CodingPractice />
              </PrivateRoute>
            } />
            <Route path="/learning" element={
              <PrivateRoute>
                <Learning />
              </PrivateRoute>
            } />
            <Route path="/company-prep" element={
              <PrivateRoute>
                <CompanyPrep />
              </PrivateRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 