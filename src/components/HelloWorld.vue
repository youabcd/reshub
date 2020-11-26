<template>
  <div class="hello">

  </div>
</template>
name: 'HelloWorld',
<script>
  export default {
    data() {
      return{

      }
    },
    created() {
      var nowPath=this.$route.query.nowPath;
      this.$router.push({
        path:'/',
      });
    },
    mounted() {
    },
    methods: {
    },
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
