import http from "../http-common";
class OrderItemDataService {
  create(orderId, itemId, sellerId, quantity, price) {
    return http.post(`/orderItem/create/orderId/${orderId}/itemId/${itemId}/sellerId/${sellerId}/quantity/${quantity}/price/${price}`);
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