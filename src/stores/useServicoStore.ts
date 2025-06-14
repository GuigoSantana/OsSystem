import { create } from "zustand";

type useServicoType = {
  title: string;
  preco: string;
  descricao: string;
  setTitle: (title: string) => void;
  setPreco: (preco: string) => void;
  setDescricao: (descricao: string) => void;
};

const useServicoStore = create<useServicoType>((set) => ({
  title: "",
  preco: "",
  descricao: "",
  setTitle: (title: string) => set({ title }),
  setPreco: (preco: string) => set({ preco }),
  setDescricao: (descricao: string) => set({ descricao }),
}));

export default useServicoStore;
