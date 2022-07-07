<template>
    <div @click="bTop" class="backTop"></div>
</template>

<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits();
const bTop = ()=>{
    emit('bTop');
}
</script>

<style lang="scss" scoped>
.backTop {
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 80px;
    right: 30px;
    z-index: 20px;
    box-shadow: 5px 5px 5px #888;
    border-radius: 50%;
    background: #FCFCFC url('~assets/images/backTop.png') no-repeat center center;
}
</style>