import Vue from "vue";
import VueRouter from "vue-router";
// 引入组件


//teacher
const teacherIndex = ()=> import( "~/pages/teacher/index");
const teacherHome = ()=> import("~/pages/teacher/home") ;
const myCourse = ()=> import("~/pages/teacher/myCourseTable") ;
const applyLab = ()=> import("~/pages/teacher/applyLab") ;
const myApplyRecord = ()=> import("~/pages/teacher/myApplyRecord") ;
const courseManagement = ()=> import("~/pages/teacher/courseManagement") ;
//supManager
const supHome = ()=> import("~/pages/supManager/home") ;
const supIndex = ()=> import("~/pages/supManager/index") ;
const userManage = ()=> import("~/pages/supManager/userManage") ;
const labManager = ()=> import("~/pages/supManager/labManage") ;
const supCheck = ()=> import("~/pages/supManager/supCheck") ;
//manager
const managerHome = ()=> import("~/pages/manager/home")
const labManage = ()=> import("~/pages/manager/labManage") ;
const managerIndex = ()=> import( "~/pages/manager/index");
const managerCheck = ()=> import("~/pages/manager/managerCheck") ;
//页面通用
import test from "~/pages/test" ;
import personal from "~/pages/teacher/personal";
import login from "~/pages/login";
import tb_course from "~/pages/tb_course";
import labApplyDetail from "~/pages/labApplyDetail";
import globalPersonal from "~/components/personal" ;
// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: '/login'
    },
    {
        path: '/test',
        component: test
    },
    {
        path: "/teacher",
        component: teacherIndex,
        children: [
            {
                path: '',
                component: teacherHome
            },
            {
                path: 'personal',
                component: globalPersonal
            },
            {
                path: 'myCourse',
                component: myCourse
            },
            {
                path: 'applyLab',
                component: applyLab
            },
            {
                path: 'myApplyRecord/:u_id',
                component: myApplyRecord,
                props: true
            },
            {
                path: 'courseManagement',
                component: courseManagement
            },
            {
                path: 'myApplyRecord',
                component: myApplyRecord
            }
        ]
    },
    {
        path: '/manager',
        component: managerIndex,
            children: [
                {
                    path:'',
                    component:managerHome
                },
                {
                    path: 'personal',
                    component: globalPersonal
                }, {
                    path: 'labManage',
                    component: labManage
                },{
                    path: 'managerCheck',
                    component: managerCheck
                }
            ]
    },
    {
        path: '/supManager',
        component: supIndex,
            children: [
                {
                    path:'',
                    component:supHome
                },
                {
                    path: 'personal',
                    component: globalPersonal
                }, {
                    path: 'labManager',
                    component: labManager
                },
                {
                    path: 'userManage',
                    component: userManage
                },
                {
                    path: 'supCheck',
                    component: supCheck
                }
            ]
    },

    {
        path: "/login",
        component: login
    },
    {
        path: '/tbCourse',
        component: tb_course
    },
    {
        path: '/labApplyDetail/:id',
        component: labApplyDetail,
        props: true
    }
]

let router = new VueRouter({
    routes
})
export default router;
