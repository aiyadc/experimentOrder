<template>
    <div>
        <el-card style="width: 360px;padding: 0">
            <div slot="header">
            <el-radio-group v-model="radioValue" @change="radioSelect" >
                <el-radio label="全选"></el-radio>
                <el-radio label="单周"></el-radio>
                <el-radio label="双周" ></el-radio>
                <el-radio label="全不选"></el-radio>
            </el-radio-group>
            </div>
        <el-checkbox-group v-model="checkedValue" @change="handleCheckedValueChange" ref="checkBox">
            <el-checkbox-button v-for="item in checkOption" :label="item" :key="item" style="width: 52px" :disabled="!ableList.find(elem => elem === item)"></el-checkbox-button>
        </el-checkbox-group>
        <el-divider></el-divider>
            <el-button @click="$emit('add')">确定</el-button>
            <el-button @click="$emit('cancel')">取消选择</el-button>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "weekSelection",
        props:{
            ableList:{default: ()=>[]}
        },
        data(){
            return{
                checkedValue:[],
                radioValue:'',
                isIndeterminate1:true,
                isIndeterminate2:true,
                isIndeterminate3:true,
                allVal:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
                singleVal:[1,3,5,7,9,11,13,15,17],
                doubleVal:[2,4,6,8,10,12,14,16,18],
                checkOption:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
            }
        },
        methods:{
            radioSelect:function (val) {
                console.log(val)
                if (val){
                if (val==='全选'){this.checkedValue=this.allVal}
                if(val==='单周'){this.checkedValue=this.singleVal}
                if (val==='双周'){this.checkedValue=this.doubleVal}
                if (val==='全不选'){this.checkedValue=[]}
                } else {this.checkedValue=[]}
            },
            handleCheckedValueChange:function (value) {
                 let checkedCount = value.length
                this.radioValue=value.length===this.allVal.length?'all':''
            }
        },
        mounted() {
            // console.log(this.$refs.checkBox.$children)
            // var weeks=[6,7,8]
            // for (let i=0;i<weeks.length;i++){
            //     console.log(weeks[i])
            //     thisgi.$refs.checkBox.$children[weeks[i]-1].disabled=true
            // }

        }
    }
</script>

<style scoped>

</style>
