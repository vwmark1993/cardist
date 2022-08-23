import ItemDataService from '@/services/ItemDataService.js'

const state = () => (
  localStorage.getItem('vuex') ? JSON.parse(localStorage.getItem('vuex')).search
  : {
  searchString: '',
  queriedItems: []
})

// getters
const getters = {

}

// actions
const actions = {
  async searchItems({ commit }, searchString) {
    try {
      let itemResponse;
      let searchStringTrimmed = searchString.trim();

      if (searchStringTrimmed === '' || searchString === null || searchString === undefined)  {
        commit('setSearchString', '');
        itemResponse = await ItemDataService.searchAll();
      } else {
        commit('setSearchString', searchStringTrimmed);
        itemResponse = await ItemDataService.searchByName(searchStringTrimmed);
      }

      let items = itemResponse.data;

      commit('setQueriedItems', items);
    } catch (e) {
      console.log(e)
    }
  },
  resetItems({ commit }) {
    commit('emptyQueriedItems');
  }
}

// mutations
const mutations = {
  setSearchString(state, searchString) {
    state.searchString = searchString
  },
  setQueriedItems(state, items) {
    state.queriedItems = items
  },
  resetSearchString(state) {
    state.searchString = ''
  },
  emptyQueriedItems(state) {
    state.queriedItems = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}