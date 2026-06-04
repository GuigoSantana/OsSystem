import { ClienteListType } from "./clientesTypes";
import { ProdutoListType } from "./produtosTypes";
import { ServicoListType } from "./servicosTypes";

export type StatusOrdem =
  | "PENDENTE"
  | "EM_ANDAMENTO"
  | "CONCLUIDA"
  | "CANCELADA";

export type OrdemProdutoItem = {
  ordemId: string;
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
  produto?: ProdutoListType;
};

export type OrdemServicoItem = {
  ordemId: string;
  servicoId: string;
  quantidade: number;
  precoUnitario: number;
  servico?: ServicoListType;
};

export type OrdemType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  descricao: string | null;
  status: StatusOrdem;
  clienteId: string;
  cliente: ClienteListType;
  produtos: OrdemProdutoItem[];
  servicos: OrdemServicoItem[];
};

export type OrdemFormPayload = {
  descricao?: string;
  status: StatusOrdem;
  clienteId: string;
  produtos: { produtoId: string; quantidade: number }[];
  servicos: { servicoId: string; quantidade: number }[];
};

export type OrdemEditFormType = {
  status: StatusOrdem;
  descricao: string;
};

export type OrdemDraftProduto = {
  produtoId: string;
  quantidade: number;
  nome: string;
  precoUnitario: number;
};

export type OrdemDraftServico = {
  servicoId: string;
  quantidade: number;
  nome: string;
  precoUnitario: number;
};
