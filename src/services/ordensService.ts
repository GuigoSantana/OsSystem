import { OrdemFormPayload, OrdemType, StatusOrdem } from "../types/ordensTypes";
import api from "./api";

export const ordensService = {
  getOrdens: async () => api.get<OrdemType[]>("/ordens"),
  getOrdemById: async (id: string) => api.get<OrdemType>(`/ordens/${id}`),
  createOrdem: async (data: OrdemFormPayload) => api.post<OrdemType>("/ordens", data),
  updateOrdem: async (
    id: string,
    data: { status?: StatusOrdem; descricao?: string }
  ) => api.put<OrdemType>(`/ordens/${id}`, data),
  deleteOrdem: async (id: string) => api.delete(`/ordens/${id}`),
};
