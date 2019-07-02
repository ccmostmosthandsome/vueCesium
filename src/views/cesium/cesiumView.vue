<!--------------------------cesium视图--------------------------->
<style scoped>

</style>

<template>
  <div class="myWrap">
    <cesiumMap></cesiumMap>
  </div>
</template>

<script>
import cesiumMap from '@/components/cesium/cesiumMap';
export default {
  name: 'cesiumView',
  data(){
   return{
     msg:"cesium视图",
   } 
  },
  components:{
    cesiumMap
  },
  methods:{

  }
}
</script>





