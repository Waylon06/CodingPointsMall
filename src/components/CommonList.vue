<template>
  <div class="w clearfix">
    <ul class="goods">
      <li class="product" v-for="item in dataList" :key="item.id" @click="$router.push(`/detail?id=${item.id}`)">  
        <img v-lazy="'http://sc.wolfcode.cn'+item.coverImg" />
        <h3>{{item.name}}</h3>
        <div class="price">
          <span>{{item.coin}}</span>
          <img src="@/assets/img/monad.png" />
        </div>
        <div class="btn">立即兑换</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    props: ['dataList']
};
</script>

<style lang="less" scoped>
.w {
  .goods {
    display: flex;
    // justify-content: space-between;
    float: left;
    flex-wrap: wrap;
    .product:hover {
      transform: translateY(-10px);
      .btn {
        background-color: #0a328e;
        color: #fff;
      }
    }
    .product {
      transition: all .5s linear;
      width: 285px;
      height: 500px;
      cursor: pointer;
      background: #fff;
      padding-bottom: 32px;
      margin-right: 20px;
      margin-bottom: 20px;
      img {
        width: 285px;
        height: 330px;
      }
      h3 {
        margin-top: 22px;
        margin-bottom: 16px;
        font-size: 18px;
      }
      .price {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 700;
        color: #fd604d;
        img {
          width: 20px;
          height: 20px;
        }
      }
      .btn {
        width: 100px;
        height: 36px;
        border: 1px solid #0a328e;
        line-height: 36px;
        color: #0a328e;
        cursor: pointer;
        margin: auto;
      }
    }
    .product:nth-child(4n) {
      margin-right: 0;
    }
  }
}
.clearfix::after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
</style>