import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authServices } from "../services/authServices";
import { CreateUserType, LoginUserType } from "../types/authTypes";

type AuthStoreType = {
  token: string;
  usuarioId: string;
  isLoading: boolean;
  setToken: (token: string) => void;
  userAuthentication: (data: LoginUserType) => Promise<void>;
  userCreation: (data: CreateUserType) => Promise<void>;
  setLogoutUser: () => void;
};

const getTokenInLocalStorage = localStorage.getItem("auth-storage");
const tokenStorage = getTokenInLocalStorage
  ? JSON.parse(getTokenInLocalStorage).state.token
  : "";

const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      token: tokenStorage,
      usuarioId: "",
      isLoading: false,
      setToken: (token: string) => set({ token }),
      userAuthentication: async (data: LoginUserType) => {
        set({ isLoading: true });
        try {
          const res = await authServices.Authentication(data);
          set({
            token: res.token,
            usuarioId: res.usuarioId,
            isLoading: false,
          });
        } catch (error) {
          console.log(error);
        } finally {
          set({ isLoading: false });
        }
      },
      userCreation: async (data: CreateUserType) => {
        set({ isLoading: true });
        try {
          const res = await authServices.Creation(data);
          set({ token: res.token, usuarioId: res.usuarioId, isLoading: false });
        } catch (error) {
          console.log(error);
        } finally {
          set({ isLoading: false });
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
