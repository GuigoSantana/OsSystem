import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ClienteFormType, ClienteListType } from "../types/clientesTypes";
import { clientesServices } from "../services/clientesServices";
import useToastStore from "./useToastStore";

type ClienteStoreType = {
  clientes: ClienteListType[];
  isLoading: boolean;
  setClientes: (clientes: ClienteListType[]) => void;
  getClientes: () => Promise<void>;
  createCliente: (data: ClienteFormType) => Promise<boolean>;
  updateCliente: (
    id: string,
    data: Partial<ClienteListType>
  ) => Promise<boolean>;
  deleteCliente: (id: string) => Promise<boolean>;
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
          await clientesServices.createCliente(data);
          await useClienteStore.getState().getClientes();
          useToastStore.getState().addToast("Cliente criado!", "sucesso");
          return true;
        } catch (err) {
          console.error(err);
          useToastStore.getState().addToast("Cliente não foi criado!", "erro");
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
      updateCliente: async (id: string, data: Partial<ClienteListType>) => {
        set({ isLoading: true });
        try {
          await clientesServices.updateCliente(id, data);
          set((state) => ({
            clientes: state.clientes.map((c) =>
              c.id === id ? { ...c, ...data } : c
            ),
          }));
          useToastStore.getState().addToast("Cliente atualizado!", "sucesso");
          return true;
        } catch (err) {
          console.error(err);
          useToastStore
            .getState()
            .addToast("Cliente não foi atualizado!", "erro");
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
      deleteCliente: async (id: string) => {
        set({ isLoading: true });
        try {
          await clientesServices.deleteCliente(id);
          set((state) => ({
            clientes: state.clientes.filter((c) => c.id !== id),
          }));
          useToastStore
            .getState()
            .addToast("Cliente deletado com sucesso!", "sucesso");
          return true;
        } catch (error) {
          console.error(error);
          useToastStore
            .getState()
            .addToast("Cliente não foi deletado!", "erro");
          return false;
        } finally {
          set({ isLoading: false });
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
