<!--------------------------请求本地文件数据组件------------------------->
<style scoped>

</style>

<template>
  <div class="myWrap">
      <span>{{msg}}</span>
      <button v-on:click="requestLocalFile()">请求本地文件数据</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'testVue',//组件名字
  data(){
   return{
       msg:"新闻组件",
   } 
  },
  props:["testAttr","new_registAttr"],//组件注册的属性，可通过父组件给该属性进行传值
  components:{//局部组件
    
  },
  mounted(){

  },
  methods:{
      requestLocalFile(){
          //本地路径
         var url="./myDatas/53.geojson";
         axios.get(url).then(function(response){
            console.log(response);
        })
      },
  }
}
</script>





