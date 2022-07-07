<template>
    <div class="createOrder">
        <nav-bar>
            <template v-slot:default>订单预览</template>
        </nav-bar>
        <div class="body" style="margin-top:60px">
            <div class="info">
                <div>
                    <span>姓名：{{ state.address.name }}</span>
                    <span style="margin-left:20px">电话：{{ state.address.phone }}</span>
                </div>
                <van-icon class="right" @click="goTo" name="arrow" />
                <div style="margin-top:10px">地址：{{ state.address.address }}</div>
            </div>
            <span></span>
            <div class="divider">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="goods-list" style="margin-bottom:55px">
                <div class="goods" v-for="itme in state.cartList" :key="itme.goods_id">
                    <van-card
                        :num="itme.num"
                        :price="itme.goods.price + '.00'"
                        :title="itme.goods.title"
                        :thumb="itme.goods.cover_url"
                    />
                </div>
            </div>
            <div class="submitBar">
                <van-submit-bar :price="totalPrice * 100" button-text="提交订单" @submit="handleOrder">
                    <template #default>
                        <span>商品金额</span>
                    </template>
                </van-submit-bar>
            </div>
            <van-popup
                v-model:show="state.showPay"
                closeable
                position="bottom"
                :style="{ height: '35%' }"
                round
                @close="close"
                :close-on-popstate="false"
            >
                <div class="pay">
                    <van-grid :border="false" :column-num="2">
                        <van-grid-item>
                            微信支付
                            <br />
                            <van-image width="150" height="150" :src="state.aliyunCode" />
                        </van-grid-item>
                        <van-grid-item>
                            支付宝支付
                            <br />
                            <van-image width="150" height="150" :src="state.aliyunCode" />
                        </van-grid-item>
                    </van-grid>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script setup>
import NavBar from 'components/common/navbar/NavBar.vue';
import { computed, onMounted, reactive } from 'vue';
import { Toast } from 'vant';
import { createOrder, getOrderPreview, payOreder, payOrederStatus } from '../../network/order';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter();
const route = useRoute();
const store = useStore();
const state = reactive({
    cartList: [],
    address: {},
    showPay: false,
    payType: '请使用微信支付',
    orderId: '',
    wechatCode: '',
    aliyunCode: '',
})
const init = () => {
    Toast.loading({
        message: '加载中..',
        forbidClick: true,
        duration: 0
    })
    getOrderPreview().then(res => {
        let address = res.address.filter(n => n.is_default == "1");
        if (address.length == 0) {
            state.address = {
                address: '你还设置默认地址,请选择或填写地址'
            }
        } else {
            state.address = address[0];
        }
        state.cartList = res.carts;
        Toast.clear();
    })
}
onMounted(() => {
    init();
})
//跳转
const goTo = () => {
    router.push({
        path: '/address'
    })
}
//计算总价
const totalPrice = computed(() => {
    let price = 0;
    state.cartList.forEach(val => {
        price += val.num * val.goods.price;
    })
    return price
})
//提交订单
const handleOrder = () => {
    const params = {
        address_id: state.address.id
    }
    createOrder(params).then(res => {
        state.showPay = true;
            Toast.success('创建订单成功');
            store.dispatch('updateCart');
            //订单ID
            state.orderId = res.id;
            //获取支付宝二维码
            payOreder(state.orderId, { type: 'aliyun' }).then(res => {
                state.aliyunCode = res.qr_code_url;
                state.wechatCode = res.qr_code_url;
            })
        //获取微信二维码   微信不能测试用aliyun代替
        // payOreder(state.orderId, { type: 'wechat' }).then(res => {
        // state.wechatCode = res.qr_code_url;
        // })
        const timer = setInterval(() => {
            payOrederStatus(state.orderId).then(res => {
                console.log(res);
                if (res == '2') {
                    router.push({
                        path: '/orderdetail',
                        query: { id: state.orderId }
                    });
                    clearInterval(timer);
                }
            })
        }, 2000)
    })
}
const close = () => {
    router.push({
        path: '/orderdetail',
        query: { id: state.orderId }
    })
}
</script>

<style lang="scss" scoped>
.createOrder {
    .body {
        .info {
            padding: 15px 15px;
            font-size: 18px;
            line-height: 20px;
            .right {
                font-size: 24px;
                top: -10px;
            }
        }
        .goods {
            .van-card {
                margin-top: 15px;
                --van-card-price-color: red;
                --van-card-font-size: 16px;
                --van-card-price-font-size: 16px;
                --van-card-num-font-size: 200px;
            }
        }
        .divider {
            display: flex;
            margin: 10px;
            span {
                display: block;
                width: 22px;
                height: 2px;
                background: #e74c3c;
                margin: 0 5px;
                &:nth-child(odd) {
                    background: #3498db;
                }
            }
        }
        .submitBar {
            .van-submit-bar {
                bottom: -1px;
            }
        }
        .van-popup {
            .pay {
                margin-top: 50px;
            }
        }
    }
}
.van-dialog {
    img {
        margin: 0 auto;
        margin-left: 57px;
    }
}
</style>