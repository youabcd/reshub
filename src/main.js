// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Cell from 'vant/lib/cell'
import 'vant/lib/cell/style'
import CellGroup from "vant/lib/cell-group";
import 'vant/lib/cell-group/style'
import Row from 'vant/lib/row'
import 'vant/lib/row/style'
import Col from 'vant/lib/col'
import 'vant/lib/col/style'
import VanImage from 'vant/lib/image'
import 'vant/lib/image/style'
import Popup from 'vant/lib/popup'
import 'vant/lib/popup/style'
import axios from 'axios'

Vue.use(Popup)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Col)
Vue.use(Row)
Vue.use(VanImage)
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
