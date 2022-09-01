import ItemDataService from '@/services/ItemDataService.js'
import ItemTagDataService from '@/services/ItemTagDataService.js'
import TagDataService from '@/services/TagDataService.js'

const state = () => (
  localStorage.getItem('vuex') ? JSON.parse(localStorage.getItem('vuex')).search
  : {
  generalFilters: [],
  tagFilters: [],
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

      items.forEach(async item => {
        let itemTagResponse = await ItemTagDataService.getItemTags(item.id);
        let itemTags = itemTagResponse.data;

        let tags = []

        if (itemTags.length > 0) {
          itemTags.forEach(async itemTag => {
            let tagResponse = await TagDataService.get(itemTag.tag_id);
            let tag = tagResponse.data.name;

            tags.push(tag);
          })
        }
        
        item.tags = tags
      })

      console.log(items)

      commit('setQueriedItems', items);
    } catch (e) {
      console.log(e)
    }
  },
  resetItems({ commit }) {
    commit('emptyQueriedItems');
  },
  addGeneralFilter({ commit }, filter) {
    commit('insertGeneralFilter', filter);
  },
  removeGeneralFilter({ commit }, filter) {
    commit('removeGeneralFilter', filter);
  },
  addTagFilter({ commit }, filter) {
    commit('insertTagFilter', filter);
  },
  removeTagFilter({ commit }, filter) {
    commit('removeTagFilter', filter);
  },
  resetFilters({commit}) {
    commit('removeAllFilters');
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
  insertGeneralFilter(state, filter) {
    if (!state.generalFilters.includes(filter)) {
      state.generalFilters.push(filter)
    } 
  },
  removeGeneralFilter(state, filter) {
    if (state.generalFilters.includes(filter)) {
      let index = state.generalFilters.findIndex(filterItem => filterItem === filter);
      state.generalFilters.splice(index, 1);
    }
  },
  insertTagFilter(state, filter) {
    if (!state.tagFilters.includes(filter)) {
      state.tagFilters.push(filter)
    } 
  },
  removeTagFilter(state, filter) {
    if (state.tagFilters.includes(filter)) {
      let index = state.tagFilters.findIndex(filterItem => filterItem === filter);
      state.tagFilters.splice(index, 1);
    }
  },
  removeAllFilters(state) {
    state.generalFilters = [];
    state.tagFilters = [];
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}