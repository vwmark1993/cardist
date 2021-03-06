import http from "../http-common";
class CartItemDataService {
  getAll() {
    return http.get("/cartItem/find");
  }
  getCartItems(cartId) {
    return http.get(`/cartItem/find/cartId/${cartId}`);
  }
  create(itemId, cartId) {
    return http.post(`/cartItem/create/itemId/${itemId}/cartId/${cartId}`);
  }
  update(quantity, id) {
    return http.put(`/cartItem/update/${quantity}/${id}`);
  }
  delete(id) {
    return http.delete(`/cartItem/delete/${id}`);
  }
  deleteAll() {
    return http.delete(`/tutorials`);
  }
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}
export default new CartItemDataService();