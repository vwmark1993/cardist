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
  create(userId, itemId, message) {
    return http.post(`/comment/create/userId/${userId}/itemId/${itemId}/message/${message}`);
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
}
export default new CommentDataService();