import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource';
import x5GMaps from 'x5-gmaps'

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(x5GMaps, "AIzaSyCGNPzxOYTmj5H2fKExtcuj8Py3YQnLMZw");

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
