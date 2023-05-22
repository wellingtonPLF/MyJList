import axios from "axios";
import { User } from "../models/User";

class UsuarioService {
  localApi: any;
  serverApi: any;

  constructor () {
    this.localApi = axios.create({ baseURL: '/users'})
    //this.serverApi = axios.create({ baseURL: 'https://myserverApi.com/users'})
  }

  async listar () {
    const { data } = await this.localApi.get('/')
    return data
  }

  async inserir (usuario: User) {
    const { data } = await this.localApi.post('/', usuario)
    return data
  }

  async remover (id: number) {
    const { data } = await this.localApi.delete(`/${id}`)
    return data
  }

  async pesquisarPorId (id: number) {
    const { data } = await this.localApi.get(`/${id}`)
    return data
  }

  async atualizar (usuario: User) {
    const { data } = await this.localApi.put('/', usuario)
    return data
  }
}

export default new UsuarioService()
