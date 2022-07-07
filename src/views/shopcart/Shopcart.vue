//全选初始化时有BUG
<template>
    <div class="shopcart">
        <nav-bar>
            <template v-slot:default>购物车</template>
        </nav-bar>
        <div class="cart-box">
            <div class="empty" v-if="!state.list.length">
                <van-empty
                    class="custom-image"
                    :image="require('../../assets/images/empty.jpg')"
                    image-size="100%"
                    description="购物车空空如也"
                >
                    <van-button round type="danger" class="bottom-button" @click="goTo">前往购物</van-button>
                </van-empty>
            </div>
            <div class="cart-body" v-else>
                <van-checkbox-group
                    v-model="state.result"
                    @change="groupChange"
                    ref="checkboxGroup"
                >
                    <van-cell-group inset>
                        <van-swipe-cell v-for="itme in state.list" :key="itme.goods_id">
                            <van-checkbox :name="itme.id"></van-checkbox>
                            <van-card
                                :price="itme.goods.price + '.00'"
                                :desc="itme.goods.description"
                                :title="itme.goods.totle"
                                :thumb="itme.goods.cover_url"
                                class="goods-card"
                            />
                            <van-stepper
                                :min="1"
                                :max="itme.goods.stock"
                                v-model="itme.num"
                                :name="itme.id"
                                async-change
                                @change="onChange"
                            />
                            <template #right>
                                <van-button
                                    square
                                    @click="del(itme.id)"
                                    :icon="require('../../assets/images/delete.png')"
                                    class="delete-button"
                                />
                            </template>
                        </van-swipe-cell>
                    </van-cell-group>
                </van-checkbox-group>
                <van-submit-bar :price="totalPrice*100" button-text="提交订单" @submit="onSubmit">
                    <van-checkbox v-model="state.checkAll" @click="checkedAll">全选</van-checkbox>
                </van-submit-bar>
            </div>
        </div>
        <my-nav></my-nav>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import NavBar from 'components/common/navbar/NavBar.vue';
import MyNav from '../../components/common/MyNav/MyNav.vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { getCart, modifiyCart, checkedCart, delCartItme } from 'network/cart';
import { useStore } from 'vuex';
const router = useRouter();
const store = useStore();
const checkboxGroup = ref()
const checkedAll = () => {
    if (state.checkAll) {
        checkboxGroup.value.toggleAll(true);
        state.result = state.list.map(itme => itme.id)
        state.checkAll = true;
    } else {
        state.result = [];
        state.checkAll = false;
    }
}


//数据模型
const state = reactive({
    list: [],
    result: [],
    checkAll: true
})
//初始化购物车数据
const init = () => {
    Toast.loading({
        message: '正在加载中...请稍等...',
        duration: 0
    })
    getCart('include=goods').then(res => {
        state.list = res.data;
        state.result = res.data.filter(n => n.is_checked == 1).map(itme => itme.id)
        Toast.clear();
    })
}
//总价
const totalPrice = computed(() => {
    let sum = 0.00;
    state.list.filter(itme =>
        state.result.includes(itme.id))
        .forEach(itme => {
            sum += parseInt(itme.num) * parseFloat(itme.goods.price);
        })
    return sum;
})
//复选框改变处理
const groupChange = (result) => {
    //改变数据表中的数据
    checkedCart({ cart_ids: result })
    if (result.length == state.list.length) {
        state.checkAll = true;
    }
    if (result.length != state.list.length) {
        state.checkAll = false;
    }
}
onMounted(() => {
    init();
})
//删除购物车内容
const del = (id) => {
    delCartItme(id).then(res => {
        init();
        store.dispatch('updateCart');
    })
}
//立即去购物
const goTo = () => {
    router.push('/home')
}
//步进改变
const onChange = (value, detail) => {
    modifiyCart(detail.name, { num: value }).then(res => { })
}
//创建订单
const onSubmit = () => {
    if(state.result.length == 0 ) {
        Toast.fail('请选择商品进行结算')
    } else {
        router.push({path:'/createorder'})
    }
}
</script>

<style lang="scss">
.shopcart {
    margin-top: 50px;
}
.goods-card {
    margin: 0;
    background-color: white;

}
.empty {
    margin-top: 100px;
    --van-empty-description-font-size: 38px;
    --van-empty-description-padding: 10px 60px;
    .custom-image .van-empty__image {
        width: 90px;
        height: 90px;
    }
    .bottom-button {
        outline: none;
        font-size: 18px;
        background: #1baeae;
        width: 260px;
        height: 50px;
    }
}

.delete-button {
    height: 88%;
    background: rgba(255, 0, 0, 0.8);
}
.van-checkbox-group {
    padding: 5px 0;
    font-size: 18px;
    // margin-top: 50px;
    margin-bottom: 100px;
    .van-cell-group {
        width: 95%;
    }
    .van-swipe-cell {
        .van-card {
            transform: translateX(-12px);
        }
        .van-button {
            --van-button-icon-size: 24px;
            color: #fff;
        }
        .van-button:before {
            left: 30px;
        }
        .van-stepper {
            position: relative;
            z-index: 100;
            left: 300px;
            top: -35px;
        }
        .van-card {
            left: 20px;
        }
        .van-checkbox {
            position: absolute;
            z-index: 10;
            top: 40px;
            left: 0px;
        }
    }
}
.van-submit-bar {
    bottom: 50px;
    font-size: 20px;
    --van-submit-bar-height: 60px;
}
</style>