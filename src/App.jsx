import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { PetsProvider } from './context/PetsContext.jsx'
import { HistoryProvider } from './context/HistoryContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Welcome from './pages/Welcome.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import CheckEmail from './pages/CheckEmail.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PetOnboarding from './pages/PetOnboarding.jsx'
import PetProfile from './pages/PetProfile.jsx'
import CheckMeal from './pages/CheckMeal.jsx'
import CheckResult from './pages/CheckResult.jsx'
import CheckHistory from './pages/CheckHistory.jsx'

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <PetsProvider>
          <HistoryProvider>
            <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/check-email" element={<CheckEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/pets/new"
              element={
                <RequireAuth>
                  <PetOnboarding />
                </RequireAuth>
              }
            />
            <Route
              path="/pets/:petId"
              element={
                <RequireAuth>
                  <PetProfile />
                </RequireAuth>
              }
            />
            <Route
              path="/check"
              element={
                <RequireAuth>
                  <CheckMeal />
                </RequireAuth>
              }
            />
            <Route
              path="/check/result"
              element={
                <RequireAuth>
                  <CheckResult />
                </RequireAuth>
              }
            />
            <Route
              path="/check/:petId"
              element={
                <RequireAuth>
                  <CheckMeal />
                </RequireAuth>
              }
            />
            <Route
              path="/history"
              element={
                <RequireAuth>
                  <CheckHistory />
                </RequireAuth>
              }
            />
            </Routes>
          </HistoryProvider>
        </PetsProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
