import { create } from "zustand";
import axios from 'axios'

export type ClienteType = {
  createAt: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: string;
}
type ClienteStoreType = {
  clientes: ClienteType[];
  setNome: (nome: string) => void;
  setEmail: (email: string) => void;
  setCpf: (cpf: string) => void;
  setTelefone: (telefone: string) => void;
  setEndereco: (endereco: string) => void;
  setClientes: (clientes: ClienteType[]) => void;
  getClientes: (token:string) => Promise<void>;
};

const useClienteStore = create<ClienteStoreType & ClienteType>((set) => ({
  createAt: "",
  nome: "",
  email: "",
  cpf: "",
  telefone: "",
  endereco: "",
  clientes: [],
  setNome: (nome: string) => set({ nome }),
  setEmail: (email: string) => set({ email }),
  setCpf: (cpf: string) => set({ cpf }),
  setTelefone: (telefone: string) => set({ telefone }),
  setEndereco: (endereco: string) => set({ endereco }),
  setClientes: (clientes: ClienteType[]) => set((state) => ({
    clientes: [...state.clientes, ...clientes]
  })),
  getClientes: async (token: string) => {
    try {
      const resposta = await axios.get<ClienteType[]>('http://localhost:3333/clientes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      set({clientes: resposta.data})
    } catch (err) {
      console.error('Erro ao carregar clientes', err)
    }
  },
}));

export default useClienteStore;
