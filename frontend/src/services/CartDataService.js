import http from "../http-common";
class CartDataService {
  getAll() {
    return http.get("/cart/find");
  }
  getUserCart(userId) {
    return http.get(`/cart/find/userId/${userId}`);
  }
  create(data) {
    return http.post("/cart/create", data);
  }
  update(id, data) {
    return http.put(`/cart/update/${id}`, data);
  }
  delete(id) {
    return http.delete(`/cart/delete/${id}`);
  }
  checkout(data) {
    return http.post("/cart/create-checkout-session", data);
  }
}
export default new CartDataService();