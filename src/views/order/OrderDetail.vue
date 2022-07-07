<template>
    <div class="order-detail">
        <nav-bar>
            <template v-slot:default>订单详情</template>
        </nav-bar>
        <div class="header">
            <div>
                <span class="title">订单状态：</span>
                <span class="info">{{ state.statusString }}</span>
            </div>
            <div>
                <span class="title">订单编码：</span>
                <span class="info">{{ state.detail.order_no }}</span>
            </div>
            <div>
                <span class="title">下单时间：</span>
                <span class="info">{{ state.detail.created_at }}</span>
            </div>
        </div>
        <div class="btn">
            <button v-if="state.detail.status == 1" @click="showPayBtn" class="to-pay">去支付</button>
            <button
                v-if="state.detail.status == 2"
                @click="handleConfirmOrder"
                class="confirm-order"
            >确认订单</button>
        </div>
        <div class="main">
            <div>
                <span class="title">商品金额：</span>
                <span class="info">￥{{ state.detail.amount }}.00</span>
            </div>
            <div>
                <span class="title">配送方式：</span>
                <span class="info">普通快递</span>
            </div>
        </div>
        <div class="recommend">
            <van-card
                v-for="itme in state.detail.orderDetails.data"
                :key="itme.id"
                :num="itme.num"
                :price="itme.price + '.00'"
                desc="全程包邮"
                :title="itme.goods.title"
                :thumb="itme.goods.cover_url"
            />
        </div>
        <van-popup
            v-model:show="state.showPay"
            closeable
            position="bottom"
            :style="{ height: '35%' }"
            round
            :close-on-popstate="false"
        >
            <div class="pay">
                <van-grid :border="false" :column-num="2">
                    <van-grid-item>
                        <van-image width="150" height="150" :src="state.aliyunCode" />
                        <div style="margin-top:15px;font-size:18px;">微信支付</div>
                    </van-grid-item>
                    <van-grid-item>
                        <van-image width="150" height="150" :src="state.aliyunCode" />
                        <div style="margin-top:15px;font-size:18px;">支付宝支付</div>
                    </van-grid-item>
                </van-grid>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import NavBar from '../../components/common/navbar/NavBar.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, reactive, onMounted } from 'vue';
import { Dialog, Toast } from 'vant';
import { getOrederDetail, payOreder, confirmOrder, payOrederStatus } from '../../network/order';
const router = useRouter();
const route = useRoute();
const store = useStore();
const state = reactive({
    orderId: '',
    detail: {
        orderDetails: {
            data: []
        },
    },
    showPay: false,
    aliyunCode: '',
    wechatCode: ''
})
const init = () => {
    const { id } = route.query;
    state.orderId = id;
    getOrederDetail(id).then(res => {
        console.log(res);
        state.detail = res;
    })
}
//支付
const showPayBtn = () => {
    state.showPay = true;
    //获取支付宝二维码
    payOreder(state.orderId, { type: 'aliyun' }).then(res => {
        state.aliyunCode = res.qr_code_url;
        state.wechatCode = res.qr_code_url;
    })
    const timer = setInterval(() => {
        payOrederStatus(state.orderId).then(res => {
            console.log(res);
            setTimeout(() => { }, 5000)
            if ('res' == '2') {
                state.showPay = false;
                router.push({
                    path: '/orderdetail',
                    query: { id: state.orderId }
                });
                clearInterval(timer);
            }
        })
    }, 2000)
}
//确认收货
const handleConfirmOrder = () => {
    Dialog.confirm({
        title: '确认收货',
        message: '是否确认收货?',
    }).then(() => {
        confirmOrder(state.orderId).then(res => {
            Toast.success('确认成功!')
            init();
        })
    }).catch(() => { })
}
onMounted(() => {
    Toast.loading({
        message: '加载中...',
        forbidClick: true
    })
    init();
    Toast.clear();
})
const statusString = computed(() => {
    let status = ['', '已下单', '已支付', '等待发货', '确认收货', '已过期']
    return status[state.detail.status];
})
</script>

<style lang="scss" scoped>
.order-detail {
    .header {
        margin-top: 55px;
        div {
            padding: 5px 20px;
            .title {
                color: #7f8fa6;
            }
        }
    }
    .btn {
        button {
            width: 90%;
            height: 50px;
            margin-top: 20px;
            margin-left: 18px;
            font-size: 17px;
        }
        .to-pay {
            border: none;
            color: #fff;
            background: #38ada9;
        }
        .confirm-order {
            background: #fff;
            border: 0.5px solid rgba(0, 0, 0, 0.1);
        }
    }
    .main {
        margin-top: 55px;
        div {
            padding: 5px 20px;
            .title {
                color: #7f8fa6;
            }
        }
    }
    .recommend {
        margin-top: 25px;
        .van-card {
            font-size: 16px;
        }
    }
    .van-popup {
        .pay {
            margin-top: 50px;
        }
    }
}
</style>