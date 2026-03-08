import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginMerchant } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const LoginPage = () => {

  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const [email, setEmail] = useState("merchant2@test.com");
  const [password, setPassword] = useState("Test@1234");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Signing in...");
    try {

      const res = await loginMerchant({
        email,
        password,
      });

      const token = res.data.accessToken;

      login(token, res.data.merchant);
      toast.success("Login successful", { id: toastId });
      navigate("/transactions");

    } catch (err: any) {
      toast.error("Invalid credentials", { id: toastId });
      setError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">

      <div className="w-full max-w-md bg-white border border-border rounded-lg shadow-sm p-6 sm:p-8">

        <div className="text-center mb-6">
          <h1 className="text-page-title">Merchant Portal</h1>
          <p className="text-body mt-1">
            Sign in to manage your transactions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <div>
            <label className="text-body block mb-1">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="merchant@example.com"
              className="w-full border border-border rounded-md px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-body block mb-1">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-border rounded-md px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium
            hover:bg-blue-800 cursor-pointer transition active:scale-95">
            Sign In
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded-md font-medium
            hover:bg-red-800 cursor-pointer transition active:scale-95">
            Sign Out
          </button>

        </form>

      </div>

    </div>
  );
};

export default LoginPage;