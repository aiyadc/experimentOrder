<template>
    <div>
        <h1>个人基本信息
            <el-link type="primary" @click="editClick"><b><span v-if="edit">取消</span>编辑</b></el-link>
        </h1>
        <div class="personal-message">
            <!--            未编辑状态-->
            <el-form :model="data" label-width="100px" class="demo-ruleForm">
                <el-form-item label="工号" prop="username">
                    <el-input v-model="data.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="nickname" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
                    <el-input v-model="data.nickname" :disabled="!edit"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="tel" :rules="[{ required: true, message: '请输入联系电话', trigger: 'blur' }]">
                    <el-input v-model="data.tel" :disabled="!edit"></el-input>
                </el-form-item>
                <el-form-item label="办公室" prop="office" :rules="[{ required: true, message: '请输入办公室', trigger: 'blur' }]">
                    <el-input v-model="data.office" :disabled="!edit"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                    <el-input v-model="data.email" :disabled="!edit"></el-input>
                </el-form-item>
                <el-form-item v-if="edit">
                    <el-button type="primary" @click="submit">修改</el-button>
                    <el-button @click="editClick">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {get, post} from "~/utils";
    import {closeLoading, showDialog, showLoading, showSuccess} from "~/utils/dialog";
    export default {
        data() {
            return {
                edit: false,
                tableData: [{
                    name: '工号',
                    data: '12345',
                }, {
                    name: '姓名',
                    data: '王小虎',
                }, {
                    name: '联系电话',
                    data: '13123456789',
                }, {
                    name: '办公室',
                    data: '5#101',
                }, {
                    name: '邮箱',
                    data: '123456789@hzu.com',
                }],
                data: {
                    username: '12345',
                    nickname: '王小虎',
                    tel: '13123456789',
                    office: '5#101',
                    email: '123456789@hzu.com'
                }
            }
        },
        methods: {
            editClick() {
                // 切换编辑状态
                this.edit = !this.edit
            },
            async load() {
                // 获取用户数据
                this.data = await get('lb/user/getUserInfo')
            },
            async submit() {
                await showDialog('确定要修改吗？', this)
                const loading = showLoading("正在修改...",this)
                // 提交表单，修改用户信息
                await post('lb/user/updateBySelf', {
                    username: this.data.username,
                    nickname: this.data.nickname,
                    tel: this.data.tel,
                    office: this.data.office,
                    email: this.data.email
                })
                // 修改后重载用户数据
                setTimeout(()=>{
                    closeLoading(loading)
                    this.load()
                    this.edit = false
                    showSuccess('修改成功',this)
                },1000)

            }
        },
        async mounted() {
            // 进入时加载用户数据
            this.load()
        }
    }
</script>

<style scoped>
    .personal-message {
        margin: 100px 30% 0 10%;
    }
</style>
