import http from "../http-common";
class ItemTagDataService {
  getAll() {
    return http.get("/itemTag/find");
  }
  getTagsByItem(itemId) {
    return http.get(`/itemTag/find/itemId/${itemId}`);
  }
  getItemsByTag(tagId) {
    return http.get(`/itemTag/find/tagId/${tagId}`);
  }
  create(data) {
    return http.post("/itemTag/create", data);
  }
  delete(id) {
    return http.delete(`/itemTag/delete/${id}`);
  }
}
export default new ItemTagDataService();