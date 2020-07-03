<template>
    <div>
        <home :names="homeParams" :user="nickname" @back="backLogin" @goPersonal="goPersonal" style="float: top"></home>
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
                        name: '个人中心', func: () => {
                            console.log(this.$router)
                            this.$router.push('/teacher/personal')
                        }
                    },
                    {
                        name: '申请实验室', func: () => {
                            this.$router.push('/teacher/applyLab')
                        }
                    },
                    {
                        name: '我的课表', func: () => {
                            this.$router.push('/teacher/myCourse')
                        }
                    },
                    {
                        name:'课程管理',func:()=>{
                            this.$router.push('/teacher/courseManagement')
                        }
                    }
                ]
            }
        },
        methods: {
            async backLogin() {
                await get('lb/user/logout')
                await showSuccess("退出成功",this)
                setTimeout(()=>{
                    this.$router.push('/login')
                },1000)
            },
            goPersonal:function () {
                this.$router.push('/teacher/personal')
            }
        },
        async mounted() {
            this.nickname = await get('lb/user/getUserName')
            console.log(this.homeParams)
        }
    }
</script>

<style scoped>
</style>
