<template>
  <div>
    <TopBar></TopBar>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <div>
      <SearchBox></SearchBox>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
  import TopBar from "./TopBar";
  import SearchBox from "./SearchBox";
  export default {
    name: "Home",
    data() {
      return {
        imgSrc:require('../assets/background01.jpg'),
      }
    },
    methods:{
    },
    components: {
      TopBar,SearchBox,
    },
  }
</script>

<style>
  .background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
  //opacity:0.9;
    position: fixed;
  }
</style>
