import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions';
import test from "./modules/test";

Vue.use(Vuex);
const isDev = process.env.NODE_ENV === 'development';
console.log(isDev);
export default () => {
  const store = new Vuex.Store({ // 不直接 export
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      test
    },
  });
  if (module.hot) { // 热更新
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters',
    ], () => {
      const newState = require('./state/state').default;
      const newMutations = require('./mutations/mutations').default;
      const newActions = require('./actions/actions').default;
      const newGetters = require('./getters/getters').default;
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}

