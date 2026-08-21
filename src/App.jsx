import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SalesDataProvider } from './context/SalesDataContext';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <SalesDataProvider>
      {isAuthenticated ? <DashboardPage /> : <LoginPage />}
    </SalesDataProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
