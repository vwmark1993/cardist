import http from "../http-common";
class CartDataService {
  getAll() {
    return http.get("/cart/find");
  }
  getUserCart(userId) {
    return http.get(`/cart/find/userId/${userId}`);
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
  checkout(data) {
    return http.post("/cart/create-checkout-session", data);
  }
}
export default new CartDataService();