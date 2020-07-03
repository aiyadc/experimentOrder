<template>
    <div>
        <nav-bar></nav-bar><br>
        <time-select></time-select>
        <tb_course :c-click="cClick" :c-style="cellStyle" table-label="实验室申请详情" ref="tbCourse"></tb_course>
    </div>

</template>

<script>
    import tb_course from "~/components/tb_course";
    import timeSelect from "~/components/timeSelect";
    import navBar from "~/components/teacher/navBar";
    import {get} from "~/utils";
    export default {
        name: "labApplyDetail",
        props:['id'],
        components:{
            tb_course,
            navBar,
            timeSelect
        },
        data(){
            return{
                tableData:[]
            }
        },
        methods: {
            cClick(){
                console.log('you click a cell')
            },
            cellStyle: function ({row, column, rowIndex, columnIndex}) {
                if (column.label != '') {
                    return 'cursor:pointer'
                }
            },

        },
        mounted() {
            console.log(this.$refs.tbCourse)
            this.tableData=get('')           //发送地址，请求该实验室地址的所有课程，用一个三维数组返回
            for (let i = 0; i < this.tableData.length; i++) {
                this.$refs.tbCourse.tableData[i].Monday = this.tableData[i][0]
                this.$refs.tbCourse.tableData[i].Tuesday = this.tableData[i][1]
                this.$refs.tbCourse.tableData[i].Wednesday = this.tableData[i][2]
                this.$refs.tbCourse.tableData[i].Thursday = this.tableData[i][3]
                this.$refs.tbCourse.tableData[i].Friday = this.tableData[i][4]
                this.$refs.tbCourse.tableData[i].Saturday = this.tableData[i][5]
                this.$refs.tbCourse.tableData[i].Sunday = this.tableData[i][6]
            }
        }
    }
</script>
<style scoped>

</style>
