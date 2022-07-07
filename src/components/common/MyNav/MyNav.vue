<template>
    <div class="nav">
        <router-link class="tab-bar-itme" to="/">
            <div class="icon">
                <i class="iconfont icon-shouye"></i>
            </div>
            <div>首页</div>
        </router-link>
        <router-link class="tab-bar-itme" to="/category">
            <div class="icon">
                <i class="iconfont icon-fenlei"></i>
            </div>
            <div>分类</div>
        </router-link>
        <router-link class="tab-bar-itme" to="/shopcart">
            <div class="icon">
                <van-badge :content="$store.state.cartCount" position="top-right" max="100">
                    <i class="iconfont icon-gouwuche"></i>
                </van-badge>
            </div>
            <div>购物车</div>
        </router-link>
        <router-link class="tab-bar-itme" to="/user">
            <div class="icon">
                <i class="iconfont icon-wode"></i>
            </div>
            <div>我的</div>
        </router-link>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import "~assets/css/iconfont.css";
.nav {
    z-index: 100000;
    display: flex;
    background: #f6f6f6;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.1);
    a {
        color: var(--color-text);
        &.router-link-exact-active {
            color: #22a6b3;
        }
    }
    .tab-bar-itme {
        flex: 1;
        text-align: center;
        height: 50px;
        font-size: var(--font-size);
        .icon {
            width: 24px;
            height: 24px;
            margin-top: 5px;
            display: inline-block;
            vertical-align: center;
        }
    }
}
</style>