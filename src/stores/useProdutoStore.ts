import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProdutoFormType, ProdutoListType } from "../types/produtosTypes";
import { produtosService } from "../services/produtosService";
import useToastStore from "./useToastStore";

type ProdutoStoreType = {
  produtos: ProdutoListType[];
  isLoading: boolean;
  setProdutos: (produtos: ProdutoListType[]) => void;
  getProdutos: () => Promise<void>;
  createProduto: (produto: ProdutoFormType) => Promise<boolean>;
  updateProduto: (
    id: string,
    data: Partial<ProdutoListType>
  ) => Promise<boolean>;
  deleteProduto: (id: string) => Promise<boolean>;
};

const useProdutoStore = create<ProdutoStoreType>()(
  persist(
    (set) => ({
      produtos: [],
      isLoading: false,
      setProdutos: (produtos: ProdutoListType[]) => {
        set((state) => ({
          produtos: [...state.produtos, ...produtos],
        }));
      },
      getProdutos: async () => {
        set({ isLoading: true });
        try {
          const res = await produtosService.getProdutos();
          set({ produtos: res.data, isLoading: false });
        } catch (err) {
          console.error("Erro ao carregar produtos", err);
        } finally {
          set({ isLoading: false });
        }
      },
      createProduto: async (produto: ProdutoFormType) => {
        set({ isLoading: true });
        try {
          await produtosService.createProduto(produto);
          await useProdutoStore.getState().getProdutos();
          useToastStore.getState().addToast("Produto criado!", "sucesso");
          return true;
        } catch (err) {
          console.error(err);
          useToastStore.getState().addToast("Produto não foi criado!", "erro");
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
      updateProduto: async (id: string, data: Partial<ProdutoListType>) => {
        set({ isLoading: true });
        try {
          await produtosService.updateProduto(id, data);
          set((state) => ({
            produtos: state.produtos.map((p) =>
              p.id === id ? { ...p, ...data } : p
            ),
          }));
          useToastStore.getState().addToast("Produto atualizado!", "sucesso");
          return true;
        } catch (err) {
          console.error(err);
          useToastStore
            .getState()
            .addToast("Produto não foi atualizado!", "erro");
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
      deleteProduto: async (id: string) => {
        set({ isLoading: true });
        try {
          await produtosService.deleteProduto(id);
          set((state) => ({
            produtos: state.produtos.filter((p) => p.id !== id),
          }));
          useToastStore.getState().addToast("Produto deletado!", "sucesso");
          return true;
        } catch (err) {
          console.error(err);
          useToastStore.getState().addToast("Produto não foi deletado!", "erro");
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "produto-storage",
      partialize: (state) => ({ produtos: state.produtos }),
    }
  )
);

export default useProdutoStore;
