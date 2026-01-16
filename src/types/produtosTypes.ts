export type Produto = {
  id?: string;
  nome?: string;
  descricao?: string;
  precoVenda?: number;
  precoCusto?: number;
  estoque?: number;
  usuarioId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProdutoFormType = Omit<Produto, "id" | "createdAt" | "updatedAt" | "usuarioId">;

export type ProdutoListType = Omit<Produto, "createdAt" | "updateAt" | "usuarioId">;
