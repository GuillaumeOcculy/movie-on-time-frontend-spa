import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueMeta from "vue-meta";

import AppDate from "@/components/AppDate";
import AppGetDirection from "@/components/AppGetDirection";
import AppShortDate from "@/components/AppShortDate";
import AppPagination from "@/components/AppPagination";
import AppSelectedCountry from "@/components/AppSelectedCountry";

import "@/assets/stylesheets/style.scss";
import "nprogress/nprogress.css";

Vue.use(require("vue-moment"));
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});
Vue.component("AppDate", AppDate);
Vue.component("AppGetDirection", AppGetDirection);
Vue.component("AppShortDate", AppShortDate);
Vue.component("AppPagination", AppPagination);
Vue.component("AppSelectedCountry", AppSelectedCountry);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
