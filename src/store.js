import Vue from "vue";
import Vuex from "vuex";

import MOTService from "@/services/MOTService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movie: {},
    cinema: {}
  },

  actions: {
    fetchMovie({ commit }, { id, date, query }) {
      return new Promise((resolve, reject) => {
        MOTService.getMovie(id, date, query)
          .then(response => {
            commit("SET_MOVIE", response.data);
            resolve();
          })
          .catch(error => {
            reject(error);
            console.log("There was an error:", error);
          });
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
  },

  mutations: {
    SET_MOVIE(state, data) {
      state.movie = data.data;
      state.movie["trailers"] = data.included.filter(
        association => association.type == "trailer"
      );

      state.movie["directors"] = data.included.filter(
        association => association.type == "director"
      );

      state.movie["casts"] = data.included.filter(
        association => association.type == "cast"
      );

      state.movie["genres"] = data.included.filter(
        association => association.type == "genre"
      );

      state.movie["cinemas"] = data.included.filter(
        association => association.type == "cinema_item"
      );
    },

    SET_CINEMA(state, data) {
      state.cinema = data.data;
      state.cinema["movies"] = data.included.filter(
        association => association.type == "movie_item"
      );
    }
  }
});
