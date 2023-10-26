import { createSSRApp } from 'vue'
import './style/index.scss'
import 'animate.css'
import uviewPlus from 'uview-plus'
import store from './store'
import App from './App.vue'
import Vuex from 'vuex'
export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus).use(store)
  return {
    app,
    Vuex,
  }
}
