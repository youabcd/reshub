<template>
  <div>
    <TopBar></TopBar>
  </div>
</template>

<script>
    import TopBar from "./TopBar";

    export default {
      name: "Profession",
      components:{
        TopBar
      },
    }
</script>

<style scoped>
  .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .box-card {
      margin-left: 5px;
      margin-right: 5px;
      margin-top: 5px;
      margin-bottom: 5px;
      width: 49%;
    }
</style>
