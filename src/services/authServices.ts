import { CreateUserType, LoginUserType } from "../types/authTypes";
import api from "./api";

export const authServices = {
  Authentication: async (data: LoginUserType) => {
    const { data: res } = await api.post("/usuario/login", data);
    return res;
  },
  Creation: async (data: CreateUserType) => {
    const { data: res } = await api.post("/usuario", data);
    return res;
  },
};
