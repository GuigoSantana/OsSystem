import { ServicoFormType, ServicoListType } from "../types/servicosTypes";
import api from "./api";

export const servicosService = {
  getServicos: async () => {
    const res = await api.get<ServicoListType[]>("/servicos");
    return res;
  },
  createServico: async (data: ServicoFormType) => {
    const res = await api.post("/servicos", data);
    return res;
  },
  updateServico: async (id: string, data: Partial<ServicoListType>) => {
    const res = await api.put(`/servicos/${id}`, data);
    return res;
  },
  deleteServico: async (id: string) => {
    const res = await api.delete(`/servicos/${id}`);
    return res;
  },
};
