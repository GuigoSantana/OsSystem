import { useState } from "react";
import OrdemList from "./OrdemList";
import OrdemForm from "./OrdemForm";

export type novaOrdemType = {
  setNovaOrdem: React.Dispatch<React.SetStateAction<boolean>>;
  novaOrdem: boolean;
};

function OrdemContainer() {
  const [novaOrdem, setNovaOrdem] = useState(false);

  return novaOrdem ? (
    <OrdemForm novaOrdem={novaOrdem} setNovaOrdem={setNovaOrdem} />
  ) : (
    <OrdemList novaOrdem={novaOrdem} setNovaOrdem={setNovaOrdem} />
  );
}

export default OrdemContainer;
