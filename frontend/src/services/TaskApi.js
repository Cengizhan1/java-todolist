import axios from "axios";

const TASK_URL = "/task/api/v1";
const USER_URL = "http://localhost:3000/api/v1/auth";

class TaskApi {
  constructor() {
    // Access token'ı localStorage'dan alın
    const accessToken = localStorage.getItem("accessToken");

    // Axios instance oluştur ve interceptor ekle
    this.api = axios.create({
      baseURL: "http://localhost:3000", // API sunucunuzun URL'sini buraya ekleyin
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "", // Access token'ı ekle (varsa)
        "Content-Type": "application/json",
      },
    });

    // Response interceptor ile token refresh veya oturum sonlandırma işlemleri yapabilirsiniz
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // CREATE
  taskApiCreate(taskDto) {
    return this.api.post(`${TASK_URL}/create`, taskDto);
  }

  // LIST
  taskApiList(projectId) {
    return this.api.get(`${TASK_URL}/list/${projectId}`);
  }

  // FIND
  taskApiFindById(id) {
    return this.api.get(`${TASK_URL}/find/${id}`);
  }

  // UPDATE
  taskApiUpdate(id, taskDto) {
    console.log(taskDto);
    return this.api.put(`${TASK_URL}/update/${id}`, taskDto);
  }

  // DELETE BY ID
  taskApiDeleteById(id) {
    return this.api.delete(`${TASK_URL}/delete/${id}`);
  }

  // DELETE All
  taskApiDeleteAll() {
    return this.api.post(`${TASK_URL}/all/delete`);
  }

  // DELETE All
  taskApiDeleteDone() {
    return this.api.post(`${TASK_URL}/done/delete`);
  }

  // KAYIT (REGISTER)
  register(userDto) {
    return axios.post(`${USER_URL}/register`, userDto);
  }

  // OTURUM AÇ (AUTHENTICATE)
  authenticate(authRequest) {
    return axios.post(`${USER_URL}/authenticate`, authRequest);
  }
}

export default new TaskApi();
