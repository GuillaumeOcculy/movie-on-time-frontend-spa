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

if (localStorage.user) {
  var user = JSON.parse(localStorage.user);
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
}

export default {
  getNowShowing(payload) {
    let params = payload == undefined ? { page: 1 } : payload;
    params = queryString.stringify(params);

    return apiClient.get("/?" + params);
  },
  searchMovies(query) {
    const params = queryString.stringify(query);

    return apiClient.get("/search?" + params);
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
    let params = payload == undefined ? { page: 1 } : payload;
    params = queryString.stringify(params);

    return apiClient.get("/cinemas?" + params);
  },
  getCinema(payload) {
    const id = payload["id"];
    delete payload.id;
    const params = queryString.stringify(payload);

    return apiClient.get("/cinemas/" + id + "?" + params);
  },

  getWatchlist() {
    return apiClient.get("/watchlist");
  },

  getWatchedMovies() {
    return apiClient.get("/watched_movies");
  },

  createUser(payload) {
    return apiClient.post("/users", payload);
  },
  signIn(payload) {
    return apiClient.post("/auth", payload);
  }
};
