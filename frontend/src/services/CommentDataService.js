import http from "../http-common";
class CommentDataService {
  getAll() {
    return http.get("/comment/find");
  }
  getCommentsByItem(itemId) {
    return http.get(`/comment/find/itemId/${itemId}`);
  }
  getCommentsByUser(userId) {
    return http.get(`/comment/find/userId/${userId}`);
  }
  create(data) {
    return http.post("/tutorials", data);
  }
  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }
  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }
  deleteAll() {
    return http.delete(`/tutorials`);
  }
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}
export default new CommentDataService();