import http from "../http-common";
class UserDataService {
  getAll() {
    return http.get("/user/find");
  }
  get(id) {
    return http.get(`/user/find/userId/${id}`);
  }
  create(data) {
    return http.post("/user/create", data);
  }
  update(id, data) {
    return http.put(`/user/update/${id}`, data);
  }
  delete(id) {
    return http.delete(`/user/delete/${id}`);
  }
  changePassword(id, data) {
    return http.put(`/user/changePassword/${id}`, data);
  }
  authenticate(data) {
    return http.post("/user/authenticate", data);
  }
}
export default new UserDataService();