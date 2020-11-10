<template>
  <div>
    <TopBar></TopBar>
    {{msg}}
  </div>
</template>

<script>
    import TopBar from "./TopBar";

    export default {
      name: "SearchRecord",
      
      components:{
        TopBar
      },
      data() {
        return {
          msg: '666'
        }
      }
    }
</script>

<style scoped>

</style>
