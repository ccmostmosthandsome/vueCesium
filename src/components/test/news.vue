<!--------------------------新闻组件------------------------->
<style scoped>

</style>

<template>
  <div class="myWrap">
      <span>{{msg}}</span>
  </div>
</template>

<script>

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
      getsj(){
          var _self=this;
          var propsValue=_self.$props;//获取传的值
      },
      getVlue(){
        alert(this.new_registAttr);
      }
  }
}
</script>





