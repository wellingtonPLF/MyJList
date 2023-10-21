import api from "./_axiosConfig";

class GameService {
  path: string;

  constructor() {
    this.path = "game"
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

  async searchGame(gameName: string) {
    try{
      const { data } = await api.post(`${this.path}/searchGame/`, gameName);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getFilterData() {
    try{
      const { data } = await api.get(`${this.path}/getFilterData/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getMostRecommended() {
    try{
      const { data } = await api.get(`${this.path}/getMostRecommended/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getAiring() {
    try{
      const { data } = await api.get(`${this.path}/getAiring/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getTopRated() {
    try{
      const { data } = await api.get(`${this.path}/getTopRated/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getReleases() {
    try{
      const { data } = await api.get(`${this.path}/getReleases/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getGame(id: number) {
    try{
      const { data } = await api.get(`${this.path}/${id}/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }
}

export default new GameService();