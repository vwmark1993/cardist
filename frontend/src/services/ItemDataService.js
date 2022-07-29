import http from "../http-common";
class ItemDataService {
  getAll() {
    return http.get("/item/find");
  }
  get(id) {
    return http.get(`/item/find/itemId/${id}`);
  }
  getItemsBySeller(sellerId) {
    return http.get(`/item/find/sellerId/${sellerId}`);
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
export default new ItemDataService();