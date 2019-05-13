import Vue from "vue";
import Vuex from "vuex";

import MOTService from "@/services/MOTService.js";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movie: {},
    cinema: {},
    meta: {},
    user: null
  },

  actions: {
    fetchMovie({ commit }, payload) {
      return new Promise((resolve, reject) => {
        MOTService.getMovie(payload)
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

    fetchCinema({ commit }, payload) {
      MOTService.getCinema(payload)
        .then(response => {
          commit("SET_CINEMA", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },

    register({ commit }, payload) {
      return MOTService.createUser(payload).then(({ data }) => {
        commit("SET_USER_DATA", data.data.attributes);
      });
    },

    login({ commit }, payload) {
      return MOTService.signIn(payload).then(({ data }) => {
        commit("SET_USER_DATA", data.data.attributes);
      });
    },

    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    }
  },

  mutations: {
    SET_MOVIE(state, data) {
      state.movie = data.data;
      state.meta = data["meta"];
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
        association =>
          association.type == "cinema_item" && !association.attributes.favorited
      );

      state.movie["favorited_cinemas"] = data.included.filter(
        association =>
          association.type == "cinema_item" && association.attributes.favorited
      );
    },

    SET_CINEMA(state, data) {
      state.cinema = data.data;
      state.cinema["movies"] = data.included.filter(
        association => association.type == "movie_item"
      );
    },

    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = `Bearer ${
        userData.token
      }`;
    },

    CLEAR_USER_DATA() {
      localStorage.clear();
      axios.defaults.headers.common["Authorization"] = null;
    }
  },

  getters: {
    loggedIn() {
      return !!localStorage.user;
    }
  }
});
