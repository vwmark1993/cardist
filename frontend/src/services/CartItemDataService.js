import http from "../http-common";
class CartItemDataService {
  getAll() {
    return http.get("/cartItem/find");
  }
  getCartItems(cartId) {
    return http.get(`/cartItem/find/cartId/${cartId}`);
  }
  create(itemId, cartId, price) {
    return http.post(`/cartItem/create/itemId/${itemId}/cartId/${cartId}/price/${price}`);
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
export default new CartItemDataService();