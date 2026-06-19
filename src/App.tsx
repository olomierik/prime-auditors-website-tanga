import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import './i18n';

// Auth
import LoginPage from './pages/auth/LoginPage';
import ConsentPage from './pages/auth/ConsentPage';

// App Shell
import AppShell from './components/layout/AppShell';

// Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import AnnouncementsPage from './pages/announcements/AnnouncementsPage';
import AssignmentsPage from './pages/assignments/AssignmentsPage';
import AttendancePage from './pages/attendance/AttendancePage';
import MessagesPage from './pages/messages/MessagesPage';
import CalendarPage from './pages/calendar/CalendarPage';
import StudentsPage from './pages/students/StudentsPage';
import ClassesPage from './pages/classes/ClassesPage';
import AuditLogPage from './pages/admin/AuditLogPage';
import SettingsPage from './pages/admin/SettingsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

function ProtectedRoute({ children, requireRole }: { children: React.ReactNode; requireRole?: string[] }) {
  const { user, profile, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  if (profile?.status === 'pending_consent' && profile.role === 'parent') return <Navigate to="/consent" replace />;
  if (requireRole && profile && !requireRole.includes(profile.role)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user, profile, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto" />
        <p className="text-sm text-gray-500">ShuleConnect</p>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/login" element={
        user ? <Navigate to="/dashboard" replace /> : <LoginPage />
      } />
      <Route path="/consent" element={
        <ProtectedRoute><ConsentPage /></ProtectedRoute>
      } />

      {/* All authenticated routes use AppShell */}
      <Route path="/" element={<ProtectedRoute><AppShell title="" children={<></>} /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
      </Route>

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AppShell title="Dashboard"><DashboardPage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/announcements" element={
        <ProtectedRoute>
          <AppShell title="Announcements"><AnnouncementsPage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/assignments" element={
        <ProtectedRoute>
          <AppShell title="Assignments"><AssignmentsPage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/attendance" element={
        <ProtectedRoute>
          <AppShell title="Attendance"><AttendancePage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/messages" element={
        <ProtectedRoute>
          <AppShell title="Messages"><MessagesPage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/calendar" element={
        <ProtectedRoute>
          <AppShell title="Calendar"><CalendarPage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/students" element={
        <ProtectedRoute requireRole={['school_admin', 'teacher']}>
          <AppShell title="Students"><StudentsPage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/classes" element={
        <ProtectedRoute requireRole={['school_admin', 'teacher']}>
          <AppShell title="Classes"><ClassesPage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/audit" element={
        <ProtectedRoute requireRole={['school_admin', 'super_admin']}>
          <AppShell title="Audit Log"><AuditLogPage /></AppShell>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <AppShell title="Settings"><SettingsPage /></AppShell>
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster richColors position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
