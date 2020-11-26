<template>
  <div>
    <TopBar></TopBar>
    <div style="margin-top: 60px;width: 1100px;margin-left: 100px;">
      <van-row>
        <van-col span="16">
          <div style="background: #1fcab3;height: 400px;width: 100%;">

          </div>
        </van-col>
        <van-col span="8">
          <div style="height: 400px;width: 100%;background: lightgrey">

          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
    import TopBar from "./TopBar";

    export default {
      name: "HotspotAnalysis",
      data(){
        return{
        }
      },
      mounted() {
      },
      methods: {
      },
      components:{
        TopBar
      },
    }
</script>

<style>

</style>
