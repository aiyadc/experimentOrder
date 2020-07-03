<template>
    <div>
        <home
                :names="homeParams"
                :user="nickname"
                @goPersonal="$router.push('/supManager/personal')"
                @back="logout"
        ></home>
    </div>
</template>

<script>
    import home from "~/components/teacher/home";
    import {get} from "~/utils";
    import {showSuccess} from "~/utils/dialog";

    export default {
        components: {
            home
        },
        data() {
            return {
                nickname: '未登录',
                homeParams: [
                    {
                        name: '实验室管理', func: () => {
                            this.$router.push('/supManager/labManager')
                        }
                    },
                    {
                        name: '用户管理', func: () => {
                            this.$router.push('/supManager/userManage')
                        }
                    },
                    {
                        name: '个人中心', func: () => {
                            this.$router.push('/supManager/personal')
                        }
                        },
                        {
                        name: '审核', func: () => {
                            this.$router.push('/supManager/supCheck')
                        }
                    }
                ]
            }
        },
        methods: {
            async logout() {
                await get('lb/user/logout')
                await showSuccess('退出成功', this)
                setTimeout(() => {
                    this.$router.push('/login')
                }, 1000)
            }
        },
        async mounted() {
            this.nickname = await get('lb/user/getUserName')
        }
    }
</script>

<style scoped>
</style>
