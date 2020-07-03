<template>
    <el-card id="card">

       <div style="width: 100px;position: relative;right: 20px">{{name}}</div>
        <slot></slot>
    </el-card>
</template>

<script>
    export default {
        name: "block",
        props:['name']
    }
</script>

<style scoped>
#card{
    padding: 70px 50px;
    cursor:pointer;
    width: 100px;
    /*border: #B9B9FF 4px solid;*/
}

</style>
