<template>
    <div>
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo nav"
                mode="horizontal"
                @select="handleSelect"
                background-color="#1989fa"
                text-color="#ffffff"
                active-text-color="#ffd04b"
                router>
            <el-menu-item index="1" route="../">首页</el-menu-item>
            <el-menu-item index="2" route="managerCheck">审核</el-menu-item>
            <el-menu-item index="3" route="labManage">实验室管理</el-menu-item>
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
                this.$router.push('/manager/personal')
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
