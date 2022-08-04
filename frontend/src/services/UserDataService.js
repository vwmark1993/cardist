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
  deleteAll() {
    return http.delete(`/tutorials`);
  }
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}
export default new UserDataService();