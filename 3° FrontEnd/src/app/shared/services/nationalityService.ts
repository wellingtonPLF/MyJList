import api from "./_axiosConfig";

class NationalityService {
  path: string;

  constructor() {
    this.path = "nationality"
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

  async getNatiolality(id: number) {
    try{
      const result = await api.get(`${this.path}/${id}/`);
      return result?.data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }
}

export default new NationalityService();