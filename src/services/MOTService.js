import axios from "axios";
import queryString from "query-string";

const baseUrl = "http://localhost:3009";
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
  getNowShowing(payload) {
    let params = payload == undefined ? { page: 1 } : payload;
    params = queryString.stringify(params);

    return apiClient.get("/?" + params);
  },
  getMovie(payload) {
    const id = payload["id"];
    delete payload.id;
    const params = queryString.stringify(payload);

    return apiClient.get("/movies/" + id + "?" + params);
  },
  getPremiere(payload) {
    let params = payload == undefined ? { page: 1 } : payload;
    params = queryString.stringify(params);

    return apiClient.get("/premiere?" + params);
  },
  getUpcoming(payload) {
    let params = payload == undefined ? { page: 1 } : payload;
    params = queryString.stringify(params);

    return apiClient.get("/upcoming?" + params);
  },
  getReprojection(payload) {
    let params = payload == undefined ? { page: 1 } : payload;
    params = queryString.stringify(params);

    return apiClient.get("/reprojection?" + params);
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
