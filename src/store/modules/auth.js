const state = {
  user: localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user')),
  token:  localStorage.getItem('token') === null ? null : JSON.parse(localStorage.getItem('token')),
};
  
const getters = {
  getUser(store){
    return store.user
  },
  getToken(store){
    return store.token
  },
};
const actions = {
  setUser({commit}, payload){
    commit('SETUSER', payload)
  },
  setToken({commit}, payload){
    commit('SETTOKEN', payload)
  },
  logout({commit}){
    commit('LOGOUTUSER')
  },
};
const mutations = {
  SETUSER: (state, user) => {
    state.user = user
  },
  LOGOUTUSER: (state) => {
    state.user = null,
    state.token = null,
    localStorage.clear()
  },
  SETTOKEN: (state, token) => {
    state.token = token
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
