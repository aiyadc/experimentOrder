<template>
    <div id="module2" >
        <div>
            <img src="../../assets/images/homeBackground.jpg" id="img" style="opacity: 100%;width:100%;height: 100%;position: absolute;left: 0;z-index: -1">
        </div>
        <div>
        <el-container>
            <!-- 头部组件-->
            <el-header  style="size: 20px;text-align: right;padding-top: 10px">
                <drop-down-user :user="user" @goPersonal="$emit('goPersonal')" @back="$emit('back')"></drop-down-user>
            </el-header>
<!--            body部分-->
           <el-main class="main" >
               <div style="margin-bottom: 10%">
                   <span style="font-size: 60px;font-family: 'Adobe 黑体 Std R';color: lightslategrey;font-weight: bold">Hi,{{user}},欢迎您</span>

               </div>
<!--               用一个循环把所有的功能模块加载出来 -->
                    <div id="block">
                        <block   v-for="item in names" :key="item.name" :name="item.name" @click.native="item.func" class="block" ></block>
                    </div>


            </el-main>
        </el-container>

        </div>
    </div>
</template>

<script>
    import dropDownUser from "~/components/dropDownUser";
    import block from "~/components/block";

    export default {
        name: "home",
        props:[
            'names',
            'user'
        ],
        data(){
            return{
                url:'',
            }
        },
        components:{
            block,
            dropDownUser
        },
        mounted() {

        },
        methods:{

        }
    }
</script>

<style scoped>
/*#module2{*/
/*    background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593703269856&di=474d7738f8d19acc2f9e2dc35ba05470&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa16c4be529f96fdf169f0c3214a0597a2eb2f6fd49a27-eGMtAD_fw658');*/
/*    background-repeat: no-repeat;*/
/*    background-size: cover;*/

/*}*/
#block{
    display: flex;
    justify-content: space-around;
}
    .block{
        background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593703156633&di=916a2726992565b3143aa5538e874b55&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F16%2F07%2F09%2F205780f5260383d.jpg");
        background-size: 200px 180px;
        background-repeat: no-repeat;
        opacity: 70%;
        display:inline;
        font-weight: bold;
        font-size: large;
    }
    #block :hover{
        opacity: 100%;
    }

</style>
