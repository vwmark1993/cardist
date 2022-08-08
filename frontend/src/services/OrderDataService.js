import http from "../http-common";
class OrderDataService {
  getAll() {
    return http.get("/order/find");
  }
  getOrdersBySeller(sellerId) {
    return http.get(`/order/find/sellerId/${sellerId}`);
  }
  getOrdersByBuyer(buyerId) {
    return http.get(`/order/find/buyerId/${buyerId}`);
  }
  create(buyerId, sellerId, itemId, quantity, price) {
    return http.post(`/order/create/buyerId/${buyerId}/sellerId/${sellerId}/itemId/${itemId}/quantity/${quantity}/price/${price}`);
  }
  update(quantity, id) {
    return http.put(`/order/update/${quantity}/${id}`);
  }
  delete(id) {
    return http.delete(`/order/delete/${id}`);
  }
  deleteAll() {
    return http.delete(`/tutorials`);
  }
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}
export default new OrderDataService();