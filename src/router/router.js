import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    //{path: '/',name: 'sample-cesium',component: SampleCesium},
    {path: '/cesium',name: 'cesium',component:()=>import('@/views/cesium/cesiumView.vue')},//cesium
  ]
})
