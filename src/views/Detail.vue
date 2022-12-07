<template>
  <div class="details">
    <div class="w">
      <!--面包屑组件-->
      <common-tag :tags="tags" />
      <main>
        <div class="content">
          <div class="l">
            <div class="bigImg">
              <img :src="imgUrl + productInfo.coverImg" />
            </div>
            <ul>
              <li
                @mouseenter="showImg(item)"
                v-for="(item, index) in productInfo.imgAltas"
                :key="index"
              >
                <img width="100%" height="100%" :src="imgUrl + item.src" />
              </li>
            </ul>
          </div>
          <div class="r">
            <div class="top">
              <h2>{{ productInfo.seriesTitle }}</h2>
              <p>{{ productInfo.seriesSubTitle }}</p>
              <div class="score">{{ productInfo.coin }}积分</div>
            </div>
            <div class="down">
              <section
                v-for="(item, index) in productInfo.parameterJson"
                :key="index"
              >
                <strong>{{ item.title }}</strong>
                <ul>
                  <li
                    @click="productDetail(it.id)"
                    :class="it.currentActivate ? 'active' : ''"
                    v-for="it in item.parameters"
                    :key="it.id"
                  >
                    {{ it.title }}
                  </li>
                </ul>
              </section>
              <div style="margin: 10px 0">
                <strong
                  >数量 <span>*礼品库存{{ productInfo.stock }}件</span></strong
                >
                <div class="step">
                  <div class="reduce" @click="stepLimit(-1)">-</div>
                  <input type="text" disabled v-model="stepNum" />
                  <div class="add" @click="stepLimit(1)">+</div>
                </div>
              </div>
              <div class="btns">
                <div class="addToCart" @click="addToCart">加入购物车</div>
                <div class="buyNow">立即购买</div>
              </div>
            </div>
          </div>
        </div>
        <aside>
          <h3>你还可以兑换</h3>
          <ul>
            <li v-for="item in more" :key="item.id" @click="changePage(item)">
              <div class="l">
                <img :src="imgUrl + item.img" alt="" />
              </div>
              <div class="r">
                <div class="title">{{ item.name }}</div>
                <div class="score">
                  <span>{{ item.coin }}</span> 积分
                </div>
              </div>
            </li>
          </ul>
        </aside>
      </main>
      <ul class="tabs">
        <li :class="isShow ? 'active' : ''" @click="isShow = true">礼品详情</li>
        <li :class="!isShow ? 'active' : ''" @click="isShow = false">
          常见问题
        </li>
      </ul>
      <div
        style="text-align: left"
        v-html="productInfo.description"
        v-show="isShow"
      >
        <!-- 商品详情的内容盒子 -->
      </div>
      <div class="issue" v-show="!isShow">
        <!-- 常见问题的内容盒子 -->
        <h4>兑换后运费如何收取？</h4>
        <p>
          商城内大部分实物产品均可包邮，也支持上门自提。虚拟产品则无需运费，可在兑换后直接使用。
        </p>
        <p class="mb20">
          （注：新疆，西藏，内蒙古，青海，海南，宁夏暂不支持包邮，在此地区兑换商品需提前与客服确认运费。）
        </p>
        <h4>如何申请退换货？</h4>
        <p>所有产品均为鸡腿兑换礼品，无质量问题不支持退换货；</p>
        <p>如因喜好不同，或到货后后悔等原因，不支持退货；</p>
        <p>
          因客户原因如联系方式有误、电话停机、不接电话、无理由拒收等造成快件无法正常签收的情况，叩丁狼均不进行补发或赔付；
        </p>
        <p>
          如因质量问题需要退货，将由客服人员与客户联系，确认邮寄地址与流程。退回物品不得有人为损坏或使用痕迹，否则拒绝退换；
        </p>
        <p class="mb20">
          如顾客选择自行寄回商品，请先垫付运费，到货验证商品后，叩丁狼将以鸡腿发放形式为用户报销运费，不接受单方面到付件。
        </p>
        <h4>如何开具发票？</h4>
        <p>叩丁狼积分商城产品均为定制礼品，使用积分兑换的产品均不支持开票。</p>
        <h4>关于鸡腿价格问题</h4>
        <p class="mb20">
          因可能存在系统缓存、页面更新延迟等不确定性情况，导致价格显示异常，商品具体售价请以订单结算页价格为准。如您发现异常情况出现，请立即联系我们补正，以便您能顺兑换。
        </p>
        <h4>联系我们</h4>
        <p>www.wolfcode.cn</p>
        <p class="mb20">微信公众号搜索“叩丁狼”</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getProductDetailAPI, addToCartAPI, getUserInfoAPI } from "../api/data";
import CommonTag from "../components/CommonTag.vue";
export default {
  components: {},
  data() {
    return {
      stepNum: 1 /**数量数据 */,
      productInfo: {},
      more: {},
      isShow: true,
      tags: [],
    };
  },
  components: {
    CommonTag,
  },
  created() {
    let id = this.$route.query.id;
    // let productDetail = await getProductDetail(id);
    this.productDetail(id);
  },
  methods: {
    ...mapMutations(["changeCartTotal"]),
    async productDetail(id) {
      let data = await getProductDetailAPI(id);
      this.tags = data.data.nav;
      this.productInfo = data.data.productInfo;
      this.more = data.data.themYouCanBuy;
      this.productInfo.description = this.productInfo.description.replaceAll(
        "upload",
        this.imgUrl + "/upload"
      );
    },
    showImg(item) {
      this.productInfo.coverImg = item.src;
    },
    changePage(item) {
      this.$router.push(`/detail?id=${item.id}`);
      this.productDetail(item.id);
    },
    async addToCart() {
      let res = await addToCartAPI({
        productId: this.$route.query.id,
        total: this.stepNum,
        modified: 1,
      });
      console.log(res);
      if (res.code == 0) {
        let userInfo = await getUserInfoAPI();
        this.changeCartTotal(userInfo.data.cartTotal);
      } else {
        alert("您还没登录呢");
      }
    },
    stepLimit(val) {
      if (
        (val == -1 && this.stepNum == 1) ||
        (val == 1 && this.stepNum >= this.productInfo.stock)
      ) {
        return;
      }
      this.stepNum = this.stepNum + val;
    },
  },
};
</script> 

