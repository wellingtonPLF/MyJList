import { User } from "../models/User";
import api from "./_axiosConfig";

class UserService {
  path: string;

  constructor() {
    this.path = "user"
  }

  async listAll() {
    try{
      const result = await api.get(`${this.path}/`);
      return result?.data; 
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getUser(id: number) {
    try{
      const result = await api.get(`${this.path}/${id}/`);
      return result?.data; 
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async searchUser(nickname: string) {
    try{
      const result = await api.post(`${this.path}/searchUser/`, nickname);
      return result?.data; 
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getAuthenticatedUser() {
    try{
      const result = await api.get(`${this.path}/getUser/`);
      return result?.data; 
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async insert(user: User) {
    try{
      const result = await api.post(`${this.path}/`, User.simpleRefract(user));
      return result?.data; 
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  } 

  async update(user: User) {
    try{
      const result = await api.put(`${this.path}/${user.id}/`, User.simpleRefract(user));
      return result?.data; 
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async delete(id: number) {
    try{
      const result = await api.delete(`${this.path}/${id}/`);
      return result?.data; 
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

}

export default new UserService();