const state ={
  age:147,
};
const getters = {
  //判断显示全部处理||操作
  /* getuseName:(state,getters) => {
         return state.useName+'我爱你！';
   },*/
};
const mutations = {
  //设置input数据
  homeSetInput(state, {name, value}) {
    state[name] = value;
  },
  ggs(state,options){
    state.age=options;
  }

};
const actions = {
  initView({state, getters, commit, dispatch}) {
    commit('ggs','kkkk');
  },
};
// 不要忘记把state, mutations等暴露出去。
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
