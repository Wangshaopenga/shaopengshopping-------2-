<template>
    <nav-bar>地址管理</nav-bar>
    <div class="address">
        <div v-if="state.list.length == 0">
            <van-empty description="你还没有添加地址哦~">
                <van-button round type="danger" @click="onAdd" class="bottom-button">添加地址</van-button>
            </van-empty>
        </div>
        <div v-else>
            <van-address-list
                v-model="state.chosenAddressId"
                :list="state.list"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
                @select="onSelect"
            />
        </div>
    </div>
</template>

<script setup>
import { Toast } from "vant";
import { onMounted, reactive } from "vue";
import { useRouter } from 'vue-router'
import NavBar from "../../components/common/navbar/NavBar.vue";
import { getAddressList } from "../../network/address";
const router = useRouter();
const state = reactive({
    chosenAddressId: 1,
    list: []
})
onMounted(() => {
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
    });
    getAddressList().then(res => {
        if (res.data.length == 0) {
            state.list = []
            Toast.clear();
            return;
        }
        state.list = res.data.map(itme => {
            return {
                id: itme.id,
                name: itme.name,
                tel: itme.phone,
                address: `${itme.province} ${itme.county} ${itme.address}`,
                isDefault: !!itme.is_default
            }
        });
        Toast.clear();
    })
})
//添加地址
const onAdd = () => {
    router.push({
        path: '/addressEdit',
        query: {
            type: 'add'
        }
    })
};
//修改地址
const onEdit = (itme) => {
    router.push({
        path: '/addressEdit',
        query: {
            type: 'edit',
            addressId: itme.id
        }
    })
}
//选择地址时触发
const onSelect = (itme) => {
    router.push({
        path: 'pay',
        query: {
            addressId: itme.id
        }
    })
}
</script>

<style lang="scss" scoped>
.address {
    margin-top: 45px;
}
.van-empty {
    --van-empty-image-size: 100%;
    --van-empty-description-font-size: 20px;
}
</style>