<template>
  <div class="personal-centre" hidden="" style="display: block">
    <!--  用户鸡腿  -->
    <div class="user-integral">
      <div class="usable-integral">
        <div class="integral-data">
          <p>我的可用鸡腿</p>
          <h2 class="usable">{{ userInfo.coin }}</h2>
        </div>
        <div class="integral-button">
          <span class="integral-btn subsidiary-btn">鸡腿明细</span>
        </div>
      </div>
      <div class="freeze-integral">
        <div class="integral-data freeze-data">
          <p>冻结鸡腿</p>
          <h2 class="freeze">0</h2>
        </div>
        <div class="integral-button">
          <span class="integral-btn freeze-btn">鸡腿攻略</span>
        </div>
      </div>
    </div>
    <!--  连续签到  -->
    <div class="sign-in">
      <h2 class="sign-in-title">
        <span class="title-name">连续签到</span>
        <span class="title-sub">连续签到可获得额外奖励</span>
      </h2>
      <ul class="sign-ul active-sign-ul" id="signDays">
        <li
          v-for="(item, index) in signIns"
          :key="index"
          :class="
            item.isSign
              ? 'active-sign sign-li sign-li-bock'
              : 'sign-li sign-li-bock'
          "
          @click="signIn"
        >
          <span class="sign-li-month">{{
            convertToEngMonth(item.signDate.split("-")[1])
          }}</span>
          <span class="sign-li-date">{{ item.signDate.split("-")[2] }}</span>
          <span class="sign">签到</span>
          <!-- style="color: #fe7b28; font-size: 25px; font-weight: 500;" -->
        </li>
      </ul>
      <ul class="sign-ul2">
        <li class="sign-li" v-for="(item, index) in signIns" :key="index">
          <span>第{{ index + 1 }}天</span>
          <img src="@/assets/img/monad.png" />
        </li>
      </ul>
    </div>
    <!--  鸡腿轻松得  -->
    <div class="integralMall-strategy">
      <div class="commodity-model-header">
        <div class="model-header-left">鸡腿轻松得</div>
      </div>
      <div class="strategy-content">
        <div class="strategy-list">
          <a href="buyClass.html" target="_blank">
            <img src="../../assets/img/integral-02.png" alt="" />
            <div class="strategy-data">
              <h2>购课得鸡腿</h2>
              <span class="strategy-btn">去购课</span>
            </div>
          </a>
        </div>
        <div class="strategy-list">
          <a href="recommend.html" target="_blank">
            <img src="../../assets/img/integral-03.png" alt="" />
            <div class="strategy-data">
              <h2>推荐得鸡腿</h2>
              <span class="strategy-btn">去推荐</span>
            </div>
          </a>
        </div>
        <div class="strategy-list">
          <a href="taskList.html" target="_blank">
            <img src="../../assets/img/integral-04.png" alt="" />
            <div class="strategy-data">
              <h2>做任务得鸡腿</h2>
              <span class="strategy-btn">做任务</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { clickToSignInAPI, getUserSignInsAPI } from "@/api/data";
