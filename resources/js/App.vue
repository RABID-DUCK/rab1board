<template>
    <Header />

    <transition name="fade">
        <tool-tip v-if="tooltipOpen"  />
    </transition>

    <router-view></router-view>

</template>

<script>
import Header from "./components/Header";
import ToolTip from "./components/ToolTip";


export default {
    name: "App.vue",
    components: {Header, ToolTip},
    data() {
        return {
            tooltipOpen: false
        }
    },
    watch: {
        '$store.getters.statusTooltip': function (value){
            this.tooltipOpen = value;
        }
    }
}
</script>

<style scoped>
.fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}
</style>
