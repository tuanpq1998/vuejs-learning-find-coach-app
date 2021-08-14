export default {
  coachId(state) {
    return state.coachId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return Boolean(state.token);
  },
  isForceLogout(state) {
    return state.isForceLogout;
  } 
}