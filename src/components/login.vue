<template>
  <div class="login_wrap">
    <div id="login" class="login_box">
      <div>
        <transition name="loginEnter"  enter-active-class="animated zoomIn">
          <div v-show="isShowLogin" class="login-head">
            <transition name="logtext"   enter-active-class="animatedTitle flipInX">
            <div class="login_logo" v-show="isShowLogin"><a href="javascript:;"><img src="../../static/images/gongkan.png" /></a></div>
            </transition>
            <div class="login_name">
                  <h1>
                    <transition name="loginEntertext"  enter-active-class="animatedTitle zoomIn">
                      <div  v-show="isShowLogin" class="login_name_up">工 勘 集 团</div>
                    </transition>
                    <transition name="loginEntertext"  enter-active-class="animatedText zoomIn">
                      <div  v-show="isShowLogin" class="login_name_down">岩土工程BIM技术智慧系统</div>
                    </transition>
                  </h1>
            </div>
            <form class="form-signin">
              <el-input id="login_username" v-model="username" tabindex="1" @keyup.enter.native="gtoaf_login" class="form-control" placeholder="用户名/工号" required></el-input>
              <el-input type="password" v-model="password" id="login_userpsw"  @keyup.enter.native="gtoaf_login" tabindex="2" class="form-control" placeholder="密码"  required></el-input>
              <div class="checkbox" style="margin-bottom:10px; margin-left:10px;">
                <label>
                  <el-checkbox v-model="remChecked" id="loginremember" type="checkbox" @change="gtoaf_remember()" value="记住密码">记住密码</el-checkbox>
                </label>
              </div>
              <el-button  :loading="loading" type="primary" tabindex="3" style="width:250px; margin-left:10px;padding: 10px 20px;font-size: 16px;font-weight: 600" @click="gtoaf_login">登陆</el-button>
              <el-button v-show="errShow" type="danger" disabled style="width:250px;margin-top:15px; margin-left:10px;padding: 5px 20px;overflow: hidden">{{errInfo}}</el-button>
            </form>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  import {getLogin} from "../api/index";
  import {mapState, mapGetters, mapMutations, mapActions} from "vuex";
  export default {
    name: "login",
    data(){
      return {
        loading:false,
        remChecked: false,
        username:'',
        password:'',
        errInfo:'',
        errShow:false,
        isShowLogin:false
      }
    },
    methods: {
      //vuex Mutations 同步方法
      ...mapMutations([]),
      //vuex Mutations 异步方法
      ...mapActions([]),

      /*点击登陆获取数据*/
      gtoaf_login() {
        var username = this.username;
        var userpsw = this.password;
        var self=this;
        if (username != "" && userpsw != "") {
          self.loading=true;
          getLogin(username,userpsw).then(function(result){
            if (result != null && result != undefined && result != "" && result != "null") {
              var resultinfo = JSON.parse(result);
              if (resultinfo.ResultError == "" || resultinfo.ResultError == null) {
                sessionStorage.setItem("gtoa_token", resultinfo.ResultMesg);
                sessionStorage.setItem("gtoa_user",JSON.stringify(resultinfo.ResultObjet));
                var remember = self.remChecked;
                if (remember) {
                  localStorage.setItem("gtoa_username", username);
                  localStorage.setItem("gtoa_userpass", userpsw);
                }
                else {
                  localStorage.setItem("gtoa_username", "");
                  localStorage.setItem("gtoa_userpass", "");
                }
                /*跳转主页*/
                if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                  self.loading=false;
                  alert("移动端尚未开发好,请使用PC端登陆！");
                } else {
                  self.loading=false;
                  self.$router.push("/home");
                }
              }
              else {
                self.loading=false;
                self.errInfo=resultinfo.ResultError;
                self.errShow=true;
              }
            }
            else {
              self.loading=false;
              self.errInfo="登录失败，登陆接口返回空！";
              self.errShow=true;
            }
          }).catch(function(err){
            self.loading=false;
            self.errInfo=err.message ;
            self.errShow=true;
          });
        }
        else {
          self.errInfo="用户名密码不能为空";
          self.errShow=true;
        }
      },
      /*记住密码*/
      gtoaf_remember() {
        var remember = this.remChecked;
        if (remember) {
          localStorage.setItem("gtoa_remember", "1")
        }
        else {
          localStorage.setItem("gtoa_remember", "0")
        }
      },
    },
    watch:{
      remember: {
        handler(n,o) {
          if (n== "1") {
            this.remChecked = true;
          }else{
            this.remChecked = false;
          }
        },
        immediate: true
      }
    },
    computed:{
      remember(){
        return localStorage.getItem("gtoa_remember");
      }
    },
    created(){

      },
    mounted(){
      this.username = localStorage.getItem("gtoa_username");
      this.password = localStorage.getItem("gtoa_userpass");
      if(this.remember== "1") {
        this.remChecked = true;
      }else{
        this.remChecked = false;
      }
      this.isShowLogin=true;
    }
  }

