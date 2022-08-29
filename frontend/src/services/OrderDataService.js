import http from "../http-common";
class OrderDataService {
  getAll() {
    return http.get("/order/find");
  }
  getOrdersByBuyer(buyerId) {
    return http.get(`/order/find/buyerId/${buyerId}`);
  }
  create(buyerId) {
    return http.post(`/order/create/buyerId/${buyerId}`);
  }
  update(quantity, id) {
    return http.put(`/order/update/${quantity}/${id}`);
  }
  delete(id) {
    return http.delete(`/order/delete/${id}`);
  }
  successfulOrder(sessionId) {
    return http.get(`/order/success/sessionId/${sessionId}`);
  }
}
export default new OrderDataService();