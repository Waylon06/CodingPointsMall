<template>
  <div class="cart_page">
    <table>
      <thead>
        <tr>
          <th style="width: 8%" @click="clickToCheckAll">
            <i
              :class="
                checkAll
                  ? 'iconfont icon-xuanzekuang'
                  : 'iconfont icon-xuanzekuang-duoxuanweixuan'
              "
            ></i>
          </th>
          <th style="width: 30%">礼品信息</th>
          <th>兑换分数</th>
          <th>数量</th>
          <th>小计 (鸡腿)</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartData" :key="item.id">
          <td @click="checkItem(index)">
            <i
              :class="
                item.checked
                  ? 'iconfont icon-xuanzekuang'
                  : 'iconfont icon-xuanzekuang-duoxuanweixuan'
              "
            ></i>
          </td>
          <td>
            <section>
              <img width="84" :src="imgUrl + item.coverImg" alt="列表图片" />
              <div class="info">
                <h5>{{ item.title }}</h5>
                <p>{{ item.versionDescription }}</p>
              </div>
            </section>
          </td>
          <td>{{ item.coin }}鸡腿</td>
          <td>
            <div class="step">
              <span @click="step(index, -1)">-</span>
              <input type="text" disabled v-model="item.total" />
              <span @click="step(index, 1)">+</span>
            </div>
          </td>
          <td>{{ item.totalCost }}鸡腿</td>
          <td @click="deleteCartInfo(item.id)">
            <span class="del">删除</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="total">
      总计：<span>{{ totalCoin }}鸡腿</span>
    </div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>
<script>
import { getCartInfoAPI, deleteCartInfoAPI } from "@/api/data";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      stepNum: 1,
      // 全选
      checkAll: false,
      // 单选按钮数组
      checkList: [],
      cartData: [],
      submitData: []
    };
  },
  mounted() {
    this.getCartInfo();
  },
  computed: {
    totalCoin() {
      let totalCoin = 0;
      for (let i = 0; i < this.cartData.length; i++) {
        if (this.cartData[i].checked) {
          totalCoin += this.cartData[i].total * this.cartData[i].coin;
        }
      }
      return totalCoin;
    },
  },
  methods: {
    ...mapMutations(["changeCartTotal"]),
    async getCartInfo() {
      let res = await getCartInfoAPI();
      // console.log(res);
      this.cartData = res.data;
      for (let i = 0; i < this.cartData.length; i++) {
        this.$set(this.cartData[i], "checked", false);
      }
    },
    async deleteCartInfo(id) {
      let res = await deleteCartInfoAPI(id);
      console.log(res);
      if (res.code == 0) {
        this.getCartInfo();
        this.changeCartTotal(this.cartData.length - 1);
      }
    },
    clickToCheckAll() {
      this.checkAll = !this.checkAll;
      if (this.checkAll) {
        for (let i = 0; i < this.cartData.length; i++) {
          this.cartData[i].checked = true;
        }
      } else {
        for (let i = 0; i < this.cartData.length; i++) {
          this.cartData[i].checked = false;
        }
      }
    },
    checkItem(index) {
      let count = 0;
      this.cartData[index].checked = !this.cartData[index].checked;
      for (let i = 0; i < this.cartData.length; i++) {
        if (this.cartData[i].checked) {
          count++;
        }
      }
      if (count == this.cartData.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    step(index, val) {
      if (val == -1 && this.cartData[index].total == 1) {
        return;
      }
      this.cartData[index].total += val;
    },
    submit() {
      for(let i = 0; i< this.cartData.length; i++) {
        if(this.cartData[i].checked) {
          this.submitData.push({
            id: this.cartData[i].id,
            total: this.cartData[i].total
          })
        }
      }
      this.$router.push({path: '/order', query: {submitData: JSON.stringify(this.submitData)}})
    }
  },
};
</script>
<style lang="less" scoped>
@import url(//at.alicdn.com/t/c/font_3818213_tn7zezhk7ym.css);
.cart_page {
  background: #fff;
  table {
    width: 100%;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    color: #666;
    border-collapse: collapse;
    font-size: 14px;
    thead {
      background: #f2f2f2;
      th {
        padding: 19px 0;
        .iconfont {
          cursor: pointer;
        }
        .icon-yduifuxuankuangxuanzhong {
          color: #0a328e;
        }
      }
    }
    tbody {
      tr {
        td {
          vertical-align: middle;
          text-align: center;
          padding: 19px 0;
          table-layout: fixed; // td的宽度固定，不随内容变化
          .iconfont {
            cursor: pointer;
          }
          .icon-yduifuxuankuangxuanzhong {
            color: #0a328e;
          }
          section {
            padding-left: 20px;
            display: flex;
            box-sizing: border-box;
            img {
              margin-right: 12px;
            }
            .info {
              padding-top: 20px;
              flex: 1;
              overflow: hidden;
              box-sizing: border-box;
              text-align: left;
              h5 {
                overflow: hidden;
                color: #333;
                font-size: 18px;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: 20px;
              }
              p {
                color: #666;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
          .step {
            width: 106px;
            height: 32px;
            margin: auto;
            span {
              float: left;
              width: 30px;
              height: 32px;
              display: block;
              border: solid 1px #d1d1d1;
              font-size: 20px;
              box-sizing: border-box;
              font-weight: normal;
              font-stretch: normal;
              line-height: 30px;
              letter-spacing: 0px;
              color: #999999;
              text-align: center;
              cursor: pointer;
              background: #fff;
            }
            input {
              box-sizing: border-box;
              width: 46px;
              height: 32px;
              float: left;
              text-align: center;
              font-size: 14px;
              line-height: 23px;
              letter-spacing: 0px;
              color: #666666;
              border: 0;
              border-top: 1px solid #d1d1d1;
              border-bottom: 1px solid #d1d1d1;
              background: #fff;
            }
          }
          .del {
            border: 1px solid #ececec;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;
            &:hover {
              color: #fff;
              background: #0a328e;
            }
          }
        }
      }
    }
  }
  .total {
    padding: 30px 0;
    text-align: right;
    font-size: 22px;
    span {
      font-weight: bold;
      color: #fd604d;
    }
  }
  .submit {
    width: 175px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-family: SourceHanSansSC-Light;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    cursor: pointer;
    background-color: #0a328e;
    float: right;
  }
}
</style>