</script>
<style scoped lang="less">
  * {
    font: 13px/1.5 '微软雅黑';
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
  }
  a {
    color: #27A9E3;
    text-decoration: none;
    cursor: pointer;
  }
  /*最外层盒子*/
  .login_wrap{
    position:fixed;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    min-width: 1000px;
    zoom: 1;
    background-color: #fff;
    background: url("../../static/images/loginbg.png") no-repeat center center;
    background-size: 100% 100%;
  }
  /*登陆内容*/
  .login_box {
    width: 1100px;
    margin: 120px auto 0;
  }

  @media only screen and (max-width: 600px){
    .login_box .login_l_img{
      display: none;
    }
    .login_box{
      width: 400px;
    }
    .login-head{
      margin-right: 0 !important;
    }
  }

  .login_box .login_l_img {
    float: left;
    width: 432px;
    height: 450px;
    margin-left: 50px;
  }

  .login_box .login_l_img img {
    width: 500px;
    height: 440px;
  }

  .login-head {
    height: 400px;
    width: 400px;
    padding: 50px;
    background:linear-gradient(to right, #09b2b56b, #0aabf8b0, #4064ffa1, #46cfefe6);
    border-radius: 6px;
    box-sizing: border-box;
    float: right;
    margin-right: 50px;
    position: relative;
    margin-top: 60px;
    border: 2px solid rgb(76, 214, 192);
    box-shadow: 0 0 12px 0 #fff,0 0 14px 0 #17f0f3;
  }

  .login_logo {
    width: 120px;
    height: 120px;
    border: 5px solid #93defe;
    border-radius: 100px;
    background: #fff;
    text-align: center;
    line-height: 110px;
    position: absolute;
    top: -60px;
    right: 140px;
    box-shadow: 0 0 12px 0 #fff,0 0 14px 0 #17f0f3;
  }

  .login_name {
    width: 100%;
    float: left;
    text-align: center;
    margin-top: 20px;


  }

  .login_name h1 {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    color: #204a75;
    .login_name_up,.login_name_down{
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size: 24px;
      color: #4c78bb;
      text-shadow: 1px 1px 1px #20a5a23d, 1px 2px 1px #fff, 1px 2px 2px #2ba19f;
    }
    .login_name_up{
      font-size: 26px;
      color: #4d73ad;
      text-shadow: 1px 1px 1px rgba(62, 140, 135, 0.46), 1px 2px 1px #fff, 1px 2px 2px #2ba19f;
    }
  }

  .login_logo img {
    width: 95px;
    height: 95px;
    display: inline-block;
    vertical-align: middle;
  }



  .footer-login {
    font-size: 14px;
    color: #6c757d;
    display: block;
    width: 100%;
    float: left;
    text-align: center;
    margin-top: 60px;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    height: auto;
    padding: 15px;
    margin: 0;
  }

  .form-signin .checkbox {
    font-weight: 300;
  }

  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }


  /*.form-signin .form-control:focus {
z-index: 2;
}*/

  .form-signin input[type="password"] {
    margin-top: 15px
    /*border-top-left-radius: 0;
     border-top-right-radius: 0;*/
  }

  /*动画*/
  .animated {
    -webkit-animation-duration: 1s;
    animation-duration:1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }


  .animatedText {
    -webkit-animation-duration: 2s;
    animation-duration:2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .animatedTitle {
    -webkit-animation-duration: 3s;
    animation-duration:3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @-webkit-keyframes zoomIn {
    from {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
      opacity: 1;
    }
  }

  @keyframes zoomIn {
    from {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
      opacity: 1;
    }
  }
  .zoomIn {
    -webkit-animation-name: zoomIn;
    animation-name: zoomIn;
  }

  @-webkit-keyframes rotateIn {
    from {
      -webkit-transform-origin: center;
      transform-origin: center;
      -webkit-transform: rotate3d(0, 0, 1, -200deg);
      transform: rotate3d(0, 0, 1, -200deg);
      opacity: 0;
    }

    to {
      -webkit-transform-origin: center;
      transform-origin: center;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes rotateIn {
    from {
      -webkit-transform-origin: center;
      transform-origin: center;
      -webkit-transform: rotate3d(0, 0, 1, -200deg);
      transform: rotate3d(0, 0, 1, -200deg);
      opacity: 0;
    }

    to {
      -webkit-transform-origin: center;
      transform-origin: center;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  .rotateIn {
    -webkit-animation-name: rotateIn;
    animation-name: rotateIn;
  }

  @-webkit-keyframes flipInX {
    from {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
    }

    40% {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }

    60% {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1;
    }

    80% {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }

    to {
      -webkit-transform: perspective(400px);
      transform: perspective(400px);
    }
  }

  @keyframes flipInX {
    from {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
    }

    40% {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }

    60% {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1;
    }

    80% {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }

    to {
      -webkit-transform: perspective(400px);
      transform: perspective(400px);
    }
  }

  .flipInX {
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
    -webkit-animation-name: flipInX;
    animation-name: flipInX;
  }


</style>
<style>
  #login .el-input__inner{
    background: transparent;
    color:#fff;
  }
  #login .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #fff;
  }


</style>
