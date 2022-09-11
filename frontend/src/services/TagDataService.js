import http from "../http-common";
class TagDataService {
  getAll() {
    return http.get("/tag/find");
  }
  get(id) {
    return http.get(`/tag/find/tagId/${id}`);
  }
  create(data) {
    return http.post("/tag/create", data);
  }
  delete(id) {
    return http.delete(`/tag/delete/${id}`);
  }
}
export default new TagDataService();