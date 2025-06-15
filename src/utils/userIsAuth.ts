import axios from "axios"

type loginType = {
    email: string;
    senha: string;
}

export const usuarioAuthentication = async (data: loginType) => {
const dataUsuarioAuthentication = await axios.post("http://localhost:3333/usuario/login", data)
const token = dataUsuarioAuthentication.data.usuario.token
localStorage.setItem("token", token)
return dataUsuarioAuthentication
}
