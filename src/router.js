import {createRouter, createWebHistory} from "vue-router";
import { defineAsyncComponent } from "@vue/runtime-core";
// import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
// import CoachRegister from "./pages/coaches/CoachRegister.vue";
// import ContactCoach from "./pages/requests/ContactCoach.vue";
// import RequestList from "./pages/requests/RequestList.vue";
import NotFound from "./pages/NotFound.vue"
import UserAuth from "./auth/UserAuth.vue"
import store from "./store/index"

const CoachDetail = defineAsyncComponent(() => import("./pages/coaches/CoachDetail.vue"));
const CoachRegister = defineAsyncComponent(() => import("./pages/coaches/CoachRegister.vue"));
const RequestList = defineAsyncComponent(() => import("./pages/requests/RequestList.vue"));
const ContactCoach = defineAsyncComponent(() => import("./pages/requests/ContactCoach.vue"));

const router = createRouter({
  history : createWebHistory(),
  routes : [
    {path : "/", redirect : "/coaches"},
    {name : "coaches", path : "/coaches", component : CoachesList},
    {name : "coach", path : "/coaches/:id", component : CoachDetail, props : true,  children : [
      {path : "contact", component : ContactCoach, }
    ]},
    {name : "register", path : "/register", component : CoachRegister, meta : {isAuthRequired : true}},
    {name : "request", path : "/requests", component : RequestList, meta : {isAuthRequired : true}},
    {name : "auth", path : "/auth", component : UserAuth, meta : {isUnAuthRequired : true}},
    {name : "notFound", path : "/:notFound(.*)", component : NotFound}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAuthRequired && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.isUnAuthRequired && store.getters.isAuthenticated) {
    next("/coaches");
  } else next();
})

export default router;