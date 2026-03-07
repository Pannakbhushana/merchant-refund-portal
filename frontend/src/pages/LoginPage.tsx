import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Temporary login logic until backend is ready
    if (email && password) {
      localStorage.setItem("token", "demo-token");
      navigate("/transactions");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">

      <div className="w-full max-w-md bg-white border border-border rounded-lg shadow-sm p-6 sm:p-8">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-page-title">Merchant Portal</h1>
          <p className="text-body mt-1">
            Sign in to manage your transactions
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
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
              className="
                w-full
                border border-border
                rounded-md
                px-3 py-2
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-primary
              "
            />
          </div>

          {/* Password */}
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
              className="
                w-full
                border border-border
                rounded-md
                px-3 py-2
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-primary
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              text-white
              py-2
              rounded-md
              font-medium
              hover:bg-blue-700
              cursor-pointer
              transition
              hover:bg-primaryHover
              active:scale-95
            "
          >
            Sign In
          </button>

        </form>

      </div>

    </div>
  );
};

export default LoginPage;