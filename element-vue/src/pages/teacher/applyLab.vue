<template>

    <div>
        <el-container>
            <el-main>
                <!--                年/和学期-->
                <time-select ref="timeSelection"></time-select>
                <!--                表格查询、申请记录-->
                <el-header>
                    <div>
                        <el-input type="text" v-model="search" style="max-width: 400px;float: left" placeholder="请输入查询关键字">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                        <el-button style="float: right" class="el-button--danger" @click="toMyRecord">我的申请记录</el-button>
                    </div>
                </el-header>
                <el-table :data="tableDataFilter" border ref="detailtb" height="500px">
                    <el-table-column prop="position" label="实验室地点"></el-table-column>
                    <el-table-column prop="name" label="实验室名称"></el-table-column>
                    <el-table-column prop="capacity" label="可容纳人数"></el-table-column>
                    <el-table-column prop="software" label="软件"></el-table-column>
                    <el-table-column prop="nickname" label="管理员"></el-table-column>
                    <el-table-column prop="tel" label="管理员联系电话"></el-table-column>
                    <el-table-column fixed="right"
                                     label="操作"
                                     width="212">
                        <template slot-scope="scope">
                            <el-button type="text" size="medium" @click="checkDetail(scope.row)">查看申请详情
                            </el-button>
                            <el-button @click="clickLabApply(scope.row)" type="text" size="medium">申请</el-button>
                        </template>
                        >

                    </el-table-column>
                </el-table>
            </el-main>
            <!--            填写申请课室表单信息-->
            <el-dialog title="请填写以下申请信息" :visible.sync="formDialog" :close-on-click-modal="false">

                <el-form :model="form" :inline="true" label-width="100px" ref="courseForm">
                    <el-form-item label="课程名称" prop="ucId"
                                  :rules="[{ required: true, message: '请选择课程', trigger: 'change' }]">
                        <el-select v-model="form.ucId" @change="selectChange">
                            <el-option v-for="item in courseOption" :key="item.ucId" :label="item.name"
                                       :value="item.ucId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="form.position" disabled></el-input>
                    </el-form-item>
                    <!--                    <el-form-item label="申请时间" prop="date" >-->
                    <!--                        <el-input v-model="form.date" disabled></el-input>-->
                    <!--                    </el-form-item>-->
                    <el-form-item label="实验室名称">
                        <el-input v-model="form.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="nickname">
                        <el-input v-model="form.nickname" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="tel">
                        <el-input v-model="form.tel" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="使用班级" prop="class">
                        <el-input v-model="form.class" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="班级人数" prop="population">
                        <el-input v-model="form.population" disabled></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button type="primary" @click="setTime">填写申请时间段</el-button>
                    <el-button @click="cancelAppy">取消</el-button>
                </div>
            </el-dialog>
            <!--            表格：节数选择-->
            <tb_course :cClick="cellClick" :cStyle="cellStyle" table-label="点击相应的位置选取时间段" ref="times"
                       :custom="true"></tb_course>
            <!--            checkbox:周次选择-->
            <el-dialog :visible.sync="weekDialog" title="请选择周数" width="400px" :close-on-click-modal="false"
                       :before-close="beforeClose" :destroy-on-close="true">
                <week-selection @add="addWeek" @cancel="weekDialog=false" ref="weekSelection"
                                :able-list="ableList"></week-selection>
            </el-dialog>
        </el-container>
        <!--        课表-->
        <tb_course-dialog table-label="实验室课表" ref="schedule" :custom="true" :cClick="f" :cStyle="f"></tb_course-dialog>

    </div>
</template>

