import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入momentJs
import Moment from 'moment'

//全局定义时间过滤器
Vue.filter('convertTime',(data,format) => {
  return Moment(data).format(format)
})

import ElementUI from 'element-ui'
import 'assets/element-variables.scss'

Vue.use(ElementUI)

// require('@/mock/mock.js')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
