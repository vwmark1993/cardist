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
  update(data) {
    return http.put("/cartItem/update", data);
  }
  delete(data) {
    return http.delete("/cartItem/delete", data);
  }
}
export default new CartItemDataService();