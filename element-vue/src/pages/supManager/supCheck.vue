<template>
    <div>
        <el-container>
            <el-main>
                <el-header>
                    <div>
                        <el-input type="text" v-model="search" style="max-width: 400px;float: left" placeholder="请输入查询关键字">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </el-header>
                <el-form style="align-content: center;margin:auto;">
                    <el-row>
                        <el-col style="border:1.5px lightslategrey;width:50%;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;">

                            <el-button style="width:100%;text-align:center;float:right;background-color: peachpuff" icon="el-icon-circle-plus-outline"
                                       @click="isCheck=0" >待审核</el-button>

                        </el-col>
                        <el-col style="border:1.5px lightslategrey;width:50%;border-right-style:solid;border-bottom-style:solid;">

                            <el-button style="width:100%;text-align:center;float:right;background:silver" icon="el-icon-circle-plus-outline"
                                       @click="isCheck=1" >已审核</el-button>

                        </el-col>
                    </el-row>
                </el-form >
                <el-table :data="tableDataComputed" border ref="mar" style="align-content: center;margin:auto;" :cell-style="cellStyle">
                    <el-table-column prop="position" label="实验室地点"></el-table-column>
                    <el-table-column prop="lab_name" label="实验室名称"></el-table-column>
                    <el-table-column prop="classes" label="授课班级"></el-table-column>
                    <el-table-column prop="population" label="人数"></el-table-column>
                    <el-table-column prop="course_name" label="课程名称"></el-table-column>
                    <el-table-column label="申请时间段" align="center">
                        <template slot-scope="scope">
                            {{parseInt(scope.row.year)}}-{{parseInt(scope.row.year)+1}}学年<br>
                            第{{scope.row.semester}}学期<br>
                            周{{scope.row.day}}第{{scope.row.time}}节课<br>
                            共{{scope.row.week}}周
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.status === 0 ? 'primary' : scope.row.status ===2 ? 'success': 'warning'"
                                    disable-transitions>
                                {{scope.row.status ===0 ? '待审核' :
                                scope.row.status ===2 ? '审核通过': '未通过'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100px" align="center">
                        <template slot-scope="scope">
                            <el-button @click="showDetail(scope.row)" :disabled="isCheck===0?false:true" :type="isCheck===0?'primary':'danger'" size="mini"
                                       >审核
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>

        <apply-detail-dialog ref="detail" @complete="load"></apply-detail-dialog>
    </div>
</template>

<script>
    import tb_course from "~/components/tb_course";
    import applyDetailDialog from "~/components/manager/applyDetailDialog";
    import {get} from "~/utils";
    import {arr2shortString} from "~/utils/converter";

    export default {
        components: {
            tb_course,applyDetailDialog
        },
        data() {
            return {
                search:'',
                isCheck:0,
                tableData: []
            }
        },
        methods:{
            async load(){
                this.tableData = await get('/lb/labrecord/getRecordList')
            },
            cellStyle(){
                return ""
            },
            async showDetail(item){
                const data = await get('lb/labrecord/getRecordDetail',item)
                data.create_time = new Date(data.create_time).toLocaleString( )
                data.weeks = arr2shortString(data.weeks)?'第'+arr2shortString(data.weeks)+'周':''
                this.$refs.detail.data = data
                this.$refs.detail.show = true
            }
        },
        computed:{
            tableDataComputed(){
                if (this.isCheck===0){

                    return this.tableData.filter(data=>data.status===0 && (!this.search ||
                          data.classes.toLowerCase().includes(this.search.toLowerCase())
                        || data.course_name.toLowerCase().includes(this.search.toLowerCase())
                        || data.lab_name.toLowerCase().includes(this.search.toLowerCase())
                        ||data.population.toString().includes(this.search)
                        ||data.position.toLowerCase().includes(this.search.toLowerCase())
                        ||data.year.includes(this.search)
                        ||data.day.toString().includes(this.search)
                    )
                    )
                }else {
                    return this.tableData.filter(data=>(data.status===1 || data.status===2) && (!this.search ||
                            data.classes.toLowerCase().includes(this.search.toLowerCase())
                            || data.course_name.toLowerCase().includes(this.search.toLowerCase())
                            || data.lab_name.toLowerCase().includes(this.search.toLowerCase())
                            ||data.population.toString().includes(this.search)
                            ||data.position.toLowerCase().includes(this.search.toLowerCase())
                            ||data.year.includes(this.search)
                            ||data.day.toString().includes(this.search)
                        )
                    )
                }

            }
        },
        async mounted() {
            await this.load()
        }
    }
</script>

<style scoped>

</style>
