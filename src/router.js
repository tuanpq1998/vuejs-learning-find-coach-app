import {createRouter, createWebHistory} from "vue-router";
import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegister from "./pages/coaches/CoachRegister.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestList from "./pages/requests/RequestList.vue";
import NotFound from "./pages/NotFound.vue"

const router = createRouter({
  history : createWebHistory(),
  routes : [
    {path : "/", redirect : "/coaches"},
    {name : "coaches", path : "/coaches", component : CoachesList},
    {name : "coach", path : "/coaches/:id", component : CoachDetail, props : true,  children : [
      {path : "contact", component : ContactCoach, }
    ]},
    {name : "register", path : "/register", component : CoachRegister},
    {name : "request", path : "/requests", component : RequestList},
    {name : "notFound", path : "/:notFound(.*)", component : NotFound}
  ]
})

export default router;