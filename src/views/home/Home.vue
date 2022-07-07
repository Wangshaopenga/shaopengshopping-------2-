<template>
  <div class="home">
    <tab-control v-show="isShowBackTop" @tabControl="tabClick" :titles="['畅销', '新书', '精选']"></tab-control>
    <nav-bar>
      <template v-slot:default></template>
    </nav-bar>
    <div class="wrapper">
      <div class="content">
        <div ref="banref">
          <home-swiper style="margin-top: 45px;" :banners="banners" />
          <recommend-view :recommends="recommends"></recommend-view>
        </div>
        <tab-control @tabControl="tabClick" :titles="['畅销', '新书', '精选']" class="tab-control"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </div>
    </div>
    <back-top @bTop="bTop" v-show="isShowBackTop"></back-top>
    <my-nav></my-nav>
  </div>
</template>

<script setup>
import MyNav from '../../components/common/MyNav/MyNav.vue';
import NavBar from 'components/common/navbar/NavBar.vue';
import RecommendView from './Childcomps/Recommend.vue';
import TabControl from 'components/content/tabControl/TabControl.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';
import BackTop from '../../components/common/BackTop/BackTop.vue';
import HomeSwiper from './Childcomps/HomeSwiper.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { getHomeAllData, getHomeGoods } from "network/home";
import { useStore } from 'vuex';
import BScroll from 'better-scroll'
//控制上拉显示更多数据后显示TabControl
let isShowTabcontrol = ref(false);
//控制是否显示返回顶部
let isShowBackTop = ref(false);
let banref = ref(null);
//设置轮播图数据
let banners = ref([])
//推荐商品数据模型
let recommends = ref([]);
//商品列表数据模型
const goods = reactive({
  sales: { page: 1, list: [] },
  new: { page: 1, list: [] },
  recommend: { page: 1, list: [] },
})
const store = new useStore();
let tabIndex = store.tabIndex;
//请求的商品数据类型
let currentType = ref('sales');
const showGoods = computed(() => {
  return goods[currentType.value].list;
})
let bscroll = reactive({});
onMounted(() => {
  getHomeAllData().then(res => {
    recommends.value = res.goods.data;
    banners.value = res.slides;
  });
  getHomeGoods('sales').then(res => {
    goods.sales.list = res.goods.data;
  });
  getHomeGoods('recommend').then(res => {
    goods.recommend.list = res.goods.data;
  });
  getHomeGoods('new').then(res => {
    goods.new.list = res.goods.data;
  });
  //设置上拉获取更多
  bscroll = new BScroll('.wrapper', {
    probeType: 3, //3只要运动就触发scroll事件
    click: true, //是否允许点击
    pullUpLoad: true //上拉加载更多默认是false
  });
  //触发滚动事件
  bscroll.on('scroll', (position) => {
    isShowBackTop.value = isShowTabcontrol.value = (-position.y) > (banref.value.offsetHeight);
  })
  //上拉加载数据。触发pullingup
  bscroll.on("pullingUp", () => {
    const page = goods[currentType.value].page + 1;
    getHomeGoods(currentType.value, page).then(res => {
      goods[currentType.value].list.push(...res.goods.data);
      goods[currentType.value].page += 1;
    })
    //完成上拉,等数据请求完成,将数据展示出来
    bscroll.finishPullUp();
    bscroll.refresh();
  })
})
//设置点击切换分类函数 切换新书畅销精选等
const tabClick = (index) => {
  let types = ['sales', 'new', 'recommend'];
  currentType.value = types[index];

  // nextTick(() => {
  //   //重新计算高度
  //   bscroll && bscroll.refresh();
  // })
}

//监听任一一个变量
// watchEffect(() => {
//   //Dom渲染完才会执行
//   nextTick(() => {
//     //重新计算高度
//     bscroll && bscroll.refresh();
//   })
// })

const bTop = () => {
  bscroll.scrollTo(0, 0, 500);
}
</script>


<style lang="scss" scoped>
.banners {
  img {
    width: 100%;
    height: 150px;
    margin-top: 45px;
  }
}
.home {
  height: 100vh;
  position: relative;
  .wrapper {
    position: absolute;
    top: 45px;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
    // background: red;
  }
  // .content {
    // .tab-control {
      // position: sticky;
      // top: 55px;
    // }
  // }
}
</style>