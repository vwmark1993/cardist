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
    return http.post("/comment/create", data);
  }
  update(id, data) {
    return http.put("/comment/update", data);
  }
  delete(data) {
    return http.delete("/comment/delete", data);
  }
}
export default new CommentDataService();