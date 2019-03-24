import axios from "axios";
import queryString from "query-string";

const baseUrl = "http://localhost:3000";
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
  getMovie(payload) {
    const id = payload["id"];
    delete payload.id;
    const params = queryString.stringify(payload);

    return apiClient.get("/movies/" + id + "?" + params);
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
  },
  getCinemas(query) {
    if (query != undefined) {
      return apiClient.get("/cinemas?query=" + query);
    } else {
      return apiClient.get("/cinemas");
    }
  },
  getCinema(id, date) {
    if (date != undefined) {
      return apiClient.get("/cinemas/" + id + "?date=" + date);
    } else {
      return apiClient.get("/cinemas/" + id);
    }
  }
};
