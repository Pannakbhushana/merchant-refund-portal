import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { merchant } = useAuth();

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

        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-6">

          {/* Merchant Name */}
          {merchant && (
            <span className="hidden sm:inline text-sm sm:text-base text-gray-600 font-medium">
              Welcome, {merchant.name}
            </span>
          )}

          {/* profile Button */}
          <button
          onClick={()=>navigate("/login")}
              className="w-9 h-9
                flex items-center justify-center
                rounded-full
                bg-gray-100
                text-gray-700
                cursor-pointer
                font-semibold
                hover:bg-gray-200
                transition"
            >
              {merchant?.name?.charAt(0)}
            </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;