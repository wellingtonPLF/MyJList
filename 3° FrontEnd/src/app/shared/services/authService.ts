import { Auth } from "../models/Auth";
import api from "./_axiosConfig";

class AuthService {
  path: string;

  constructor() {
    this.path = "auth"
  }

  async authentication(auth: Auth) {
    try{
      const { data } = await api.post(`${this.path}/authentication/`, Auth.refract(auth));
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async isLoggedIn() {
    try{
      const { data } = await api.get(`${this.path}/isLoggedIn/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async authInsert(auth: Auth) {
    try{
      const { data } = await api.post(`${this.path}/`, Auth.refract(auth));
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async authUpdate(auth: Auth) {
    try{
      const { data } = await api.post(`${this.path}/`, Auth.refract(auth));
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async acceptAuth(auth: Auth) {
    try{
      const { data } = await api.post(`${this.path}/acceptAuth/`, Auth.refract(auth));
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async limitSize() {
    try{
      const result = await api.get(`${this.path}/limitSize/`);
      return result?.data;   
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async refreshToken() {
    try{
      const { data } = await api.get(`${this.path}/refresh/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async testando() {
    try{
      const { data } = await api.get(`${this.path}/testando/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async logOut() {
    try{
      const { data } = await api.get(`${this.path}/logout/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }
}

export default new AuthService();