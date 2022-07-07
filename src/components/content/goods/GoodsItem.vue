<template>
    <div class="goods-itme" @click="itmeClick(product.id)">
        <img v-lazy="product.cover_url" />
        <div class="goods-info">
            <p>{{ product.title }}</p>
            <span class="price">
                <small>￥</small>
                {{ product.price }}
            </span>
            <span class="collect">{{ product.collects_count }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
    product: {
        type: Object,
        default() {
            return {};
        }
    }
});
const router = useRouter();
//设置点击进入商品详情
const itmeClick = (id) => {
    router.push({ path: '/detail', query: { id } });
}
</script>

<style lang="scss" scoped>
.goods-itme {
    width: 46%;
    padding-bottom: 40px;
    position: relative;
    // margin-bottom: 50px;
    img {
        width: 100%;
        border-radius: 5px;
    }
    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
        p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 3px;
        }
        .price {
            color: red;
            margin-right: 20px;
        }
        .collect {
            position: relative;
        }
        .collect::before {
            content: "";
            position: absolute;
            left: -15px;
            width: 14px;
            height: 14px;
            top: 1px;
            background: url("~assets/images/collect.png") 0 0/14px 14px;
        }
    }
}
</style>