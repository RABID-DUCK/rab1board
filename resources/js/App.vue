<template>
    <Header />
    <router-view></router-view>
</template>

<script>
import Header from "./components/Header";
export default {
    name: "App.vue",
    components: {Header}
}
</script>

<style scoped>

</style>
