<!--------------------------cesium地图组件------------------------->
<template>
  <div class="myWrap">
    <div id="cesiumDiv"></div>
  </div>
</template>

<script>

import Cesium from 'cesium/Cesium';//导入cesium对象
import initMap from './customPlugins/modulesES6/initMap.js';//初始化地图
export default {
  name: 'cesiumMap',
  data(){
   return{
     msg:"cesium地图",
     viewer:null,
   } 
  },
  components:{

  },
  mounted () {
    this.viewer=initMap('cesiumDiv');
  },
  methods:{

  }
}
</script>

<style lang="less">

</style>



