<template>
    <div>
        <el-container>
            <el-aside width="300px">
                <personal-aside></personal-aside>
            </el-aside>
            <el-main>
                <personal-message></personal-message>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import personalMessage from "~/components/personalMessage";
    import personalAside from "~/components/personalAside";

    export default {
        components: {personalMessage, personalAside}
    }
</script>

<style scoped>
    .personal-message {
        margin: 200px 20% 0 20%;
    }
</style>
