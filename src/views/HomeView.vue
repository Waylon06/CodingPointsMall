<template>
  <div class="home">
    <common-swiper :img="swiperImg"/>
    <common-title :img="require('@/assets/img/jingpin.png')" title="精品推荐" :more="true"/>
    <common-list :dataList="JPDataList"/>
    <common-title :img="require('@/assets/img/hot.png')" title="热门攻略" :more="true"/>
    <img class="banner" src="@/assets/img/banner.4c6b6225.png">
    <common-list :dataList="HotDataList"/>
    <common-title :img="require('@/assets/img/score.png')" title="鸡腿攻略"/>
  </div>
</template>

<script>
 import CommonSwiper from "@/components/CommonSwiper";
 import CommonTitle from '@/components/CommonTitle';
 import CommonList from '@/components/CommonList';

import {getJPData, getHotData} from '../api/data.js'
export default {
  name: 'HomeView',
  components: {
    CommonSwiper,
    CommonTitle,
    CommonList
  },
  async created() {
    let jp = await getJPData();
    this.JPDataList = jp.data.records;

    let hot = await getHotData();
    this.HotDataList = hot.data.records;

  },
  data() {
    return {
      JPDataList: {},
      HotDataList: {},
      swiperImg: [
      {imgUrl:require('../assets/img/pic1.png')},
      {imgUrl:require('../assets/img/pic2.jpg')},
      {imgUrl:require('../assets/img/pic3.jpg')},
      {imgUrl:require('../assets/img/pic4.jpg')},
      ]
    }
  },
}
</script>

<style lang="less" scoped>
  .home {
    background-color: #f5f5f5;
  }
  .banner {
    padding-bottom: 20px;
  }
</style>
