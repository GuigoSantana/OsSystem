export type ClienteType = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: string;
  usuarioId: string;
  createdAt: string;
  updatedAt: string;
};

export type ClienteFormType = Omit<ClienteType, "usuarioId" | "id" | 'createdAt' | 'updatedAt' >;

export type ClienteListType = Omit<ClienteType, | 'updateAt' | 'usuarioId' >;
