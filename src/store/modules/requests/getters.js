export default {
  requests(state, getters, rootState, rootGetters) {
    return state.requests.filter(r => r.coachId == rootGetters.coachId);
  },
  hasRequest(state, getters) {
    const requests = getters.requests;
    return requests && requests.length > 0;
  }
}