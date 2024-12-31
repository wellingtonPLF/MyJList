import api from "./_axiosConfig";

class GameService {
  path: string;

  constructor() {
    this.path = "game"
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

  async listGames(id: number) {
    try{
      const result = await api.get(`${this.path}/listGames/${id}/`);
      return result?.data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async searchGame(gameName: string) {
    try{
      const result = await api.post(`${this.path}/searchGame/`, gameName);
      return result?.data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getFilterData() {
    try{
      const result = await api.get(`${this.path}/getFilterData/`);
      return result?.data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getGameSize() {
    try{
      const result = await api.get(`${this.path}/getGameSize/`);
      return result?.data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getMostRecommended() {
    try{
      const { data }  = await api.get(`${this.path}/getMostRecommended/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getAiring() {
    try{
      const result = await api.get(`${this.path}/getAiring/`);
      return result?.data; 
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
      const result = await api.get(`${this.path}/getReleases/`);
      return result?.data;    
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async getGame(id: number) {
    try{
      const result = await api.get(`${this.path}/${id}/`);
      return result?.data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }
}

export default new GameService();