import Vue from "vue";
import Vuex from "vuex";

import MOTService from "@/services/MOTService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movie: {},
    cinema: {},
    trailers: [],
    casts: [],
    directors: [],
    genres: [],
    cinemas: [],
    movies: []
  },
  mutations: {
    SET_MOVIE(state, data) {
      state.movie = data.data;
      state.trailers = data.included.filter(
        association => association.type == "trailer"
      );
      state.directors = data.included.filter(
        association => association.type == "director"
      );
      state.casts = data.included.filter(
        association => association.type == "cast"
      );
      state.genres = data.included.filter(
        association => association.type == "genre"
      );
      state.cinemas = data.included.filter(
        association => association.type == "cinema_item"
      );
    },
    SET_CINEMA(state, data) {
      state.cinema = data.data;
      state.movies = data.included.filter(
        association => association.type == "movie_item"
      );
    }
  },
  actions: {
    fetchMovie({ commit }, { id, date }) {
      MOTService.getMovie(id, date)
        .then(response => {
          commit("SET_MOVIE", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },
    fetchCinema({ commit }, { id, date }) {
      MOTService.getCinema(id, date)
        .then(response => {
          commit("SET_CINEMA", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    }
  }
});
