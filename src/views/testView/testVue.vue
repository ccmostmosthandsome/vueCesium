<!--------------------------测试vue视图组件------------------------->
<style scoped>

</style>

<template>
  <div class="myWrap">
        <importImg_toComponent></importImg_toComponent>
  </div>
</template>

<script>
import news from '@/components/test/news.vue';//新闻组件
import requestLocalFile from '@/components/test/requestLocalFile.vue';//
import importImg_toComponent from '@/components/test/importImg_toComponent.vue';//
export default {
  name: 'testView',
  data(){
   return{
     msg:"测试组件",
   } 
  },
  components:{//局部注册组件
    news,
    requestLocalFile,
    importImg_toComponent
  },
  methods:{

  }
}
</script>





