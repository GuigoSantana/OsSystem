import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ServicoFormType, ServicoListType } from "../types/servicosTypes";
import { servicosService } from "../services/servicosService";
import useToastStore from "./useToastStore";

type ServicoStoreType = {
  servicos: ServicoListType[];
  isLoading: boolean;
  getServicos: () => Promise<void>;
  createServico: (data: ServicoFormType) => Promise<boolean>;
  updateServico: (
    id: string,
    data: Partial<ServicoListType>
  ) => Promise<boolean>;
  deleteServico: (id: string) => Promise<boolean>;
};

const useServicoStore = create<ServicoStoreType>()(
  persist(
    (set) => ({
      servicos: [],
      isLoading: false,
      getServicos: async () => {
        set({ isLoading: true });
        try {
          const res = await servicosService.getServicos();
          set({ servicos: res.data });
        } catch (err) {
          console.error("Erro ao carregar serviços", err);
        } finally {
          set({ isLoading: false });
        }
      },
      createServico: async (data: ServicoFormType) => {
        set({ isLoading: true });
        try {
          await servicosService.createServico(data);
          await useServicoStore.getState().getServicos();
          useToastStore.getState().addToast("Serviço criado!", "sucesso");
          return true;
        } catch (err) {
          console.error(err);
          useToastStore.getState().addToast("Serviço não foi criado!", "erro");
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
      updateServico: async (id: string, data: Partial<ServicoListType>) => {
        set({ isLoading: true });
        try {
          await servicosService.updateServico(id, data);
          set((state) => ({
            servicos: state.servicos.map((s) =>
              s.id === id ? { ...s, ...data } : s
            ),
          }));
          useToastStore.getState().addToast("Serviço atualizado!", "sucesso");
          return true;
        } catch (err) {
          console.error(err);
          useToastStore
            .getState()
            .addToast("Serviço não foi atualizado!", "erro");
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
      deleteServico: async (id: string) => {
        set({ isLoading: true });
        try {
          await servicosService.deleteServico(id);
          set((state) => ({
            servicos: state.servicos.filter((s) => s.id !== id),
          }));
          useToastStore.getState().addToast("Serviço deletado!", "sucesso");
          return true;
        } catch (err) {
          console.error(err);
          useToastStore
            .getState()
            .addToast("Serviço não foi deletado!", "erro");
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "servico-storage",
      partialize: (state) => ({ servicos: state.servicos }),
    }
  )
);

export default useServicoStore;
