export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  coachById : state => id => {
    return state.coaches.find(c => c.id==id);
  },
  shouldUpdate(state) {
    const {lastFetch} = state;
    if (!lastFetch)
      return true;
    return (Date.now() - lastFetch) / 1000 > 60;  
  }
}