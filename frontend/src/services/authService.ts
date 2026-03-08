import api from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginMerchant = (data: LoginPayload) => {
  return api.post("/auth/login", data);
};