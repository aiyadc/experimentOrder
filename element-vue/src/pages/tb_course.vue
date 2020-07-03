<template>
    <div>
        <el-table :data="tableData" :span-method="objectSpanMethod" @cell-click="cClick" :cell-style="cStyle">
            <el-table-column :label="tableLabel" align="center ">
                <el-table-column prop="daytime" label="" fixed align="center" width="60"></el-table-column>
                <el-table-column prop="time" label="" fixed align="center" width="100"></el-table-column>
                <el-table-column :index="1" prop="Monday" label="星期一" align="center">
                    <template slot-scope="scope">
                        <div v-if="!custom">
                            {{scope.row.Monday.name}} &nbsp;<br>
                            {{scope.row.Monday.classes}} &nbsp; {{scope.row.Monday.population}}<br>
                            {{scope.row.Monday.software}}
                        </div>
                        <div v-if="custom" v-html="scope.row.Monday"></div>
                    </template>
                </el-table-column>
                <el-table-column :index="2" prop="Tuesday" label="星期二" align="center">
                    <template slot-scope="scope">
                        <div v-if="!custom">
                            {{scope.row.Tuesday.name}} &nbsp;<br>
                            {{scope.row.Tuesday.classes}} &nbsp; {{scope.row.Tuesday.population}}<br>
                            {{scope.row.Tuesday.software}}
                        </div>
                        <div v-if="custom" v-html="scope.row.Tuesday"></div>
                    </template>
                </el-table-column>
                <el-table-column :index="3" prop="Wednesday" label="星期三" align="center">
                    <template slot-scope="scope">
                        <div v-if="!custom">
                            {{scope.row.Wednesday.name}} &nbsp;<br>
                            {{scope.row.Wednesday.classes}} &nbsp; {{scope.row.Wednesday.population}}<br>
                            {{scope.row.Wednesday.software}}
                        </div>
                        <div v-if="custom" v-html="scope.row.Wednesday"></div>
                    </template>
                </el-table-column>
                <el-table-column :index="4" prop="Thursday" label="星期四" align="center">
                    <template slot-scope="scope">
                        <div v-if="!custom">
                            {{scope.row.Thursday.name}} &nbsp;<br>
                            {{scope.row.Thursday.classes}} &nbsp; {{scope.row.Thursday.population}}<br>
                            {{scope.row.Thursday.software}}
                        </div>
                        <div v-if="custom" v-html="scope.row.Thursday"></div>
                    </template>
                </el-table-column>
                <el-table-column :index="5" prop="Friday" label="星期五" align="center">
                    <template slot-scope="scope">
                        <div v-if="!custom">
                            {{scope.row.Friday.name}} &nbsp;<br>
                            {{scope.row.Friday.classes}} &nbsp; {{scope.row.Friday.population}}<br>
                            {{scope.row.Friday.software}}
                        </div>
                        <div v-if="custom" v-html="scope.row.Friday"></div>
                    </template>
                </el-table-column>
                <el-table-column :index="6" prop="Saturday" label="星期六" align="center">
                    <template slot-scope="scope">
                        <div v-if="!custom">
                            {{scope.row.Saturday.name}} &nbsp;<br>
                            {{scope.row.Saturday.classes}} &nbsp; {{scope.row.Saturday.population}}<br>
                            {{scope.row.Saturday.software}}
                        </div>
                        <div v-if="custom" v-html="scope.row.Saturday"></div>
                    </template>
                </el-table-column>
                <el-table-column :index="7" prop="Sunday" label="星期日" align="center">
                    <template slot-scope="scope">
                        <div v-if="!custom">
                            {{scope.row.Sunday.name}} &nbsp;<br>
                            {{scope.row.Sunday.classes}} &nbsp; {{scope.row.Sunday.population}}<br>
                            {{scope.row.Sunday.software}}
                        </div>
                        <div v-if="custom" v-html="scope.row.Sunday"></div>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import navBar from "~/components/teacher/navBar";
    import {get, post} from "~/utils";

    export default {
        name: "tb_course",
        components: {navBar},
        props: {
            tableLabel: {},
            cClick: {},
            cStyle: {},
            custom: {default: false},
            data: {default: () => []}
        },
        data() {
            return {
                item: '',
                courseDialog: false,
                tableData: [
                    {
                        index: 1, daytime: '上午', time: '第一节', Monday: '', Tuesday: '', Wednesday: '', Thursday: '',
                        Friday: '', Saturday: '', Sunday: ''
                    },
                    {
                        index: 2, daytime: '上午', time: '第二节', Monday: '', Tuesday: '', Wednesday: '', Thursday: '',
                        Friday: '', Saturday: '', Sunday: ''
                    },
                    {
                        index: 3, daytime: '下午', time: '第三节', Monday: '', Tuesday: '', Wednesday: '', Thursday: '',
                        Friday: '', Saturday: '', Sunday: ''
                    },
                    {
                        index: 4, daytime: '下午', time: '第四节', Monday: '', Tuesday: '', Wednesday: '', Thursday: '',
                        Friday: '', Saturday: '', Sunday: ''
                    },
                    {
                        index: 5, daytime: '晚上', time: '第五节', Monday: '', Tuesday: '', Wednesday: '', Thursday: '',
                        Friday: '', Saturday: '', Sunday: ''
                    }
                ]
            }
        },
        methods: {
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            }
        },
        mounted() {
            //     this.data = [
            //         [
            //             {
            //                 "ucId": 1,
            //                 "name": "课程设计",
            //                 "software": "IDEA",
            //                 "year": "2019",
            //                 "semester": 2,
            //                 "population": 50,
            //                 "classes": "17软件工程6班",
            //                 "remind": "",
            //                 "ishavedocuments": 1,
            //                 "uid": 1
            //             },
            //             {
            //                 "ucId": 1,
            //                 "name": "课程设计",
            //                 "software": "IDEA",
            //                 "year": "2019",
            //                 "semester": 2,
            //                 "population": 50,
            //                 "classes": "17软件工程6班",
            //                 "remind": "",
            //                 "ishavedocuments": 1,
            //                 "uid": 1
            //             },
            //             {
            //                 "ucId": 1,
            //                 "name": "课程设计",
            //                 "software": "IDEA",
            //                 "year": "2019",
            //                 "semester": 2,
            //                 "population": 50,
            //                 "classes": "17软件工程6班",
            //                 "remind": "",
            //                 "ishavedocuments": 1,
            //                 "uid": 1
            //             },
            //             {
            //                 "ucId": 1,
            //                 "name": "课程设计",
            //                 "software": "IDEA",
            //                 "year": "2019",
            //                 "semester": 2,
            //                 "population": 50,
            //                 "classes": "17软件工程6班",
            //                 "remind": "",
            //                 "ishavedocuments": 1,
            //                 "uid": 1
            //             },
            //             {
            //                 "ucId": 1,
            //                 "name": "Web开发",
            //                 "software": "IDEA",
            //                 "year": "2019",
            //                 "semester": 2,
            //                 "population": 50,
            //                 "classes": "17软件工程6班",
            //                 "remind": "",
            //                 "ishavedocuments": 1,
            //                 "uid": 1
            //             },
            //             {
            //                 "ucId": 1,
            //                 "name": "课程设计",
            //                 "software": "IDEA",
            //                 "year": "2019",
            //                 "semester": 2,
            //                 "population": 50,
            //                 "classes": "17软件工程6班",
            //                 "remind": "",
            //                 "ishavedocuments": 1,
            //                 "uid": 1
            //             },
            //             {
            //                 "ucId": 1,
            //                 "name": "课程设计",
            //                 "software": "IDEA",
            //                 "year": "2019",
            //                 "semester": 2,
            //                 "population": 50,
            //                 "classes": "17软件工程6班",
            //                 "remind": "",
            //                 "ishavedocuments": 1,
            //                 "uid": 1
            //             }
            //         ]
            //     ]
            // for (let i = 0; i < this.data.length; i++) {
            //     this.tableData[i].Monday = this.data[i][0]
            //     this.tableData[i].Tuesday = this.data[i][1]
            //     this.tableData[i].Wednesday = this.data[i][2]
            //     this.tableData[i].Thursday = this.data[i][3]
            //     this.tableData[i].Friday = this.data[i][4]
            //     this.tableData[i].Saturday = this.data[i][5]
            //     this.tableData[i].Sunday = this.data[i][6]
            // }
        }
    }
</script>

<style scoped>

</style>
