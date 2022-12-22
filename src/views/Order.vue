<template>
  <div class="affirm-body">
    <div class="affirm-header"></div>
    <!--  订单中心  -->
    <div class="affirm-center">
      <div class="affirm-header-content">
        <span class="affirm" style="text-align: left">确认订单</span>
        <img src="../assets/img/arrow.png" alt="" />
      </div>
      <div class="affirm-content-body">
        <div class="affirm-delivery">
          <div class="affirm-delivery-header">确认收货地址,收货人,联系方式</div>
        </div>
        <!--已经写的地址START-->
        <!--已经写过的地址END-->
        <div class="affirm-delivery-content">
          <div class="affirm-list" id="addressData"></div>
          <span class="addressList">更多地址</span>
          <p class="remind">
            *港澳台及西藏地区暂不支持发货
            新疆，西藏，内蒙古，青海，海南，宁夏暂不支持包邮
          </p>
          <div class="add-address">
            <button class="layui-btn layui-btn-primary">
              <i class="layui-icon">+</i>新增收货地址
            </button>
          </div>
        </div>
      </div>
      <div class="affirm-content-shopping">
        <div class="affirm-tables">
          <table
            class="layui-table"
            lay-skin="line"
            id="shopping-trolley-table"
            lay-filter="shopTable"
          >
            <thead>
              <tr>
                <th style="width: 30%">礼品信息</th>
                <th style="width: 20%">兑换分数</th>
                <th style="width: 20%">数量</th>
                <th style="width: 30%">小计 (鸡腿)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item,index in orderInfo" :key="index">
                <td>
                  <section>
                    <img
                      width="84"
                      :src="imgUrl+item.coverImg"
                      alt="列表图片"
                    />
                    <div class="info">
                      <h5>{{item.title}}</h5>
                      <p>{{item.versionDescription}}</p>
                    </div>
                  </section>
                </td>
                <td>{{item.coin}}鸡腿</td>
                <td>
                  <div class="step">{{item.total}}</div>
                </td>
                <td>{{item.totalConst}}鸡腿</td>
              </tr>
            </tbody>
          </table>
          <div class="layui-form-item layui-form-text affirm-form">
            <label class="layui-form-label">留言备注: </label>
            <div class="layui-input-block">
              <textarea
                name="desc"
                placeholder="选填 (60字内)"
                class="layui-textarea"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="shopping-allnumber">
          <h2 class="shopping-texts">
            总计:
            <span class="text-number"><span class="myPoints">0</span>鸡腿</span>
          </h2>
          <button class="shop-submit" onclick="submitCommodity(this)">
            确认订单
          </button>
        </div>
      </div>
    </div>
    <div class="affirm-footer"></div>

    <!--  新增收货地址弹出层  -->
    <div class="delivery-address" id="delivery-address" hidden>
      <form class="layui-form" action="" lay-filter="example">
        <div class="layui-form-item">
          <label class="layui-form-label">收件人: </label>
          <div class="layui-input-block">
            <input
              type="text"
              name="name"
              maxlength="10"
              required
              lay-verify="required"
              placeholder="请输入您的姓名"
              autocomplete="off"
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">手机号码: </label>
          <div class="layui-input-block">
            <input
              type="text"
              name="phone"
              maxlength="11"
              lay-verify="required|phone"
              placeholder="请输入您的联系方式"
              autocomplete="off"
              class="layui-input"
              onkeyup="value=value.replace(/[^0-9]+/,'')"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">地区选择: </label>
          <div class="layui-input-inline">
            <select
              name="province"
              lay-verify="required"
              lay-filter="affirmData"
              id="province"
            ></select>
          </div>
          <div class="layui-input-inline">
            <select
              name="city"
              lay-verify="required"
              lay-filter="cityData"
              id="city"
            ></select>
          </div>
          <div class="layui-input-inline">
            <select name="county" lay-verify="required" id="county"></select>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">详细地址: </label>
          <div class="layui-input-block">
            <textarea
              type="text"
              name="address"
              maxlength="150"
              required
              lay-verify="required"
              placeholder="请输入您的地址"
              autocomplete="off"
              class="layui-textarea"
            ></textarea>
            <!--<input type="text" name="address" maxlength="150" required lay-verify="required" placeholder="请输入您的地址" autocomplete="off" class="layui-input">-->
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-input-block">
            <button
              class="layui-btn affirm-btn"
              lay-submit=""
              type="button"
              lay-filter="formDemo"
              id="submitData"
            >
              确认
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { orderDataAPI } from '@/api/data';
export default {
  data() {
    return {
      orderInfo: []
    };
  },
  mounted() {
    this.orderCarts();
  },
  methods: {
    async orderCarts() {
      let submitData = JSON.parse(this.$route.query.submitData);
      console.log("勾选商品", submitData);
      let res = await orderDataAPI(submitData)
      console.log(res);
      if(res.code == 0) {
        this.orderInfo = res.data
      }
    },
  },
};
</script>

