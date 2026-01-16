import { ClienteFormType, ClienteListType } from "../types/clientesTypes";
import { ProdutoListType } from "../types/produtosTypes";
import api from "./api";

export const clientesServices = {
  getClientes: async () => {
    const res = await api.get<ClienteListType[]>(`/clientes`);
    return res;
  },
  createCliente: async (data: ClienteFormType) => {
    const res = await api.post<ClienteFormType>(`/clientes`, data);
    return res;
  },
  updateCliente: async (id: string, data: ProdutoListType) => {
    const res = await api.put(`/clientes/${id}`, data);
    return res;
  },
  deleteCliente: async (id: string) => {
    const res = await api.delete(`/clientes/${id}`);
    return res;
  },
};
