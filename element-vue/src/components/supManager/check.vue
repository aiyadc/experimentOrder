<template>
    <div>
        <el-form style="width: 90%;align-content: center;margin:auto;">
            <!--<el-row style="background:#DEDEBE;border:1.5px solid lightslategrey" >-->

                <!--<el-button type="success" style="width:12%;text-align:center;float:right" icon="el-icon-circle-plus-outline"-->
                           <!--@click="" >查看审核记录-->
                <!--</el-button>-->
            <!--</el-row>-->
            <el-row>
                <el-col style="border:1.5px lightslategrey;width:50%;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;">

                        <el-button style="width:100%;text-align:center;float:right;background:#DEDEBE" icon="el-icon-circle-plus-outline"
                                   @click="changechecking" >待审核</el-button>

                </el-col>
                <el-col style="border:1.5px lightslategrey;width:50%;border-right-style:solid;border-bottom-style:solid;">

                        <el-button style="width:100%;text-align:center;float:right;background:silver" icon="el-icon-circle-plus-outline"
                                   @click="changechecked" >已审核</el-button>

                </el-col>
            </el-row>
        </el-form >
            <checking v-if="ischeck" />
            <checked v-if="!ischeck" />

    </div>
</template>

<script>
    import checking from "~/components/supManager/checking" ;
    import checked from "~/components/supManager/checked" ;
    import {get, post} from "~/utils";
    export default {

        name:'check',
        components:{checking,checked},
        data(){
            return {
                "ischeck":true ,
                "ischeacking": true, //用于弹框显示是否可以被修改
            }
        },
        methods:{
            changechecking(){

                // 获得数据
                this.ischeck=true ;

            },
            changechecked(){

                // 获得数据
                this.ischeck=false ;

            },
            // redirect_to_
    }
    }
</script>

<style>

</style> 