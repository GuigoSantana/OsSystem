import { useState } from "react";
import ServicoList from "./ServicoList";
import ServicoForm from "./ServicoForm";

export type novoServicoType = {
  setNovoServico: React.Dispatch<React.SetStateAction<boolean>>;
  novoServico: boolean;
};

function ServicoContainer() {
  const [novoServico, setNovoServico] = useState(false);

  return novoServico ? (
    <ServicoForm novoServico={novoServico} setNovoServico={setNovoServico} />
  ) : (
    <ServicoList novoServico={novoServico} setNovoServico={setNovoServico} />
  );
}

export default ServicoContainer;
