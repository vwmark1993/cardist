import http from "../http-common";
class OrderDataService {
  getAll() {
    return http.get("/order/find");
  }
  getOrdersByBuyer(buyerId) {
    return http.get(`/order/find/buyerId/${buyerId}`);
  }
  create(data) {
    return http.post("/order/create", data);
  }
  delete(id) {
    return http.delete(`/order/delete/${id}`);
  }
  successfulOrder(sessionId) {
    return http.get(`/order/success/sessionId/${sessionId}`);
  }
}
export default new OrderDataService();