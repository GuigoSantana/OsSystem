import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ClienteFormType, ClienteListType } from "../types/clientesTypes";
import { clientesServices } from "../services/clientesServices";
import useToastStore from "./useToastStore";

type ClienteStoreType = {
  clientes: ClienteListType[];
  isLoading: boolean;
  setClientes: (clientes: ClienteListType[]) => void;
  getClientes: (usuarioId: string) => Promise<void>;
  createCliente: (data: ClienteFormType) => Promise<void>;
  deleteCliente: (id: string) => Promise<void>;
};

const useClienteStore = create<ClienteStoreType>()(
  persist(
    (set) => ({
      clientes: [],
      isLoading: false,

      setClientes: (clientes: ClienteListType[]) => {
        set((state) => ({
          clientes: [...state.clientes, ...clientes],
        }));
        
      },
      getClientes: async () => {
        set({ isLoading: true });
        try {
          const res = await clientesServices.getClientes();
          set({ clientes: res.data, isLoading: false });
        } catch (err) {
          console.error("Erro ao carregar clientes", err);
        } finally {
          set({ isLoading: false });
        }
      },

      createCliente: async (data: ClienteFormType) => {
        set({ isLoading: true });
        try {
          const res = await clientesServices.createCliente(data);
          console.log(res);
          set({ isLoading: false });
          useToastStore.getState().addToast("Cliente criado!", "sucesso");
        } catch (err) {
          console.log(err);
          useToastStore.getState().addToast("Cliente não foi criado!", "erro");
        } finally {
          set({ isLoading: false });
        }
      },
      deleteCliente: async (id: string) => {
        set({ isLoading: true });
        try {
          const res = await clientesServices.deleteCliente(id);
          console.log(res);
          set({ isLoading: false });
          useToastStore
            .getState()
            .addToast("Cliente deletado com sucesso!", "sucesso");
        } catch (error) {
          console.log(error);
        } finally {
          set((state) => ({ isLoading: false, clientes: state.clientes.filter(c => c.id !== id) }));
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
