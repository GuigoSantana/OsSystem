import axios from "axios";
import { create } from "zustand";

export type ProdutoType = {
  title: string;
  precov: string;
  precoc: string;
  descricao: string;
  estoque: string;
}

type ProdutoStoreType = {
  produtos: ProdutoType[];
  setTitle: (title: string) => void;
  setPrecov: (precov: string) => void;
  setPrecoc: (precoc: string) => void;
  setDescricao: (descricao: string) => void;
  setEstoque: (estoque: string) => void;
  getProdutos: () => Promise<void>;
};

const useProdutoStore = create<ProdutoStoreType & ProdutoType>((set) => ({
  title: "",
  precov: "",
  precoc: "",
  descricao: "",
  estoque: "",
  produtos: [],
  setTitle: (title: string) => set({ title }),
  setPrecov: (precov: string) => set({ precov }),
  setPrecoc: (precoc: string) => set({ precoc }),
  setDescricao: (descricao: string) => set({ descricao }),
  setEstoque: (estoque: string) => set({ estoque }),
  getProdutos: async () =>{
    try {
      const resposta = await axios.get<ProdutoType[]>('http://localhost:3333/produtos')
      set({produtos: resposta.data})
    } catch (err) {
      return console.log(err)
    }
  } 
}));

export default useProdutoStore;
