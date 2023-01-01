
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import Search from '../pages/Search.vue';
import editUser from '../pages/EditUser.vue'

//定义一些路由
const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team },
    { path: '/user', component: User },
    { path: '/search',component: Search},
    { path: '/user/edit',component: editUser}

]

//导出
export default routes;