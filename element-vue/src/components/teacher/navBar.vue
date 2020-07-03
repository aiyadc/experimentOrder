<template>
    <div>
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo nav"
                mode="horizontal"
                @select="handleSelect"
                background-color="#1989fa"
                text-color="#ffffff"
                active-text-color="#ffd04b">
            <el-menu-item index="1" route="index" @click="$router.push('/teacher')">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">实验室申请</template>
                <el-menu-item index="2-1" route="book" @click="$router.push('/teacher/applyLab')">申请实验室</el-menu-item>
                <el-menu-item index="2-2" route="myBooking" @click="toMyApplyRecord">我的申请记录
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="3" route="course" @click="$router.push('/teacher/courseManagement')" >课程管理</el-menu-item>
            <el-menu-item index="4" route="schedule" @click="$router.push('/teacher/myCourse')">我的课表</el-menu-item>
            <drop-down-user :user="nickname" @back="backLogin" @goPersonal="goPersonal"></drop-down-user>
        </el-menu>
    </div>
</template>

<script>
    import dropDownUser from "~/components/dropDownUser";
    import {get} from "~/utils";
    import {showSuccess} from "~/utils/dialog";

    export default {
        data() {
            return {
                activeIndex: '1',
                nickname: ''
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            async backLogin() {
                await get('lb/user/logout')
                await showSuccess("退出成功", this)
                setTimeout(() => {
                    this.$router.push('/login')
                }, 1000)
            },
            goPersonal: function () {
                this.$router.push('/teacher/personal')
            },
            toMyApplyRecord(){
                var u_id=get('').u_id
                this.$router.push('/teacher/myApplyRecord',u_id)
            }
        },
        components: {
            dropDownUser
        },
        async mounted() {
            this.nickname = await get('lb/user/getUserName')
        }
    }
</script>

<style scoped>
    .nav {
        width: 100%;
    }
</style>
