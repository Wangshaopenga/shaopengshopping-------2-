<template>
    <div class="recommend">
        <div class="recommend-itme" v-for="itme in recommends.slice(0, 4)" :key="itme.id">
            <a @click.prevent="goD(itme.id)">
                <img v-lazy="itme.cover_url" alt />
                <div>{{ itme.title }}</div>
            </a>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const goD = (id) => {
    router.push({path:'/detail',query:{id}})
}
const props = defineProps({
    recommends: Array
})
</script>

<style lang="scss" scoped>
.recommend {
    width: 100%;
    display: flex;
    text-align: center;
    padding: 15px 0 30px;
    border-bottom: 8px solid #eee;
    font-size: 12px;
    .recommend-itme {
        flex: 1;
        img {
            width: 80px;
            height: 70px;
            margin-bottom: 10px;
        }
    }
}
</style>