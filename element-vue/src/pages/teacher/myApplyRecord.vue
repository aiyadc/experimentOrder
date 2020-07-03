<template>
    <div>
        <el-container>
            <el-main>
                <el-header>
                    <div>
                        <el-input type="text" style="max-width: 400px;float: left" placeholder="请输入查询关键字" ><el-button slot="append" icon="el-icon-search"></el-button></el-input>
                    </div>
                </el-header>
                <el-table :data="tableData" border ref="mar" height="500px">
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
                                    :type="scope.row.status === 0 ? 'primary' : scope.row.status ===2 ? 'success': 'warning'" disable-transitions>
                                {{scope.row.status ===0 ? '正在审核' :
                                scope.row.status ===2 ? '审核通过': '审核失败'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>

        </el-container>



    </div>
</template>

<script>
    import tb_course from "~/components/tb_course";

    import {get} from "~/utils";
    export default {
        components: {
            tb_course
        },
        data() {
            return {
                tableData: []
            }
        },
        async mounted() {
            this.tableData = await get('/lb/labrecord/getRecordBySelf')
        }
    }
</script>

<style scoped>

</style>
