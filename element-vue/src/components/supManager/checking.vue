<template>
    <div style="">



            <el-table
                    :data="tableData"
                    border
                    :cell-style="tableRowStyle"
                    :header-cell-style="tableHeaderColor"
                    style="width: 90%;align-content: center;margin:auto"


            >
                <el-table-column
                        prop="nickname"
                        label="姓名"

                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="实验室名称"

                >
                </el-table-column>

                <el-table-column
                        prop="address"
                        label="地点"
                >
                </el-table-column>
                <el-table-column
                        prop="use"
                        label="用途"
                >
                </el-table-column>
                <el-table-column
                        prop="week"
                        label="周次"
                >
                </el-table-column>
                <el-table-column
                        prop="detail"
                        label="详情"
                >
                    <template slot-scope="scope">
                    <el-button  @click="showdetail(scope.row)" style="background:#DEDEBE;width: 100%;height: 100%" size="small">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"

                        width="300px"
                >
                    <template slot-scope="scope">
                        <el-button  @click="apply(scope.row)" style="border: #B9B9FF solid 1px ;border-style: solid;border-width: 1.2px;background:#DEDEBE" size="small">允许</el-button>
                        <el-button  @click="refuse_apply(scope.row)"  style="border: #B9B9FF solid 1px ;border-style: solid;border-width: 1.2px;background:#DEDEBE" size="small">拒绝</el-button>

                    </template>
                </el-table-column>
            </el-table>
        <detail ref="detail"></detail>
        <refuse-reason ref="refuseReason"></refuse-reason>
    </div>

</template>

<script>
    import {get, post} from "~/utils";
    import detail from "~/components/supManager/detail" ;
    import refuseReason  from "~/components/supManager/refuseReason" ;

    export default {

        name:'checking',
        components:{detail,refuseReason},
        data(){
          return {
              tableData:[
                  {
                      nickname:"小姚" ,
                      name:"安卓实验室" ,
                      address:"509",
                      use:"安卓课",
                      week:"1-8",
                      detail:"详情" ,
                      listlrid:[] , //一整行的记录id，
                      applytime:'2018-20-23' ,
                      phone:"12345678",
                      use:"教学",
                      classname:"数据结构",
                      class:"17软件6班",
                      population:20,
                      commit:"无",
                      year:"",
                      semester:"" ,
                      day:"",
                      time: "",
                      uc_id:"",
                  },
                  {
                      nickname:"姚" ,
                      name:"window实验室" ,
                      address:"510",
                      use:"安卓课",
                      week:"1-8",
                      detail:"详情" ,

                      applytime:'2018-20-23' ,
                      phone:"12345678",
                      use:"教学",
                      classname:"数据结构",
                      class:"17软件6班",
                      population:20,
                      commit:"无",
                      year:"",
                      semester:"" ,
                      day:"",
                      time: "",
                      uc_id:"",
                  }
              ],
          }
        },
        methods:{
            tableRowStyle({row,column,rowIndex,columnIndex} ) {
                return 'background:#DEDEBE;text-align:center'

            },
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return 'background: #DEDEBE;text-align:center'
                }
            },
            showdetail(rowData){

                this.$refs.detail.form.applytime=rowData.applytime
                this.$refs.detail.form.nickname=rowData.nickname
                this.$refs.detail.form.phone=rowData.phone
                this.$refs.detail.form.address=rowData.address
                this.$refs.detail.form.name=rowData.name
                this.$refs.detail.form.use=rowData.use
                this.$refs.detail.form.classname=rowData.classname
                this.$refs.detail.form.class=rowData.class
                this.$refs.detail.form.time=rowData.week
                this.$refs.detail.form.commit=rowData.commit
                // 参数
                this.$refs.detail.form.year=rowData.year
                this.$refs.detail.form.semester=rowData.semester
                this.$refs.detail.form.day=rowData.day
                this.$refs.detail.form.time=rowData.time
                this.$refs.detail.form.uc_id=rowData.uc_id

                this.$refs.detail.form.population=rowData.population
                this.$refs.detail.detailbyid=true
                // this.$router.push('/supManager/index/labManager')
             //   this.$refs.detail.operator_id = true
            },
            apply(rowData){
                //同意申请 路径 参数是rowData里的数据

            },
            refuse_apply(rowData){
                //拒绝申请，路径 参数是rowData里的数据+拒绝理由
                // this.$prompt('请输入拒绝的理由', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消'
                // }).then(async ({ value }) => {
                //     this.data.refuseReason = value
                //     await post('lb/labrecord/refuse',this.data)
                //     this.$emit('complete')
                //     this.show = false
                //     showSuccess('已拒绝申请！',this)
                // }).catch(()=>{})
            }

        }


    }
</script>

<style>

</style>
