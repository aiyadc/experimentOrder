<template>
    <div>
        <el-dialog :visible.sync="show" append-to-body :close-on-click-modal="false">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>审核详情</span>
                    <el-button style="float: right; padding: 10px 20px" type="danger" @click="refuse">拒绝</el-button>
                    <el-button style="float: right; padding: 10px 20px;margin-right: 20px;" type="primary" @click="commit">同意</el-button>
                </div>
                <el-form :model="data">
                    <el-form-item align="center" label-width="130px" label="创建时间：">
                        <div style="width: 100%;border: 1px solid;">{{data.create_time}} &nbsp;</div>
                    </el-form-item>
                    <el-form-item align="center" label-width="130px" label="申请人：">
                        <div style="width: 100%;border: 1px solid;">{{data.nickname}} &nbsp;</div>
                    </el-form-item>
                    <el-form-item align="center" label-width="130px" label="申请人联系电话：">
                        <div style="width: 100%;border: 1px solid;">{{data.tel}} &nbsp;</div>
                    </el-form-item>
                    <el-form-item align="center" label-width="130px" label="实验室地点：">
                        <div style="width: 100%;border: 1px solid;">{{data.position}} &nbsp;</div>
                    </el-form-item>
                    <el-form-item align="center" label-width="130px" label="课程名称：">
                        <div style="width: 100%;border: 1px solid;">{{data.course_name}} &nbsp;</div>
                    </el-form-item>
                    <el-form-item align="center" label-width="130px" label="使用班级：">
                        <div style="width: 100%;border: 1px solid;">{{data.classes}} &nbsp;</div>
                    </el-form-item>
                    <el-form-item align="center" label-width="130px" label="使用人数：">
                        <div style="width: 100%;border: 1px solid;">{{data.population}} &nbsp;</div>
                    </el-form-item>
                    <el-form-item align="center" label-width="130px" label="申请时间段：">
                        <div style="width: 100%;border: 1px solid;">{{data.weeks}} &nbsp;</div>
                    </el-form-item>
                    <el-form-item align="center" label-width="130px" label="备注：">
                        <div style="width: 100%;border: 1px solid;">{{data.remind}} &nbsp;</div>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>

    import {showDialog, showSuccess} from "~/utils/dialog";
    import {post} from "~/utils";

    export default {
        data() {
            return {
                show: false,
                data: {}
            }
        },
        methods: {
            async refuse(){
                this.$prompt('请输入拒绝的理由', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(async ({ value }) => {
                    this.data.refuseReason = value
                    await post('lb/labrecord/refuse',this.data)
                    this.$emit('complete')
                    this.show = false
                    showSuccess('已拒绝申请！',this)
                }).catch(()=>{})
            },
            async commit(){
                await showDialog('确定同意吗？',this)
                await post('lb/labrecord/commit',this.data)
                this.$emit('complete')
                this.show = false
                showSuccess('已同意申请！',this)
            }

        }
    }
</script>

<style scoped>

</style>
