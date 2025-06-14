import axios from "axios"

export const userIsAuth = async ({email, senha, jwt}) => {
const userIsAuthReq = await axios.post("http://localhost:3333/user")
}
