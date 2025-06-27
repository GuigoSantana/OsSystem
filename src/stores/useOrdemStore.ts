import { create } from "zustand";
import { ClienteType } from "./useClienteStore";
import axios from "axios";

type OrdemType = {
  cliente: ClienteType;
  createAt: string;
  descricao: string;
  status: string;
  clienteId: string;
  produtos: { produtoId: string }[];
  servicos: { servicoId: string }[];
}

type OrdemState = {
  descricao: string;
  status: string;
  clienteId: string;
  produtos: { produtoId: string }[];
  servicos: { servicoId: string }[];
  ordens: OrdemType[];
  setDescricao: (descricao: string) => void;
  setStatus: (status: string) => void;
  setClienteId: (clienteId: string) => void;
  adicionarProduto: (produto: { produtoId: string }) => void;
  adicionarServico: (servico: { servicoId: string }) => void;
  setOrdens: (ordens: OrdemType[]) => void;
  getOrdens: () => Promise<void> 
}

const useOrdemStore = create<OrdemState>((set) => ({
  descricao: "",
  status: "",
  clienteId: "",
  produtos: [],
  servicos: [],
  ordens: [],
  setOrdens: (ordens: OrdemType[]) => set((state) => ({
    ordens: [...state.ordens, ...ordens]
  })),
  getOrdens: async () => {
    const token = localStorage.getItem('token')
    try {
      const resposta = await axios.get<OrdemType[]>('http://localhost:3333/ordem', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      set({ordens: resposta.data})
    } catch (err) {
      console.error('Erro ao carregar clientes', err)
    }
  },
  setDescricao: (descricao: string) => set({ descricao }),
  setStatus: (status: string) => set({ status }),
  setClienteId: (clienteId: string) => set({ clienteId }),

  adicionarProduto: ({ produtoId }) =>
    set((state) => ({
      produtos: [...state.produtos, { produtoId }],
    })),

  removerProduto: (produtoId: string) =>
    set((state) => ({
      produtos: state.produtos.filter((p) => p.produtoId !== produtoId),
    })),

  adicionarServico: ({ servicoId }) =>
    set((state) => ({
      servicos: [...state.servicos, { servicoId }],
    })),

  removerServico: (servicoId: string) =>
    set((state) => ({
      servicos: state.servicos.filter((s) => s.servicoId !== servicoId),
    })),

  resetOrdem: () =>
    set({
      descricao: "",
      status: "",
      clienteId: "",
      produtos: [],
      servicos: [],
    }),
}));

export default useOrdemStore;