<style lang = "less" scoped>
.details {
  background-color: #f5f5f5;
  main {
    margin-bottom: 52px;
    display: flex;
    .content {
      width: 884px;
      display: flex;
      justify-content: space-between;
      .l {
        .bigImg {
          width: 459px;
          height: 440px;
          /* background-color: #fcf; */
          margin-bottom: 21px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        ul {
          width: 459px;
          display: flex;
          justify-content: space-between;
          li {
            width: 100px;
            height: 100px;
            /* background-color: #cff; */
            cursor: pointer;
            img {
              filter: brightness(50%);
            }
            &:hover {
              img {
                filter: brightness(100%);
              }
            }
          }
        }
      }
      .r {
        text-align: left;
        padding: 7px 49px 0 31px;
        .top {
          padding-bottom: 23px;
          border-bottom: 1px solid #ececec;
          h2 {
            font-size: 28px;
            color: #000000;
          }
          p {
            margin-top: 15px;
            font-size: 14px;
            font-weight: 300;
            color: #999999;
          }
          .score {
            font-size: 28px;
            font-weight: bold;
            color: #fd604d;
            margin-top: 26px;
          }
        }
        .down {
          padding-top: 19px;
          strong {
            font-weight: 300;
            color: #000000;
            margin-bottom: 14px;
            display: block;
            span {
              color: #666;
              font-size: 14px;
            }
          }
          ul {
            width: 100%;
            overflow: hidden;
            li {
              padding: 5px 10px;
              cursor: pointer;
              height: 32px;
              float: left;
              text-align: center;
              line-height: 32px;
              color: #666666;
              border: 1px solid #d1d1d1;
              margin-right: 20px;
              margin-bottom: 11px;
              &.active {
                border-color: #0a328e;
                color: #0a328e;
              }
            }
          }
          .step {
            background: #fff;
            width: 106px;
            margin-bottom: 24px;
            height: 32px;
            display: flex;
            justify-content: space-between;
            .reduce,
            .add {
              width: 30px;
              text-align: center;
              line-height: 32px;
              height: 32px;
              cursor: pointer;
              box-sizing: border-box;
              border: 1px solid #ccc;
              user-select: none;
            }
            input {
              width: 46px;
              height: 32px;
              user-select: none;
              border: 0;
              box-sizing: border-box;
              border-top: 1px solid #ccc;
              padding: 0;
              text-indent: 1.5em;
              outline: none;
              border-bottom: 1px solid #ccc;
            }
          }
          .btns {
            display: flex;
            margin-bottom: 25px;
            div {
              width: 150px;
              height: 46px;
              line-height: 46px;
              text-align: center;
              margin-right: 19px;
              cursor: pointer;
              color: #fff;
              &.addToCart {
                background: #3dc36b;
              }
              &.buyNow {
                background: #fd604d;
              }
            }
          }
          .love_share {
            display: flex;
            .love {
              display: flex;
              align-items: center;
              padding-right: 16px;
              border-right: 1px solid #666;
              img {
                margin-right: 12px;
              }
              span {
                color: #666666;
              }
            }
            .share {
              padding-left: 18px;
            }
          }
        }
      }
    }
    aside {
      text-align: left;
      padding-left: 19px;
      box-sizing: border-box;
      width: 230px;
      border-left: 1px solid #ddd;
      h3 {
        font-size: 18px;
        color: #333333;
        margin-bottom: 20px;
      }
      ul {
        li {
          margin-bottom: 30px;
          display: flex;
          cursor: pointer;
          justify-content: space-between;
          .l {
            width: 80px;
            height: 80px;
            margin-right: 10px;
            /* background-color: #ffc; */
            img {
              width: 100%;
              display: block;
              border: 1px solid transparent;
            }
          }
          .r {
            width: 140px;
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            .title {
              /* 超出一行变省略号 */
              text-overflow: ellipsis;
              width: 100%;
              font-weight: bold;
              overflow: hidden;
              white-space: nowrap;
              font-size: 14px;
              color: #666666;
            }
            .score {
              color: #666666;
              span {
                font-weight: bold;
                font-size: 18px;
                color: #ff5e0f;
              }
            }
          }
          &:hover {
            img {
              border: 1px solid #0a328e;
            }
            .title {
              color: #0a328e;
            }
          }
        }
      }
    }
  }
  .tabs {
    border-top: 1px solid #ececec;
    display: flex;
    width: 100%;
    margin-bottom: 27px;
    li {
      width: 120px;
      height: 50px;
      cursor: pointer;
      background: #fff;
      text-align: center;
      line-height: 50px;
      &.active {
        font-weight: bold;
        background: #0a328e;
        color: #fff;
      }
    }
  }
  .issue {
    text-align: left;
    padding-bottom: 40px;
    h4 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
      margin-top: 20px;
    }
    p {
      line-height: 1.4em;
    }
  }
}
</style>