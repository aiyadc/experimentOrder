<template>
    <div>
        <el-dialog
                :visible.sync="isshowrefuse"
                width="30%"
                :append-to-body=true
                >
            <el-form :model="form" >
                <span>拒绝理由:</span>
                <el-form-item prop="refuse"  :rules="[{ required: true, message: '请输入拒绝理由', trigger: 'blur' }]">
                    <el-input   v-model="form.refuse" placeholder="请输入拒绝理由" style="width: 100%"type="textarea"
                                :autosize="{ minRows: 4, maxRows: 6} " ></el-input>
                </el-form-item>

                <el-form-item style="left:25%;position: relative;">
                    <template slot-scope="scope" >
                        <el-button style="background:#DEDEBE;margin: 20px"
                                   @click="confirmrefuse_reason()" >确定</el-button>
                        <el-button style="background:silver"
                                   @click="removerefuse_reason()" >取消</el-button>
                    </template>
                </el-form-item>

                <!--<el-form-item  >-->
                    <!--<el-button  @click="" style="border: #B9B9FF solid 1px ;border-style: solid;border-width: 1.2px;background:#DEDEBE" size="small">允许</el-button>-->
                    <!--<el-button  @click=""  style="border: #B9B9FF solid 1px ;border-style: solid;border-width: 1.2px;background:#DEDEBE" size="small">拒绝</el-button>-->
                <!--</el-form-item>-->

            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    import {get, post} from "~/utils";

    export default {
        data() {
            return {
                isshowrefuse: false,

                form:{
                    refuse:""
                }
            }

        },
        methods: {


            confirmrefuse_reason(){
                this.isshowrefuse=false

                // 将数据发送给服务器，去拒绝


            },
            removerefuse_reason(){

                this.isshowrefuse=false
             //   alert(this.isshowrefuse)
            }
        }
    }
</script>

<style>

</style>
