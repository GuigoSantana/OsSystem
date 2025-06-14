import { create } from "zustand";
import { ClienteType } from "./useClienteStore";

type ordemType = {
  cliente: ClienteType;
  createAt: string;
  descricao: string;
  status: string;
  clienteId: string;
  produtos: { produtoId: string }[];
  servicos: { servicoId: string }[];
}

interface OrdemState {
  descricao: string;
  status: string;
  clienteId: string;
  produtos: { produtoId: string }[];
  servicos: { servicoId: string }[];
  ordens: ordemType[];
  setDescricao: (descricao: string) => void;
  setStatus: (status: string) => void;
  setClienteId: (clienteId: string) => void;
  adicionarProduto: (produto: { produtoId: string }) => void;
  adicionarServico: (servico: { servicoId: string }) => void;
  getOrdens: (ordens: ordemType[]) => void;
}

const useOrdemStore = create<OrdemState>((set) => ({
  descricao: "",
  status: "",
  clienteId: "",
  produtos: [],
  servicos: [],
  ordens: [],
  getOrdens: (ordens: ordemType[]) => set((state) => ({
    ordens: [...state.ordens, ...ordens]
  })),

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
