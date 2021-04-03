import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// import router from "./router";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
// Vue.component('gmap-cluster', VueGoogleMaps.Cluster);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCtGLFytKf9w5FW9R1804pd6xUSjbs3nU4",
    libraries: "places", // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
});

Vue.config.productionTip = false;

new Vue({
  // router,
  store,
  render: (h) => h(App),
}).$mount("#app");
