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
  getNowShowing(page) {
    page = page === undefined ? 1 : page;
    return apiClient.get("/?page=" + page);
  },
  getMovie(payload) {
    const id = payload["id"];
    delete payload.id;
    const params = queryString.stringify(payload);

    return apiClient.get("/movies/" + id + "?" + params);
  },
  getPremiere(page) {
    page = page === undefined ? 1 : page;
    return apiClient.get("/premiere?page=" + page);
  },
  getUpcoming(page) {
    page = page === undefined ? 1 : page;
    return apiClient.get("/upcoming?page=" + page);
  },
  getReprojection(page) {
    page = page === undefined ? 1 : page;
    return apiClient.get("/reprojection?page=" + page);
  },
  getShowtime(id) {
    return apiClient.get("/showtimes/" + id);
  },
  getCinemas(payload) {
    const params = queryString.stringify(payload);

    return apiClient.get("/cinemas?" + params);
  },
  getCinema(payload) {
    const id = payload["id"];
    delete payload.id;
    const params = queryString.stringify(payload);

    return apiClient.get("/cinemas/" + id + "?" + params);
  }
};
