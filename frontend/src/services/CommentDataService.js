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
  getFlaggedComments() {
    return http.get("/comment/find/flaggedComments");
  }
  create(data) {
    return http.post("/comment/create", data);
  }
  update(id, data) {
    return http.put(`/comment/update/${id}`, data);
  }
  delete(id) {
    return http.delete(`/comment/delete/${id}`);
  }
}
export default new CommentDataService();