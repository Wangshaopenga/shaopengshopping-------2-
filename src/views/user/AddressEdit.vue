//地区有bug
<template>
    <nav-bar>
        <template v-slot:default>{{ state.title }}</template>
    </nav-bar>
    <div class="addressEdit">
        <van-address-edit
            :area-list="state.areaList"
            :address-info="state.addressInfo"
            :show-delete="state.type == 'edit'"
            show-set-default
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
        />
    </div>
</template>

<script setup>
import NavBar from 'components/common/navbar/NavBar.vue';
import { computed, onMounted, reactive, ref } from 'vue'
import { areaList } from '@vant/area-data';
import { addAddress, editAddress, getAddressDetail, delAddress } from 'network/address';
import { Dialog, Toast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const searchResult = ref([]);
const state = reactive({
    type: null,
    addressId: null,
    title: '',
    addressInfo: {},
    areaList
})
const onSave = (content) => {
    const parmas = {
        name: content.name,
        address: content.addressDetail,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        is_default: content.isDefault ? 1 : 0,
    }
    if (state.type == 'edit') {
        //修改数据
        editAddress(state.addressId, parmas).then(res => {
            Toast.success('保存成功!')
            setTimeout(() => {
                router.back();
            }, 1000);
        });
    } else if (state.type == 'add') {
        //调用接口添加数据
        addAddress(parmas).then(res => {
            Toast.success('保存成功!')
            setTimeout(() => {
                router.back();
            }, 1000);
        })
    }
};
onMounted(() => {
    const { type, addressId } = route.query;
    state.type = type;
    state.addressId = addressId;
    if (type == 'edit') {
        getAddressDetail(addressId).then(res => {
            console.log(res);
            state.addressInfo = {
                name: res.name,
                tel: res.phone,
                province: res.province,
                city: res.city,
                county: res.county,
                addressDetail: res.address,
                isDefault: !!res.is_default,
                areaCode: res.id.toString(),
            }
        })
    }
})
state.title = computed(() => {
    return state.type == 'add' ? '新增地址' : '编辑地址';
})
const onDelete = () => {
    Dialog.confirm({
        message:
            '你确定要删除该地址?',
    })
        .then(() => {
            delAddress(state.addressId).then(res => {
                Toast.success('删除成功!');
                setTimeout(() => {
                    router.back();
                }, 1000);
            })
        })
};
const onChangeDetail = (val) => {
    if (val) {
        searchResult.value = [
            {
                name: '黄龙万科中心',
                address: '杭州市西湖区',
            },
        ];
    } else {
        searchResult.value = [];
    }
}
</script>

<style lang="scss" scoped>
.addressEdit {
    margin-top: 45px;
}
</style>