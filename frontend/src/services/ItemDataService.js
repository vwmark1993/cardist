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
    return http.post("/item/create", data);
  }
  update(id, data) {
    return http.put(`/item/update/${id}`, data);
  }
  delete(id) {
    return http.delete(`/item/delete/${id}`);
  }
}
export default new ItemDataService();