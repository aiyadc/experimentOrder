<template>
    <el-dialog
            :visible.sync="detailbyid"
    >

        <div >
            <el-form :model="form" >

                <el-form-item label="申请时间" label-width="100px" >
                    <el-input  disabled v-model="form.applytime"></el-input>
                </el-form-item>
                <el-form-item label="姓名"label-width="100px" >
                    <el-input  disabled v-model="form.nickname" ></el-input>
                </el-form-item>
                <el-form-item label="手机号"label-width="100px" >
                    <el-input  disabled v-model="form.phone" ></el-input>
                </el-form-item>
                <el-form-item label="地址"label-width="100px" >
                    <el-input  disabled v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="实验室名称"label-width="100px" >
                    <el-input  disabled v-model="form.name" ></el-input>
                </el-form-item>
                <el-form-item label="用途" label-width="100px">
                    <el-input  disabled v-model="form.use" ></el-input>
                </el-form-item>
                <el-form-item label="课程名称" label-width="100px">
                    <el-input  disabled v-model="form.classname" ></el-input>
                </el-form-item>
                <el-form-item label="使用班级"label-width="100px" >
                    <el-input  disabled v-model="form.class" ></el-input>
                </el-form-item>
                <el-form-item label="人数"label-width="100px" >
                    <el-input  disabled v-model="form.population"></el-input>
                </el-form-item>
                <el-form-item label="申请时间段"label-width="100px" >
                    <el-input  disabled v-model="form.time" ></el-input>
                </el-form-item>
                <el-form-item label="备注"label-width="100px" >
                    <el-input  disabled v-model="form.commit"></el-input>
                </el-form-item>


                <!--<el-form-item v-if="operator_id">-->
                <el-form-item >
                         <template slot-scope="scope">
                        <el-button style="background:#DEDEBE" v-if="agree"
                                   @click="agreeapply()" >同意</el-button>
                        <el-button style="background:silver" v-if="refuse"
                                   @click="showrefuse()" >拒绝</el-button>
                    </template>
                </el-form-item>

            </el-form>



                <!--<el-row>-->
                    <!--<el-col style="width:45%" >-->
                        <!--<el-form-item label="手机号" style="border: darkorange solid 1px;" >-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col style="width:45% ;" >-->
                        <!--<el-form-item  :label="form.phone" style="border: darkorange solid 1px;">-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->

                <!--<el-row>-->
                    <!--<el-col style="width:45%" >-->
                        <!--<el-form-item label="地址" style="border: darkorange solid 1px;" >-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col style="width:45% ;" >-->
                        <!--<el-form-item  :label="form.address" style="border: darkorange solid 1px;">-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->

                <!--<el-row>-->
                    <!--<el-col style="width:45%" >-->
                        <!--<el-form-item label="实验室名称" style="border: darkorange solid 1px;" >-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col style="width:45% ;" >-->
                        <!--<el-form-item  :label="form.name" style="border: darkorange solid 1px;">-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->

                <!--<el-row>-->
                    <!--<el-col style="width:45%" >-->
                        <!--<el-form-item label="用途" style="border: darkorange solid 1px;" >-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col style="width:45% ;" >-->
                        <!--<el-form-item  :label="form.use" style="border: darkorange solid 1px;">-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->

                <!--<el-row>-->
                    <!--<el-col style="width:45%" >-->
                        <!--<el-form-item label="课程名称" style="border: darkorange solid 1px;" >-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col style="width:45% ;" >-->
                        <!--<el-form-item  :label="form.classname" style="border: darkorange solid 1px;">-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->


                <!--<el-row>-->
                    <!--<el-col style="width:45%" >-->
                        <!--<el-form-item label="使用班级" style="border: darkorange solid 1px;" >-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col style="width:20% ;" >-->
                        <!--<el-form-item  :label="form.class" style="border: darkorange solid 1px;">-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col style="width:12.5% ;" >-->
                        <!--<el-form-item  label="人数" style="border: darkorange solid 1px;">-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col style="width:12.5% ;" >-->
                        <!--<el-form-item  :label="form.population" style="border: darkorange solid 1px;">-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->

                <!--<el-row>-->
                    <!--<el-col style="width:45%" >-->
                        <!--<el-form-item label="申请时间段" style="border: darkorange solid 1px;" >-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col style="width:45% ;" >-->
                        <!--<el-form-item  :label="form.time" style="border: darkorange solid 1px;">-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->

                <!--<el-row>-->
                    <!--<el-col style="width:45%" >-->
                        <!--<el-form-item label="备注" style="border: darkorange solid 1px;" >-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col style="width:45% ;" >-->
                        <!--<el-form-item  :label="form.commit" style="border: darkorange solid 1px;">-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->

                <!--<el-row v-if="operator_id">-->
                    <!--<el-col style="border:1.5px lightslategrey;width:50%;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;">-->

                        <!--<el-button style="width:100%;text-align:center;float:right;background:#DEDEBE"-->
                                   <!--@click="" >同意</el-button>-->

                    <!--</el-col>-->
                    <!--<el-col style="border:1.5px lightslategrey;width:50%;border-right-style:solid;border-bottom-style:solid;">-->

                        <!--<el-button style="width:100%;text-align:center;float:right;background:silver" icon="el-icon-circle-plus-outline"-->
                                   <!--@click="" >拒绝</el-button>-->

                    <!--</el-col>-->
                <!--</el-row>-->


        </div>
        <refuse-reason  ref="refuseReason"/>
    </el-dialog>
</template>

<script>
    import refuseReason  from "~/components/supManager/refuseReason" ;
    import {get, post} from "~/utils";
    export default {
        components: {refuseReason},
        data() {
            return {
                detailbyid: false,
         //       operator_id:false,
                agree:true,
                refuse:true,
                form:{
                    applytime:"2019-02-03" ,
                    nickname:"小姚",
                    phone:"123456789",
                    address:"5-212",
                    name:"window实验室",
                    use:"教学",
                    classname:"数据结构",
                    class:"17软件6班",
                    population:20,
                    time:"1-16周",
                    commit:"无",
                    year:"",
                    semester:"" ,
                    day:"",
                    time: "",
                    uc_id:"",
                }
            }
        },
        methods: {
            showAddLab() {
                this.detailbyid = false
            },
            textalign(){
                return "text-align:center"
            },
            showrefuse(){

                this.$refs.refuseReason.isshowrefuse=true
                // this.$router.push('/supManager/index/labManager')

            },

            agreeapply(){
                //提交的路径和参数

                this.detailbyid=false
            },

        }

    }
</script>

<style>

</style>