export interface Merchant {
  id: string
  email: string
  name: string
}

export interface AuthContextType {
  token: string | null
  merchant: Merchant | null
  login: (token: string, merchant: Merchant) => void
  logout: () => void
}