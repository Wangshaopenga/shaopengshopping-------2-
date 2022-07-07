<template>
    <nav-bar>收藏</nav-bar>
    <div class="body">
        <van-card
            v-for="itme in state.data"
            :key="itme.goods.id"
            :title="itme.goods.title"
            :desc="itme.goods.description"
            :thumb="itme.goods.cover_url"
            :price="itme.goods.price + '.00'"
        >
            >
            <template #footer>
                <van-button @click="handleAddCart(itme.goods.id)">
                    立即购买
                </van-button>
                <van-button @click="unCollect(itme.goods.id)">
                    取消收藏
                </van-button>
            </template>
        </van-card>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getCollect } from "network/collect";
import { collect } from "network/collect";
import NavBar from "../../components/common/navbar/NavBar.vue";
import { useRouter } from "vue-router";
import { addCart } from "network/cart";
import { Toast } from "vant";

const router = useRouter();
const state = reactive({
    data: [],
});
onMounted(() => {
    getCollect().then((res) => {
        state.data = res.data;
        console.log(res.data);
    });
});
const handleAddCart = (id) => {
    addCart({ goods_id: id, num: 1 }).then((res) => {
        if (res.status == "201") {
            //设置store中的cartCount
            store.dispatch("updateCart");
            router.push("/createorder");
        } else if (res.status == "204") {
            router.push("/createorder");
        }
    });
};
const unCollect = (id) => {
    collect(id).then((res) => {
        if (res.status == "201") {
            Toast.success("重新收藏成功");
        } else if (res.status == "204") {
            Toast.success("取消收藏成功");
        }
    });
};
</script>

<style lang="scss" scoped>
.body {
    margin-top: 55px;
    .van-card {
        .van-button {
            border-radius: 12px;
        }
    }
}
</style>