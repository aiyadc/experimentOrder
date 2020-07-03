<template>
    <div style="margin: 20px">
        <el-form :model="time" :inline="true" style="width: 100%">
            <el-form-item label="学年" style="width: 20% ;">
                <el-select v-model="time.year" style="">
                    <div v-for="item in year">
                        <el-option :label="item.label" :value="item.value"></el-option>
                    </div>
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
            <el-col :span="16" style="text-align: left">
                <el-button type="success" style="width: 120px;text-align: left" icon="el-icon-circle-plus-outline"
                           @click="editUser(null)">新增用户
                </el-button>
                <el-button type="danger" plain icon="el-icon-delete" style="width: 120px;text-align: left"
                           @click="deleteUserMul" v-if="items.length">多选删除
                </el-button>
            </el-col>
        </el-row>
        <el-table
                ref="multipleTable"
                :data="tableDataComputed"
                @selection-change="handleSelectionChange"
                border
                style="width: 100%;margin-top: 20px">
            <el-table-column type="selection" width="40" align="center"></el-table-column>
            <el-table-column prop="username" label="工号" sortable></el-table-column>
            <el-table-column prop="position" label="职位" sortable align="center">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.position === 1 ? 'primary' : scope.row.position ===2 ? 'success': 'warning'"
                            disable-transitions>{{scope.row.position ===1 ? '教 师' :
                        scope.row.position ===2 ? '实验室管理员': '超级管理员'}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="nickname" label="姓名" sortable></el-table-column>
            <el-table-column prop="tel" label="联系电话"></el-table-column>
            <el-table-column prop="office" label="办公室" sortable></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column fixed="right" label="操作" width="300">
                <template slot-scope="scope">
                    <el-button @click="editUser(scope.row)" type="primary" size="mini" plain icon="el-icon-edit"
                               v-if="scope.row.position!==3">编辑
                    </el-button>
                    <el-button @click="deleteUser(scope.row)" type="danger" size="mini" plain icon="el-icon-delete"
                               v-if="scope.row.position!==3">删除
                    </el-button>
                    <el-button @click="schedulePreview(scope.row)" size="mini" plain v-if="scope.row.position === 1">
                        查看课表
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <user-edit-form
                :dialog-form-visible="dialogFormVisible"
                :edit="edit"
                :user-form="userForm"
                @cancel="cancel"
                @confirm="confirm"
        ></user-edit-form>
        <tb_courseDialog :cClick="cellClick" :cStyle="tableStyle" table-label="教师课表" ref="schedule" :custom="true"
                         c-click=""></tb_courseDialog>
    </div>

</template>

<script>
    import {get, post} from "~/utils";
    import {showDialog, showFail, showSuccess} from "~/utils/dialog";
    import userEditForm from "~/components/supManager/userEditForm";
    import tb_courseDialog from "~/components/tb_courseDialog";
    import {item2html} from "~/utils/converter";
    import config from "~/config";

    export default {
        components: {userEditForm, tb_courseDialog},
        data() {
            return {
                search: '',
                year: config.year,
                items: [],
                tableData: [],
                dialogFormVisible: false,
                edit: false,
                userForm: {},
                time: {
                    year: '2019',
                    semester: 2
                },
            }
        }
        ,
        methods: {
            async load() {
                this.tableData = await get('lb/user/getUserList')
            },
            handleSelectionChange(val) {
                this.items = val;
            },
            // 删除用户
            async deleteUser(item) {
                await showDialog("确认要删除吗？", this)
                await post('lb/user/deleteUser', {
                    uid: item.uid
                }).then(() => {
                    showSuccess("删除成功", this)
                    this.load()
                }).catch(e => {
                    showFail("删除失败 " + e.msg, this)
                })
            },
            async deleteUserMul() {
                await showDialog("确认要删除吗？", this)
                showFail("尚未开发", this)
            },
            // 编辑用户
            async editUser(item) {
                // 判断是否为编辑模式
                this.edit = !!item
                this.userForm = item ? item : {
                    nickname: "",
                    tel: "",
                    email: "",
                    username: "",
                    office: "",
                    position: ''
                }
                // 弹出编辑框
                this.dialogFormVisible = true
            },
            async schedulePreview(event) {
                console.log(event)
                await this.loadSchedule(event.uid)
                this.$refs.schedule.courseDialog = true
            },
            async loadSchedule(u_id) {
                const schedule = await get('lb/labrecord/getUserSchedule', {
                    u_id,
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

            },
            cancel() {
                this.load()
                this.dialogFormVisible = false
            },
            confirm() {
                this.cancel()
            }
        },
        computed: {
            tableDataComputed() {
                return this.tableData.filter(data => !this.search
                    || data.username.toLowerCase().includes(this.search.toLowerCase())
                    || data.tel.toLowerCase().includes(this.search.toLowerCase())
                    || data.nickname.toLowerCase().includes(this.search.toLowerCase())
                    || data.office.toLowerCase().includes(this.search.toLowerCase())
                    || data.email.toLowerCase().includes(this.search.toLowerCase())
                )
            }
        },
        async mounted() {
            this.load()
        }
    }
</script>
