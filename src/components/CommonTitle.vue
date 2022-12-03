<template>
  <div class="w">
    <div class="title">
      <img :src="img" />
      <p>{{title}}</p>
    </div>
    <div class="more" v-show="more">
      <p>更多</p>
      <img src="@/assets/img/arrow.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
    props: ['title', 'more', 'img']
};
</script>

<style lang="less" scoped>
.w {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 106px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 40px;
      height: 36px;
    }
    p {
      font-size: 30px;
      font-weight: 700;
      color: #242b39;
      margin-left: 10px;
    }
  }
  .more {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 16px;
      margin-right: 6px;
      color: #666;
    }
    img {
        height: 14px;
        width: 14px;
    }
  }
}
</style>