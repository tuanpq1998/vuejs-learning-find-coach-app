export default {
  contactCoach(context, payload) {
    payload.request.id = Date.now();
    
    fetch(`https://coach-vuejs-learning-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.request.coachId}/${payload.request.id}.json`, {
      method : "PUT",
      body : JSON.stringify({
        email : payload.request.email,
        message : payload.request.message,
      }),
    })

    context.commit("addRequest", payload);
  },
  async loadRequests(context) {
    const coachId = context.rootGetters.coachId;
    const token = context.rootGetters.token;
    const response = await fetch(`https://coach-vuejs-learning-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`)
    const json = await response.json();
    
    if (json == null) return;

    if (!response.ok)
      throw new Error("Failed to fetch data!");
    const payload = {};
    payload.requests = Object.keys(json).map(k => ({
      ...json[k],
      id : k,
      coachId,
    }))
    return new Promise(resolve => {
      setTimeout(() => {
        context.commit("setRequests", payload);
        resolve();
      }, 1000);
    })
  }
}