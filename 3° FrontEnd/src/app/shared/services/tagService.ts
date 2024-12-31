import api from "./_axiosConfig";

class TagService {
  path: string;

  constructor() {
    this.path = "tag"
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

  async getTag(id: number) {
    try{
      const result = await api.get(`${this.path}/${id}/`);
      return result?.data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }
}

export default new TagService();