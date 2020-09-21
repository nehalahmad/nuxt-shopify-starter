import Vue from "vue";
/*
const eventBus = {};
eventBus.install = function(Vue) {
  Vue.prototype.$bus = new Vue();
};
Vue.use(eventBus);
*/
export default ({ app }, inject) => {
  // Yep, that's it
  console.log(app);
  inject("bus", new Vue());
};