<script>
    import tb_course from "~/components/tb_courseDialog";
    import tb_courseDialog from "~/components/tb_courseDialog";
    import weekSelection from "~/components/weekSelection";
    import timeSelect from "~/components/timeSelect";
    import {get, post, stop} from "~/utils";
    import {showDialog, showFail, showSuccess} from "~/utils/dialog";
    import {arr2shortString, item2html} from "~/utils/converter";

    export default {
        name: "applyLab",
        components: {
            tb_courseDialog, tb_course,weekSelection, timeSelect
        },
        data() {
            return {
                search:'',
                user: {},
                lab: {},
                ableList: [],
                tableAlive: false,     //用于重载表格
                tableData: [{}],
                checkOption: [],

                formDialog: false,
                courseDialog: false,
                weekDialog: false,

                perTargetValue: '',
                aWeekValue: [],
                allWeeksValue: [],

                form: {
                    position: '',
                    name: '',
                    date: '',
                    nickname: '',
                    tel: '',
                    course_name: '',
                    class: '',
                    population: '',
                    schedule: '',
                    remind: '无'
                },
                courseOption: [],
                booked: []
            }

        },
        methods: {
            //表格中每个格子的风格
            cellStyle({row, column, rowIndex, columnIndex}) {
                if (column.label != '') {
                    return 'cursor:pointer'
                }
            },
            f() {
            },
            //点击格子促发的函数
            async cellClick(row, column, cell, event) {
                if (column.label != '') {
                    this.form.weeks = null
                    this.form.day = column.index
                    this.form.time = row.index
                    this.form.year = this.$refs.timeSelection.year
                    this.form.semester = this.$refs.timeSelection.semester


                    new Promise((resolve, reject) => {       //使weekDialog打开和调用按顺序执行
                        this.weekDialog = true
                        resolve('打开了weekDialog')
                    }).then(async (res) => {
                        this.ableList = await get("lb/labTime/getWeeksAbleBook", this.form)
                        this.$refs.weekSelection.singleVal = this.ableList.filter(elem => elem % 2 !== 0)
                        this.$refs.weekSelection.doubleVal = this.ableList.filter(elem => elem % 2 === 0)
                        this.$refs.weekSelection.allVal = this.ableList
                        this.$refs.weekSelection.checkedValue = this.booked[row.index - 1][column.index - 1]
                        this.aWeekValue.push(row.index, column.index)
                        this.perTargetValue = event.target       //用target对表格进行定位并保存致target对象
                        this.aWeekValue.push(row.index, column.index)

                    })
                }
            },
            //点击表格操作栏申请按钮
            clickLabApply(row) {
                console.log(row)
                this.lab = row
                this.form = {
                    labId: row.lab_id,
                    position: row.position,
                    name: row.name,
                    nickname: this.user.nickname,
                    tel: this.user.tel,
                    class: '',
                    population: '',
                    remind: '无'
                }
                this.formDialog = true
            },
            //点击查看申请详情
            async checkDetail(event) {
                await this.loadSchedule(event.lab_id)
                this.$refs.schedule.lab = {
                    name: event.name,
                    position: event.position
                }
                this.$refs.schedule.courseDialog = true
            },
            //当选择的课程发生改变触发此函数
            async selectChange(uc_id) {
                let course = await get("lb/usercourse/findusercourse/" + uc_id)
                this.form.class = course.classes
                this.form.population = course.population
                this.form.uc_id = uc_id
            },
            //添加已选择的的周数
            async addWeek() {
                this.weekDialog = false
                const targetValue = this.$refs.weekSelection.checkedValue
                this.form.weeks = targetValue
                //提交
                await showDialog("确认预约此时间段吗？", this)
                await post('lb/labrecord/updateWeeks', this.form)
                await this.getScheduleAble()
                await showSuccess("预约成功，管理员正在审核", this)
                this.form.weeks = []

                this.$refs.courseForm.validate(async (valid) => {
                    if (valid) {
                        console.log(this)
                        await this.getScheduleAble()
                        this.$refs.times.lab = this.lab
                        this.$refs.times.courseDialog = true
                        this.formDialog = false
                    }
                })
            },
            setTime:function(){
                this.$refs.courseForm.validate(async (valid)=>{
                    if (valid){
                        await this.getScheduleAble()
                        this.$refs.times.lab = this.lab
                        this.$refs.times.courseDialog = true
                        this.formDialog = false
                    }
                })
            },
            cancelAppy: function () {
                this.formDialog = false
            },
            //周次选择器关闭前的回调
            beforeClose() {
                this.weekDialog = false
                this.aWeekValue = []
            },
            //跳转到我的申请记录
            toMyRecord() {
                this.$router.push('/teacher/myApplyRecord/' + this.user.u_id)   //这里的user.u_id作为是作为路径参数存在
            },
            async loadCourse() {
                this.courseOption = await get("lb/usercourse/findbyyearandsemester/" + this.$refs.timeSelection.year + "/" + this.$refs.timeSelection.semester)
            },
            async getScheduleAble() {
                const params = {
                    labId: this.form.labId,
                    year: this.$refs.timeSelection.year,
                    semester: this.$refs.timeSelection.semester,
                    uc_id: this.form.uc_id
                }
                const schedule = await get('lb/labTime/getLabScheduleAbleBook', params)
                const booked = await get('lb/labrecord/getWeekBooked', params)
                this.booked = booked
                // console.log(this.booked)
                for (let i = 0; i < schedule.length; i++) {
                    this.$refs.times.tableData[i].Monday = arr2shortString(schedule[i][0]) ? '<span style="color:#1989fa">' + arr2shortString(schedule[i][0]) + '周可预约' + '</span>' : ''
                    this.$refs.times.tableData[i].Tuesday = arr2shortString(schedule[i][1]) ? '<span style="color:#1989fa">' + arr2shortString(schedule[i][1]) + '周可预约' + '</span>' : ''
                    this.$refs.times.tableData[i].Wednesday = arr2shortString(schedule[i][2]) ? '<span style="color:#1989fa">' + arr2shortString(schedule[i][2]) + '周可预约' + '</span>' : ''
                    this.$refs.times.tableData[i].Thursday = arr2shortString(schedule[i][3]) ? '<span style="color:#1989fa">' + arr2shortString(schedule[i][3]) + '周可预约' + '</span>' : ''
                    this.$refs.times.tableData[i].Friday = arr2shortString(schedule[i][4]) ? '<span style="color:#1989fa">' + arr2shortString(schedule[i][4]) + '周可预约' + '</span>' : ''
                    this.$refs.times.tableData[i].Saturday = arr2shortString(schedule[i][5]) ? '<span style="color:#1989fa">' + arr2shortString(schedule[i][5]) + '周可预约' + '</span>' : ''
                    this.$refs.times.tableData[i].Sunday = arr2shortString(schedule[i][6]) ? '<span style="color:#1989fa">' + arr2shortString(schedule[i][6]) + '周可预约' + '</span>' : ''
                }
                for (let i = 0; i < booked.length; i++) {
                    this.$refs.times.tableData[i].Monday = arr2shortString(booked[i][0]) ? '<span style="color:red">' + arr2shortString(booked[i][0]) + '周已预约' + '</span><br>' + this.$refs.times.tableData[i].Monday : this.$refs.times.tableData[i].Monday
                    this.$refs.times.tableData[i].Tuesday = arr2shortString(booked[i][1]) ? '<span style="color:red">' + arr2shortString(booked[i][1]) + '周已预约' + '</span><br>' + this.$refs.times.tableData[i].Tuesday : this.$refs.times.tableData[i].Tuesday
                    this.$refs.times.tableData[i].Wednesday = arr2shortString(booked[i][2]) ? '<span style="color:red">' + arr2shortString(booked[i][2]) + '周已预约' + '</span><br>' + this.$refs.times.tableData[i].Wednesday : this.$refs.times.tableData[i].Wednesday
                    this.$refs.times.tableData[i].Thursday = arr2shortString(booked[i][3]) ? '<span style="color:red">' + arr2shortString(booked[i][3]) + '周已预约' + '</span><br>' + this.$refs.times.tableData[i].Thursday : this.$refs.times.tableData[i].Thursday
                    this.$refs.times.tableData[i].Friday = arr2shortString(booked[i][4]) ? '<span style="color:red">' + arr2shortString(booked[i][4]) + '周已预约' + '</span><br>' + this.$refs.times.tableData[i].Friday : this.$refs.times.tableData[i].Friday
                    this.$refs.times.tableData[i].Saturday = arr2shortString(booked[i][5]) ? '<span style="color:red">' + arr2shortString(booked[i][5]) + '周已预约' + '</span><br>' + this.$refs.times.tableData[i].Saturday : this.$refs.times.tableData[i].Saturday
                    this.$refs.times.tableData[i].Sunday = arr2shortString(booked[i][6]) ? '<span style="color:red">' + arr2shortString(booked[i][6]) + '周已预约' + '</span><br>' + this.$refs.times.tableData[i].Sunday : this.$refs.times.tableData[i].Sunday
                }
            },
            async loadSchedule(labId) {
                const schedule = await get('lb/labrecord/getLabSchedule', {
                    labId,
                    year: this.$refs.timeSelection.year,
                    semester: this.$refs.timeSelection.semester
                })           //发送地址，请求该实验室地址的所有课程
                for (let i = 0; i < schedule.length; i++) {
                    this.$refs.schedule.tableData[i].Monday = item2html(schedule[i][0])
                    this.$refs.schedule.tableData[i].Tuesday = item2html(schedule[i][1])
                    this.$refs.schedule.tableData[i].Wednesday = item2html(schedule[i][2])
                    this.$refs.schedule.tableData[i].Thursday = item2html(schedule[i][3])
                    this.$refs.schedule.tableData[i].Friday = item2html(schedule[i][4])
                    this.$refs.schedule.tableData[i].Saturday = item2html(schedule[i][5])
                    this.$refs.schedule.tableData[i].Sunday = item2html(schedule[i][6])
                }
            }
        },
        computed:{
            tableDataFilter(){
                return this.tableData.filter(data=>{
                       if (this.search==="")
                       {
                           return data!==""
                       }else {
                           return
                           {
                               data.position.toLowerCase().includes(this.search.toLowerCase()) ||
                               data.name.toLowerCase().includes(this.search.toLowerCase()) ||
                               data.date.toLowerCase().includes(this.search.toLowerCase()) ||
                               data.nickname.toLowerCase().includes(this.search.toLowerCase()) ||
                               data.tel.toLowerCase().includes(this.search.toLowerCase()) ||
                               data.course_name.toLowerCase().includes(this.search.toLowerCase()) ||
                               data.class.toLowerCase().includes(this.search.toLowerCase()) ||
                               data.population.toLowerCase().includes(this.search.toLowerCase()) ||
                               data.schedule.toLowerCase().includes(this.search.toLowerCase()) ||
                               data.remind.toLowerCase().includes(this.search.toLowerCase())
                           }
                       }
                })
            }
        },
        //钩子函数，生命周期mouted
        async mounted() {
            this.tableData = await get('/lb/lab/getLabList')
            this.user = await get('lb/user/getUserInfo')
            await this.loadCourse()
        }
    }
</script>

<style scoped>

</style>
