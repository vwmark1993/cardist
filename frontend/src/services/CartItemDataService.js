import http from "../http-common";
class CartItemDataService {
  getAll() {
    return http.get("/cartItem/find");
  }
  getCartItems(cartId) {
    return http.get(`/cartItem/find/cartId/${cartId}`);
  }
  create(data) {
    return http.post("/cartItem/create", data);
  }
  update(id, data) {
    return http.put(`/cartItem/update/${id}`, data);
  }
  delete(id) {
    return http.delete(`/cartItem/delete/${id}`);
  }
}
export default new CartItemDataService();