import { mapState } from "vuex";
export default {
  data() {
    return {
      signIns: [],
    };
  },
  created() {
    // getUserSignInsAPI();
    this.getUserSignIns();
  },
  methods: {
    async getUserSignIns() {
      let res = await getUserSignInsAPI();
      console.log("Signins", res);
      if (res.code == 0) {
        this.signIns = res.data.reverse();
      }
    },
    async signIn() {
      let res = await clickToSignInAPI();
      console.log("signIn", res);
      this.$router.go(0);
    },
  },
  computed: {
    ...mapState(["userInfo"]),
    convertToEngMonth() {
      return function (month) {
        switch (month) {
          case "01":
            return "Jan";
          case "02":
            return "Feb";
          case "03":
            return "Mar";
          case "04":
            return "Apr";
          case "05":
            return "May";
          case "06":
            return "Jun";
          case "07":
            return "Jul";
          case "08":
            return "Aug";
          case "09":
            return "Sept";
          case "10":
            return "Oct";
          case "11":
            return "Nov";
          case "12":
            return "Dec";
        }
      };
    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  border: none;
  list-style: none;
}
/*  右边分类内容  */
.personalCenter-select-right {
  display: inline-block;
  width: calc(100% - 205px);
  vertical-align: top;
  padding: 37px 0 60px 60px;
  box-sizing: border-box;
}
/*  个人中心模块样式  */
.user-integral {
  display: flex;
}
.usable-integral {
  display: flex;
  flex-direction: row;
  width: 356px;
  height: 152px;
  background-image: url("../../assets/img/integral01.png");
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 40px;
}
.freeze-integral {
  display: flex;
  flex-direction: row;
  width: 356px;
  height: 152px;
  background-image: url("../../assets/img/integral02.png");
  background-repeat: no-repeat;
  background-position: center;
}
.integral-data {
  width: 209px;
  display: flex;
  flex-direction: column;
  padding-left: 27px;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
}
.integral-data p {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 23px;
  letter-spacing: 0px;
  color: #ffffff;
}
.integral-data h2 {
  font-family: SourceHanSansSC-Bold;
  font-size: 40px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 23px;
  letter-spacing: 0px;
  color: #ffffff;
  padding-top: 17px;
  box-sizing: border-box;
}
.integral-button {
  flex: 1;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.integral-btn {
  width: 90px;
  height: 29px;
  border-radius: 2px;
  border: solid 1px #4c94ff;
  text-align: center;
  line-height: 29px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
.freeze-data p {
  color: #666666;
}
.freeze-data h2 {
  color: #666666;
}
.freeze-btn {
  border-radius: 2px;
  border: solid 1px #bfbfbf;
  /*opacity: 0.22;*/
  color: #666666;
}

.model-header-left {
  font-family: SourceHanSansSC-Regular;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 23px;
  letter-spacing: 0px;
  color: #333333;
  text-align: left;
}
.strategy-content {
  display: flex;
}
.strategy-list {
  position: relative;
  overflow: hidden;
  width: 285px;
  margin-right: 42px;
  margin-top: 19px;
  cursor: pointer;
  /*transition: all 3s ease;*/
}
.strategy-list:last-child {
  margin-right: 0;
}
.strategy-data {
  position: absolute;
  left: 17px;
  top: 44px;
}
.strategy-data h2 {
  font-family: SourceHanSansSC-Bold;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 23px;
  letter-spacing: 0px;
  color: #ffffff;
  padding-bottom: 16px;
  box-sizing: border-box;
}
.strategy-btn {
  width: 96px;
  height: 27px;
  display: block;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 27px;
  text-align: center;
  letter-spacing: 0px;
  color: #ffffff;
  border: solid 1px #ffffff;
}
.strategy-data a:hover {
  color: #ffffff;
}
.strategy-list img {
  transform: scale(1);
  display: block;
  transition: all 0.2s ease;
}
.strategy-list:hover img {
  transform: scale(1.1);
}
.sign-in {
  padding: 40px 0;
  box-sizing: border-box;
}
.sign-in-title {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.title-name {
  font-family: SourceHanSansSC-Regular;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 23px;
  letter-spacing: 0px;
  color: #333333;
  flex: 1;
  text-align: left;
}
.title-sub {
  font-family: SourceHanSansSC-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #999999;
}
.sign-ul {
  display: flex;
  flex-direction: row;
  padding: 0 64px;
  box-sizing: border-box;
  position: relative;
  padding-top: 22px;
  min-height: 196px;
  box-sizing: border-box;
}
.sign-li {
  width: 68px;
  margin-right: 59px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.sign-li:last-child {
  margin-right: 0;
}
.sign-li-bock {
  width: 68px;
  height: 104px;
  margin-bottom: 34px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.active-sign-ul .active-sign {
  background-image: linear-gradient(
      180deg,
      #1c4fc5 0%,
      #265bd7 0%,
      #2f67e8 0%,
      #1b49b3 100%
    ),
    linear-gradient(#0a328e, #0a328e);
  background-blend-mode: normal, normal;
  border-radius: 31px 31px 10px 10px;
}
.active-sign-ul .active-sign .sign-li-date,
.active-sign-ul .active-sign .sign-li-month,
.active-sign-ul .active-sign .sign {
  color: #fff;
}
.active-sign-ul .sign-day {
  color: #333;
}
.sign-li-bock::after {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #e7e7e7;
  border: solid 3px #ffffff;
  position: absolute;
  bottom: -32px;
}
.active-sign::after {
  background-color: #0a328e;
}
.sign-li-month {
  font-family: SourceHanSansSC-Normal;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 36px;
  letter-spacing: 0px;
  color: #666;
}
.sign-li-date {
  font-family: SourceHanSansSC-Regular;
  font-size: 30px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 22px;
  letter-spacing: 0px;
  color: #666;
  padding: 5px 0;
  box-sizing: border-box;
}
.sign {
  font-family: SourceHanSansSC-Medium;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 36px;
  letter-spacing: 0px;
  color: #666666;
}
.sign-day {
  font-family: SourceHanSansSC-Normal;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 36px;
  letter-spacing: 0px;
  color: #666666;
}
.sign-ul::before {
  content: "";
  width: 100%;
  height: 2px;
  background: #ececec;
  position: absolute;
  left: 0;
  top: 150px;
}
.sign-ul2 {
  display: flex;
  padding: 0 64px;
  position: relative;
  top: -25px;
}
.sign-ul2 span {
  margin-bottom: 10px;
}
</style>