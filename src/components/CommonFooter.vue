<template>
  <footer>
    <div class="w">
      <div class="info">
        <img src="@/assets/img/slogan.png" alt="" />
        <p>
          叩丁狼是一家专注于培养高级IT技术人才，为学员提供定制化IT职业规划方案及
        </p>
        <p>
          意见咨询服务的教育科技公司，为您提供海量优质课程，以及创新的线上线下学
        </p>
        <p>习体验，帮助您获得全新的个人发展和能力提升。</p>
      </div>
      <div class="more">
        <li>微信公众号</li>
        <span>|</span>
        <li>新浪微博</li>
        <span>|</span>
        <li>在线客服</li>
      </div>
      <div class="contact">
        <p>全国免费咨询热线：</p>
        <h2>020-85628002</h2>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "CommonFooter",
};
</script>

<style lang="less" scoped>
footer {
  background: #242b39;
  color: #7d879a;

  .w {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info {
      height: 240px;
      img {
        margin-top: 33px;
        margin-bottom: 27px;
      }
      p {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 1.4;
      }
      p:last-child {
        text-align: left;
      }
    }
    .more {
      display: flex;
      justify-content: center;
      line-height: 240px;
      li {
        cursor: pointer;
        font-size: 16px;
        padding-right: 18px;
        padding-left: 18px;
        height: 19px;
      }
    }
    .contact {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        font-size: 14px;
        font-family: Microsoft YaHei;
        margin-bottom: 10px;
        color: #7d879a;
      }
      h2 {
        color: #fff;
        font-size: 28px;
        font-weight: 700;
      }
    }
  }
}
</style>