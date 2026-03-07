import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import TransactionsPage from "../pages/TransactionsPage";
import TransactionDetailPage from "../pages/TransactionDetailPage";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route
              path="/transactions/:id"
              element={<TransactionDetailPage />}
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/transactions" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;