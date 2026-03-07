import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isTransactionsPage = location.pathname.startsWith("/transactions");

  return (
    <header className="border-b border-border bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">

        {/* Logo / Title */}
        <h1
          onClick={() => navigate("/transactions")}
          className="
            text-lg sm:text-xl
            font-semibold
            text-textPrimary
            cursor-pointer
            transition
            hover:text-primary
            whitespace-nowrap
          "
        >
          Merchant Portal
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-3 sm:gap-6">

          <button
            onClick={handleLogout}
            className="
              px-3 sm:px-4 py-2
              text-sm sm:text-base
              font-medium
              text-white
              bg-red-500
              cursor-pointer
              rounded-md
              shadow-sm
              transition
              hover:bg-red-600
              hover:shadow-md
              active:scale-95
            "
          >
            Logout
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;