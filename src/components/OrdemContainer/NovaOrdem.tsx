import axios from "axios";
import useOrdemStore from "../../stores/useOrdemStore";
import ArrowSvg from "../../assets/FormSvgs/ArrowSvg";
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
    await axios.post("http://localhost:3333/ordem", ordem);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full xl:w-[80%] flex flex-col item-center">
          <header className="flex flex-wrap justify-between w-full gap-4 px-8 py-8">
            <div>
              <h1 className="text-3xl font-bold">Nova Ordem de Serviço</h1>
              <p className="text-gray-500 mt-2">
                Preencha os dados para criar uma nova ordem de serviço
              </p>
            </div>
            <button
              onClick={() => setIsCreate(false)}
              className="cursor-pointer flex items-center gap-2 py-2 px-3 h-9 rounded-sm text-sm font-semibold text-white bg-[#262E3F]"
            >
              <ArrowSvg />
              Voltar
            </button>
          </header>

          <div className="flex flex-col flex-wrap justify-between w-full gap-4 px-8 py-8">
            <div className="flex flex-col flex-wrap justify-between w-full border-zinc-200 border rounded-md p-2">
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
      </div>
    </>
  );
}

export default NovaOrdem;
