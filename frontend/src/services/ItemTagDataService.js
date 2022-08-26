import http from "../http-common";
class ItemTagDataService {
  getAll() {
    return http.get("/itemTag/find");
  }
  getItemTags(itemId) {
    return http.get(`/itemTag/find/itemId/${itemId}`);
  }
  create(itemId, tagId) {
    return http.post(`/itemTag/create/itemId/${itemId}/tagId/${tagId}`);
  }
  delete(id) {
    return http.delete(`/itemTag/delete/${id}`);
  }
}
export default new ItemTagDataService();