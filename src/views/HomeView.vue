<template>
  <div>
    <common-swiper :img="swiperImg" class="swiper" />
    <div class="banner">
      <common-title
        :img="require('@/assets/img/jingpin.png')"
        title="精品推荐"
        :more="true"
      />
      <common-list :dataList="JPDataList" />
      <common-title
        :img="require('@/assets/img/hot.png')"
        title="热门攻略"
        :more="true"
      />
      <img class="bannerImg" src="@/assets/img/banner.4c6b6225.png" />
      <common-list :dataList="HotDataList" />
    </div>
    <common-title :img="require('@/assets/img/score.png')" title="鸡腿攻略" />
    <ul class="more w">
      <li
        v-for="(item, index) in moreImg"
        :key="index"
        :style="'background-image:' + ' url(' + item.imgUrl + ');'"
      >
        <h4>{{ item.title }}</h4>
        <div>{{ item.btn }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import CommonSwiper from "@/components/CommonSwiper";
import CommonTitle from "@/components/CommonTitle";
import CommonList from "@/components/CommonList";

import { getJPDataAPI, getHotDataAPI } from "../api/data.js";
export default {
  name: "HomeView",
  components: {
    CommonSwiper,
    CommonTitle,
    CommonList,
  },
  async created() {
    let jp = await getJPDataAPI();
    this.JPDataList = jp.data.data.records;

    let hot = await getHotDataAPI();
    this.HotDataList = hot.data.data.records;
  },
  data() {
    return {
      JPDataList: {},
      HotDataList: {},
      swiperImg: [
        { imgUrl: require("../assets/img/pic1.png") },
        { imgUrl: require("../assets/img/pic2.jpg") },
        { imgUrl: require("../assets/img/pic3.jpg") },
        { imgUrl: require("../assets/img/pic4.jpg") },
      ],
      moreImg: [
        {
          imgUrl: require("../assets/img/integral-01.png"),
          title: "签到得鸡腿",
          btn: "去签到",
        },
        {
          imgUrl: require("../assets/img/integral-02.png"),
          title: "购课得鸡腿",
          btn: "去购课",
        },
        {
          imgUrl: require("../assets/img/integral-03.png"),
          title: "推荐得鸡腿",
          btn: "去推荐",
        },
        {
          imgUrl: require("../assets/img/integral-04.png"),
          title: "做任务得鸡腿",
          btn: "做任务",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.banner {
  background-color: #f5f5f5;
}
.bannerImg {
  padding-bottom: 20px;
}
.swiper {
  padding-bottom: 30px;
}
.more {
  height: 168px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 47px;
  li {
    color: #fff;
    width: 285px;
    height: 168px;
    padding-top: 43px;
    padding-left: 29px;
    box-sizing: border-box;
    transition: all 0.5s linear;
    background-size: 100% 100%;
    cursor: pointer;
    h4 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 19px;
      text-align: left;
    }
    div {
      width: 96px;
      height: 27px;
      border: 1px solid #fff;
      text-align: center;
      line-height: 27px;
    }
  }
  li:hover {
     transform: scale(1.1);
  }
}
</style>
