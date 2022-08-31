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
  async authentication({ commit }, { authenticated, user } ) {
    commit('setAuthenticated', authenticated)
    commit('setUser', user)
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
    state.authenticated = authenticated
  },
  setUser(state, user) {
    state.currentUser = user
  },
  setRegistrationMessage(state) {
    state.successfulRegistrationMessage = "Registration completed."
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