import api from "./_axiosConfig";

interface Comment {
    id: number
}

class CommentService {
  path: string;

  constructor() {
    this.path = "comment"
  }

  async getCommentByGameID(id: number) {
    try{
      const { data } = await api.get(`${this.path}/getCommentByGame/${id}/`);
      return data;
    }
    catch(error: any) {
      return Promise.reject(error);
    }
  } 

  // async insert(comment: Comment) {
  //   try{
  //     const { data } = await api.post(`${this.path}/`, Comment.simpleRefract(Comment));
  //     return data;
  //   }
  //   catch(error: any) {
  //     return Promise.reject(error);
  //   }
  // } 

  async update(comment: Comment) {
    try{
      const { data } = await api.put(`${this.path}/`, comment);
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

export default new CommentService();