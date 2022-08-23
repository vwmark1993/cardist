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
  }
})

// getters
const getters = {

}

// actions
const actions = {
  async authentication({ commit }, { authenticated, user } ) {
    commit('setAuthenticated', authenticated)
    commit('setUser', user)
  }
}

// mutations
const mutations = {
  setAuthenticated(state, authenticated) {
    state.authenticated = authenticated
  },
  setUser(state, user) {
    state.currentUser = user
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}