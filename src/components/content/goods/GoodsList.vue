<template>
    <div class="goods">
        <goods-item v-for="itme in goods" :key="itme" :product="itme"></goods-item>
    </div>
</template>

<script setup>
import GoodsItem from './GoodsItem.vue';
import { defineProps } from 'vue';
const props = defineProps({
    goods: {
        type: Array,
        default() {
            return [];
        }
    }
});
</script>

<style lang="scss" scoped>
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 5px;
}
</style>