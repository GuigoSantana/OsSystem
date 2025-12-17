export type LoginUserType = {
  email: string;
  senha: string;
};

export type CreateUserType = {
  nome?: string;
  email: string;
  cpf?: string;
  telefone?: string;
  senha: string;
  confSenha?: string;
};

export type TokenPayload = {
  exp: number;
};

