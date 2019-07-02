<!--------------------------openlayers视图------------------------->
<style scoped>

</style>

<template>
  <div class="myWrap">
        <olMap></olMap>
  </div>
</template>

<script>
import olMap from '@/components/openLayers/olMap.vue';
export default {
  name: 'testView',
  data(){
   return{
     msg:"测试组件",
   } 
  },
  components:{//局部注册组件
    olMap,
  },
  methods:{

  }
}
</script>





