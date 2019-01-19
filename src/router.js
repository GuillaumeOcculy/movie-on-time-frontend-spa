import Vue from "vue";
import Router from "vue-router";
import NowShowing from "./views/NowShowing.vue";
import Premiere from "./views/Premiere.vue";
import Upcoming from "./views/Upcoming.vue";
import Reprojection from "./views/Reprojection.vue";

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
    }
  ]
});
