import { ClienteType } from "../types/clientesTypes";
import api from "./api";

export const clientesServices = {
  getClientes: async (usuarioId: string) => {
    const res = await api.get<ClienteType[]>(`/clientes/${usuarioId}`);
    console.log(res)
    return res
  },
};
