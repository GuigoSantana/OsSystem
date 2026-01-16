import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProdutoFormType, ProdutoListType } from "../types/produtosTypes";
import { produtosService } from "../services/produtosService";
import useToastStore from "./useToastStore";

type ProdutoStoreType = {
  produtos: ProdutoListType[];
  isLoading: boolean;
  setProdutos: (produtos: ProdutoListType[]) => void;
  getProdutos: (usuarioId: string, token: string) => Promise<void>;
  createProduto: (produto: ProdutoFormType) => void;
  deleteProduto: (id: string) => void;
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
          console.error("Erro ao carregar clientes", err);
        } finally {
          set({ isLoading: false });
        }
      },
      createProduto: async (produto: ProdutoFormType) => {
        set({ isLoading: true });
        try {
          const res = await produtosService.createProduto(produto);
          console.log(res);
          set({ isLoading: false });
          useToastStore.getState().addToast("Produto criado!", "sucesso");
        } catch (err) {
          console.log(err);

          useToastStore.getState().addToast("Produto não foi criado!", "erro");
        } finally {
          set({ isLoading: false });
        }
      },
      deleteProduto: async (id: string) => {
        set({ isLoading: true });
        try {
          const res = await produtosService.deleteProduto(id);
          console.log(res);
          useToastStore.getState().addToast("Produto deletado!", "sucesso");
        } catch (err) {
          console.log(err);
        } finally {
          set((state) => ({
            isLoading: false,
            produtos: state.produtos.filter((p) => p.id !== id),
          }));
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
