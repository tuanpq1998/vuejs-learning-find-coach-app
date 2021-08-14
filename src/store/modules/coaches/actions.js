export default {
  addCoach(context, payload) {
    const id = context.rootGetters['coachId'];
    const token = context.rootGetters.token;

    fetch(
      `https://coach-vuejs-learning-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${id}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload.coach)
      }
    );

    payload.coach.id = id;
    context.commit('addCoach', payload);
  },
  async loadCoaches(context, payload) {
    if (!payload.isForce && !context.getters.shouldUpdate)
      return;
    
    const response = await fetch(
      `https://coach-vuejs-learning-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`
    );
    const json = await response.json();
    if (json == null) return;
    if (!response.ok) {
      throw new Error('Failed to fetch!');
    }

    payload.coaches = Object.keys(json).map(k => {
      json[k].id = k;
      return json[k];
    });

    return new Promise(resolve => {
      setTimeout(() => {
        context.commit('setCoaches', payload);
        context.commit('setFetchTime');
        resolve();
      }, 1000);
    });
  }
};
