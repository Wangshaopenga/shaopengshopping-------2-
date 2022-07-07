<template>
    <div>
        <nav-bar>新用户注册</nav-bar>
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
                    v-model="name"
                    name="username"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="password"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                    v-model="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    label="确认密码"
                    placeholder="确认密码"
                    :rules="[{ required: true, message: '密码不一致,请重新输入' }]"
                />
                <van-field
                    v-model="email"
                    name="email"
                    label="邮箱"
                    placeholder="请输入邮箱"
                    :rules="[{ required: true, message: '请填写正确的邮箱格式' }]"
                />
            </van-cell-group>
            <div class="link_login" @click="$router.push({ path: '/login' })">已有账号,立即登陆</div>
            <div style="margin: 18px;">
                <van-button round block type="primary" color="#44b883" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>
<script setup>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import NavBar from '../../components/common/navbar/NavBar.vue';
import { register } from '../../network/user';
import { Dialog,Toast } from 'vant';
const userInfo = reactive({
    name: '',
    password: '',
    password_confirmation: '',
    email: '',
});
const router = useRouter();
const { name, password, password_confirmation, email } = toRefs(userInfo);
const onSubmit = () => {
    //先验证再提交
    if (userInfo.password != userInfo.password_confirmation) {
        Dialog.alert({
            message: '两次密码不一致,请重新输入。',
        })
    } else {
        //提交数据
        register(userInfo).then(res => {
            console.log(res);
            if (res.status == '201') {
                Toast.success('注册成功');
                setTimeout(()=>{
                    router.push({path:'/login'});
                },1000)
            }
            userInfo.email='';
            userInfo.name='';
            userInfo.password='';
            userInfo.password_confirmation='';
        })
    }
}
</script>
<style lang="scss" scoped>
.link_login {
    font-size: 14px;
    margin-top: 10px;
    color: #42b983;
    display: inline-block;
    text-align: left;
    margin-left: 15px;
}
</style>