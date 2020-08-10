import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateNewRealtor from "../components/CreateNewRealtor";
import StaffTable from "../components/StaffTable";
import RealtorsTable from "../components/RealtorsTable";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: RealtorsTable
    },
    {
        path: '/create',
        name: 'Create New Realtor',
        component: CreateNewRealtor
    },
    {
        path: '/realtors-table',
        name: 'Realtors List',
        component: StaffTable
    },
    {
        path: '/create',
        name: 'Create New Realtor',
        component: CreateNewRealtor
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
