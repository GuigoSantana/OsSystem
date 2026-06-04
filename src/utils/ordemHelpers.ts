import { OrdemType, StatusOrdem } from "../types/ordensTypes";

export const STATUS_ORDEM_OPCOES: {
  value: StatusOrdem;
  label: string;
}[] = [
  { value: "PENDENTE", label: "Aberta" },
  { value: "EM_ANDAMENTO", label: "Em andamento" },
  { value: "CONCLUIDA", label: "Concluída" },
  { value: "CANCELADA", label: "Cancelada" },
];

export function getStatusLabel(status: StatusOrdem): string {
  return (
    STATUS_ORDEM_OPCOES.find((s) => s.value === status)?.label ?? status
  );
}

export function getStatusBadgeClass(status: StatusOrdem): string {
  switch (status) {
    case "PENDENTE":
      return "bg-blue-500";
    case "EM_ANDAMENTO":
      return "bg-amber-500";
    case "CONCLUIDA":
      return "bg-green-500";
    case "CANCELADA":
      return "bg-zinc-500";
    default:
      return "bg-blue-500";
  }
}

export function calcularTotalOrdem(ordem: OrdemType): number {
  const totalProdutos =
    ordem.produtos?.reduce(
      (acc, item) => acc + item.quantidade * item.precoUnitario,
      0
    ) ?? 0;
  const totalServicos =
    ordem.servicos?.reduce(
      (acc, item) => acc + item.quantidade * item.precoUnitario,
      0
    ) ?? 0;
  return totalProdutos + totalServicos;
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function ordemCorrespondeBusca(ordem: OrdemType, termo: string): boolean {
  const termoTexto = termo.trim().toLowerCase();
  if (!termoTexto) return true;

  const campos = [
    ordem.id,
    ordem.cliente?.nome,
    ordem.descricao,
    ordem.status,
    getStatusLabel(ordem.status),
    formatarMoeda(calcularTotalOrdem(ordem)),
    String(calcularTotalOrdem(ordem)),
  ];

  return campos.some((campo) =>
    (campo ?? "").toString().toLowerCase().includes(termoTexto)
  );
}
