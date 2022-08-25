import http from "../http-common";
class TagDataService {
  getAll() {
    return http.get("/tag/find");
  }
  getUserCart(userId) {
    return http.get(`/tag/find/userId/${userId}`);
  }
  create(name) {
    return http.post(`/tag/name/${name}`);
  }
  update(id, name) {
    return http.put(`/tag/tagId/${id}/name/${name}`);
  }
  delete(id) {
    return http.delete(`/tag/delete/${id}`);
  }
  deleteAll() {
    return http.delete(`/tutorials`);
  }
}
export default new TagDataService();