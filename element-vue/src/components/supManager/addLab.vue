<template>
    <div>
        <el-dialog
                :visible.sync="addLabDialog"
                width="48%">
            <div style="width: 100%;height: 120% ">
                <el-form :model="form" ref="form">

                    <el-form-item label="位置" prop="position" label-width="100px" :rules="[{ required: true, message: '请输入位置', trigger: 'blur' }]">
                        <el-input v-model="form.position" placeholder="位置"></el-input>
                    </el-form-item>

                    <el-form-item label="实验室名称" prop="name" label-width="100px" :rules="[{ required: true, message: '请输入实验室名称', trigger: 'blur' }]">
                        <el-input v-model="form.name" placeholder="实验室名称"></el-input>
                    </el-form-item>
                    <!--                    <el-col style="width:45%">-->
                    <!--                        <el-form-item label="状态>-->
                    <!--                            <el-select v-model="form.status" style=";" >-->
                    <!--                                <el-option  label="可预约" value="0"></el-option>-->
                    <!--                                <el-option  label="不可预约" value="1"></el-option>-->
                    <!--                                <el-option  label="故障" value="2"></el-option>-->

                    <!--                            </el-select>-->
                    <!--                        </el-form-item>-->
                    <!--                    </el-col>-->
                    <el-form-item label="可容纳人数" prop="capacity" label-width="100px" :rules="[{ required: true, message: '请输入工号', trigger: 'blur' }]">
                        <el-input v-model="form.capacity" placeholder="输入数量"></el-input>
                    </el-form-item>

                    <el-form-item label="软件" prop="software" label-width="100px" :rules="[{ required: true, message: '请输入工号', trigger: 'blur' }]">
                        <el-input v-model="form.software" placeholder="输入实验室包含的软件"></el-input>
                    </el-form-item>

                    <el-form-item label="管理员" prop="manager_id" label-width="100px" :rules="[{ required: true, message: '请输入工号', trigger: 'blur' }]">
                        <el-select v-model="form.manager_id" style="width: 100%;">
                            <div v-for="item in userList">
                                <el-option  :label="item.nickname" :value="item.uid"></el-option>
                            </div>
                        </el-select>
                    </el-form-item>
                    <el-button type="success" style="width: 120px;text-align: center" @click="$emit('confirm')">
                        {{!form.lab_id?'新增':'修改'}}
                    </el-button>
                </el-form>
            </div>
        </el-dialog>
        <!--        <el-dialog :visible="setLabTimeDialog">-->
        <!--            <set-lab-time ref="setLabTime"></set-lab-time>-->
        <!--            <span slot="footer" class="dialog-footer">-->
        <!--                    <el-button @click="cancleSetTime">取 消</el-button>-->
        <!--                    <el-button type="primary" @click="setTime">确 定</el-button>-->
        <!--                </span>-->
        <!--        </el-dialog>-->
    </div>
</template>

<script>
    import {get} from "~/utils";

    export default {
        data() {
            return {
                setLabTimeDialog: false,
                addLabDialog: false,
                form: {
                    position: '',
                    name: '',
                    capacity: '',
                    manager_id: 0,
                    software: ''
                },
                userList: []
            }
        },
        methods: {
            // showAddLab() {
            //     this.addLabDialog = false
            // },
            // detailTime() {
            //     this.setLabTimeDialog = true
            //     this.form.schedule = []
            // },
            // cancleSetTime() {
            //     this.setLabTimeDialog = false
            //     this.$refs.setLabTime.allWeeksValue = []
            // },
            setTime() {
                this.setLabTimeDialog = false
                var st = this.$refs.setLabTime
                this.form.schedule.push(st.form.year, st.form.semester, st.allWeeksValue)
                console.log(this.form.schedule)
            }
        },
        async mounted() {
            this.userList = await get('lb/user/getUserList')
        }
    }
</script>

<style>

</style>
