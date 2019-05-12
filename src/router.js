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
import Search from "./views/Search.vue";
import Signup from "./views/Signup.vue";
import Signin from "./views/Signin.vue";
import FavoriteCinemas from "./views/FavoriteCinemas.vue";
import Watchlist from "./views/Watchlist.vue";
import Watched from "./views/Watched.vue";

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
    },
    {
      path: "/search",
      name: "search-movies",
      component: Search
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin
    },
    {
      path: "/favorite-cinemas",
      name: "favorite-cinemas",
      component: FavoriteCinemas
    },
    {
      path: "/watchlist",
      name: "watchlist",
      component: Watchlist
    },
    {
      path: "/watched",
      name: "watched",
      component: Watched
    }
  ]
});
