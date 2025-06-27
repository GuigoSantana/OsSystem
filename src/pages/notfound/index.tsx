import { Link } from "react-router-dom";

function NoPage() {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
        <p className="text-3xl">PÁGINA NÃO ENCONTRADA</p>
        <Link to="/login" className="border p-2 rounded-lg"> Voltar para pagina de login </Link>
      </div>
    </>
  );
}

export default NoPage;
