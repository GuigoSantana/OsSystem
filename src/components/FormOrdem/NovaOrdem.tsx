import axios from "axios";
import useOrdemStore from "../../stores/useOrdemStore";
import ArrowSvg from "../../assets/FormSvgs/ArrowSvg";
import { useEffect, useState } from "react";
import DropdownInputs from "./DropdownInputs";

type novaOrdemType = {
  setIsCreate: (argument: boolean) => void;
};

function NovaOrdem({ setIsCreate }: novaOrdemType) {
  const {
    descricao,
    status,
    clienteId,
    produtos,
    servicos,
    setDescricao,
    adicionarProduto,
    adicionarServico,
  } = useOrdemStore();

  const handleSubmit = async () => {
    const ordem = { descricao, status, clienteId, produtos, servicos };

    // Aqui pode usar fetch ou axios
    await axios.post("http://localhost:3333/ordem", ordem);
  };
  const [ordens, setOrdens] = useState([]);
  console.log(ordens)
  useEffect(() => {
    const getOrdem = async () => {
      const ordens = await axios.get("http://localhost:3333/ordem");
      setOrdens(ordens.data);
    };
    getOrdem();
    return () => {};
  }, [setOrdens]);

  return (
    <div className="lg:w-[78%] w-[90%] pt-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Nova Ordem de Serviço</h1>
        <p>Preencha os dados para criar uma nova ordem de serviço</p>
      </header>
      <button
        onClick={() => setIsCreate(false)}
        className="flex items-center gap-2 mt-8  mb-6 border text-sm font-semibold border-zinc-200 px-4 py-2 rounded-lg"
      >
        <ArrowSvg />
        Voltar
      </button>
      <div>
        <div className={`flex flex-col border border-zinc-200`}>
          <DropdownInputs />
          <label htmlFor="descricao">Descrição</label>
          <textarea
            className="border border-zinc-200 rounded-md h-24"
            placeholder="Descrição detalhada da ordem de serviço"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <button
            className="border border-zinc-200 rounded-md"
            onClick={() => adicionarProduto({ produtoId: "p1" })}
          >
            + Produto p1
          </button>
          <button
            className="border rounded-md"
            onClick={() => adicionarServico({ servicoId: "s1" })}
          >
            + Serviço s1
          </button>

          <button className="border rounded-md" onClick={handleSubmit}>
            Criar Ordem
          </button>
        </div>
      </div>
    </div>
  );
}

export default NovaOrdem;
