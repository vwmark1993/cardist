import ItemDataService from '@/services/ItemDataService.js'

const state = () => (
  localStorage.getItem('vuex') ? JSON.parse(localStorage.getItem('vuex')).search
  : {
  filters: [],
  tags: [],
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
  },
  addFilter({ commit }, filter) {
    commit('insertFilter', filter);
  },
  removeFilter({ commit }, filter) {
    commit('removeFilter', filter);
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
  },
  insertFilter(state, filter) {
    if (!state.filters.includes(filter)) {
      state.filters.push(filter)
    } 
  },
  removeFilter(state, filter) {
    if (state.filters.includes(filter)) {
      let index = state.filters.findIndex(filterItem => filterItem === filter);
      state.filters.splice(index, 1);
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}