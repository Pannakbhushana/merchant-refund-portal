import { createContext, useState, type ReactNode } from "react"
import type { AuthContextType, Merchant } from "../types/auth"

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )

  const [merchant, setMerchant] = useState<Merchant | null>(() => {
    const storedMerchant = localStorage.getItem("merchant")
    return storedMerchant ? JSON.parse(storedMerchant) : null
  })

  const login = (newToken: string, merchantData: Merchant) => {

    localStorage.setItem("token", newToken)
    localStorage.setItem("merchant", JSON.stringify(merchantData))

    setToken(newToken)
    setMerchant(merchantData)
  }

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("merchant")

    setToken(null)
    setMerchant(null)
  }

  return (
    <AuthContext.Provider value={{ token, merchant, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}