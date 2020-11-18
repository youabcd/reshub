<template>
  <div>
    <TopBar></TopBar>
    <div class="background" >

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
        backImg:[
          url('../assets/bing01.jpg'),
          url('../assets/bing02.jpg'),
          '../assets/bing03.jpg',
          '../assets/bing04.jpg',
          '../assets/bing05.jpg',
          '../assets/bing06.jpg',
          '../assets/bing07.jpg',
          '../assets/bing08.jpg',
        ],
      }
    },
    methods:{
    },
    components: {
      TopBar,SearchBox,
    },
    created() {
      //var index =parseInt(Math.random()*7);
      //document.getElementById("BackgroundArea").style.backgroundImage=this.backImg[0];
    },
  }
</script>

<style>
  .background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: fixed;
    background-image: url("../assets/bing02.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
  }
</style>
