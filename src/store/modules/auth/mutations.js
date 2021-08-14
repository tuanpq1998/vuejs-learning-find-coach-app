export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.coachId = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
  },

  setForceLogout(state, payload) {
    state.isForceLogout = payload.isForceLogout;
  }
}