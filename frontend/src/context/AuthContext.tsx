import { createContext, useState, type ReactNode } from "react"
import type { AuthContextType } from "../types/auth"


export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}