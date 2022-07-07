<template>
  <div class="box">
    <nav-bar>
      <template v-slot:default>个人中心</template>
    </nav-bar>
    <div class="user-box">
      <div class="user-info">
        <div class="info">
          <img src="~assets/images/default.jpg" />
          <div class="user-desc">
            <span>昵称：{{ state.user.name }}</span>
            <span>登录邮箱：{{ state.user.email }}</span>
            <span class="name">个性签名：平平淡淡看世界，踏踏实实写人生。</span>
          </div>
        </div>
      </div>
    </div>
    <div class="user-body">
      <van-cell-group>
        <van-cell @click="goTo('/collect')" title="我的收藏" is-link />
        <van-cell @click="goTo('/order')" title="我的订单" is-link />
        <van-cell @click="goTo('/setting')" title="账号管理" is-link />
        <van-cell @click="goTo('/address')" title="地址管理" is-link />
        <van-cell @click="goTo('/about')" title="关于我们" is-link />
      </van-cell-group>
    </div>
    <div class="logout">
      <van-button round type="primary" @click="toLogout">退出登录</van-button>
    </div>
    <my-nav></my-nav>
  </div>
</template>

<script setup>
import MyNav from '../../components/common/MyNav/MyNav.vue';
import NavBar from 'components/common/navbar/NavBar.vue';
import { getUser, logout } from '../../network/user';
import { Dialog, Toast } from 'vant';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { onMounted, reactive } from 'vue';
const router = useRouter();
const store = useStore();
const state = reactive({
  user: {}
});
onMounted(() => {
  getUser().then(res => {
    state.user = res;
  })
})
//跳转方法
const goTo = (path, query) => {
  router.push(path, query || {})
}
//退出
const toLogout = () => {
  Dialog.confirm({
    title: '是否退出登录',
    message:
      '你是否确实要退出当前账号?',
  })
    .then(() => {
      // on confirm
      logout().then(res => {
        if (res.status == '204') {
          Toast('退出成功!')
          //清除token
          store.commit('setIsLogin', false);
          window.localStorage.removeItem('token');
          setTimeout(() => {
            router.push({
              path: '/login'
            })
          }, 1000)
        }
      })
    })
}
</script>

<style lang="scss" scoped>
.box {
  background: #fcfcfc;
  // height: 100vh;
  .user-box {
    margin-top: -25px;
    .user-info {
      width: 94%;
      margin: 10px;
      background: linear-gradient(90deg, #31c7a7, #a1c7c7);
      box-shadow: 0 2px 5px #269090;
      border-radius: 6px;
      text-align: left;
      margin-top: 100px;
      .info {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        padding: 25px 20px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-top: 10px;
          margin-right: 10px;
        }
        .user-desc {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          line-height: 20px;
          font-size: 14px;
          color: #fff;
          span {
            color: #fff;
            font-size: 14px;
            padding: 2px 0;
          }
        }
      }
    }
  }
  .user-body {
    margin-top: 30px;
    padding: 10px;
    .van-cell {
      --van-cell-line-height: 38px;
    }
  }
  .logout {
    margin-top: 30px;
    margin-left: 55px;
    .van-button {
      background: #31c7a7;
      font-size: 24px;
      width: 300px;
      height: 60px;
    }
  }
}
</style>