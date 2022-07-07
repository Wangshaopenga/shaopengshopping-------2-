<template>
    <div class="nav-bar">
        <div class="left" @click="goback">
            <slot name="left">
                <i class="iconfont icon-fanhui1"></i>
            </slot>
        </div>
        <div class="center">
            <slot>少鹏商城</slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goback = () => {
    router.go(-1);
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/iconfont.css";
.nav-bar {
    background: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
    height: 45px;
    line-height: 45px;
    text-align: center;
    box-shadow: 0 2px 0px rgba(100, 100, 100, 0.1);
    display: flex;
    .left,
    .right {
        width: 60px;
    }
    .left .iconfont {
        font-size: 24px;
        float: left;
        margin-left: 10px;
    }
    .center {
        flex: 1;
    }
}
</style>