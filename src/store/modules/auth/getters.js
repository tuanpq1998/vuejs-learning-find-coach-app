export default {
  coachId(state) {
    return state.coachId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    console.log(state.token);
    return Boolean(state.token);
  }
}