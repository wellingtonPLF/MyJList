import { Registry } from "../models/Registry";
import api from "./_axiosConfig";

class RegistryService {
  path: string;

  constructor() {
    this.path = "registry"
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

  async getRegistry(id: number) {
    try{
      const result = await api.get(`${this.path}/${id}/`);
      return result?.data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getRegistryByUserID(id: number) {
    try{
      const result = await api.get(`${this.path}/getRegistryByUserID/${id}/`);
      return result?.data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getRegistryByUserGame_ID(user_id: number, game_id: number) {
    try{
      const result = await api.post(`${this.path}/getRegistryByUserGame_ID/`, {user_id: user_id, game_id: game_id});
      return result?.data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async insert(registry: any) {
    try {
      const result = await api.post(`${this.path}/`, Registry.simpleRefract(registry));
      return result?.data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  } 

  async update(registry: any) {
    try{
      const result = await api.put(`${this.path}/${registry.id}/`, Registry.simpleRefract(registry));
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

export default new RegistryService();