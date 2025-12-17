import useToastStore from "../../stores/useToastStore";

function Toast() {
    const { isOpen, mensagem, tipo, closeToast } = useToastStore();

    if(!isOpen) return null;

    const corFundo = tipo === "sucesso" ? "bg-green-500" : "bg-red-500";

    return (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded shadow-lg text-white ${corFundo} transition-all`}>
            <div className="flex items-center gap-3">
                <span>{mensagem}</span>
                <button onClick={closeToast} className="font-bold hover:text-gray-200">X</button>
            </div>
        </div>
    )
}

export default Toast;