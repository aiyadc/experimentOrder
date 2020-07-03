<template>
    <div>
        <el-row class="tac" style="margin-top: 30px">
            <el-col :span="24">
                <el-avatar shape="square" :size="250" fit="cover"
                           src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
                <br>
                <el-link type="primary">更换头像（尚未开发）</el-link>
                <el-menu
                        style="text-align: left;margin-top: 30px"
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                    <el-menu-item index="2" route="message">
                        <i class="el-icon-user"></i>
                        <span slot="title">我的个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">站内信（尚未开发）</span>
                    </el-menu-item>
                    <el-menu-item index="4" disabled>
                        <i class="el-icon-setting"></i>
                        <span slot="title">系统设置（尚未开发）</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .personal-message {
        margin: 200px 20% 0 20%;
    }
</style>
