export default {
  addCoach(state, payload) {
    state.coaches.push(payload.coach);
  },
  setCoaches(state, payload) {
    state.coaches = payload.coaches;
  },
  setFetchTime(state) {
    state.lastFetch = Date.now();
  }
}