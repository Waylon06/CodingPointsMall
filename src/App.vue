<template>
  <div id="app">
    <common-top />
    <common-header />
    <router-view />
    <common-footer />
  </div>
</template>

<script>
import CommonTop from "@/components/CommonTop.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import CommonFooter from "@/components/CommonFooter.vue";

export default {
  components: {
    CommonTop,
    CommonHeader,
    CommonFooter,
  },
};
</script>

<style CommonFootertyle lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
