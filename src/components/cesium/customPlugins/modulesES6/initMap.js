/*******************************初始化地图********************************/
import 'cesium/Widgets/widgets.css';//导入cesium样式
import "iez-navi/styles/cesium-navigation.less";//导航组件样式
import '../css/myCesium.css';//导入myCesium样式
import Cesium from 'cesium/Cesium';//导入cesium对象
import iezNavi from 'iez-navi/viewerCesiumNavigationMixin';//导航组件
import myCesium from './myCesium';//我的插件


export default function initMap(viewerDiv){
/*******************************底图*******************************/
var url="http://mt3.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}";//无偏移谷歌影像地址  
//谷歌卫星影像
var baseLayer_satellite=new Cesium.UrlTemplateImageryProvider({
    title:"谷歌影像",
    url:url,
    enablePickFeatures:false,//数据拾取
});
/*******************************地图******************************/
//创建地图
let viewer=new Cesium.Viewer(viewerDiv,{
    animation:false,//
    fullscreenButton:false,//全屏组件
    baseLayerPicker:false,//底图影像拾取器组件
    geocoder:false,
    homeButton:true,
    timeline:false,
    navigationHelpButton:false,
    sceneModePicker:false,
    infoBox:false,//是否显示拾取信息框
    selectionIndicator:false,//要素选择框
    mapProjection: new Cesium.WebMercatorProjection(),//地图坐标系(WGS84或墨卡托)
    sceneMode: Cesium.SceneMode.SCENE3D,//初始场景模式
    scene3DOnly:true,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    imageryProvider:baseLayer_satellite,//底图影像提供者，默认加载cesium影像，必须设置该属性，否则加载cesium影像
    terrainProvider:Cesium.createWorldTerrain(),//地形
});
var options={};
options.enableCompass = true;//指南针
options.enableZoomControls = true;//缩放按钮
options.enableDistanceLegend = true;//比例尺
options.enableCompassOuterRing = false;
options.defaultResetView = Cesium.Rectangle.fromDegrees(93.77714275163393,21.771435365550143,109.19086597410482,28.571860255326573);//[xmin,ymin,xmax,ymax]                          
iezNavi(viewer,options);//添加导航组件
viewer.scene.screenSpaceCameraController.minimumZoomDistance=100;//相机的高度的最小值(m)
viewer.scene.screenSpaceCameraController.maximumZoomDistance=22000000;//相机高度的最大值(m)
//viewer.scene.screenSpaceCameraController._minimumZoomRate=30000;//设置相机缩小时的速率
//viewer.scene.screenSpaceCameraController._maximumZoomRate=5906376272000;//设置相机放大时的速率
myCesium.disableSeeUndergroud(viewer);//禁止相机进入地下
myCesium.setMountainCover(viewer);//设置山体是否遮挡要素
viewer.scene.fxaa=false;//抗锯齿
viewer.scene.fog.enabled=false;
/*******************************初始化视图*****************************/
//云南范围相机视角
let yunnan_camera={
   destination:Cesium.Cartesian3.fromDegrees(101.48400434793372,25.166867719154283,1355483.5277913106),  
   duration:2,//相机定位时长
   orientation:{  
        heading:Cesium.Math.toRadians(0),  
        pitch:Cesium.Math.toRadians(-90),  
        roll:Cesium.Math.toRadians(0)                            
   }  	
};
viewer.camera.setView(yunnan_camera);
/*******************************homeButton定位*****************************/	
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(e){
    e.cancel = true;
    viewer.camera.flyTo(yunnan_camera);
});
return viewer;
}//e

	

