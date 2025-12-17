import {useState } from "react";
import ClienteList from "./ClienteList";
import ClienteForm from "./ClienteForm";

export type propsTypes = {
  setNovoCliente: React.Dispatch<React.SetStateAction<boolean>>;
  novoCliente: boolean;
};

function ClienteContainer() {
  const [novoCliente, setNovoCliente] = useState(false)
  
  return (
    novoCliente ? 
      <ClienteForm setNovoCliente={setNovoCliente} novoCliente={novoCliente} />
      :
      <ClienteList setNovoCliente={setNovoCliente} novoCliente={novoCliente} />
  )
}

export default ClienteContainer;
