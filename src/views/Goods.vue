<template>
  <div class="w">
    <img class="banner" src="@/assets/img/banner.4c6b6225.png" />
    <section>
      <div>
        <strong>排序:</strong>
        <span>全部</span>
        <span>我能兑换的</span>
        <span>0-500分</span>
        <span>500-1000分</span>
        <span>1000-1500分</span>
        <span>1500-2000分</span>
      </div>
      <div>
        <strong>分类:</strong>
        <span>全部</span>
        <span>实物商品</span>
        <span>虚拟商品</span>
      </div>
    </section>
    <common-list :dataList="allGoods" />
  </div>
</template>

<script>
import CommonList from "@/components/CommonList";
import { getAllGoods } from "../api/data.js";
export default {
  data() {
    return {
      allGoods: {},
    };
  },
  components: {
    CommonList,
  },
  async created() {
    let data = await getAllGoods();
    this.allGoods = data;
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
</style>