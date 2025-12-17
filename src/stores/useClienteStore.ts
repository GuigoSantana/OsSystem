import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ClienteFormType, ClienteListType } from "../types/clientesTypes";
import api from "../services/api";
import { clientesServices } from "../services/clientesServices";
import useToastStore from "./useToastStore";


type ClienteStoreType = {
  clientes: ClienteListType[];
  isLoading: boolean;
  setClientes: (clientes: ClienteListType[]) => void;
  getClientes: (usuarioId: string) => Promise<void>;
  createCliente: (data: ClienteFormType) => Promise<void>;
};

const useClienteStore = create<ClienteStoreType>()(
  persist(
    (set) => ({
      clientes: [],
      isLoading: false,

      setClientes: (clientes: ClienteListType[]) =>
        set((state) => ({
          clientes: [...state.clientes, ...clientes],
        })),

      getClientes: async (usuarioId: string) => {
        set({ isLoading: true });
        try {
          const res = await clientesServices.getClientes(usuarioId)
          set({ clientes: res.data, isLoading: false });
        } catch (err) {
          console.error("Erro ao carregar clientes", err);
        } finally {
          set({isLoading: false})
        }
      },

      createCliente: async (data: ClienteFormType) => {
        set({ isLoading: true });
        try {
          const res = await api.post("/clientes", data)
          console.log(res);
          set({isLoading: false });
          useToastStore.getState().addToast("Cliente criado!", "sucesso")
        } catch (err) {
          console.log(err);
          useToastStore.getState().addToast("Cliente não foi criado!", "erro")
        } finally {
          set({isLoading: false})
        }
      },
    }),
    {
      name: "cliente-storage",
      partialize: (state) => ({ clientes: state.clientes }),
    }
  )
);

export default useClienteStore;
