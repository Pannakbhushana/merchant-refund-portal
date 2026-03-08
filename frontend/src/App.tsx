import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext"
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#333",
            border: "1px solid #e5e7eb",
          },
        }} />
      <AppRouter />
    </AuthProvider>
  )
}

export default App;