<template>
  <div class="login-modal" v-show="isShow">
    <div class="mask"></div>
    <div class="login-box">
      <img
        class="close"
        src="../assets/img/close.png"
        alt=""
        @click="isShow = false"
      />
      <ul class="title">
        <li :class="isShowForm ? 'active' : ''" @click="isShowForm = true">
          手机号码登录
        </li>
        <li style="margin: -2px 10px 0; cursor: auto">|</li>
        <li :class="!isShowForm ? 'active' : ''" @click="isShowForm = false">
          微信扫码登录
        </li>
      </ul>
      <div class="body">
        <div class="form" v-show="isShowForm">
          <div class="input-group uname">
            <input
              ref="phone"
              type="text"
              placeholder="请输入手机号"
              v-model="phoneNum"
            />
          </div>
          <div class="input-group mb20">
            <!--滑块-->
            <slide-verify
              :l="42"
              :r="20"
              class="slide-box"
              :w="360"
              :h="140"
              :imgs="imgs"
              :sliderText="msg"
              @success="onSuccess"
              @fail="onFail"
              @refresh="onRefresh"
            ></slide-verify>
          </div>

          <div class="input-group code mb20">
            <input
              type="text"
              placeholder="请输入短信验证码"
              v-model="verifyCode"
            />
            <div :class="showOrBan ? 'btn' : 'btn has-count'">
              <!-- has-count是灰色背景-->
              <span @click="sendVerifyCode" v-show="showOrBan">获取验证码</span>
              <span v-show="!showOrBan">{{ time + "s" }}</span>
            </div>
          </div>
          <div class="btn login-btn" @click="login">登录</div>
        </div>
        <div class="wx-qrcode" v-show="!isShowForm">微信二维码</div>
      </div>
    </div>
  </div>
</template>
<script>
import PubSub from "pubsub-js";
import { testPhoneNum } from "../utils";
import { sendSMS, phoneRegin } from "@/api/data";
export default {
  data() {
    return {
      // 控制表单盒子的显示和隐藏
      isShowForm: true,
      // 用户输入的手机号
      phoneNum: "",
      verifyCode: "",
      isShow: false,
      msg: "向右滑动",
      showOrBan: true,
      time: 60,
      imgs: [
        require("../assets/img/pic1.png"),
        require("../assets/img/pic2.jpg"),
        require("../assets/img/pic3.jpg"),
        require("../assets/img/pic4.jpg"),
      ],
    };
  },
  mounted() {
    PubSub.subscribe("isShow", (msgName, data) => {
      this.isShow = data;
    });
  },
  methods: {
    async sendVerifyCode() {
      if (!this.verifyPhoneNum()) {
        alert("手机号错误");
        return;
      }
      if (this.msg != "验证成功") {
        alert("请完成模块验证");
        return;
      }
      await sendSMS(this.phoneNum);
      this.showOrBan = false;
      let timer = setInterval(() => {
        if (this.time == 0) {
          clearInterval(timer);
          this.showOrBan = true;
          this.time = 60;
        } else {
          this.time--;
        }
      }, 1000);
    },
    async login() {
      if (!this.verifyPhoneNum()) {
        alert("手机号错误");
        return;
      }
      if (this.msg != "验证成功") {
        alert("请完成模块验证");
        return;
      }
      let data = await phoneRegin({
        verifyCode: this.verifyCode,
        phone: this.phoneNum,
      });
      console.log(data);
      if (data.code == 200) {
        log("yes");
      }
    },
    verifyPhoneNum() {
      if (testPhoneNum(this.phoneNum)) {
        return true;
      } else {
        this.$refs.phone.focus();
        return false;
      }
    },
    onSuccess() {
      this.msg = "验证成功";
    },
    onFail() {
      this.msg = "再来一次";
    },
    onRefresh() {
      this.msg = "再来一次";
    },
  },
};
</script>
<style lang = "less" scoped>
.login-modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .login-box {
    width: 555px;
    height: 423px;
    background: url("../assets/img/login-box-bg.png");
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;

    .close {
      position: absolute;
      right: 60px;
      top: 15px;
      cursor: pointer;
    }

    .title {
      display: flex;
      justify-content: center;
      padding: 45px 0 30px;
      color: #ccc;
      font-size: 18px;
      li {
        cursor: pointer;
      }
      .active {
        color: #333;
      }
    }

    .body {
      width: 360px;
      margin: 0 auto;

      .form {
        .uname {
          margin-bottom: 5px;
        }
        .input-group {
          display: flex;

          input {
            height: 48px;
            width: 100%;
            text-indent: 10px;
            border: 1px solid #ccc;
          }
        }
        .code input {
          width: 260px;
          margin-right: 8px;
        }

        .code .btn {
          flex: 1;
        }
        .btn {
          height: 50px;
          line-height: 50px;
          background-color: #0a328e;
          color: #fff;
          text-align: center;
          cursor: pointer;
          &.login-btn {
            margin-top: 10px;
          }
        }
        .has-count {
          background-color: #ccc;
        }
      }
    }
  }
}

/deep/.slide-box {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  canvas {
    position: absolute;
    left: 0;
    top: -120px;
    display: none;
    width: 100%;
    box-sizing: border-box;
  }
  .slide-verify-block {
    width: 85px;
    height: 136px;
  }
  .slide-verify-refresh-icon {
    top: -120px;
    display: none;
  }
  &:hover {
    canvas {
      display: block;
    }
    .slide-verify-refresh-icon {
      display: block;
    }
  }
}
</style>