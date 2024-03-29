import http from "../http-common";
class OrderItemDataService {
  create(data) {
    return http.post("/orderItem/create", data);
  }
  get(id) {
    return http.get(`/orderItem/find/orderItemId/${id}`);
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
  getTopSellersByYear(year) {
    return http.get(`/orderItem/find/topSellersByYear/${year}`);
  }
  getTopBuyersByYear(year) {
    return http.get(`/orderItem/find/topBuyersByYear/${year}`);
  }
  delete(id) {
    return http.delete(`/orderItem/delete/${id}`);
  }
}
export default new OrderItemDataService();