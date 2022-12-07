<template>
  <div class="w">
    <aside>
      <img :src="userInfo.headImg" />
      <div class="user">
        <span>{{userInfo.username}}:</span>
        <span>{{userInfo.coin}}分</span>
      </div>
      <div class="trade">
        <img src="@/assets/img/transaction.png">
        交易管理
      </div>
    </aside>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
  },
  computed: {
    ...mapState(["userInfo"]),

  }
};
</script>

<style lang="less" scoped>
aside {
  width: 200px;
  margin-right: 60px;
  background: #e7e7e7;
  img {
    width: 100px;
    height: 100px;
    display: block;
    margin: 30px auto 19px;
  }
  .user {
    text-align: center;
    margin-bottom: 43px;
  }
  .trade {
    display: flex;
    align-items: center;
    padding-left: 18px;
    margin-bottom: 14px;
    // width: 182px;
    height: 20px;
    img {
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
  }
}
</style>