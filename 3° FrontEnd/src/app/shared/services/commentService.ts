import { Comment } from "../models/Comment";
import api from "./_axiosConfig";

class CommentService {
  path: string;

  constructor() {
    this.path = "comment"
  }

  async getCommentByGameID(obj: any) {
    try{
      const { data } = await api.post(`${this.path}/getCommentByGame/`, obj);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  } 

  async getCommentSize(id: any) {
    try{
      const result = await api.get(`${this.path}/getCommentSize/${id}/`);
      return result?.data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  }

  async insert(comment: Comment) {
    try{
      const result = await api.post(`${this.path}/`, Comment.simpleRefract(comment));
      return result?.data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  } 

  async update(comment: Comment) {
    try{
      const result = await api.put(`${this.path}/`, comment);
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

export default new CommentService();
