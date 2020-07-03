<template>
    <div>
        <!--        学年/学期-->
        <time-select ref="timeSelect" @selectYear="load" @selectSemester="load" ></time-select>
        <!--        课程表-->
        <tb_course :cClick="cellClick" :cStyle="tableStyle" ref="tbCourse" table-label="我的课表" label="我的课表" :custom="true"></tb_course>
    </div>

</template>

<script>
    import tb_course from "~/components/tb_course";
    import timeSelect from "~/components/timeSelect";
    import {get} from "~/utils";
    import {item2html} from "~/utils/converter";

    export default {
        name: "myCourse1",
        components: {
            tb_course,
            timeSelect
        },
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            async load(){
                this.tableData = await get('lb/labrecord/getUserScheduleBySelf',{
                    year: this.$refs.timeSelect.year,
                    semester: this.$refs.timeSelect.semester
                })           //发送地址，请求该实验室地址的所有课程
                for (let i = 0; i < this.tableData.length; i++) {
                    this.$refs.tbCourse.tableData[i].Monday = item2html(this.tableData[i][0])
                    this.$refs.tbCourse.tableData[i].Tuesday =  item2html(this.tableData[i][1])
                    this.$refs.tbCourse.tableData[i].Wednesday =  item2html(this.tableData[i][2])
                    this.$refs.tbCourse.tableData[i].Thursday =  item2html(this.tableData[i][3])
                    this.$refs.tbCourse.tableData[i].Friday =  item2html(this.tableData[i][4])
                    this.$refs.tbCourse.tableData[i].Saturday =  item2html(this.tableData[i][5])
                    this.$refs.tbCourse.tableData[i].Sunday =  item2html(this.tableData[i][6])
                }
            },
            cellClick() {

            },
            tableStyle() {

            }
        },
        async mounted() {
            await this.load()
        }
    }
</script>

<style scoped>

</style>
