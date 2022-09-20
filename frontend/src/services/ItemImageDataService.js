import http from "../http-common";
class ItemImageDataService {
  getAll() {
    return http.get("/itemImage/find");
  }
  getItemImages(itemId) {
    return http.get(`/itemImage/find/itemId/${itemId}`);
  }
  create(data) {
    return http.post("/itemImage/create", data);
  }
  delete(id) {
    return http.delete(`/itemImage/delete/${id}`);
  }
}
export default new ItemImageDataService();