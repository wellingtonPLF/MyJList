import api from "./_axiosConfig";

class NationalityService {
  path: string;

  constructor() {
    this.path = "nationality"
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

  async getNatiolality(id: number) {
    try{
      const { data } = await api.get(`${this.path}/${id}`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }
}

export default new NationalityService();