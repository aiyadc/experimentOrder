<template>
    <div>
        <time-select style="margin-top: 20px" ref="timeSelect" @selectYear="load" @selectSemester="load"></time-select>
        <div style="margin-bottom: 10px">
            <el-row :gutter="20">
                <el-col :span="2">
                    <el-button type="success" @click="addCourse">添加课程</el-button>
                </el-col>
                <el-col :span="8">
                    <el-input type="text" v-model="search" style="max-width: 400px;float: left" placeholder="请输入查询关键字">
                        <el-button slot="append" icon="el-icon-search">查询</el-button>
                    </el-input>
                </el-col>
                <el-col :offset="11" :span="2">
                    <el-button type="danger" v-show="showDeleteBtn" @click="deleteSelections">多选删除</el-button>
                </el-col>

            </el-row>
        </div>
        <el-table :data="tableDataComputed" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column label="课程名称" prop="name" align="center"></el-table-column>
            <el-table-column label="软件名称" prop="software" align="center"></el-table-column>
            <el-table-column label="授课班级" prop="classes" align="center"></el-table-column>
            <el-table-column label="授课人数" prop="population" align="center"></el-table-column>
            <el-table-column label="是否有课件" prop="ishavedocuments" align="center"
            :filters="[{text:'有课件',value:1},{text:'无课件',value:0}]"
            :filter-method="isDocumentHandler"
            >
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.ishavedocuments === 0 ? 'danger' : 'success'"
                            disable-transitions>{{scope.row.ishavedocuments === 1 ? '有课件' : '无课件'}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="备注" prop="remind" align="center"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            @click="editCourse(scope.row)"
                            type="text"
                            class="el-icon-edit"
                            size="small">
                        编辑
                    </el-button>
                    <el-button
                            @click="deleteCourse(scope.row)"
                            type="text"
                            class="el-icon-delete"
                            size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="edit===1?'编辑课程信息':'添加课程'" :visible.sync="dialogForm" :close-on-click-modal="false">
            <el-form :model="courseForm" :inline="true" label-width="100px" ref="courseForm">
                <div v-if="edit===1">
                    <el-form-item label="学年：">
                        <el-select v-model="courseForm.year" size="small">
                            <el-option
                                    v-for="item in selectOptions1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学期：">
                        <el-select v-model="courseForm.semester" size="small">
                            <el-option
                                    v-for="item in selectOptions2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <el-form-item label="课程名称" prop="name" :rules="{ required: true, message: '此处不可为空', trigger: 'blur' }">
                    <el-input v-model="courseForm.name"></el-input>
                </el-form-item>
                <el-form-item label="软件名称" prop="software"
                              :rules="{ required: true, message: '此处不可为空', trigger: 'blur' }">
                    <el-input v-model="courseForm.software"></el-input>
                </el-form-item>
                <el-form-item label="授课班级" prop="classes"
                              :rules="{ required: true, message: '此处不可为空', trigger: 'blur' }">
                    <el-input v-model="courseForm.classes"></el-input>
                </el-form-item>
                <el-form-item label="授课人数" prop="population"
                              :rules="{ required: true, message: '此处不可为空', trigger: 'blur' }">
                    <el-input v-model="courseForm.population"></el-input>
                </el-form-item>
                <el-form-item label="是否有课件" prop="ishavedocuments"
                              :rules="{ required: true, message: '此处不可为空', trigger: 'blur' }">
                    <el-select v-model="courseForm.ishavedocuments">
                        <el-option label="是" :value=1></el-option>
                        <el-option label="否" :value=0></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remind">
                    <el-input v-model="courseForm.remind"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                    <el-button type="primary" @click="add">添加</el-button>
                    <el-button @click="cancel">取消</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    import timeSelect from "~/components/timeSelect";
    import {get, post} from "~/utils";
    import {showDialog, showFail, showSuccess} from "~/utils/dialog";
    import config from "~/config";

    export default {
        name: "courseManagement",
        components: {timeSelect},
        data() {
            return {
                search: '',
                showDeleteBtn:false,
                dialogForm: false,
                edit: '',
                user: {},
                tableData: [{
                    year: '1819',
                    semester: '2',
                    uc_id: '12345677',
                    name: '林大池',
                    software: 'Webstorm',
                    classes: '6班',
                    population: '41',
                    ishavedocuments: 1,
                    remind: '无',
                }],
                courseForm: {
                    year: '',
                    semester: '',
                    uc_id: '',
                    name: '',
                    software: '',
                    classes: '',
                    population: '',
                    ishavedocuments: 0,
                    remind: '',
                },
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
            //加载表格数据
            async load() {
                this.tableData = await get('lb/usercourse/findbyyearandsemester/'+this.$refs.timeSelect.year+'/'+this.$refs.timeSelect.semester)
            },
            //添加课程
            addCourse() {
                this.edit = 0
                console.log(this.edit)
                this.dialogForm = true
                this.$refs.courseForm.resetFields()
            },
            //编辑课程
            editCourse(rowData) {
                this.edit = 1
                this.dialogForm = true
                this.courseForm = rowData
            },
            //删除课程
            async deleteCourse(rowData) {
                await showDialog("确认要删除吗？", this)
                post('lb/usercourse/deleteusercourse/'+rowData.ucId).then(() => {
                    showSuccess("删除成功", this)
                    this.load()
                }).catch(e => {
                    if(e.message){
                        showFail("不可删除,该课程已与对应的实验室申请绑定 " , this)
                    }else {
                        showFail("删除失败 " + e.msg, this)
                    }
                })
            },
            //确定添加
            add: function () {
                //验证
                this.$refs['courseForm'].validate(async (valid) => {
                    if (valid) {
                        //提交
                        await showDialog("确定要" + (this.edit ? '编辑' : '新增') + '吗？', this)
                        //编辑提交
                        if (this.edit) {
                            await post('lb/usercourse/updateusercourse', {
                                year: this.courseForm.year,
                                semester: this.courseForm.semester,
                                ucId: this.courseForm.ucId,
                                name: this.courseForm.name,
                                software: this.courseForm.software,
                                classes: this.courseForm.classes,
                                population: parseInt(this.courseForm.population),
                                remind: this.courseForm.remind,
                                ishavedocuments: this.courseForm.ishavedocuments
                            }).catch(async e => {
                                await showFail(e.msg, this)
                                await stop()
                            })
                            showSuccess('编辑完成', this)
                            this.dialogForm = false            //添加成功则关闭
                            this.load()   //重新加载数据
                        } else {
                            // 新增提交
                            await post('lb/usercourse/addusercourse', {
                                uc_id:this.courseForm.uc_id,
                                year: this.$refs.timeSelect.year,
                                semester: this.$refs.timeSelect.semester,
                                name: this.courseForm.name,
                                software: this.courseForm.software,
                                classes: this.courseForm.classes,
                                population:  parseInt(this.courseForm.population),
                                remind: this.courseForm.remind,
                                ishavedocuments: this.courseForm.ishavedocuments
                            }).catch(async e => {
                                await showFail(e.msg, this)
                                await stop()
                            })
                            showSuccess('新增完成', this)
                            this.dialogForm = false
                            this.load()  //重新加载数据
                        }
                        this.$emit('confirm')
                    }
                })
            },
            //取消添加
            cancel: function () {
                this.$refs.courseForm.resetFields()
                this.dialogForm = false
            },
            //过滤——是否有课件
            isDocumentHandler(value, row, column){
                const property = column.property
                return row[property] === value
            },
            handleSelectionChange(val) {
                this.showDeleteBtn=val.length>1?true:false
                this.multipleSelection = val;
                // console.log('选中：',val)
            },
            deleteSelections(){
                //删除所有行
            }
        },
        //过滤表格数据
        computed: {
            tableDataComputed() {
                return this.tableData.filter(data => !this.search
                    || data.name.toLowerCase().includes(this.search.toLowerCase())
                    || data.software.toLowerCase().includes(this.search.toLowerCase())
                    || data.classes.toLowerCase().includes(this.search.toLowerCase())
                    || data.remind.toLowerCase().includes(this.search.toLowerCase())
                    || data.population.toString().includes(this.search)
                )
            }
        },
        mounted() {
            console.log(this.$refs.timeSelect.year,this.$refs.timeSelect.semester)
            this.load()
        }
    }
</script>

<style scoped>

</style>
