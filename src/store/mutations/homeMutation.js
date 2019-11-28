import {Message, Loading} from 'element-ui';
class MyLoading {
  constructor() {
    this.loadingOption = {
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    };
  }
  close() {
    this.loading.close();
  }
  open() {
    this.loading = Loading.service(this.loadingOption)
  }
};
let loadingInstance = new MyLoading();
const homeMutation = {
  //设置input数据
  setSate(state, {name, value}) {
    state[name] = value;
  },
  sss(state,options){
    state.name=options;
  }

};
export default homeMutation;
