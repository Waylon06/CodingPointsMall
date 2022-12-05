<template>
  <div class="top">
    <div class="w">
      <section>欢迎来到叩丁狼</section>
      <ul>
        <li><img src="@/assets/img/userImg.png" /><span>用户名: 游客</span></li>
        <li>我的积分: --</li>
        <li>获取积分</li>
        <li>叩丁狼官网</li>
        <li @click="showLogin">登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import PubSub from 'pubsub-js';
export default {
  name: "CommonTop",
  data() {
    return {
    }
  },
  methods: {
    showLogin() {
      PubSub.publish('isShow', true)
    }
  }
};
</script>

<style lang ="less" scoped>
.top {
  width: 100%;
  background: #242b39;
  .w {
    height: 40px;
    color: #fffefe;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      width: 530px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        cursor: pointer;
      }
      li:first-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          height: 26px;
          width: 26px;
          border-radius: 26px;
          margin-right: 5px;
        }
        span {
          display: block;
        }
      }
      li:last-child {
        width: 124px;
        text-align: center;
        line-height: 40px;
        background: #0a328e;
      }
    }
  }
}
</style>