<style lang = "less" scoped>
@import url("../assets/css/layui/css/layui");
* {
  margin: 0;
  padding: 0;
  border: none;
  list-style: none;
}
html,
body {
  max-width: 1920px;
  min-width: 1200px;
  margin: 0 auto;
  background: #fff;
  font-family: SourceHanSansSC-Light;
}
a {
  text-decoration: none;
  cursor: pointer;
}
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
}
.affirm-center {
  width: 1200px;
  margin: 0 auto;
  padding: 45px 0 76px 0;
  box-sizing: border-box;
}
.affirm-header-content {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.affirm {
  font-size: 20px;
  color: #333;
  flex: 1;
}
.affirm-content-body {
  width: 100%;
  margin-top: 25px;
  border: 1px solid #e7e7e7;
}
.affirm-delivery-header {
  height: 58px;
  line-height: 58px;
  color: #666;
  font-size: 14px;
  text-align: left;
  padding: 0 18px;
  box-sizing: border-box;
  background: #e7e7e7;
}
.affirm-list {
  padding: 0 16px;
  box-sizing: border-box;
  max-height: 207px;
  overflow-y: auto;
}
.affirm-list-child {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 68px;
  justify-content: center;
  border-bottom: 1px solid #e7e7e7;
  display: none;
}
.affirm-list-show {
  display: flex;
}
.text {
  color: #666;
  font-size: 14px;
  padding-left: 15px;
  box-sizing: border-box;
}
.text-dizi {
  padding: 0 42px;
  box-sizing: border-box;
}
.content-btns {
  flex: 1;
  text-align: right;
}
.curBtn {
  width: 73px;
  height: 26px;
  text-align: center;
  font-size: 14px;
  color: #666;
  line-height: 26px;
  background: #e7e7e7;
  margin-left: 18px;
}
.activeBtn {
  background: #4a7de7;
  color: #fff;
}
.remind {
  font-family: SourceHanSansSC-Light;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 23px;
  letter-spacing: 0px;
  color: #fd604d;
  padding: 26px 17px;
  box-sizing: border-box;
}
.addressList {
  padding: 5px 10px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #ececec;
  color: #666;
  cursor: pointer;
  margin-top: 15px;
  margin-left: 15px;
  display: none;
}
.add-address {
  text-align: center;
  padding-bottom: 40px;
  box-sizing: border-box;
}
.affirm-content-shopping {
  margin-top: 46px;
}
.affirm-tables {
  /*padding:0 17px;*/
  box-sizing: border-box;
  border: 1px solid #e7e7e7;
}
.layui-table-main .layui-table-cell {
  height: initial;
}
.my-order {
  width: 100%;
}
.layui-border-box.layui-table-view .layui-table td,
.layui-border-box.layui-table-view .layui-table th {
  padding: 19px 0;
  box-sizing: border-box;
}
.layui-table-view {
  border-width: 0 !important;
}
.layui-table,
.layui-table-view {
  margin: 0 !important;
}
.layui-table-view .layui-table td,
.layui-table-view .layui-table th,
.layui-table-view .layui-table-col-set,
.layui-table-fixed-r,
.layui-table-view .layui-table-grid-down,
.layui-table-header,
.layui-table-view .layui-table-page,
.layui-table-tips-main,
.layui-table-view .layui-table-tool,
.layui-table-view .layui-table-total,
.layui-table-view .layui-table-view,
.layui-table-view .layui-table[lay-skin="line"],
.layui-table-view .layui-table[lay-skin="row"] {
  border-width: 0;
}
.layui-table-view .layui-table thead tr {
  background-color: #e7e7e7 !important;
}
.layui-table-view .layui-table tr {
  border-bottom: 1px solid #e7e7e7;
}
.layui-table-view .layui-table tbody tr:hover,
.layui-table-view .layui-table thead tr,
.layui-table-view .layui-table-click,
.layui-table-header,
.layui-table-view .layui-table-hover,
.layui-table-view .layui-table-mend,
.layui-table-view .layui-table-patch,
.layui-table-tool,
.layui-table-view .layui-table-total,
.layui-table-view .layui-table-total tr,
.layui-table-view .layui-table[lay-even] tr:nth-child(even) {
  background-color: #fff;
}
.layui-border-box.layui-table-view .layui-table {
  width: 100%;
}
.commodity-cont {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.commodity-text {
  padding-left: 12px;
  box-sizing: border-box;
}
.commodity-text h2 {
  font-size: 16px;
  color: #333;
}
.commodity-text p {
  font-size: 14px;
  color: #666;
  text-align: left;
}
.statusTpl p,
.handleTpl p {
  font-size: 14px;
  color: #333;
}
.model-number {
  width: 106px;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.model-number span {
  width: 30px;
  height: 32px;
  display: block;
  border: solid 1px #d1d1d1;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: 0px;
  color: #999999;
  text-align: center;
  cursor: pointer;
}
.model-number input {
  width: 46px;
  height: 32px;
  text-align: center;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 23px;
  letter-spacing: 0px;
  color: #666666;
  border-top: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
}
.shopping-allnumber {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.shopping-texts {
  padding: 32px 0 29px 0;
  box-sizing: border-box;
}
.text-number {
  /*width:146px;*/
  padding-right: 18px;
  box-sizing: border-box;
  color: #fd604d;
  display: inline-block;
  text-align: right;
  font-family: SourceHanSansSC-Bold;
  font-size: 24px;
}
.shop-submit {
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
}
.layui-form-item.affirm-form {
  padding: 18px 17px 0;
  border-top: 1px solid #e7e7e7;
  box-sizing: border-box;
  margin-bottom: 0;
}
.affirm-form .layui-form-label {
  width: initial;
  padding: 0;
}
.affirm-form .layui-input-block {
  margin-left: 70px;
}
.affirm-form .layui-textarea {
  height: 50px;
  border: none;
  resize: none;
  padding: 0;
}
.delivery-address {
  padding: 35px 170px 0;
  box-sizing: border-box;
}
.layui-layer-page .layui-layer-title {
  height: 70px;
  line-height: 70px;
}
.layui-layer-page .layui-layer-setwin {
  top: 29px;
}
.layui-input-block .affirm-btn {
  width: 140px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #fff;
  margin-top: 20px;
  background-color: #0a328e;
}
.delivery-address .layui-form-item .layui-input-inline {
  width: 96px;
}
.layui-form-item .layui-form-label {
  width: 70px;
}
.layui-form-item .layui-input-block {
  margin-left: 90px;
}
/*.layui-input, .layui-textarea{*/
/*width: 338px;*/
/*}*/
.delivery-address .layui-form-item {
  margin-bottom: 18px;
}
.add-address .layui-btn-primary:hover {
  border-color: #0a328e;
}
.affirm-body .layui-form-select dl dd.layui-this {
  background-color: #4a7de7;
}
.affirm-body .layui-form-checked[lay-skin="primary"] i {
  border-color: #4a7de7 !important;
  background-color: #4a7de7;
}
.affirm-body .layui-form-checkbox[lay-skin="primary"]:hover i {
  border-color: #4a7de7;
}
.layui-layer .layui-layer-btn .layui-layer-btn0 {
  border-color: #4a7de7;
  background-color: #4a7de7;
}

/*  地址选择按钮  */
.checkBtn {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #e7e7e7;
  display: block;
  position: relative;
}
.activeCheckBtn {
  border: 1px solid #3dc36b;
}
.activeCheckBtn .checkBtnRadios {
  display: block;
}
.checkBtnRadios {
  position: absolute;
  background: #3dc36b;
  background-image: url("../assets/img/radio.png");
  background-size: 10px 8px;
  background-repeat: no-repeat;
  background-position: center;
  left: 0;
  top: 0;
  clear: both;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: none;
}
.delivery-address .layui-textarea {
  resize: none;
}
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
      text-align: center;
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
</style>