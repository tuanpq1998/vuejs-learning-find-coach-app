import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default {
  state() {
    return {
      coachId : null,
      token : null,
      tokenExpiration : null,
      forceLogout : false,
    }
  },
  getters,
  mutations,
  actions,
}