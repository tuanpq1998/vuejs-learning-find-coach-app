var timer = null;
export default {
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = Number(tokenExpiration) - Date.now();
    if (expiresIn < 0) 
      return ; 

    timer = setTimeout(() => {
      context.dispatch("forceLogout");
    }, expiresIn)
    
    if (token && userId) {
      context.commit("setUser", {
        token,
        userId,
        tokenExpiration : null,
      })
    }
  },
  logout(context) {
    clearTimeout(timer);
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    });
    localStorage.clear();
  },
  forceLogout(context) {
    context.dispatch("logout");
    context.commit("setForceLogout", {isForceLogout : true});
  },
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    console.log("auth");
    const { mode } = payload;
    const url =
      mode == 'login'
        ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAz9UQdqoTeoJ2J4dWta4MOLjQyH9S_baY'
        : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAz9UQdqoTeoJ2J4dWta4MOLjQyH9S_baY';

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });
    const json = await response.json();

    if (!response.ok) throw new Error('Failed to fetch!');

    const tokenExpiration = Date.now() + 5000;
    localStorage.setItem("token", json.idToken);
    localStorage.setItem("userId", json.localId);
    localStorage.setItem("tokenExpiration", tokenExpiration);
    
    timer = setTimeout(() => {
      context.dispatch("forceLogout");
    }, 5000);

    context.commit('setUser', {
      token: json.idToken,
      userId: json.localId,
      tokenExpiration: json.expiresIn
    });
  }
};
