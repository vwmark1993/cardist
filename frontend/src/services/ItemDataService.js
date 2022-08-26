import http from "../http-common";
class ItemDataService {
  get(id) {
    return http.get(`/item/find/itemId/${id}`);
  }
  searchAll() {
    return http.get("/item/find");
  }
  searchByName(searchString) {
    return http.get(`/item/find/searchString/${searchString}`);
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
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}
export default new ItemDataService();