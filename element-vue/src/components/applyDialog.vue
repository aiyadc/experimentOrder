<template>
    <div>
        <el-dialog title="请确认以下申请信息" :visible="dialogVisable">
            <el-form :model="form">
                <el-form-item label="申请时间" prop="date"><el-input type="date" v-model="form.date"></el-input></el-form-item>
            </el-form>
            <el-form-item label="地址" ><el-input type="text" v-model="form.position"></el-input></el-form-item>
            <el-form-item label="实验室名称" ><el-input v-model="form.name"></el-input></el-form-item>
            <el-form-item label="姓名" prop="nickname"><el-input v-model="form.nickname"></el-input></el-form-item>
            <el-form-item label="手机号" prop="tel"><el-input v-model="form.tel"></el-input></el-form-item>
            <el-form-item label="课程名称" prop="course_name"><el-input v-model="form.course_name"></el-input> </el-form-item>
            <el-form-item label="使用班级" prop="class"><el-input v-model="form.class"></el-input> </el-form-item>
            <el-form-item label="班级人数" prop="population"> <el-input v-model="form.population"></el-input> </el-form-item>
            <el-form-item label="申请时间段" ><el-button>点击设置</el-button></el-form-item>
            <el-form-item label="备注" prop=""><el-input v-model="form.remind"></el-input></el-form-item>
            <el-form-item>
                <el-button type="primary" @click="">申请</el-button>
                <el-button @click="">重置</el-button>
            </el-form-item>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "dialog",
        data(){
            return{
                dialogVisable:false,
                form:{
                    position:'',
                    name:'',
                    date:Date,
                    nickname:'',
                    tel:'',
                    course_name:'',
                    class:'',
                    population:'',
                    schedule:[],
                    remind:''
                }
            }
        }
    }
</script>

<style scoped>

</style>
