export default {
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
  async login(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAz9UQdqoTeoJ2J4dWta4MOLjQyH9S_baY`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );
    const json = await response.json();

    if (!response.ok) throw new Error('Failed to fetch!');

    context.commit('setUser', {
      token: json.idToken,
      userId: json.localId,
      tokenExpiration: json.expiresIn
    });
  },
  async signup(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAz9UQdqoTeoJ2J4dWta4MOLjQyH9S_baY`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );
    const json = await response.json();

    if (!response.ok) throw new Error('Failed to fetch!');

    context.commit('setUser', {
      token: json.idToken,
      userId: json.localId,
      tokenExpiration: json.expiresIn
    });
  }
};
