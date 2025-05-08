import { Navigate, Route, Routes } from "react-router";
import { AuthenticationRoutes } from "./routes/AuthenticationRoutes";
import { normalRoutes } from "./routes/NormalRoutes";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute"
import "./App.css";


function App() {
  return (
    <Routes>
      {/* Redirect root based on token */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/app/dashboard" />
          </ProtectedRoute>
        }
      />

      {/* Protected /app routes */}
      <Route
        path="app"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {normalRoutes.map((route) => (
          <Route path={route?.url} element={route?.page} key={route?.title} />
        ))}
      </Route>

      {/* Public auth routes */}
      <Route path="auth" element={<AuthLayout />}>
        {AuthenticationRoutes.map((route) => (
          <Route path={route?.url} element={route?.page} key={route?.title} />
        ))}
      </Route>

      {/* 404 Page */}
      <Route
        path="*"
        element={<div className="text-7xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
