import axios from "axios";

const baseUrl = "http://localhost:3000";
// const baseUrl = "https://movieontime.com/api";

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

export default {
  getNowShowing() {
    return apiClient.get("/movies");
  },
  getMovie(id) {
    return apiClient.get("/movies/" + id);
  },
  getPremiere() {
    return apiClient.post("/premiere");
  },
  getUpcoming() {
    return apiClient.post("/upcoming");
  },
  getReprojection() {
    return apiClient.post("/reprojection");
  }
};
