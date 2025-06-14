import React from "react"

function FormLogin() {
  const [signUp, setSignUp] = React.useState(false)

  const handlePriventDefault = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
      nome?: HTMLInputElement
      email: HTMLInputElement
      senha: HTMLInputElement
      confSenha?: HTMLInputElement
    }
    const loginData = signUp ?
      {
        name: formElements.nome!.value,
        email: formElements.email.value,
        password: formElements.senha.value,
        passwordConf: formElements.confSenha!.value,
      } :
      {
        
        email: formElements.email.value,
        password: formElements.senha.value,
      }
    return loginData
  }

  return (
    <div className="w-[440px] text-sm mt-6">
      <h1 className="text-3xl font-black mb-2">{signUp ? 'Crie sua conta' : 'Entre na sua conta'}</h1>
      <p className="mb-8">Ou <span onClick={() => setSignUp(!signUp)} className="font-semibold cursor-pointer">{signUp ? 'faça login' : 'crie uma nova conta'}</span></p>
      <form onSubmit={handlePriventDefault} className="flex flex-col gap-2 text-left">
      {signUp && 
      <>  
        <label htmlFor="nome" className="font-semibold">Nome</label>
        <input type="text" name="nome" id="nome" placeholder="seu mome completo" required className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"/>
      </>
      }
      <label htmlFor="email" className="font-semibold mt-6">E-mail</label>
      <input type="text" name="email" id="email" placeholder="seu@email.com" required className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"/>
      <label htmlFor="senha" className="font-semibold mt-6">Senha</label>
      <input type="password" name="senha" id="senha" placeholder="******" required className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"/>
      {signUp && 
      <>  
        <label htmlFor="confSenha" className="font-semibold mt-6">Confirmar Senha</label>
        <input type="password" name="confSenha" id="confSenha" placeholder="******" required className="p-[8px] rounded-lg border-1 border-gray-200 bg-white"/>
      </>
      }
      <button className="mt-4 bg-zinc-900 text-white font-semibold p-[10px] border-0 rounded-lg cursor-pointer hover:bg-zinc-800">Entrar</button>
    </form>
    </div>
  )
}

export default FormLogin