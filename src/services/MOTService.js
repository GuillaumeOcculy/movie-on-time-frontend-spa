import axios from "axios";
import queryString from "query-string";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://api.movieontime.com";

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

if (localStorage.user) {
  let user = JSON.parse(localStorage.user);
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
  getCountryPoll() {
    return apiClient.get("/v1/polls/1");
  },
  answerToPoll(payload) {
    let poll_id = payload["pollId"];
    return apiClient.post("/v1/polls/" + poll_id + "/poll_answers", payload);
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

  getFavoriteCinemas() {
    return apiClient.get("/favorite_cinemas");
  },

  getWatchlist() {
    return apiClient.get("/watchlist");
  },

  getWatchedMovies() {
    return apiClient.get("/watched_movies");
  },

  addToWatchlist(movie_id) {
    return apiClient.post("/watchlist", movie_id);
  },

  removeToWatchlist(movie_id) {
    return apiClient.delete("/watchlist", { data: movie_id });
  },

  markAsWatched(movie_id) {
    return apiClient.post("/watched_movies", movie_id);
  },

  removeAsWatched(movie_id) {
    return apiClient.delete("/watched_movies/" + movie_id);
  },

  addToFavorite(cinema_id) {
    return apiClient.post("/favorite_cinemas", cinema_id);
  },

  removeToFavorite(cinema_id) {
    return apiClient.delete("/favorite_cinemas/" + cinema_id);
  },

  createUser(payload) {
    return apiClient.post("/users", payload);
  },
  signIn(payload) {
    return apiClient.post("/auth", payload);
  }
};
