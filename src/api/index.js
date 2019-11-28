import axios from 'axios';

//本地
// let yuming = '127.0.0.1:51510';
//正式
let yuming = 'geokey.cn/gtoa';
export  let wsUrl= (function () {
  let urlReg=window.location.href;//
  let reg=/^https/g;
  let wsUrls=null;
  if(reg.test(urlReg)){
    wsUrls = 'wss://'+yuming+'//ws';
  }else{
    wsUrls = 'ws://'+yuming+'//ws';
  }
  return wsUrls;
})();

let defaultUrl= (function () {
  let urlReg=window.location.href;
  let reg=/^https/g;
  let defaultUrl="";
  if(reg.test(urlReg)){
    defaultUrl = 'https://'+yuming+'//';
  }else{
    defaultUrl = 'http://'+yuming+'//';
  }
  return defaultUrl;
})();
//let gisUrl = 'http://localhost:49941/';

let gisUrl = 'https://geokey.cn/gisapi/';

// //地图地址
export let gisJs = 'https://geokey.cn/library/4.13/init.js';

export let gisCss = 'https://geokey.cn/library/4.13/esri/themes/dark-green/main.css';

// 拦截器
axios.defaults.baseURL = defaultUrl;
//axios.defaults.headers.common['Authorization'] =gtoa_token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.response.use(function (res) {
  return res.data;
});
/*点击登陆数据*/
export let getLogin = function (usernamen, userpsw) {
  return axios({
    method: 'post',
    url: 'api/login/login',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': "Bearer " + sessionStorage.getItem("gtoa_token")
    },
    data: {'UserName': usernamen, 'UserPass': userpsw}
  })
};

/*登陆后获取权限*/
export let getfunction = function () {
  return axios({
    method: 'get',
    url: 'api/function/getfunction?t=' + new Date().getTime(),
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + sessionStorage.getItem("gtoa_token")
    }
  })
};

/*点击登陆数据*/
export let GetLayerInfo = function (data) {
  return axios({
    method: 'POST',
    baseURL: gisUrl,
    url: 'api/GIS/GetLayerInfo',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + sessionStorage.getItem("gtoa_token")
    },
    data: data
  })
};




