<!--------------------------导入本地图片------------------------->
<style scoped>
    #mapDiv{
        width:100%;
        height:100%;
        padding: 0px;
        margin: 0px;
    }
</style>

<template>
  <div class="myWrap">
      <div id="mapDiv" ref="olMap"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
export default {
  name: 'olMap',
  data(){
   return{
       msg:"地图组件",
       map: null
   } 
  },
  mounted() {
    this.map = new Map({
      target: "mapDiv",
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        projection: "EPSG:4326",    //使用这个坐标系
        center: [114.064839,22.548857],  //深圳
        zoom: 12
      })
    });
  },
}
</script>





