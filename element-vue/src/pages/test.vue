<template>
    <div id="app">
        <img src="../assets/logo.png">
        <div>
            <el-button @click="startHacking">Start</el-button>
        </div>
    </div>
</template>

<script>
    import {post} from "~/utils";

    export default {
        methods: {
            async startHacking() {
                this.$notify({
                    title: 'It works!',
                    type: 'success',
                    message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
                    duration: 5000
                })
                await post('lb/lab/test', {
                    data: 'data'
                }
                //        这里直接写then的内容就好了
                )
            }
        }
    }
</script>

<style>
    #app {
        font-family: Helvetica, sans-serif;
        text-align: center;
    }
</style>
