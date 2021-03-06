// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import Vuetify from 'vuetify'
import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false

// Vue.use(ElementUI)
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})

Vue.directive('focus-on-create', {
  bind: function () {
    Vue.nextTick(() => {
      this.el.focus()
    })
  }
})
