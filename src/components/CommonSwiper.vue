<template>
  <div class="w">
    <div class="swiper-container mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item,index in img" :key="index"><img :src="item.imgUrl"></div>
        <!-- <div class="swiper-slide"><img src="@/assets/img/pic2.jpg"></div>
        <div class="swiper-slide"><img src="@/assets/img/pic3.jpg"></div>
        <div class="swiper-slide"><img src="@/assets/img/pic4.jpg"></div> -->
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
</template>

<script>
import "swiper/css/swiper.min.css";
import Swiper from "swiper";
export default {
    props: ['img'],
    mounted() {
         var swiper = new Swiper(".swiper-container", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
};
</script>

<style lang="less" scoped>
.swiper-container {
  width: 1200px;
  height: 600px;
}
</style>