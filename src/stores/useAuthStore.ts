import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { authServices } from "../services/authServices";
import { CreateUserType, LoginUserType, TokenPayload } from "../types/authTypes";

type AuthStoreType = {
  token: string;
  usuarioId: string;
  isLoading: boolean;
  setToken: (token: string) => void;
  getAuthentication: (data: LoginUserType) => Promise<void>;
  getCreation: (data: CreateUserType) => Promise<void>;
  getCheckIfTheTokenIsValid: (
    token: string,
    logoutUserCallBack: () => void
  ) => Promise<void>;
  setLogoutUser: () => void;
};

const getTokenInLocalStorage = localStorage.getItem("auth-storage")
const tokenStorage = getTokenInLocalStorage ? JSON.parse(getTokenInLocalStorage).state.token : "";

const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      token: tokenStorage,
      usuarioId: "",
      isLoading: false,
      setToken: (token: string) => set({ token }),
      getAuthentication: async (data: LoginUserType) => {
        set({ isLoading: true });
        try {
          const res = await authServices.Authentication(data);
          set({ token: res.token });
          set({ usuarioId: res.usuarioId });
        } catch (error) {
          console.log(error);
        } finally {
          set({ isLoading: false });
        }
      },
      getCreation: async (data: CreateUserType) => {
        set({ isLoading: true });
        try {
          const res = await authServices.Creation(data);
          set({ token: res.token });
          set({ usuarioId: res.usuarioId });
        } catch (error) {
          console.log(error);
        } finally {
          set({ isLoading: false });
        }
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
