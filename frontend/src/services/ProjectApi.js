import axios from "axios";

const PROJECT_URL = "/project/api/v1";

class ProjectApi {
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


  // LIST
  getProjects() {
    return this.api.get(`${PROJECT_URL}/list`);
  }

    // CREATE
    createProject(projectDto) {
      return this.api.post(`${PROJECT_URL}/create`, projectDto);
    }


    deleteProject(id) {
      return this.api.delete(`${PROJECT_URL}/delete/${id}`);
    }

}

export default new ProjectApi();
