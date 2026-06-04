export type ServicoType = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  usuarioId: string;
};

export type ServicoFormType = Omit<ServicoType, "id" | "usuarioId">;

export type ServicoListType = Omit<ServicoType, "usuarioId">;
