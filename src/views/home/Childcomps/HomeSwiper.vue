<template>
    <van-swipe v-if="banners.length" class="my-swipe" :autoplay="2500" indicator-color="white">
        <van-swipe-item v-for="(itme, index) in banners" :key="index">
            <img v-lazy="itme.img_url" />
        </van-swipe-item>
    </van-swipe>
</template>

<script setup>
import { defineProps, ref } from 'vue';
const props = defineProps({
    banners: {
        type: Array,
        default() {
            return [];
        }
    }
});
</script>

<style lang="scss" scoped>
</style>