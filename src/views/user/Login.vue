<template>
    <div>
        <nav-bar>用户登录</nav-bar>
        <div style="padding-top:80px; padding-bottom:50px">
            <van-image
                height="10rem"
                top="10px"
                fit="contain"
                position="center"
                :src="require('../../assets/images/register.png')"
            />
        </div>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="email"
                    name="email"
                    label="邮箱"
                    placeholder="邮箱"
                    :rules="[{ required: true, message: '请填写邮箱' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="password"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
            </van-cell-group>
            <div class="link_register" @click="$router.push({ path: '/register' })">没用账号,立即注册</div>
            <div style="margin: 18px;">
                <van-button round block type="primary" color="#44b883" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>
<script setup>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import NavBar from '../../components/common/navbar/NavBar.vue';
import { login } from '../../network/user';
import { Toast } from 'vant';
import { useStore } from 'vuex';
const router = useRouter();
const store = useStore();
const userInfo = reactive({
    email: '',
    password: '',
});
const { email, password } = toRefs(userInfo);
const onSubmit = (values) => {
    login(userInfo).then(res => {
        // 将Token保存包本地 window.localStorage setItme(key,value)  getItme(key)
        window.localStorage.setItem('token', res.access_token);
        //在vuex isLogin
        store.commit('setIsLogin',true)
        Toast.success('登录成功');
        userInfo.email = '';
        userInfo.password = '';
        setTimeout(() => {
            router.push({
                path:'/'
            });  
        }, 1000);
    })
}
</script>
<style lang="scss" scoped>
.link_register {
    font-size: 14px;
    margin-top: 10px;
    color: #42b983;
    display: inline-block;
    text-align: left;
    margin-left: 15px;
}
</style>