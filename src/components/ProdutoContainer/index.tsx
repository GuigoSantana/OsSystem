import React, { useState } from "react";
import ProdutoList from "./ProdutoList";
import ProdutoForm from "./ProdutoForm";

export type novoProdutoType = {
  novoProduto: boolean;
  setNovoProduto: React.Dispatch<React.SetStateAction<boolean>>;
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
