<!--------------------------导入本地图片------------------------->
<style scoped>

</style>

<template>
  <div class="myWrap">
      <span>{{msg}}</span>
      <div>
          <img src='../../assets/imgs/road2.png'>
          <br>
          <img :src="imgurl">
          <br>
          <img :src="imgurl2">
      </div>
  </div>
</template>

<script>
/*****************************子组件导入本地图片*****************************
 *1.在index.html文件中引使用本地图片时，引用的是“public/img/” 中的静态文件目录，
 *例如：“./static/imgs/xjgl.png”路径是相对于index.html文件来说的。
 *2.子组件的<template>标签中的html使用本地图片时，引用的是“src/assets/imgs/road2.png”中
 *静态文件目录，例如“../../assets/imgs/road2.png”是相对于该子组件文件来说的
 *3.子组件动态设置图片时，即在子组件的<script>内使用本地图片，需要先将本地图片作为模块导入进来才可以使用，
 *可通过import和require方法把图片导入进来，图片导入进来后会生成base64图片可供动态设置图片
*/
import road3 from '@/assets/imgs/road3.png';//ES6把图片当做模块导入进来
var road5=require("@/assets/imgs/road3.png");//nodeJS把图片当做模块导入进来
console.log(road3);
console.log(road5);
export default {
  name: 'testVue',//组件名字
  data(){
   return{
       msg:"导入本地图片",
       imgurl:road3,
       imgurl2:road5,
   } 
  },
  methods:{

  }
}
</script>





