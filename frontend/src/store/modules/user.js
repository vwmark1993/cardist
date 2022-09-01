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
  successfulRegistrationMessage: null
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
  },
  removeRegistrationMessage({ commit }) {
    commit('removeRegistrationMessage');
  }
}

// mutations
const mutations = {
  setAuthenticated(state, authenticated) {
    state.authenticated = authenticated;
  },
  updateUser(state, { email, phone, picture }) {
    state.currentUser.email = email;
    state.currentUser.phone = phone;
    state.currentUser.picture = picture;
  },
  setRegistrationMessage(state) {
    state.successfulRegistrationMessage = "Registration completed.";
  },
  removeRegistrationMessage(state) {
    state.successfulRegistrationMessage = null;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}