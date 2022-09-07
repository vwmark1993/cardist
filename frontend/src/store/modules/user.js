const state = () => (
  localStorage.getItem('vuex') ? JSON.parse(localStorage.getItem('vuex')).user
  : {
  authenticated: false,
  currentUser: {
    id: null,
    username: null,
    email: null,
    phone: null,
    picture: null,
    settings: null,
    totalEarnings: null,
    totalSpending: null,
    admin: null
  },
  successfulRegistrationMessage: null,
  successfulLoginMessage: null,
  logoutMessage: null
})

// getters
const getters = {

}

// actions
const actions = {
  authentication({ commit }, { authenticated, user } ) {
    commit('setAuthenticated', authenticated);
    commit('setUser', user);
  },
  updateUser({ commit }, { email, phone, picture }) {
    commit('updateUser', { email, phone, picture });
  },
  setRegistrationMessage({ commit }) {
    commit('setRegistrationMessage');

    setTimeout(() => {
      commit('removeRegistrationMessage');
    }, 3000);
  },
  removeRegistrationMessage({ commit }) {
    commit('removeRegistrationMessage');
  },
  setLoginMessage({ commit }, username) {
    commit('setLoginMessage', username);
  },
  removeLoginMessage({ commit }) {
    commit('removeLoginMessage');
  },
  setLogoutMessage({ commit }) {
    commit('setLogoutMessage');
  },
  removeLogoutMessage({ commit }) {
    commit('removeLogoutMessage');
  }
}

// mutations
const mutations = {
  setAuthenticated(state, authenticated) {
    state.authenticated = authenticated;
  },
  setUser(state, user) {
    state.currentUser = user;
  },
  updateUser(state, { email, phone, picture }) {
    state.currentUser.email = email;
    state.currentUser.phone = phone;
    state.currentUser.picture = picture;
  },
  setRegistrationMessage(state) {
    state.successfulRegistrationMessage = "Registration Completed";
  },
  removeRegistrationMessage(state) {
    state.successfulRegistrationMessage = null;
  },
  setLoginMessage(state, username) {
    state.successfulLoginMessage = "Welcome, " + username;
  },
  removeLoginMessage(state) {
    state.successfulLoginMessage = null;
  },
  setLogoutMessage(state) {
    state.logoutMessage = "Logged Out";
  },
  removeLogoutMessage(state) {
    state.logoutMessage = null;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}