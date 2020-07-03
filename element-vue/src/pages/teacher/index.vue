<template>
    <div>
        <nav-bar v-if="$route.path!=='/teacher'"></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import navBar from "~/components/teacher/navBar";
    export default {
        name: "index",
        components:{
            navBar
        }
    }
</script>

<style scoped>

</style>
