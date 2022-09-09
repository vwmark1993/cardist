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
  getTotalSalesRevenueByYear(year) {
    return http.get(`/orderItem/find/totalSalesRevenueByYear/${year}`);
  }
  getUnitsSoldByYear(year) {
    return http.get(`/orderItem/find/unitsSoldByYear/${year}`);
  }
  getMonthlySalesRevenueByYear(year) {
    return http.get(`/orderItem/find/monthlySalesRevenueByYear/${year}`);
  }
  getTopSellers(size) {
    return http.get(`/orderItem/find/topSellers/${size}`);
  }
  delete(id) {
    return http.delete(`/orderItem/delete/${id}`);
  }
}
export default new OrderItemDataService();