import React, { useState } from "react";
import ProdutoList from "./ProdutoList";
import ProdutoForm from "./ProdutoForm";

export type novoProdutoType = {
  setNovoProduto: React.Dispatch<React.SetStateAction<boolean>>;
  novoProduto: boolean;
};
function FormProduto() {
  const [novoProduto, setNovoProduto] = useState(false);
  return novoProduto ? (
    <ProdutoForm novoProduto={novoProduto} setNovoProduto={setNovoProduto} />
  ) : (
    <ProdutoList novoProduto={novoProduto} setNovoProduto={setNovoProduto} />
  );
}

export default FormProduto;
