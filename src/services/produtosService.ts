import { ProdutoFormType, ProdutoListType } from "../types/produtosTypes";
import api from "./api";

export const produtosService = {
  getProdutos: async () => {
    const res = await api.get<ProdutoListType[]>(`/produtos`);
    return res;
  },
  createProduto: async (data: ProdutoFormType) => {
    const res = await api.post(`/produtos`, data);
    return res;
  },
  deleteProduto: async (id: string) => {
    const res = await api.delete(`/produtos/${id}`);
    return res;
  },
  updateProduto: async (id: string, data: ProdutoListType) => {
    const res = await api.put(`/produtos/${id}`, data);
    console.log(res);
    return res;
  },
};
