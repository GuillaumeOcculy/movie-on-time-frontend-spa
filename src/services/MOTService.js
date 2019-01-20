import axios from "axios";

const baseUrl = "http://localhost:3000/api";
// const baseUrl = "https://movieontime.com/api";

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getNowShowing() {
    return apiClient.get("/");
  },
  getMovie(id) {
    return apiClient.get("/movies/" + id);
  },
  getPremiere() {
    return apiClient.get("/premiere");
  },
  getUpcoming() {
    return apiClient.get("/upcoming");
  },
  getReprojection() {
    return apiClient.get("/reprojection");
  },
  getShowtime(id) {
    return apiClient.get("/showtimes/" + id);
  }
};
