const state = {
  panel: false
}

const actions = {
  toggle_layout({ commit }) {
    console.log('toggle')
    commit('TOGGLE_LAYOUT')
  }
}

const mutations = {
  TOGGLE_LAYOUT(state) {
    state.panel = !state.panel
  }
}

export default {
  actions,
  state,
  mutations,
  namespaced: true
}
