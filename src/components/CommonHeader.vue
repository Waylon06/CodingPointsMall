<template>
  <header class="w">
    <div class="logo">
      <img src="@/assets/img/indexLogo.png" alt="" />
    </div>
    <div class="nav">
      <ul>
        <li
          v-for="item in menu"
          :key="item.name"
          @click="clickMenu(item)"
          :class="$route.path == item.path ? 'active' : ''"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="search">
      <input
        type="text"
        placeholder="搜索全部商品直接回车"
        name="keyword"
        @keyup.enter="search()"
        v-model="keyword"
      />
      <span @click="search()"><img src="@/assets/img/search.png" /></span>
    </div>
  </header>
</template>

<script>
export default {
  name: "CommonHeader",
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
        },
        {
          path: "/goods",
          name: "goods",
          label: "全部商品",
        },
        {
          path: "/user",
          name: "user",
          label: "个人中心",
        },
        {
          path: "/order",
          name: "order",
          label: "我的订单",
        },
        {
          path: "/discount",
          name: "discount",
          label: "专属福利",
        },
      ],
      keyword: "",
    };
  },
  methods: {
    clickMenu(item) {
      this.$router.push(item.path);
    },
    search() {
      this.$router.push("/goods?keyword=" + this.keyword).catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
header {
  height: 118px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .nav {
    ul {
      .active {
        color: #0a328e;
        font-weight: 700;
      }
      width: 500px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        cursor: pointer;
      }
    }
  }
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      width: 240px;
      height: 40px;
      border-radius: 20px 0 0 20px;
      border: 2px solid #dedede;
      border-right: 0;
      text-indent: 15px;
    }
    span {
      display: block;
      width: 50px;
      height: 45px;
      background: #0a328e;
      border-radius: 0 20px 20px 0;
      line-height: 48px;
      cursor: pointer;
    }
  }
}
</style>