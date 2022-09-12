import http from "../http-common";
class BannerDataService {
  getAll() {
    return http.get("/banner/find");
  }
  get(id) {
    return http.get(`/banner/find/bannerId/${id}`);
  }
  getSelectedBanner() {
    return http.get("/banner/find/selected");
  }
  create(data) {
    return http.post("/banner/create", data);
  }
  update(id, data) {
    return http.put(`/banner/update/${id}`, data);
  }
  delete(id) {
    return http.delete(`/banner/delete/${id}`);
  }
}
export default new BannerDataService();