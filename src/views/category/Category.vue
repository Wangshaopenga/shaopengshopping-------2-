<template>
  <div class="category">
    <nav-bar>
      <template v-slot:default>商品分类</template>
    </nav-bar>

    <div id="mainbox">
      <div class="ordertab">
        <van-tabs v-model:active="sortActive" @click-tab="onClickTab">
          <van-tab title="价格排序"></van-tab>
          <van-tab title="销量排序"></van-tab>
          <van-tab title="评价排序"></van-tab>
        </van-tabs>
      </div>
      <van-sidebar class="leftmenu van-sidebar" v-model="fatherActive">
        <van-collapse v-model="sonActive" accordion>
          <van-collapse-item
            v-for="itme in categories"
            :key="itme.pid"
            :title="itme.name"
            :name="itme.name"
          >
            <van-sidebar-item
              v-for="p in itme.children"
              :key="p.id"
              :title="p.name"
              @click="getGoods(p.id)"
            />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>
      <div class="goodslist">
        <div class="content">
          <van-card
            v-for="itme in showGoods"
            :key="itme.id"
            @click="itmeClick(itme.id)"
            :num="itme.comments_count"
            :tag="itme.comments_count >= 0 ? '流行' : '畅销'"
            :price="itme.price"
            :title="itme.title"
            :thumb="itme.cover_url"
            :lazy-load="true"
            :origin-price="itme.price + 10"
          />
        </div>
      </div>
    </div>
    <my-nav></my-nav>
  </div>
</template>

<script setup>
import MyNav from '../../components/common/MyNav/MyNav.vue';
import { getCategory, getCategoryGoods } from "../../network/category";
import { computed, onMounted, reactive, ref } from 'vue';
import NavBar from 'components/common/navbar/NavBar.vue';
import { useRouter } from "vue-router";
let router = useRouter();
let fatherActive = ref(0);
let categories = ref([]);
let sonActive = ref(1);
let sortActive = ref(0);
//当前排序条件 
let currentOrder = ref('sales');
//当前分类id
let currentCid = ref(0);
//排序展示数据模型
let goods = reactive({
  sales: { page: 1, list: [] },
  price: { page: 1, list: [] },
  comments_count: { page: 1, list: [] },
})
//获取排序数据
const init = (page) => {
  getCategoryGoods('sales', currentCid.value, page).then(res => {
    goods.sales.list = res.goods.data;
  })
  getCategoryGoods('peice', currentCid.value, page).then(res => {
    goods.price.list = res.goods.data;
  })
  getCategoryGoods('comments_count', currentCid.value, page).then(res => {
    goods.comments_count.list = res.goods.data;
  })
}
//通过分类得到商品
const getGoods = (cid) => {
  currentCid.value = cid;
  init(cid);
  console.log(goods);
}
//通过计算属性展示排序的不同内容
const showGoods = computed(() => {
  return goods[currentOrder.value].list
})
//排序选项卡
const onClickTab = (index) => {
  let orders = ['sales', 'price', 'comments_count'];
  currentOrder.value = orders[index.name];
  getCategoryGoods(currentOrder.value, currentCid.value, index).then(res => {
    goods[currentOrder.value].list = res.goods.data;
  })
}
//设置点击进入商品详情
const itmeClick = (id) => {
  router.push({ path: '/detail', query: { id } });
}
onMounted(() => {
  getCategory().then(res => {
    categories.value = res.categories;
  });
  getCategoryGoods('sales', currentCid.value).then(res => {
    goods.sales.list = res.goods.data;
  })
})
</script>

<style lang="scss" scoped>
#mainbox {
  margin-top: 45px;
  display: flex;
  .ordertab {
    float: right;
    height: 50px;
    position: fixed;
    top: 45px;
    right: 0;
    left: 130px;
    z-index: 10;
  }
  .leftmenu {
    width: 130px;
    position: fixed;
    top: 95px;
    left: 0;
  }
  .goodslist {
    height: 200px;
    flex: 1;
    position: absolute;
    left: 130px;
    right: 0;
    height: 100vh;
    top: 95px;
    padding: 15px;
    .content {
      width: 100%;
      &:last-child {
        margin-bottom: 50px;
      }
    }
  }
  .van-card {
    --van-card-font-size: 14px;
    --van-card-price-font-size: 14px;
    --van-card-origin-price-font-size: 16px;
    --van-card-origin-price-color: red;
  }
}
</style>