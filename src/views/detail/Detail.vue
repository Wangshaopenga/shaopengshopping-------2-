<template>
  <div class="detail">
    <nav-bar>
      <template v-slot:default>商品详情:{{ id }}</template>
    </nav-bar>
    <van-image style="margin-top:50px;" height="100%" lazy-load :src="detail.cover_url" />
    <van-card
      :num="detail.stock"
      :price="detail.price + '.00'"
      :origin-price="detail.price + 10.00 + '.00'"
      :desc="detail.description"
      :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">新品</van-tag>
        <van-tag plain type="danger">促销</van-tag>
      </template>
      <template #footer>
        <div class="btn">
          <van-button color="#e67e22" size="normal" @click="handleAddCart">加入购物车</van-button>
          <van-button color="#e74c3c" size="normal" @click="goToCart">立即购买</van-button>
        </div>
      </template>
    </van-card>
    <van-tabs v-model:active="active">
      <van-tab title="概述">
        <div class="content" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="热评" style="text-align:center; margin-top:30px;font-size:18px">
        <h1>评论为空</h1>
        <van-button color="#e74c3c" @click="goCollect(id)">收藏</van-button>
      </van-tab>
      <van-tab title="相关图书">
        <goods-list :goods="like_goods"></goods-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import NavBar from 'components/common/navbar/NavBar.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive,  ref,  toRefs } from 'vue';
import { getDetail } from 'network/detail';
import { useStore } from 'vuex'
import GoodsList from 'components/content/goods/GoodsList.vue';
import { addCart } from 'network/cart';
import { Toast } from 'vant';
import { collect } from 'network/collect';
const route = useRoute();
const router = useRouter();
const store = useStore();
const active = ref('true')
let id = ref(0);
//声明商品信息
let book = reactive({
  detail: {},
  like_goods: [],
  comments: [],
});
onMounted(() => {
  id.value = route.query.id;
  getDetail(id.value).then(res => {
    book.detail = res.goods;
    book.like_goods = res.like_goods;
  })
})
const goCollect = (id)=>{
  collect(id).then(res=>{
    if(res.status=='201') {
      Toast.success("收藏成功");
    } else if(res.status=='204') {
      Toast.success("取消收藏成功");
    }
  })
};
const { detail, like_goods } = toRefs(book);
//添加购物车
const handleAddCart = () => {
  addCart({ goods_id: id.value, num: 1 }).then(res => {
    if (res.status == '201') {
      Toast.success('添加成功!');
      //设置store中的cartCount
      store.dispatch('updateCart')
    } else if (res.status == '204') {
      Toast.fail('请勿重复添加!')
    } else if (res.status == '401') {
      Toast.fail('你还没有登陆,请先登录!');
      setTimeout(() => {
        router.push('/login')
      }, 500)
    }
  })
}
//立即购买
const goToCart = () => {
  handleAddCart();
  router.push('/createorder');
}
</script>

<style lang="scss" scoped>
.detail {
  margin-bottom: 50px;
}
.van-card {
  --van-card-font-size: 16px;
  --van-card-origin-price-font-size: 18px;
  --van-card-origin-price-color: red;
  --van-card-price-font-size: 16px;
}
.btn {
  display: flex;
  justify-content: right;
  .van-button {
    --van-button-normal-padding: 10px 35px;
    margin-top: 5px;
    --van-button-normal-font-size: 18px;
  }
}
</style>