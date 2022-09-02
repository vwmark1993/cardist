import http from "../http-common";
class OrderItemDataService {
  create(data) {
    return http.post("/orderItem/create", data);
  }
  getOrderItems(orderId) {
    return http.get(`/orderItem/find/orderId/${orderId}`);
  }
  getOrderItemsBySeller(sellerId) {
    return http.get(`/orderItem/find/sellerId/${sellerId}`);
  }
  delete(id) {
    return http.delete(`/orderItem/delete/${id}`);
  }
}
export default new OrderItemDataService();