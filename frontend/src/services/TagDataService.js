import http from "../http-common";
class TagDataService {
  getAll() {
    return http.get("/tag/find");
  }
  get(id) {
    return http.get(`/tag/find/tagId/${id}`);
  }
  create(name) {
    return http.post(`/tag/create/name/${name}`);
  }
  delete(id) {
    return http.delete(`/tag/delete/${id}`);
  }
}
export default new TagDataService();