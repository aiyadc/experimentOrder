<template>
    <div style="width: 100%;padding: 20px">
        <el-form :model="time" :inline="true" style="width: 100%">
            <el-form-item label="学年" style="width: 20% ;">
                <el-select v-model="time.year" style="">
                    <el-option label="2017-2018" value="2017"></el-option>
                    <el-option label="2018-2019" value="2018"></el-option>
                    <el-option label="2019-2020" value="2019"></el-option>
                    <el-option label="2020-2021" value="2020"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学期" style="width: 20%">
                <el-select v-model="time.semester" style="">
                    <el-option label="第一学期" :value="1"></el-option>
                    <el-option label="第二学期" :value="2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-row :gutter="20">
            <el-col :span="8">
                <el-input v-model="search" placeholder="输入关键字搜索" suffix-icon="el-icon-search"/>
            </el-col>

            <el-col :span="16" style="text-align: left" v-if="">
                <el-button type="success" style="width: 120px;text-align: center" icon="el-icon-circle-plus-outline"
                           @click="editLab()">新增
                </el-button>
            </el-col>
        </el-row>

        <el-table :data="tableDataComputed" border style="margin-top: 20px">
            <el-table-column prop="name" label="实验室名称"></el-table-column>
            <el-table-column prop="position" label="实验室地点"></el-table-column>
            <el-table-column prop="software" label="软件"></el-table-column>
            <el-table-column prop="nickname" label="管理员"></el-table-column>
            <el-table-column prop="tel" label="管理员联系电话"></el-table-column>
            <el-table-column label="操作" width="370px">
                <template slot-scope="scope">
                    <el-button @click="editLab(scope.row)" type="primary" size="mini" plain icon="el-icon-edit">编辑
                    </el-button>
                    <el-button @click="schedulePreview(scope.row)" size="mini" plain>查看课表</el-button>
                    <el-button @click="editSchedule(scope.row)" type="primary" size="mini" icon="el-icon-edit"
                               plain>修改可预约时间段
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <add-lab ref="addLab" @confirm="submit"></add-lab>
        <set-lab-time ref="setLabTime"></set-lab-time>
        <tb_courseDialog :cClick="cellClick" :cStyle="tableStyle" table-label="实验室课表" ref="schedule" :custom="true" c-click=""></tb_courseDialog>
    </div>
</template>

<script>

    import addLab from "~/components/supManager/addLab" ;
    import tb_courseDialog from "~/components/tb_courseDialog";

    import {get, post} from "~/utils";
    import {closeLoading, showDialog, showDialogWithReject, showFail, showLoading, showSuccess} from "~/utils/dialog";
    import setLabTime from "~/components/supManager/setLabTime";
    import {item2html} from "~/utils/converter";
    import config from "~/config";

    export default {
        components: {addLab, setLabTime, tb_courseDialog},
        data() {
            return {
                edit: false,
                setLabTimeDialog: false,
                form: {},
                time: {
                    year: config.defyear,
                    semester: 2
                },
                search: '',
                tableData: [
                    {
                        name: "小姚",
                        position: "509",
                        software:"window",
                        nickname:"小姚",
                        tel:"123456789"

                    },
                    {
                        name: "我是",
                        position: "lp",
                        software:"window",
                        nickname:"小姚",
                        tel:"123456789"
                    }

                ],
                currenttableData:[
                    {
                        name: "",
                        position: "",
                        software:"",
                        nickname:"",
                        tel:""
                    }
                ],
            }
        },
        computed: {
            tableDataComputed() {

                 return this.currenttableData=this.tableData.filter(data => !this.search
                    || data.name.toLowerCase().includes(this.search.toLowerCase())
                    || data.position.toLowerCase().includes(this.search.toLowerCase())
                    || data.software.toLowerCase().includes(this.search.toLowerCase())
                    || data.nickname.toLowerCase().includes(this.search.toLowerCase())
                    || data.tel.toLowerCase().includes(this.search.toLowerCase())

                )
            }

        },
        methods: {
            async load() {
                this.tableData = await get('/lb/lab/getLabList')
            },
            // 编辑
            async editLab(item) {
                // 判断是否为编辑模式
                this.edit = !!item
                this.$refs.addLab.form = item ? item : {
                    position: '',
                    name: '',
                    capacity: '',
                    manager_id: ''
                }
                this.$refs.addLab.addLabDialog = true
                console.log(this.$refs.addLab)
                // 弹出编辑框
                this.dialogFormVisible = true
            },
            async submit() {
                this.$refs.addLab.$refs.form.validate(async (valid)=> {
                    if (valid) {
                        this.$refs.addLab.form.capacity = parseInt(this.$refs.addLab.form.capacity)
                        this.$refs.addLab.form.managerId = this.$refs.addLab.form.manager_id
                        if (this.$refs.addLab.form.lab_id) {
                            // 编辑
                            await showDialog('确认要编辑吗？', this)
                            this.$refs.addLab.form.labId = this.$refs.addLab.form.lab_id
                            await post('lb/lab/updateLab', this.$refs.addLab.form).then(async () => {
                                await this.load()
                                showSuccess('编辑成功', this)
                            }).catch(() => {
                                    showFail('编辑失败', this)
                                }
                            )
                        } else {
                            // 新增
                            await showDialog('确认要新增吗？', this)
                            await showDialogWithReject('是否需要为该实验室添加' + parseInt(this.time.year) + '-' + (parseInt(this.time.year) + 1) + '学年第' + this.time.semester + '学期16周的所有时间段？', this).then(async () => {
                                this.$refs.addLab.form.fastInsert = true
                                this.$refs.addLab.form.year = this.time.year
                                this.$refs.addLab.form.semester = this.time.semester
                                console.log(this.$refs.addLab.form)
                                await this.addLab()
                            }).catch(async () => {
                                this.$refs.addLab.form.fastInsert = false
                                await this.addLab()
                            })
                        }
                        this.$refs.addLab.addLabDialog = false
                    }
                })
            },
            async addLab() {
                const loading = showLoading('正在新增...', this)
                const newLab = await post('lb/lab/addLab', this.$refs.addLab.form).then(async () => {
                    await this.load()
                    showSuccess('新增成功', this)
                    closeLoading(loading)
                }).catch(() => {
                    closeLoading(loading)
                    showFail('新增失败', this)
                })
            },
            async schedulePreview(event) {
                await this.loadSchedule(event.lab_id)
                this.$refs.schedule.lab = {
                    name: event.name,
                    position: event.position
                }
                this.$refs.schedule.courseDialog = true
            },
            async editSchedule(item) {
                this.$refs.setLabTime.lab = item
                this.$refs.setLabTime.form.labId = item.lab_id
                this.$refs.setLabTime.setLabTimeDialog = true
            },
            async loadSchedule(labId) {
                const schedule = await get('lb/labrecord/getLabSchedule', {
                    labId,
                    year: this.time.year,
                    semester: this.time.semester
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
            },
            cellClick() {

            },
            tableStyle() {

            }

        },


        async mounted() {
            await this.load()
            // this.tableData=get('/url')
        }
    }
</script>

<style>

</style>
