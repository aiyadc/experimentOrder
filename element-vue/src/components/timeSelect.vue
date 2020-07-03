<template>
    <div>
        <el-row>
            <el-col :span="6" :offset="6">
                学年：
                <el-select v-model="year" size="small">
                    <el-option
                            v-for="item in selectOptions1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            @click.native="selectYear"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                学期：
                <el-select v-model="semester" size="small">
                    <el-option
                            v-for="item in selectOptions2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            @click.native="selectSemester"
                    >
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <br><br>
    </div>
</template>

<script>
    import config from "~/config";

    export default {
        name: "timeSelect",
        data() {
            return {
                year: '2019',
                semester: 2,
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
            selectYear() {
                this.$emit('selectYear')
            },
            selectSemester() {
                this.$emit('selectSemester')
            },
        }
    }
</script>

<style scoped>

</style>
