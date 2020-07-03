<template>
    <div>
        <el-dialog :visible="setLabTimeDialog" @close="setLabTimeDialog=false" :title="lab.position+'  '+lab.name">
            <el-form :model="form">
                <el-form-item label="学年：" label-width="150px" align="center">
                    <el-select v-model="form.year" size="small" style="width: 100%">
                        <el-option
                                v-for="item in selectOptions1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学期：" label-width="150px" align="center">
                    <el-select v-model="form.semester" size="small" style="width: 100%">
                        <el-option
                                v-for="item in selectOptions2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        >
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="可预约时间段：" label-width="150px" align="center">
                    <el-button type="primary" style="width: 100%" @click="showCourseDialog">点击设置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--            表格：节数选择-->
        <tb_course :cClick="cellClick" :cStyle="cellStyle" table-label="点击相应的位置选取时间段" ref="times"
                   :custom="true"></tb_course>
        <!--            checkbox:周次选择-->
        <el-dialog :visible.sync="weekDialog" title="请选择周数" width="400px" :close-on-click-modal="false" append-to-body>
            <week-selection @add="addWeek" @cancel="cancelSelection" ref="weekSelection"
                            :able-list="ableList"></week-selection>
        </el-dialog>

    </div>
</template>

<script>
    import weekSelection from "~/components/weekSelection";
    import tb_course from "~/components/tb_courseDialog";
    import {get, post} from "~/utils";
    import {showDialog, showSuccess} from "~/utils/dialog";
    import {arr2shortString} from "~/utils/converter";
    import config from "~/config";

    export default {
        components: {weekSelection, tb_course},
        data() {
            return {
                lab: {
                    name: '',
                    position: ''
                },
                form: {
                    year: '2019',
                    semester: 2
                },
                setLabTimeDialog: false,
                ableList: [],
                weekDisable: [],
                allWeeksValue: [],
                aWeekValue: [],
                courseDialog: false,
                tableAlive: false,     //用于重载表格
                weekDialog: false,
                selectOptions1: config.year,
                selectOptions2: [
                    {
                        value: 1,
                        label: '第一学期'
                    },
                    {
                        value: 2,
                        label: '第二学期'
                    }
                ],
            }
        },
        methods: {
            //设置周次与节次
            async showCourseDialog() {
                await this.getScheduleAll()
                this.tableAlive = true
                this.$refs.times.courseDialog = true
                this.setLabTimeDialog = false
            },
            //表格中每个格子的风格
            cellStyle: function ({row, column, rowIndex, columnIndex}) {
                if (column.label != '') {
                    return 'cursor:pointer'
                }
            },
            //点击格子促发的函数
            async cellClick(row, column, cell, event) {
                this.form.weeks = null
                this.form.day = column.index
                this.form.time = row.index
                this.form.uc_id = 0
                console.log(this.form)
                const weekAll = await get('lb/labTime/getWeeks', this.form)
                const weekAble = await get("lb/labTime/getWeeksAbleBook", this.form)
                this.weekDisable = weekAll.filter(elem => !(weekAble.indexOf(elem) > -1))
                this.ableList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].filter(elem => !(this.weekDisable.indexOf(elem) > -1))
                this.weekDialog = true
                // if (column.label != '') {
                //     this.weekDialog = true
                //     this.perTargetValue = event.target       //用target对表格进行定位并保存致target对象
                //     // console.log(this.aWeekValue, this.allWeeksValue)
                //     this.aWeekValue.push(row.index, column.index)
                // }
            },
            //添加已选择的的周数
            async addWeek() {
                console.log(this.form)
                this.weekDialog = false
                var targetValue = this.$refs.weekSelection.checkedValue
                this.form.weeks = targetValue
                //提交
                await showDialog("确认设置此时间段可预约吗？", this)
                for (let i in this.weekDisable) {
                    this.form.weeks.push(this.weekDisable[i])
                }
                console.log(this.form)
                await post('lb/labTime/updateLabTime', this.form)
                await this.getScheduleAll()
                await showSuccess("设置成功", this)
                // if (targetValue.length !== 0) {
                //     this.perTargetValue.textContent = '【' + targetValue + '】周'
                //     this.aWeekValue.push(targetValue)    //单个节数时间段添加完成，包括[rowIndex,column,targetValue]
                //     this.allWeeksValue.push(this.aWeekValue)   //把单个格子选择的时间段添加到allWeeksValue中
                //     this.perTargetValue.style.backgroundColor = 'lightyellow'
                //     for (let i = 0; i < this.allWeeksValue.length; i++) {
                //         for (let j = i + 1; j < this.allWeeksValue.length; j++) {
                //             if (this.allWeeksValue[i][0] === this.allWeeksValue[j][0] && this.allWeeksValue[i][1] === this.allWeeksValue[j][1]) {
                //                 this.allWeeksValue.splice(i, 1)
                //             }
                //         }
                //     }
                //
                // }
                // this.aWeekValue = []
                // this.$refs.weekSelection.checkedValue=[]   //将周数选择器已选择选项置空
                // console.log(this.allWeeksValue)

            },
            //取消一个格子已选择这些周数
            async cancelSelection() {
                for (let i = 0; i < this.allWeeksValue.length; i++) {
                    if (this.aWeekValue[0] === this.allWeeksValue[i][0] && this.aWeekValue[1] === this.allWeeksValue[i][1]) {
                        this.allWeeksValue.splice(i, 1)
                        console.log(this.allWeeksValue)
                    }
                }
                this.aWeekValue = []
                this.perTargetValue.style.backgroundColor = ''
                this.perTargetValue.textContent = ''
                //此处再设置将allWeeksValue里边减去这个表格原本的内容，要怎么删去呢，思考一下。
                // if (this.perTargetValue!=''){
                //     this.allWeeksValue.pop()
                // }
                this.weekDialog = false
            },
            //确定所有格子已选择的周数
            async setWeeks() {
                console.log(this.$refs.times)
                console.log(this.allWeeksValue)
                // this.form.schedule=this.allWeeksValue.toString()
                this.courseDialog = false
                // console.log(this.$refs.times)
                this.tableAlive = false
                if (this.allWeeksValue.length !== 0) {
                    this.form.time = '已设置，点击修改'
                }

            },
            //取消所有已选择的周数
            cancelSetWeeks: function () {
                this.allWeeksValue = []
                this.form.schedule = ""
                this.courseDialog = false
                this.formDialog = true
                console.log(this.allWeeksValue)
                this.tableAlive = false   //表格失活
            },
            async getScheduleAll() {
                const schedule = await get('lb/labTime/getLabScheduleAll', {
                    labId: this.form.labId,
                    year: this.form.year,
                    semester: this.form.semester
                })
                for (let i = 0; i < schedule.length; i++) {
                    this.$refs.times.tableData[i].Monday = arr2shortString(schedule[i][0])?arr2shortString(schedule[i][0])+'周':''
                    this.$refs.times.tableData[i].Tuesday = arr2shortString(schedule[i][1])?arr2shortString(schedule[i][1])+'周':''
                    this.$refs.times.tableData[i].Wednesday = arr2shortString(schedule[i][2])?arr2shortString(schedule[i][2])+'周':''
                    this.$refs.times.tableData[i].Thursday =arr2shortString(schedule[i][3])?arr2shortString(schedule[i][3])+'周':''
                    this.$refs.times.tableData[i].Friday = arr2shortString(schedule[i][4])?arr2shortString(schedule[i][4])+'周':''
                    this.$refs.times.tableData[i].Saturday = arr2shortString(schedule[i][5])?arr2shortString(schedule[i][5])+'周':''
                    this.$refs.times.tableData[i].Sunday = arr2shortString(schedule[i][6])?arr2shortString(schedule[i][6])+'周':''
                }
            }
        }
    }
</script>

<style scoped>

</style>
