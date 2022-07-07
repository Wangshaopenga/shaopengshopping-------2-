<template>
    <div class="tab-control">
        <div
            @click="itmeClick(index)"
            class="tab-control-itme"
            v-for="(itme, index) in titles"
            :key="index"
            :class="{ active: index == store.state.tabIndex }"
        >
            <span>{{ itme }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref} from 'vue';
import { useStore } from 'vuex';
const props = defineProps({
    titles: Array,
    default() {
        return [];
    }
});
const store = useStore();
const emit = defineEmits(['tabControl', 'index']);
const itmeClick = (index) => {
    store.commit('changeTabIndex', index);
    emit('tabControl', index);
}

</script>

<style lang="scss" scoped>
.tab-control {
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    background: yellow;
    background-color: #fff;
    width: 100%;
    z-index: 10;
    position: sticky;
    top: 44px;

    .tab-control-itme {
        flex: 1;
        span {
            padding: 6px;
        }
    }
    .active {
        color: var(--color-tint);
        span {
            border-bottom: 3px solid var(--color-tint);
        }
    }
}
</style>