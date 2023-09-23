import api from "./_axiosConfig";

class RegistryService {
  path: string;

  constructor() {
    this.path = "registry"
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

  async getRegistry(id: number) {
    try{
      const { data } = await api.get(`${this.path}/${id}`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

//   async insert(user: any) {
//     try{
//       const { data } = await api.post(`${this.path}/`, User.simpleRefract(user));
//       return data;
//     }
//     catch(error: any) {
//       return Promise.reject(error);
//     }
//   } 

  async update(registry: any) {
    try{
      const { data } = await api.put(`${this.path}/`, registry);
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

export default new RegistryService();