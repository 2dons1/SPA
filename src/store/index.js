import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth'
import data from './modules/data'

export default createStore({
    modules: {
        auth,
        data
    },
    plugins: [createPersistedState()]
})