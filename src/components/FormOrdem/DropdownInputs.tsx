import { useEffect, useState } from "react";
import useOrdemStore from "../../stores/useOrdemStore";

function DropdownInputs() {
  const {
    setStatus,
    setClienteId,

  } = useOrdemStore();
  const [clientes, ] = useState([
    { id: 1, nome: "Rodrigo" },
    { id: 2, nome: "Luana" },
    { id: 3, nome: "Pedro" },
  ]);
  const [showStatus, ] = useState([
    { id: 1, status: "PENDENTE", label:'Aberta'},
    { id: 2, status: "EM_ANDAMENTO", label: 'Em Andamento' },
    { id: 3, status: "CONCLUIDA", label: 'Concluída' },
    { id: 4, status: "CANCELADA", label: 'Cancelada' },
  ]);
  const [clienteSelected, setClienteSelected] = useState("");
  const [statusSelected, setStatusSelected] = useState("");
  const handleChangeCliente = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClienteSelected(e.target.value);
  };
  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusSelected(e.target.value);
  };
  useEffect(() => {
    setClienteId(clienteSelected)
  }, [setClienteId, clienteSelected])
  useEffect(() => {
    setStatus(statusSelected)
  }, [setStatus, statusSelected])
  return (
    <div className="flex justify-between">
      <div>
        <label htmlFor="cliente">Cliente</label>
        <select value={clienteSelected} onChange={(e) =>handleChangeCliente(e)}>
          <option value="" disabled hidden>
            Selecione um cliente
          </option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select value={statusSelected} onChange={handleChangeStatus}>
          {showStatus.map((status) => (
            <option key={status.id} value={status.id}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DropdownInputs;
