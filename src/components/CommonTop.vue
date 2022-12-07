<template>
  <div class="top">
    <div class="w">
      <section>欢迎来到叩丁狼</section>
      <ul>
        <li @click="$router.push('/user')">
          <img :src="userInfo.headImg" /><span
            >用户名: {{ userInfo.username }}</span
          >
        </li>
        <li>我的积分: {{ userInfo.coin }}</li>
        <li>获取积分</li>
        <a href="https://www.wolfcode.cn/">叩丁狼官网</a>
        <li @click="showLogin" class="login-btn" v-show="!isLogined">登录</li>
        <li class="cart-btn" v-show="isLogined">
          <img src="@/assets/img/cart.png" /><span>购物车</span
          ><b>{{ cartTotal }}</b>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import { mapState, mapMutations } from "vuex";
import { getUserInfoAPI } from "@/api/data";

export default {
  name: "CommonTop",
  data() {
    return {};
  },

  async mounted() {
    if (sessionStorage.getItem("token")) {
      let res = await getUserInfoAPI();
      this.changeUserInfo(res.data.userInfo);
      this.changeCartTotal(res.data.cartTotal);
      console.log(this.userInfo);
    } 
  },
  methods: {
    ...mapMutations(["changeCartTotal", "changeUserInfo", "changeIsLogined"]),
    showLogin() {
      PubSub.publish("isShow", true);
    },
  },
  computed: {
    ...mapState(["isLogined", "cartTotal", "userInfo"]),
  },
  watch: {
    "$route.path": {
      handler() {
        // this.$router.go(0)  //刷新当前页
        if (sessionStorage.getItem("token") == null) {
          this.changeIsLogined(false);
        }
      },
    },
  },
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
      .login-btn {
        width: 124px;
        text-align: center;
        line-height: 40px;
        background: #0a328e;
      }
      .cart-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 124px;
        height: 40px;
        background: #0a328e;
        cursor: pointer;
        margin-right: 0;

        span {
          margin-left: 8px;
          margin-right: 6px;
        }
        b {
          width: 22px;
          height: 22px;
          background: #fd604d;
          border-radius: 11px;
          text-align: center;
          line-height: 22px;
        }
      }
    }
  }
}
</style>