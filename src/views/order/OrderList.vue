<template>
    <div class="order-list">
        <nav-bar>
            <template v-slot:default>订单列表</template>
        </nav-bar>
        <van-tabs @click-tab="onChangeTab" style="margin-top: 45px;" v-model:active="state.active">
            <van-tab title="全部"></van-tab>
            <van-tab title="待付款"></van-tab>
            <van-tab title="已支付"></van-tab>
            <van-tab title="发货"></van-tab>
            <van-tab title="交易完成"></van-tab>
            <van-tab title="过期"></van-tab>
            <div>
                <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
                    <van-list
                        v-model:loading="state.loading"
                        :finished="state.finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                        <div v-for="itme in state.list" :key="itme.id" style="margin-top:15px;">
                            <div @click="goTo(itme.id)">
                                <div>
                                    <span class="title">订单编码：</span>
                                    <span class="info">{{ itme.created_at }}</span>
                                </div>
                                <div>
                                    <span class="title">下单时间：</span>
                                    <span class="info">{{ itme.order_no }}</span>
                                </div>
                                <van-card
                                    v-for="(p, index) in itme.orderDetails.data"
                                    :key="index"
                                    :num="p.num"
                                    :price="p.goods.price + '.00'"
                                    desc="全场包邮"
                                    :title="p.goods.title"
                                    :thumb="p.goods.cover_url"
                                />
                            </div>
                        </div>
                    </van-list>
                </van-pull-refresh>
            </div>
        </van-tabs>
    </div>
</template>

<script setup>
import NavBar from '../../components/common/navbar/NavBar.vue';
import TabControl from '../../components/content/tabControl/TabControl.vue';
import MyNav from '../../components/common/MyNav/MyNav.vue';
import { onMounted, reactive, ref } from 'vue';
import { Toast } from 'vant';
import { getOrederList } from '../../network/order';
import { useRouter } from 'vue-router';
const router = useRouter();
const state = reactive({
    list: [],
    loading: false,
    finished: false,
    refreshing: false,
    active: 0,
    page: 1,
    totalPage: 0,
    status: 0
})
const loadData = () => {
    getOrederList({
        page: state.page,
        status: state.status,
        include: 'orderDetails.goods'
    }).then(res => {
        state.list = state.list.concat(res.data);
        state.loading = false;
        state.totalPage = res.meta.pagination.total_pages;
        if (!state.refreshing || state.page >= state.totalPage) {
            state.finished = true;
        }
    })
};
const onLoad = () => {
    if (state.page < state.totalPage) {
        state.page += 1;
    }
    if (state.refreshing) {
        state.list = [];
        state.refreshing = false;
    }
    loadData();
}
onMounted(() => {
    onRefresh();
})
const onRefresh = () => {
    state.refreshing = true;
    // 清空列表数据
    state.finished = false;
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    state.loading = true;
    state.page = 1;
    onLoad();
};
const goTo = (id) => {
    router.push({
        path: '/orderdetail',
        query: { id }
    });
}
const onChangeTab = ({ name }) => {
    state.status = name;
    onRefresh();
}
</script>

<style lang="scss" scoped>
.van-list {
    div {
        padding: 5px 20px;
        .title {
            color: #7f8fa6;
        }
    }
}
</style>