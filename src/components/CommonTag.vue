<template>
  <div class="w">
    <ul class="tags">
      <li v-for="(item, index) in tags" :key="index">
        {{ item.name }}
        <i v-show="index != tags.length-1">/</i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["tags"],
};
</script>

<style lang="less" scoped>
.w {
  background-color: #f5f5f5;
}
.tags {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: start;
  padding: 15px 0;
}
</style>