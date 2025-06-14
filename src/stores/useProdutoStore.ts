import { create } from "zustand";

type ProdutoStoreType = {
  title: string;
  precov: string;
  precoc: string;
  descricao: string;
  estoque: string;
  setTitle: (title: string) => void;
  setPrecov: (precov: string) => void;
  setPrecoc: (precoc: string) => void;
  setDescricao: (descricao: string) => void;
  setEstoque: (estoque: string) => void;
};

const useProdutoStore = create<ProdutoStoreType>((set) => ({
  title: "",
  precov: "",
  precoc: "",
  descricao: "",
  estoque: "",
  setTitle: (title: string) => set({ title }),
  setPrecov: (precov: string) => set({ precov }),
  setPrecoc: (precoc: string) => set({ precoc }),
  setDescricao: (descricao: string) => set({ descricao }),
  setEstoque: (estoque: string) => set({ estoque }),
}));

export default useProdutoStore;
