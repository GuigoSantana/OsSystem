import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  OrdemDraftProduto,
  OrdemDraftServico,
  OrdemFormPayload,
  OrdemType,
  StatusOrdem,
} from "../types/ordensTypes";
import { ordensService } from "../services/ordensService";
import useToastStore from "./useToastStore";

type OrdemStoreType = {
  ordens: OrdemType[];
  isLoading: boolean;
  draft: {
    descricao: string;
    status: StatusOrdem;
    clienteId: string;
    produtos: OrdemDraftProduto[];
    servicos: OrdemDraftServico[];
  };
  getOrdens: () => Promise<void>;
  createOrdem: (data: OrdemFormPayload) => Promise<boolean>;
  updateOrdem: (
    id: string,
    data: { status?: StatusOrdem; descricao?: string }
  ) => Promise<boolean>;
  deleteOrdem: (id: string) => Promise<boolean>;
  setDraftDescricao: (descricao: string) => void;
  setDraftStatus: (status: StatusOrdem) => void;
  setDraftClienteId: (clienteId: string) => void;
  adicionarProdutoDraft: (item: OrdemDraftProduto) => void;
  removerProdutoDraft: (produtoId: string) => void;
  adicionarServicoDraft: (item: OrdemDraftServico) => void;
  removerServicoDraft: (servicoId: string) => void;
  resetDraft: () => void;
};

const draftInicial = {
  descricao: "",
  status: "PENDENTE" as StatusOrdem,
  clienteId: "",
  produtos: [] as OrdemDraftProduto[],
  servicos: [] as OrdemDraftServico[],
};

const useOrdemStore = create<OrdemStoreType>()(
  persist(
    (set) => ({
      ordens: [],
      isLoading: false,
      draft: { ...draftInicial },

      getOrdens: async () => {
        set({ isLoading: true });
        try {
          const res = await ordensService.getOrdens();
          set({ ordens: res.data });
        } catch (err) {
          console.error("Erro ao carregar ordens", err);
        } finally {
          set({ isLoading: false });
        }
      },

      createOrdem: async (data: OrdemFormPayload) => {
        set({ isLoading: true });
        try {
          await ordensService.createOrdem(data);
          await useOrdemStore.getState().getOrdens();
          useToastStore.getState().addToast("Ordem criada!", "sucesso");
          set({ draft: { ...draftInicial } });
          return true;
        } catch (err) {
          console.error(err);
          useToastStore.getState().addToast("Ordem não foi criada!", "erro");
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      updateOrdem: async (id, data) => {
        set({ isLoading: true });
        try {
          const res = await ordensService.updateOrdem(id, data);
          set((state) => ({
            ordens: state.ordens.map((o) =>
              o.id === id ? res.data : o
            ),
          }));
          useToastStore.getState().addToast("Ordem atualizada!", "sucesso");
          return true;
        } catch (err) {
          console.error(err);
          useToastStore
            .getState()
            .addToast("Ordem não foi atualizada!", "erro");
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      deleteOrdem: async (id: string) => {
        set({ isLoading: true });
        try {
          await ordensService.deleteOrdem(id);
          set((state) => ({
            ordens: state.ordens.filter((o) => o.id !== id),
          }));
          useToastStore.getState().addToast("Ordem excluída!", "sucesso");
          return true;
        } catch (err) {
          console.error(err);
          useToastStore.getState().addToast("Ordem não foi excluída!", "erro");
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      setDraftDescricao: (descricao) =>
        set((state) => ({ draft: { ...state.draft, descricao } })),
      setDraftStatus: (status) =>
        set((state) => ({ draft: { ...state.draft, status } })),
      setDraftClienteId: (clienteId) =>
        set((state) => ({ draft: { ...state.draft, clienteId } })),
      adicionarProdutoDraft: (item) =>
        set((state) => ({
          draft: {
            ...state.draft,
            produtos: [
              ...state.draft.produtos.filter((p) => p.produtoId !== item.produtoId),
              item,
            ],
          },
        })),
      removerProdutoDraft: (produtoId) =>
        set((state) => ({
          draft: {
            ...state.draft,
            produtos: state.draft.produtos.filter((p) => p.produtoId !== produtoId),
          },
        })),
      adicionarServicoDraft: (item) =>
        set((state) => ({
          draft: {
            ...state.draft,
            servicos: [
              ...state.draft.servicos.filter((s) => s.servicoId !== item.servicoId),
              item,
            ],
          },
        })),
      removerServicoDraft: (servicoId) =>
        set((state) => ({
          draft: {
            ...state.draft,
            servicos: state.draft.servicos.filter((s) => s.servicoId !== servicoId),
          },
        })),
      resetDraft: () => set({ draft: { ...draftInicial } }),
    }),
    {
      name: "ordem-storage",
      partialize: (state) => ({ ordens: state.ordens }),
    }
  )
);

export default useOrdemStore;
