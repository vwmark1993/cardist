import http from "../http-common";
class UserDataService {
  getAll() {
    return http.get("/user/find");
  }
  get(id) {
    return http.get(`/user/find/${id}`);
  }
  create(username, password, email, phone) {
    return http.post(`/user/create/username/${username}/password/${password}/email/${email}/phone/${phone}`);
  }
  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }
  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }
  authenticate(username, password) {
    return http.post(`/user/authenticate/username/${username}/password/${password}`);
  }
}
export default new UserDataService();