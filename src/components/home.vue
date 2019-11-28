<template>
  <el-container class="vr_comment">
    <el-header class="header_box clear" height="45px">
      <div class="header_box_main header_box_col" id="bimHeaderTab">
        <div class="header_box_main_wrap" >
            <el-tabs v-model="activeCompomentName" stretch @tab-click="showTab">
              <el-tab-pane :name="item.name" v-for="(item,index) in  tabData" :key="item.id">
                <span slot="label"><i class="el-icon-date"></i>{{item.title}}</span>
              </el-tab-pane>
            </el-tabs>
        </div>
      </div>
      <div class="header_box_left header_box_col">
        <h1 class="title">
          <i></i>
          <span>岩土工程BIM技术智慧系统</span>
        </h1>
      </div>
      <div class="header_box_right header_box_col">
          <ul>
            <li><span>管理员:</span><span>潘博人</span></li>
            <li>
              <a class="shuaxin" href="javascript:location.reload();">
                <el-tooltip class="tip" :hide-after="800" effect="dark" content="刷新" placement="bottom">
                  <i class="iconfont icon-shuaxin"></i>
                </el-tooltip>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" @click="loginout">
                <el-tooltip class="tip" :hide-after="800" effect="dark" content="退出登录" placement="bottom">
                  <i class="iconfont icon-tuichu2"></i>
                </el-tooltip>
              </a>
            </li>
          </ul>
      </div>
    </el-header>
    <el-container>
      <!--侧边栏-->
      <transition name="slide"
                  enter-active-class="animated slideInLeft"
                  leave-active-class="animated slideOutLeft">
        <el-aside class="asid_box" v-show="showAside" :width="activeCompoment.width">
          <component v-bind:is="activeCompomentName"></component>
        </el-aside>
      </transition>
      <!--主体-->
      <el-main class="main_box">
        <div id="viewDiv" style="width: 100%;height: 100%;color: #fff">
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  //vuex正常引入方法
  import {mapState, mapGetters, mapMutations, mapActions} from "vuex";
  //vuex模块引入方法
  /*import {createNamespacedHelpers} from 'vuex'
  const {mapState,mapGetters,mapMutations,mapActions} = createNamespacedHelpers('test');*/

  import esriLoader from 'esri-loader';
  import {gisJs, gisCss} from '../api/index'

  import projectView from '../base/projectView'
  import moneyView from '../base/moneyView'
  import progressView from '../base/progressView'
  import nowView from '../base/nowView'
  import workerView from '../base/workerView'
  import saveAdmView from '../base/saveAdmView'
  import baseMapView from '../base/baseMapView'
  import setupView from '../base/setupView'

  export default {
    name: "home",
    data() {
      return {
        options: [{
          value: '选项选项1项选项1选项1选项1选项1选项1选项11',
          label: '黄金糕项选项1项选项1项选项1项选项1项选项1'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        activeCompomentName: 'projectView',
        activeCompoment: {
          id: 1,
          name: 'projectView',
          width: '300px',
          height: '600px',
          minWidth: '300px',
          zIndexs: 99,
          title: '项目管理',
          iconName: 'icon-keji',
          bg: {
            'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
          }
        },
        showAside:true,
        activeTabData:'4',
        //控制左边
        tabData: [
          {
            id: 1,
            name: 'projectView',
            width: '300px',
            height: '600px',
            minWidth: '300px',
            zIndexs: 99,
            title: '项目管理',
            iconName: 'icon-keji',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 2,
            name: 'moneyView',
            width: '1300px',
            height: '680px',
            minWidth: '1300px',
            zIndexs: 99,
            title: '成本管控',
            iconName: 'icon-jineqiandaiyueshangjin',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 3,
            name: 'progressView',
            width: '850px',
            height: '600px',
            minWidth: '850px',
            zIndexs: 99,
            title: '施工进度',
            iconName: 'icon-jindushangbao',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 4,
            name: 'nowView',
            width: '1100px',
            height: '600px',
            minWidth: '1100px',
            zIndexs: 99,
            title: '现场管理',
            iconName: 'icon-xianchangguanli',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 5,
            name: 'workerView',
            width: '950px',
            height: '600px',
            minWidth: '950px',
            zIndexs: 99,
            title: '人员信息',
            iconName: 'icon-renyuanguanli',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 6,
            name: 'saveAdmView',
            width: '1200px',
            height: '600px',
            minWidth: '1200px',
            zIndexs: 99,
            title: '质量安全',
            iconName: 'icon-safety2anquan',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 7,
            name: 'baseMapView',
            width: '315px',
            height: '640px',
            minWidth: '325px',
            zIndexs: 99,
            title: '地图设置',
            iconName: 'icon-979caidan_zhishiditu',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 8,
            name: 'setupView',
            width: '655px',
            height: '600px',
            minWidth: '655px',
            zIndexs: 99,
            title: '任务配置',
            iconName: 'icon-xitongshezhi',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
        ],
      }
    },
    computed: {
      //vuex State 数据源
      ...mapState(['age']),
      //vuex Getters 计算属性
      ...mapGetters([]),
    },
    methods: {
      //vuex Mutations 同步方法
      ...mapMutations(['homeSetInput']),
      //vuex Mutations 异步方法
      ...mapActions( ['initView']),
      showTab(){

        this.tabData.forEach((item,index)=>{
          if(this.activeCompomentName==item.name){
            this.activeCompoment=item;
          }

        });




      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      gg(){
        this.initView();
      },
      //退出登录
      loginout() {
        sessionStorage.setItem("gtoa_token", "");
        sessionStorage.setItem("gtoa_user", "");
        sessionStorage.setItem("gtoa_userinfo", "");
        sessionStorage.setItem('roleAllFuns', "");
        localStorage.setItem('gtoa_userpass','');
        this.$router.push("/login");
      },
      //切换 aside
      switchMenu() {

      },
      //切换组件
      changeComPot(item) {

      },
      //创建home view
      initMap(state) {
        esriLoader.loadModules([
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/FeatureLayer",
          "esri/widgets/Expand"
        ], {
          url: gisJs,
          css: gisCss,
          dojoConfig: {has: {"esri-featurelayer-webgl": 1}}
        }).then(([
                   Map, MapView, FeatureLayer, Expand
                 ]) => {
          try {
            const map = new Map({
              basemap: {
                portalItem: {
                  id: "71463912e8ce4ee3a3e4fd307095484b"
                }
              }
            });

            const view = new MapView({
              container: "viewDiv",
              map: map,
              center: [-85, 38],
              zoom: 5,
              constraints: {
                minScale: 18489300,
                maxScale: 2311161
              },
              highlightOptions: {
                fillOpacity: 0
              }
            });

            const featureLayer = new FeatureLayer({
              url:
                "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/Landcover_30km_centroids_from_hex/FeatureServer",
              renderer: {
                type: "simple",
                symbol: {
                  type: "cim",
                  data: {
                    type: "CIMSymbolReference",
                    symbol: {
                      type: "CIMPointSymbol",
                      symbolLayers: [
                        {
                          type: "CIMVectorMarker",
                          enable: true,
                          anchorPoint: { x: 0, y: 0 },
                          anchorPointUnits: "Relative",
                          primitiveName: "innerSizeOverride",
                          frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                          markerGraphics: [
                            {
                              type: "CIMMarkerGraphic",
                              geometry: {
                                rings: [
                                  [
                                    [8.5, 0.2],
                                    [7.06, 0.33],
                                    [5.66, 0.7],
                                    [4.35, 1.31],
                                    [3.16, 2.14],
                                    [2.14, 3.16],
                                    [1.31, 4.35],
                                    [0.7, 5.66],
                                    [0.33, 7.06],
                                    [0.2, 8.5],
                                    [0.33, 9.94],
                                    [0.7, 11.34],
                                    [1.31, 12.65],
                                    [2.14, 13.84],
                                    [3.16, 14.86],
                                    [4.35, 15.69],
                                    [5.66, 16.3],
                                    [7.06, 16.67],
                                    [8.5, 16.8],
                                    [9.94, 16.67],
                                    [11.34, 16.3],
                                    [12.65, 15.69],
                                    [13.84, 14.86],
                                    [14.86, 13.84],
                                    [15.69, 12.65],
                                    [16.3, 11.34],
                                    [16.67, 9.94],
                                    [16.8, 8.5],
                                    [16.67, 7.06],
                                    [16.3, 5.66],
                                    [15.69, 4.35],
                                    [14.86, 3.16],
                                    [13.84, 2.14],
                                    [12.65, 1.31],
                                    [11.34, 0.7],
                                    [9.94, 0.33],
                                    [8.5, 0.2]
                                  ]
                                ]
                              },
                              symbol: {
                                type: "CIMPolygonSymbol",
                                symbolLayers: [
                                  {
                                    type: "CIMSolidFill",
                                    enable: true,
                                    color: [0, 0, 0, 30]
                                  }
                                ]
                              }
                            }
                          ],
                          scaleSymbolsProportionally: true,
                          respectFrame: true
                        },
                        {
                          type: "CIMVectorMarker",
                          enable: true,
                          anchorPoint: { x: 0, y: 0 },
                          anchorPointUnits: "Relative",
                          primitiveName: "outerSizeOverride",
                          frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                          markerGraphics: [
                            {
                              type: "CIMMarkerGraphic",
                              geometry: {
                                rings: [
                                  [
                                    [8.5, 0.2],
                                    [7.06, 0.33],
                                    [5.66, 0.7],
                                    [4.35, 1.31],
                                    [3.16, 2.14],
                                    [2.14, 3.16],
                                    [1.31, 4.35],
                                    [0.7, 5.66],
                                    [0.33, 7.06],
                                    [0.2, 8.5],
                                    [0.33, 9.94],
                                    [0.7, 11.34],
                                    [1.31, 12.65],
                                    [2.14, 13.84],
                                    [3.16, 14.86],
                                    [4.35, 15.69],
                                    [5.66, 16.3],
                                    [7.06, 16.67],
                                    [8.5, 16.8],
                                    [9.94, 16.67],
                                    [11.34, 16.3],
                                    [12.65, 15.69],
                                    [13.84, 14.86],
                                    [14.86, 13.84],
                                    [15.69, 12.65],
                                    [16.3, 11.34],
                                    [16.67, 9.94],
                                    [16.8, 8.5],
                                    [16.67, 7.06],
                                    [16.3, 5.66],
                                    [15.69, 4.35],
                                    [14.86, 3.16],
                                    [13.84, 2.14],
                                    [12.65, 1.31],
                                    [11.34, 0.7],
                                    [9.94, 0.33],
                                    [8.5, 0.2]
                                  ]
                                ]
                              },
                              symbol: {
                                type: "CIMLineSymbol",
                                symbolLayers: [
                                  {
                                    type: "CIMSolidStroke",
                                    enable: true,
                                    color: [150, 150, 150, 50],
                                    width: 1
                                  }
                                ]
                              }
                            }
                          ],
                          scaleSymbolsProportionally: true,
                          respectFrame: true
                        }
                      ]
                    },
                    primitiveOverrides: [
                      {
                        type: "CIMPrimitiveOverride",
                        primitiveName: "outerSizeOverride",
                        propertyName: "Size",
                        valueExpressionInfo: {
                          type: "CIMExpressionInfo",
                          title: "Size in pixels of outer ring at maxScale",
                          // the pixel size at the largest scale
                          // 42 represents the pixel size of the
                          // circles at the view's largest scale (1:2,311,161)
                          expression: "42 * 2311161 / $view.scale",
                          returnType: "Default"
                        }
                      },
                      {
                        type: "CIMPrimitiveOverride",
                        primitiveName: "innerSizeOverride",
                        propertyName: "Size",
                        valueExpressionInfo: {
                          type: "CIMExpressionInfo",
                          title: "Size in pixels of inner ring at maxScale",
                          // outerSize is the pixel size at the largest scale
                          // The innerSize is determined by multiplying
                          // the outerSize by the forest ratio
                          expression: `
                        var forestRatio = $feature.NLCDfrstPt / 100;
                        var outerSize = 42 * 2311161 / $view.scale;
                        var innerSize = outerSize * forestRatio;
                        return IIF( innerSize < 3, 3, innerSize );
                      `,
                          returnType: "Default"
                        }
                      }
                    ]
                  }
                },
                visualVariables: [
                  {
                    type: "color",
                    field: "POP2010",
                    stops: [
                      {
                        value: 0,
                        color: [57, 74, 53]
                      },
                      {
                        value: 15000,
                        color: [94, 120, 89]
                      },
                      {
                        value: 30000,
                        color: [235, 227, 215]
                      },
                      {
                        value: 90000,
                        color: [199, 143, 70]
                      },
                      {
                        value: 150000,
                        color: [201, 114, 0]
                      }
                    ]
                  }
                ]
              },
              popupTemplate: {
                content: [
                  {
                    type: "fields",
                    fieldInfos: [
                      {
                        fieldName: "NLCDfrstPt",
                        label: "% forested land (NLCD)",
                        format: {
                          places: 0
                        }
                      },
                      {
                        fieldName: "POP2010",
                        label: "Population (2010)",
                        format: {
                          places: 0,
                          digitSeparator: true
                        }
                      }
                    ]
                  }
                ]
              },
              definitionExpression: "NLCDfrstPt > 1"
            });
            view.map.add(featureLayer);

            // Add custom legend as an image to an Expand instance

            const descriptionContainer = document.createElement("div");
            descriptionContainer.classList.add("description");

            const descriptionTitle = document.createElement("div");
            descriptionTitle.innerHTML =
              "Percent of forested land (size)</br>by population " +
              '(color: <span class="high-population">high population</span>, <span class="low-population">low population</span>)';
            descriptionTitle.classList.add("esri-widget");
            descriptionTitle.classList.add("title");
            descriptionContainer.appendChild(descriptionTitle);

            const image = document.createElement("img");
            image.src =
              "https://arcgis.github.io/arcgis-samples-javascript/sample-data/cim-primitive-overrides/wurman-legend.png";
            descriptionContainer.appendChild(image);

            view.ui.add(
              new Expand({
                view: view,
                content: descriptionContainer,
                expandIconClass: "esri-icon-description"
              }),
              "top-left"
            );

            // Adjusts the size of the legend image
            // based on the size of the view
            view.when().then(adjustLegendByViewSize);
            view.watch("widthBreakpoint", adjustLegendByViewSize);

            function adjustLegendByViewSize() {
              if (view.widthBreakpoint === "xsmall") {
                image.style.width = "100%";
              } else {
                image.style.width = null;
              }
            }

          } catch (e) {
            this.$message.error('请刷新重试');
            console.error(e);
          }
        }, reason => {
          console.log(reason);
        })
      },
    },
    components: {baseMapView,moneyView,nowView,progressView,projectView,saveAdmView,setupView,workerView},
    created() {
      this.initMap();
    }
  }
</script>
<style scoped lang="less">
  .vr_comment {
    position: relative;
    width: 100%;
    height: 100%;
    background: #000000;
    min-width: 550px;

    .header_box {
      position: relative;
      padding: 0 8px;
      background: linear-gradient(to right, #001021, #011222, #02223b, #033455, #01253d, #02223b, #020814);
      overflow: hidden;
      width: 100%;
      .header_box_col {float: left;}
      /*中间*/
      .header_box_main {
        width: 100%;
        height: 200px;
      }
      .header_box_main_wrap {
        margin: 0 188px 0 260px;
        text-align: center;
        min-width: 520px;
      }
      /*右*/
      .header_box_right {
        text-align: center;
        width: 168px;
        min-width: 168px;
        margin-left: -168px;
        height: 45px;
        ul {
          width: 100%;
          height: 45px;
          line-height: 45px;
          li {
            float: left;
            font-size: 16px;
            padding: 0 5px;
            color: #e0f4f3;
            a {
              display: inline-block;
              text-decoration: none;
              color: #e0f4f3;
              cursor: pointer;
              i {
                font-size: 16px;
                font-style: normal;
                display: inline-block;
              }

              a:hover, i:hover {
                color: #4eb8f4;
                transition: .4s;
              }
            }
          }

        }
      }
      /*左*/
      .header_box_left {
        margin-left: -100%;
        width: 240px;
        .title {
          position: relative;
          display: inline-block;
          height: 45px;
          line-height: 45px;
          margin: 0 auto;
          i {
            float: left;
            display: inline-block;
            width: 30px;
            height: 30px;
            margin: 7.5px 5px;
            background: url("../../static/images/gongkan.png") no-repeat center center;
            background-size: 100% 100%;
          }
          span {
            font-size: 16px;
            font-weight: 600;
            text-align: center;
            color: #fff;
            text-shadow: 1px 1px 1px #095d60, 1px 2px 1px #097578, 1px 2px 2px #2c4f78;
          }
        }
      }




    }




   /* .header_box {
      position: relative;
      padding: 0 8px;
      background: linear-gradient(to right, #001021, #011222, #02223b, #033455, #01253d, #02223b, #020814);
      overflow: hidden;
      .title {
        position: relative;
        display: inline-block;
        width: 240px;
        height: 45px;
        line-height: 45px;
        margin: 0 auto;

        i {
          float: left;
          display: inline-block;
          width:30px;
          height: 30px;
          margin: 7.5px 5px;
          background: url("../../static/images/gongkan.png") no-repeat center center;
          background-size: 100% 100%;
        }

        span {
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          color: #fff;
          text-shadow: 1px 1px 1px #095d60, 1px 2px 1px #097578, 1px 2px 2px #2c4f78;
        }
      }

      !*头部 按钮*!

      .header_right {
        position: absolute;
        padding: 0 8px;
        top: 0;
        right: 0;
        width: 168px;
        height: 45px;

        ul {
          width: 100%;
          height: 45px;
          line-height: 45px;

          li {
            float: left;
            font-size: 16px;
            padding: 0 5px;
            color: #e0f4f3;

            a {
              display: inline-block;
              text-decoration: none;
              color: #e0f4f3;
              cursor: pointer;

              i {
                font-size: 16px;
                font-style: normal;
                display: inline-block;
              }

              a:hover, i:hover {
                color: #4eb8f4;
                transition: .4s;
              }
            }
          }

        }
      }

    !*  !*左按钮*!

      .header_left {
        position: absolute;
        left: 0;
        top: 34px;
        width: 50px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: linear-gradient(to right, #001021, #011222, #021831, #020814);

        i {
          font-style: normal;
          font-size: 14px;
          color: #4a8b49;
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          padding: 0 2px;
          border-radius: 4px;
          cursor: pointer;
        }
      }

      .header_left:hover {
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
        -webkit-transition: .4s;
        transition: .4s;
        background: linear-gradient(to right, #001839, #011222, #02256a, #020814);

        i {
          color: #71de6e;
        }
      }*!

    }*/
    //左边导航
    .asid_box {
/*      background: #09b2b5;*/
      background: linear-gradient(to right, #001021, #011222, #021831, #020814);

      .menu_list_icon {
        display: inline-block;
        width: 100%;
        height: 20px;
        background: #50d1d0;
      }
      .menu_list {
        width: 100%;
        overflow: hidden;
        li {
          width: 50px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 24px;
          margin: 3px 0 20px 0;
          cursor: pointer;
          border-radius: 50%;
          i {
            font-style: normal;
            display: inline-block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            font-size: 24px;
            color: #51a251;
          }
        }
        li:hover, li:focus {
          i {
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
            -webkit-transition: .4s;
            transition: .4s;
            color: #84f370;
            background: radial-gradient(#021831, #011222, #021a47, #020814);
          }
        }
      }
    }

    //主体
    .main_box {
      position: relative;
      padding: 0px;
      box-shadow: 1px 1px 1px #efefef, 2px 2px 2px #021831;
      background: linear-gradient(to right, #001021, #011222, #021831, #020814);
    }


  }

  /*按钮*/
  .box_but {
    position: absolute;
    left: 15px;
    top: 15px;
    cursor: pointer;
    padding: 4px;
    font-size: 24px;
    border-radius: 2px;
    background: linear-gradient(rgba(13, 69, 45, 0.3), rgba(9, 93, 96, 0.41));
    color: #14e0c0;
    transition: background-color .05s ease;
    -webkit-transition: background-color .05s ease;
    z-index: 100;
  }

  /*动画*/
  /*动画*/
  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @-webkit-keyframes slideInLeft {
    from {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideInLeft {
    from {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInLeft {
    -webkit-animation-name: slideInLeft;
    animation-name: slideInLeft;
  }

  @-webkit-keyframes slideOutLeft {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes slideOutLeft {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }

  .slideOutLeft {
    -webkit-animation-name: slideOutLeft;
    animation-name: slideOutLeft;
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }

  @-webkit-keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .fadeOut {
    -webkit-animation-name: fadeOut;
    animation-name: fadeOut;
  }
</style>
<style>
 #bimHeaderTab .header_box_main_wrap .el-tabs__item {

    color:#fff;
  }
 #bimHeaderTab .header_box_main_wrap .el-tabs__item.is-active{
   color: #409EFF;
 }

</style>













<!--
<template>
  <el-container class="vr_comment">
    <el-header class="header_box clear" height="55px">
      <div class="header_left" @click="switchMenu">
        <el-tooltip class="tip" :hide-after="800" effect="dark" content="切换" placement="right">
          <i class="switch_but iconfont icon-weibiaoti8"></i>
        </el-tooltip>
      </div>
      <div class="header_right">
        <ul>
          <li><span>管理员:</span><span>潘博人</span></li>
          <li>
            <a class="shuaxin" href="javascript:location.reload();">
              <el-tooltip class="tip" :hide-after="800" effect="dark" content="刷新" placement="bottom">
                <i class="iconfont icon-shuaxin"></i>
              </el-tooltip>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" @click="loginout">
              <el-tooltip class="tip" :hide-after="800" effect="dark" content="退出登录" placement="bottom">
                <i class="iconfont icon-tuichu2"></i>
              </el-tooltip>
            </a>
          </li>
        </ul>
      </div>
      <h1 class="title">
        <i></i>
        <span>工勘集团岩土工程BIM技术智慧系统</span>
      </h1>
    </el-header>
    <el-container>
      &lt;!&ndash;侧边栏&ndash;&gt;
      <transition name="slide"
                  enter-active-class="animated slideInLeft"
                  leave-active-class="animated slideOutLeft">
        <el-aside class="asid_box" width="50px" v-show="showAside">
          <ul class="menu_list">
            <li v-for="(item,index) in tabData" :key="item.id" @click="changeComPot(item)"
                :style="[item.id==activeTabData.id?item.bg:null]">
              <el-tooltip class="tip" :hide-after="800" effect="dark" :content="item.title" placement="right">
                <i class="iconfont" :class="[item.iconName]"></i>
              </el-tooltip>
            </li>
          </ul>
        </el-aside>
      </transition>
      &lt;!&ndash;主体&ndash;&gt;
      <el-main class="main_box">
        <div id="viewDiv" style="width: 100%;height: 100%;color: #fff">

        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  //vuex正常引入方法
  import {mapState, mapGetters, mapMutations, mapActions} from "vuex";
//vuex模块引入方法
/*import {createNamespacedHelpers} from 'vuex'
const {mapState,mapGetters,mapMutations,mapActions} = createNamespacedHelpers('test');*/

  import esriLoader from 'esri-loader';
  import {gisJs, gisCss} from '../api/index'

export default {
    name: "home",
    data() {
      return {
        showAside:true,
        activeTabData:'4',
        //控制左边
        tabData: [
          {
            id: 4,
            name: 'projectView',
            width: '300px',
            height: '600px',
            minWidth: '300px',
            zIndexs: 99,
            title: '项目管理',
            iconName: 'icon-keji',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 2,
            name: 'moneyView',
            width: '1300px',
            height: '680px',
            minWidth: '1300px',
            zIndexs: 99,
            title: '成本管控',
            iconName: 'icon-jineqiandaiyueshangjin',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 3,
            name: 'progressView',
            width: '850px',
            height: '600px',
            minWidth: '850px',
            zIndexs: 99,
            title: '施工进度',
            iconName: 'icon-jindushangbao',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 1,
            name: 'materialView',
            width: '1100px',
            height: '600px',
            minWidth: '1100px',
            zIndexs: 99,
            title: '现场管理',
            iconName: 'icon-xianchangguanli',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 6,
            name: 'workerView',
            width: '950px',
            height: '600px',
            minWidth: '950px',
            zIndexs: 99,
            title: '人员信息',
            iconName: 'icon-renyuanguanli',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 7,
            name: 'saveAdm',
            width: '1200px',
            height: '600px',
            minWidth: '1200px',
            zIndexs: 99,
            title: '质量安全',
            iconName: 'icon-safety2anquan',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 8,
            name: 'baseMap',
            width: '315px',
            height: '640px',
            minWidth: '325px',
            zIndexs: 99,
            title: '地图设置',
            iconName: 'icon-979caidan_zhishiditu',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
          {
            id: 5,
            name: 'setupView',
            width: '655px',
            height: '600px',
            minWidth: '655px',
            zIndexs: 99,
            title: '任务配置',
            iconName: 'icon-xitongshezhi',
            bg: {
              'background': 'radial-gradient(rgb(2, 24, 49), rgb(14, 28, 41), rgb(16, 61, 145), rgb(7, 18, 35))'
            }
          },
        ],
      }
    },
    computed: {
      //vuex State 数据源
      ...mapState(['age']),
      //vuex Getters 计算属性
      ...mapGetters([]),
    },
    methods: {
      //vuex Mutations 同步方法
      ...mapMutations(['homeSetInput']),
      //vuex Mutations 异步方法
      ...mapActions( ['initView']),
      gg(){
        this.initView();
      },
      //退出登录
      loginout() {
        sessionStorage.setItem("gtoa_token", "");
        sessionStorage.setItem("gtoa_user", "");
        sessionStorage.setItem("gtoa_userinfo", "");
        sessionStorage.setItem('roleAllFuns', "");
        localStorage.setItem('gtoa_userpass','');
        this.$router.push("/login");
      },
      //切换 aside
      switchMenu() {

      },
      //切换组件
      changeComPot(item) {

      },
      //创建home view
      initMap(state) {
        esriLoader.loadModules([
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/FeatureLayer",
          "esri/widgets/Expand"
        ], {
          url: gisJs,
          css: gisCss,
          dojoConfig: {has: {"esri-featurelayer-webgl": 1}}
        }).then(([
       Map, MapView, FeatureLayer, Expand
          ]) => {
          try {
            const map = new Map({
              basemap: {
                portalItem: {
                  id: "71463912e8ce4ee3a3e4fd307095484b"
                }
              }
            });

            const view = new MapView({
              container: "viewDiv",
              map: map,
              center: [-85, 38],
              zoom: 5,
              constraints: {
                minScale: 18489300,
                maxScale: 2311161
              },
              highlightOptions: {
                fillOpacity: 0
              }
            });

            const featureLayer = new FeatureLayer({
              url:
                "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/Landcover_30km_centroids_from_hex/FeatureServer",
              renderer: {
                type: "simple",
                symbol: {
                  type: "cim",
                  data: {
                    type: "CIMSymbolReference",
                    symbol: {
                      type: "CIMPointSymbol",
                      symbolLayers: [
                        {
                          type: "CIMVectorMarker",
                          enable: true,
                          anchorPoint: { x: 0, y: 0 },
                          anchorPointUnits: "Relative",
                          primitiveName: "innerSizeOverride",
                          frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                          markerGraphics: [
                            {
                              type: "CIMMarkerGraphic",
                              geometry: {
                                rings: [
                                  [
                                    [8.5, 0.2],
                                    [7.06, 0.33],
                                    [5.66, 0.7],
                                    [4.35, 1.31],
                                    [3.16, 2.14],
                                    [2.14, 3.16],
                                    [1.31, 4.35],
                                    [0.7, 5.66],
                                    [0.33, 7.06],
                                    [0.2, 8.5],
                                    [0.33, 9.94],
                                    [0.7, 11.34],
                                    [1.31, 12.65],
                                    [2.14, 13.84],
                                    [3.16, 14.86],
                                    [4.35, 15.69],
                                    [5.66, 16.3],
                                    [7.06, 16.67],
                                    [8.5, 16.8],
                                    [9.94, 16.67],
                                    [11.34, 16.3],
                                    [12.65, 15.69],
                                    [13.84, 14.86],
                                    [14.86, 13.84],
                                    [15.69, 12.65],
                                    [16.3, 11.34],
                                    [16.67, 9.94],
                                    [16.8, 8.5],
                                    [16.67, 7.06],
                                    [16.3, 5.66],
                                    [15.69, 4.35],
                                    [14.86, 3.16],
                                    [13.84, 2.14],
                                    [12.65, 1.31],
                                    [11.34, 0.7],
                                    [9.94, 0.33],
                                    [8.5, 0.2]
                                  ]
                                ]
                              },
                              symbol: {
                                type: "CIMPolygonSymbol",
                                symbolLayers: [
                                  {
                                    type: "CIMSolidFill",
                                    enable: true,
                                    color: [0, 0, 0, 30]
                                  }
                                ]
                              }
                            }
                          ],
                          scaleSymbolsProportionally: true,
                          respectFrame: true
                        },
                        {
                          type: "CIMVectorMarker",
                          enable: true,
                          anchorPoint: { x: 0, y: 0 },
                          anchorPointUnits: "Relative",
                          primitiveName: "outerSizeOverride",
                          frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                          markerGraphics: [
                            {
                              type: "CIMMarkerGraphic",
                              geometry: {
                                rings: [
                                  [
                                    [8.5, 0.2],
                                    [7.06, 0.33],
                                    [5.66, 0.7],
                                    [4.35, 1.31],
                                    [3.16, 2.14],
                                    [2.14, 3.16],
                                    [1.31, 4.35],
                                    [0.7, 5.66],
                                    [0.33, 7.06],
                                    [0.2, 8.5],
                                    [0.33, 9.94],
                                    [0.7, 11.34],
                                    [1.31, 12.65],
                                    [2.14, 13.84],
                                    [3.16, 14.86],
                                    [4.35, 15.69],
                                    [5.66, 16.3],
                                    [7.06, 16.67],
                                    [8.5, 16.8],
                                    [9.94, 16.67],
                                    [11.34, 16.3],
                                    [12.65, 15.69],
                                    [13.84, 14.86],
                                    [14.86, 13.84],
                                    [15.69, 12.65],
                                    [16.3, 11.34],
                                    [16.67, 9.94],
                                    [16.8, 8.5],
                                    [16.67, 7.06],
                                    [16.3, 5.66],
                                    [15.69, 4.35],
                                    [14.86, 3.16],
                                    [13.84, 2.14],
                                    [12.65, 1.31],
                                    [11.34, 0.7],
                                    [9.94, 0.33],
                                    [8.5, 0.2]
                                  ]
                                ]
                              },
                              symbol: {
                                type: "CIMLineSymbol",
                                symbolLayers: [
                                  {
                                    type: "CIMSolidStroke",
                                    enable: true,
                                    color: [150, 150, 150, 50],
                                    width: 1
                                  }
                                ]
                              }
                            }
                          ],
                          scaleSymbolsProportionally: true,
                          respectFrame: true
                        }
                      ]
                    },
                    primitiveOverrides: [
                      {
                        type: "CIMPrimitiveOverride",
                        primitiveName: "outerSizeOverride",
                        propertyName: "Size",
                        valueExpressionInfo: {
                          type: "CIMExpressionInfo",
                          title: "Size in pixels of outer ring at maxScale",
                          // the pixel size at the largest scale
                          // 42 represents the pixel size of the
                          // circles at the view's largest scale (1:2,311,161)
                          expression: "42 * 2311161 / $view.scale",
                          returnType: "Default"
                        }
                      },
                      {
                        type: "CIMPrimitiveOverride",
                        primitiveName: "innerSizeOverride",
                        propertyName: "Size",
                        valueExpressionInfo: {
                          type: "CIMExpressionInfo",
                          title: "Size in pixels of inner ring at maxScale",
                          // outerSize is the pixel size at the largest scale
                          // The innerSize is determined by multiplying
                          // the outerSize by the forest ratio
                          expression: `
                        var forestRatio = $feature.NLCDfrstPt / 100;
                        var outerSize = 42 * 2311161 / $view.scale;
                        var innerSize = outerSize * forestRatio;
                        return IIF( innerSize < 3, 3, innerSize );
                      `,
                          returnType: "Default"
                        }
                      }
                    ]
                  }
                },
                visualVariables: [
                  {
                    type: "color",
                    field: "POP2010",
                    stops: [
                      {
                        value: 0,
                        color: [57, 74, 53]
                      },
                      {
                        value: 15000,
                        color: [94, 120, 89]
                      },
                      {
                        value: 30000,
                        color: [235, 227, 215]
                      },
                      {
                        value: 90000,
                        color: [199, 143, 70]
                      },
                      {
                        value: 150000,
                        color: [201, 114, 0]
                      }
                    ]
                  }
                ]
              },
              popupTemplate: {
                content: [
                  {
                    type: "fields",
                    fieldInfos: [
                      {
                        fieldName: "NLCDfrstPt",
                        label: "% forested land (NLCD)",
                        format: {
                          places: 0
                        }
                      },
                      {
                        fieldName: "POP2010",
                        label: "Population (2010)",
                        format: {
                          places: 0,
                          digitSeparator: true
                        }
                      }
                    ]
                  }
                ]
              },
              definitionExpression: "NLCDfrstPt > 1"
            });
            view.map.add(featureLayer);

            // Add custom legend as an image to an Expand instance

            const descriptionContainer = document.createElement("div");
            descriptionContainer.classList.add("description");

            const descriptionTitle = document.createElement("div");
            descriptionTitle.innerHTML =
              "Percent of forested land (size)</br>by population " +
              '(color: <span class="high-population">high population</span>, <span class="low-population">low population</span>)';
            descriptionTitle.classList.add("esri-widget");
            descriptionTitle.classList.add("title");
            descriptionContainer.appendChild(descriptionTitle);

            const image = document.createElement("img");
            image.src =
              "https://arcgis.github.io/arcgis-samples-javascript/sample-data/cim-primitive-overrides/wurman-legend.png";
            descriptionContainer.appendChild(image);

            view.ui.add(
              new Expand({
                view: view,
                content: descriptionContainer,
                expandIconClass: "esri-icon-description"
              }),
              "top-left"
            );

            // Adjusts the size of the legend image
            // based on the size of the view
            view.when().then(adjustLegendByViewSize);
            view.watch("widthBreakpoint", adjustLegendByViewSize);

            function adjustLegendByViewSize() {
              if (view.widthBreakpoint === "xsmall") {
                image.style.width = "100%";
              } else {
                image.style.width = null;
              }
            }

          } catch (e) {
           this.$message.error('请刷新重试');
            console.error(e);
          }
        }, reason => {
          console.log(reason);
        })
      },
    },
    components: {

    },
    created() {
       this.initMap();
    }
  }
</script>
<style scoped lang="less">
  .vr_comment {
    position: relative;
    width: 100%;
    height: 100%;
    background: #000000;
    min-width: 950px;
    .header_box {
      position: relative;
      background: linear-gradient(to right, #001021, #011222, #02223b, #033455, #01253d, #02223b, #020814);
      text-align: center;
      overflow: hidden;
      .title {
        position: relative;
        display: inline-block;
        width: 595px;
        height: 55px;
        line-height: 55px;
        margin: 0 auto;

        i {
          float: left;
          display: inline-block;
          width: 40px;
          height: 40px;
          margin: 7.5px 5px;
          background: url("../../static/images/gongkan.png") no-repeat center center;
          background-size: 100% 100%;
        }

        span {
          font-size: 26px;
          font-weight: 600;
          text-align: center;
          letter-spacing: 6px;
          color: #fff;
          text-shadow: 1px 1px 1px #095d60, 1px 2px 1px #097578, 1px 2px 2px #2c4f78;
        }
      }

      /*头部 按钮*/

      .header_right {
        position: absolute;
        padding: 0 8px;
        top: 0;
        right: 0;
        width: 168px;
        height: 55px;

        ul {
          width: 100%;
          height: 55px;
          line-height: 55px;

          li {
            float: left;
            font-size: 16px;
            padding: 0 5px;
            color: #e0f4f3;

            a {
              display: inline-block;
              text-decoration: none;
              color: #e0f4f3;
              cursor: pointer;

              i {
                font-size: 16px;
                font-style: normal;
                display: inline-block;
              }

              a:hover, i:hover {
                color: #4eb8f4;
                transition: .4s;
              }
            }
          }

        }
      }

      /*左按钮*/

      .header_left {
        position: absolute;
        left: 0;
        top: 34px;
        width: 50px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: linear-gradient(to right, #001021, #011222, #021831, #020814);

        i {
          font-style: normal;
          font-size: 14px;
          color: #4a8b49;
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          padding: 0 2px;
          border-radius: 4px;
          cursor: pointer;
        }
      }

      .header_left:hover {
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
        -webkit-transition: .4s;
        transition: .4s;
        background: linear-gradient(to right, #001839, #011222, #02256a, #020814);

        i {
          color: #71de6e;
        }
      }

    }
    //左边导航
    .asid_box {
      background: linear-gradient(to right, #001021, #011222, #021831, #020814);

      .menu_list_icon {
        display: inline-block;
        width: 100%;
        height: 20px;
        background: #50d1d0;
      }
      .menu_list {
        width: 100%;
        overflow: hidden;
        li {
          width: 50px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 24px;
          margin: 3px 0 20px 0;
          cursor: pointer;
          border-radius: 50%;
          i {
            font-style: normal;
            display: inline-block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            font-size: 24px;
            color: #51a251;
          }
        }
        li:hover, li:focus {
          i {
            -webkit-transform: scale(1.2);
            transform: scale(1.2);
            -webkit-transition: .4s;
            transition: .4s;
            color: #84f370;
            background: radial-gradient(#021831, #011222, #021a47, #020814);
          }
        }
      }
    }

    //主体
    .main_box {
      position: relative;
      padding: 2px;
      box-shadow: 1px 1px 1px #efefef, 2px 2px 2px #021831;
      background: linear-gradient(to right, #001021, #011222, #021831, #020814);
    }


  }

  /*按钮*/
  .box_but {
    position: absolute;
    left: 15px;
    top: 15px;
    cursor: pointer;
    padding: 4px;
    font-size: 24px;
    border-radius: 2px;
    background: linear-gradient(rgba(13, 69, 45, 0.3), rgba(9, 93, 96, 0.41));
    color: #14e0c0;
    transition: background-color .05s ease;
    -webkit-transition: background-color .05s ease;
    z-index: 100;
  }

  /*动画*/
  /*动画*/
  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @-webkit-keyframes slideInLeft {
    from {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideInLeft {
    from {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInLeft {
    -webkit-animation-name: slideInLeft;
    animation-name: slideInLeft;
  }

  @-webkit-keyframes slideOutLeft {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes slideOutLeft {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    to {
      visibility: hidden;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }

  .slideOutLeft {
    -webkit-animation-name: slideOutLeft;
    animation-name: slideOutLeft;
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }

  @-webkit-keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .fadeOut {
    -webkit-animation-name: fadeOut;
    animation-name: fadeOut;
  }
</style>
<style>
  .esri-ui-manual-container > .esri-component {
    display: none !important;
  }
</style>
-->



