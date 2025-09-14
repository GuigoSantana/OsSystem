import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { apiUrl } from "../utils/variableUrl";

type LoginType = {
  email: string;
  senha: string;
};

type TokenPayload = {
  exp: number;
};

type CreateType = {
  nome?: string;
  email: string;
  cpf?: string;
  telefone?: string;
  senha: string;
};

type AuthStoreType = {
  token: string;
  usuarioId: string;
  setToken: (token: string) => void;
  getAuthentication: (data: LoginType) => Promise<void>;
  getCreationAndAuthentication: (data: CreateType) => Promise<void>;
  getCheckIfTheTokenIsValid: (
    token: string,
    logoutUserCallBack: () => void
  ) => Promise<void>;
  setLogoutUser: () => void;
};

const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      token: "",
      usuarioId: "",
      setToken: (token: string) => set({ token }),
      getAuthentication: async (data: LoginType) => {
        const { data: res } = await axios.post(`${apiUrl}/usuario/login`, data);
        console.log(res)
        set({ token: res.token });
        set({ usuarioId: res.usuarioId });
      },
      getCreationAndAuthentication: async (data: CreateType) => {
        const { data: res } = await axios.post(`${apiUrl}/usuario`, data);
        set({ token: res.token });
        set({ usuarioId: res.usuarioId });
      },
      getCheckIfTheTokenIsValid: async (
        token: string,
        logoutUserCallBack: () => void
      ) => {
        try {
          const decoded = jwtDecode<TokenPayload>(token);
          const now = Date.now();
          const expiration = decoded.exp * 1000;
          const delay = expiration - now;
          console.log(decoded.exp * 1000 - now);
          if (delay <= 0) {
            logoutUserCallBack();
          } else {
            setTimeout(() => {
              logoutUserCallBack();
            }, delay);
          }
        } catch (err) {
          console.log("Erro ao decodificar token", err);
          logoutUserCallBack();
        }
      },
      setLogoutUser: () => {
        set({ token: "", usuarioId: "" });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
