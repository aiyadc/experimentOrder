<template>
    <div>
        <nav-bar v-if="$route.path!=='/supManager'"></nav-bar>
        <router-view> </router-view>
    </div>

</template>

<script>
    import navBar from "~/components/supManager/navBar";

    export default {
        name: "empty",
        components:{
            navBar
        }
    }
</script>

<style scoped>

</style>
