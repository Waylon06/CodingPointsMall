<template>
  <div class="w">
    <img class="banner" src="@/assets/img/banner.4c6b6225.png" />
    <section>
      <div>
        <strong>排序:</strong>
        <span
          :class="index == filterList.byCoin.active ? 'active' : ''"
          @click="changeCoinActive(index, item)"
          v-for="(item, index) in filterList.byCoin.option"
          :key="index"
          >{{ item.name }}</span
        >
      </div>
      <div>
        <strong>分类:</strong>
        <span
          :class="item.type == filterList.byType.active ? 'active' : ''"
          @click="changeTypeActive(item.type)"
          v-for="item in filterList.byType.option"
          :key="item.type"
          >{{ item.name }}</span
        >
      </div>
    </section>
    <common-list :dataList="allGoods" />
  </div>
</template>

<script>
import CommonList from "@/components/CommonList";
import { getAllGoodsAPI } from "../api/data.js";
export default {
  data() {
    return {
      allGoods: {},
      params: {
        did: 0,
        type: 0,
        min: 0,
        max: 0,
        keyword: "",
      },
      filterList: {
        byCoin: {
          option: [
            {
              name: "全部",
            },
            {
              name: "我能兑换的",
            },
            {
              name: "0-500分",
              min: 0,
              max: 500,
            },
            {
              name: "500-1000分",
              min: 500,
              max: 1000,
            },
            {
              name: "1000-1500分",
              min: 1000,
              max: 1500,
            },
            {
              name: "1500-2000分",
              min: 1500,
              max: 2000,
            },
          ],
          active: 0,
        },
        byType: {
          option: [
            {
              name: "全部",
              type: 0,
            },
            {
              name: "实物商品",
              type: 1,
            },
            {
              name: "虚拟商品",
              type: 2,
            },
          ],
          active: 0,
        },
      },
    };
  },
  components: {
    CommonList,
  },

  created() {
    this.GoodsInfo();
  },
  methods: {
    async GoodsInfo() {
      this.params.keyword = this.$route.query.keyword || this.params.keyword;
      let res = await getAllGoodsAPI(this.params);
      this.allGoods = res.data;
    },
    changeTypeActive(type) {
      this.filterList.byType.active = type;
      this.params.type = type;
      this.GoodsInfo();
    },
    changeCoinActive(index, item) {
      this.filterList.byCoin.active = index;
      this.params.min = item.min;
      this.params.max = item.max;
      this.GoodsInfo();
    },
  },
  watch: {
    "$route.query.keyword": {
      handler() {
        
        this.GoodsInfo();
      }
    },
  },
};
</script>

<style lang="less" scoped>
section {
  padding: 40px 0 8px;
  height: 102px;
  div {
    text-align: left;
    margin-bottom: 32px;
    font-size: 18px;
    strong {
      font-weight: 700;
      color: #000;
      margin-right: 10px;
    }
    span {
      margin-right: 28px;
      color: #999;
      cursor: pointer;
      margin-left: 28px;
    }
  }
}
.active {
  color: #0a328e;
  font-weight: 700;
}
</style>