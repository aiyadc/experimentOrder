<template>
    <div id="demo1">
        <img src="../assets/images/login_bg.jpg" id="img" :style="imgSty">

        <div id="login">
            <el-card class="card" style="background-color: lavender;">
                <div slot="header" class="clearfix">
                    <h2>登录</h2>
                </div>
                <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-position="left" label-width="70px">
                    <el-form-item label="身份：" align="left" prop="identity" style="width: 100%">
                        <el-select v-model="ruleForm.identity" placeholder="请选择您的身份" style="width:100% ">
                            <el-option
                                    v-for="item in character"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="账号：" required prop="account">
                        <el-input type="text" v-model="ruleForm.account" placeholder="请输入您的账号"
                                  prefix-icon="el-icon-user-solid" class="required"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" required prop="psw">
                        <el-input type="password" v-model="ruleForm.psw" placeholder="请输入您的密码"
                                  prefix-icon="el-icon-s-goods"></el-input>
                    </el-form-item>
                    <el-link class="phoneMessage link">手机短信登陆</el-link>
                    <el-link class="forgetPsw link" @click="dialogVisible = true">忘记密码</el-link>
                    <el-divider></el-divider>
                </el-form>
                <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%">登录</el-button>

            </el-card>
        </div>

        <div id="forgetPsw">
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                <span>请联系超级管理员重置密码</span>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {get, post} from "~/utils";
    import {showFail, showSuccess} from "~/utils/dialog";

    export default {
        name: "login",
        data() {
            return {
                ruleForm: {
                    identity: '',
                    account: '',
                    psw: '',
                },

                character: [{
                    label: '超级管理员',
                    value: '3'
                }, {
                    label: '管理员',
                    value: '2'
                }, {
                    label: '老师',
                    value: '1'
                }
                ],
                rules: {
                    account: [{
                        required: true, message: '请输入您的账号', trigger: 'blur'
                    }],
                    psw: [
                        {
                            required: true, message: '请输入您的密码', trigger: 'blur'
                        }
                    ],
                    identity: [{
                        required: true, message: '请选择您的身份', trigger: 'change'
                    }]
                },
                dialogVisible: false,
                imgSty:""
            }
        },
        methods: {

            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        await post('lb/user/login', {
                            auth: this.ruleForm.identity,
                            username: this.ruleForm.account,
                            password: this.ruleForm.psw
                        }).then(res => {
                            showSuccess("登录成功", this)
                            // 跳转页面
                            setTimeout(() => {
                                if (this.ruleForm.identity === '1') this.$router.push('/teacher')
                                else if (this.ruleForm.identity === '2') this.$router.push('/manager')
                                else if (this.ruleForm.identity === '3') this.$router.push('/supManager')
                            }, 1000)
                        }).catch(e => {
                            showFail(e.msg, this)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        mounted() {
                // var height =(document.documentElement.clientHeight || window.innerHeight)-5
                // console.log(document.documentElement.clientHeight,window.innerHeight)
                this.imgSty='opacity: 100%;width:100%;height: 100%;'
        }
    }
</script>

<style scoped>
    #demo1 {
        position: absolute;
        background-color: aquamarine;
        margin: 0;
        padding: 0;
        height:100%;
        overflow: hidden;
    }

    #login {
        width: 400px;
        /*z-index:2*/
    }

    .card {
        position: absolute;
        top: 25%;
        right: 10%;
        width: 30%;
    }

    .forgetPsw {
        position: relative;
        left: 28%;
    }

    .phoneMessage {
        position: relative;
        left: 25%;
    }
</style>
