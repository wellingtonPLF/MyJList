import api from "./_axiosConfig";

class TagService {
  path: string;

  constructor() {
    this.path = "tag"
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

  async getTag(id: number) {
    try{
      const { data } = await api.get(`${this.path}/${id}/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }
}

export default new TagService();