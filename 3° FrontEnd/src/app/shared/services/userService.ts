import { User } from "../models/User";
import api from "./_axiosConfig";

class UserService {
  path: string;

  constructor() {
    this.path = "user"
  }

  async listAll() {
    try{
      const { data } = await api.get(`${this.path}/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getUser(id: number) {
    try{
      const { data } = await api.get(`${this.path}/${id}`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getAuthenticatedUser() {
    try{
      const { data } = await api.get(`${this.path}/getUser/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async insert(user: User) {
    try{
      const { data } = await api.post(`${this.path}/`, User.simpleRefract(user));
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  } 

  async update(user: User) {
    try{
      const { data } = await api.put(`${this.path}/`, user);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async delete(id: number) {
    try{
      const { data } = await api.delete(`${this.path}/${id}/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

}

export default new UserService();