<template>
    <div>
        <nav-bar v-if="$route.path!=='/manager'"></nav-bar>
        <router-view></router-view>
    </div>

</template>

<script>
    import navBar from "~/components/manager/navBar";
    export default {
        name: "empty",
        components:{navBar}
    }
</script>

<style scoped>

</style>
