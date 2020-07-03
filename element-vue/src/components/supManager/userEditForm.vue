<template>
    <!--        弹出层-->
    <el-dialog :title="edit ? '编辑用户' : '新增用户'" :visible.sync="dialogVisible" width="40rem" @close="cancel"
               style="text-align: left" :close-on-click-modal="false">
        <el-form :model="userForm" ref="userForm">
            <el-form-item prop="position" label="职位" label-width="80px"
                          :rules="[{ required: true, message: '请选择职位', trigger: 'blur' }]">
                <el-select v-model="userForm.position" placeholder="请选择职位">
                    <el-option label="教师" :value="1"></el-option>
                    <el-option label="实验室管理员" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="username" label="工号" label-width="80px"
                          :rules="[{ required: true, message: '请输入工号', trigger: 'blur' }]">
                <el-input v-model="userForm.username" autocomplete="off" :disabled="edit">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码" label-width="80px" v-if="!edit"
                          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
            >
                <el-input v-model="userForm.password" type="userForm.password" autocomplete="off" :disabled="edit"></el-input>
            </el-form-item>
            <el-form-item prop="nickname" label="姓名" label-width="80px"
                          :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
                <el-input v-model="userForm.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="tel" label="联系电话" label-width="80px"
                          :rules="[{ required: true, message: '请输入联系电话', trigger: 'blur' }]">
                <el-input v-model="userForm.tel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="office" label="办公室" label-width="80px"
                          :rules="[{ required: true, message: '请输入办公室', trigger: 'blur' }]">
                <el-input v-model="userForm.office" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱" label-width="80px"
                          :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                <el-input v-model="userForm.email" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {get, post, stop} from "~/utils";
    import {showDialog, showFail, showSuccess} from "~/utils/dialog";

    export default {
        props: {
            dialogFormVisible: {required: true},
            userForm: {required: true},
            edit: {required: true}
        },
        data() {
            return {
                dialogVisible: false
            }
        },
        methods: {
            async confirm() {
                //验证
                this.$refs['userForm'].validate(async (valid) => {
                    if (valid) {
                        //提交
                        await showDialog("确定要" + (this.edit ? '编辑' : '新增') + '吗？', this)
                        //编辑提交
                        if (this.edit) {
                            // 与后端字段保持一致
                            this.userForm.uId = this.userForm.uid
                            await post('lb/user/updateUser', this.userForm).catch(async e => {
                                await showFail(e.msg, this)
                                await stop()
                            })
                            showSuccess('编辑完成', this)
                        } else {
                            // 新增提交
                            await post('lb/user/addUser', this.userForm).catch(async e => {
                                await showFail(e.msg, this)
                                await stop()
                            })
                            showSuccess('新增完成', this)
                        }
                        this.$emit('confirm')
                    }
                });

            },
            cancel() {
                this.$emit('cancel')
            }
        },
        watch: {
            dialogFormVisible(val) {
                this.dialogVisible = val
                this.password = ''
            }
        }
    }
</script>
