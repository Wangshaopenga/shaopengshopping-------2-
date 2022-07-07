<template>
    <div class="settings">
        <nav-bar>
            <template v-slot:default>修改密码</template>
        </nav-bar>
        <div class="from">
            <van-form @failed="onFailed">
                <van-cell-group inset>
                    <van-field
                        label="旧密码"
                        v-model="state.old_password"
                        name="pattern"
                        placeholder="旧密码"
                        type="password"
                        :rules="[{ pattern, message: '密码必须大于6位!' }]"
                    />
                    <van-field
                        label="新密码"
                        v-model="state.password"
                        name="pattern"
                        placeholder="新密码"
                        type="password"
                        :rules="[{ pattern, message: '密码必须大于6位!' }]"
                    />
                    <van-field
                        label="确认密码"
                        v-model="state.password_confirmation"
                        name="pattern"
                        placeholder="确认密码"
                        type="password"
                        :rules="[{ pattern, message: '密码必须大于6位!' }]"
                    />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button @click="onFailed" round block type="primary" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import NavBar from "../../components/common/navbar/NavBar.vue";
import { updatePassword } from "../../network/user";
import { Dialog, Toast } from 'vant';
const state = reactive({
    old_password: '',
    password: '',
    password_confirmation: '',
})
const pattern = /\d{6}/;
const onFailed = () => {
    Dialog.confirm({
        title: '修改密码',
        message:
            '是否修改密码?',
    })
        .then(() => {
            // on confirm
            updatePassword({
                old_password: state.old_password,
                password: state.password,
                password_confirmation: state.password_confirmation
            }).then(res => {
                console.log(res);
                Toast.success('修改成功');
            })
        })
        .catch(() => {
            // on cancel
        });
}
</script>

<style lang="scss" scoped>
.settings {
    .from {
        margin-top: 185px;
        .van-form {
            .van-cell-group {
                --van-cell-line-height: 28px;
                --van-cell-font-size: 16px;
            }
            .van-button {
                font-size: 18px;
            }
        }
    }
}
</style>