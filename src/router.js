import Vue from "vue";
import Router from "vue-router";
import NowShowing from "./views/NowShowing.vue";
import Premiere from "./views/Premiere.vue";
import Upcoming from "./views/Upcoming.vue";
import Reprojection from "./views/Reprojection.vue";
import MovieShow from "./views/MovieShow.vue";
import ShowtimeShow from "./views/ShowtimeShow.vue";
import Cinemas from "./views/Cinemas.vue";
import CinemaShow from "./views/CinemaShow.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: NowShowing
    },
    {
      path: "/upcoming",
      name: "upcoming",
      component: Upcoming
    },
    {
      path: "/premiere",
      name: "premiere",
      component: Premiere
    },
    {
      path: "/reprojection",
      name: "reprojection",
      component: Reprojection
    },
    {
      path: "/movies/:id",
      name: "movie-show",
      component: MovieShow,
      props: true
    },
    {
      path: "/showtimes/:id",
      name: "showtime-show",
      component: ShowtimeShow,
      props: true
    },
    {
      path: "/cinemas",
      name: "cinemas",
      component: Cinemas
    },
    {
      path: "/cinemas/:id",
      name: "cinema-show",
      component: CinemaShow,
      props: true
    }
  ]
});
