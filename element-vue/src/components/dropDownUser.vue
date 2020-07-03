<!--页面逻辑-->
<!---->
<template>
    <div >
    <el-dropdown style="padding: 20px;float: right;cursor: pointer" trigger="click">
  <span class="el-dropdown-link">
    <i class="el-icon-user-solid el-icon--left"></i>{{user}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$emit('goPersonal')">我的资料</el-dropdown-item>
            <el-dropdown-item @click.native="$emit('back')">退出登录</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "dropDownUser",
        props:['user'],
        data(){
            return{

            }
        }

    }
</script>

<style scoped>

</style>
