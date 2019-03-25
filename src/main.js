import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";

import AppDate from "@/components/AppDate";
import AppShortDate from "@/components/AppShortDate";
import AppPagination from "@/components/AppPagination";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "@/assets/stylesheets/style.scss";

Vue.use(BootstrapVue);
Vue.use(require("vue-moment"));
Vue.component("AppDate", AppDate);
Vue.component("AppShortDate", AppShortDate);
Vue.component("AppPagination", AppPagination);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
