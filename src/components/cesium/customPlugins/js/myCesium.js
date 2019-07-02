/*
 ***********************时间:2019.5.26 wxt**********************
 *更新时间:2019.5.26
 *************************一、插件概述************************
 *该插件封装了一个myCesium对象，该对象包含着关于Cesium地图的相关方法
 *************************二、方法*************************
 *addManyPrimitiveCollection(primitiveCollection,priCollections):封装在primitiveCollection集合中添加多个primitiveCollection图层
 *cartesian3ToWGS84(cartesian3):封装空间笛卡尔坐标转WGS84坐标
 *disableSeeUndergroud(viewer):封装禁止相机进入地下
 *findPrimitiveCollection(PrimitiveCollectionId):封装通过id查找PrimitiveCollection图层
 *getCurrentViewExtent(viewer):封装获取当前场景视图的范围
 *getViewCenterPt(viewer):封装获取当前场景视图的中心坐标
 *getCameraHeight(viewer):封装获取当前场景相机的高度
 *getMapLevelByHeight(cameraHeight):封装根据相机的高度获取地图的级别
 *WGS84ToWercator(wgsLon,wgsLat,elevation):封装WGS84坐标Wercator投影坐标(arcgis坐标转换的结果一样)
 *setMountainCover(viewer):封装设置山体是否遮挡要素
 *sampleTerrainDataByPtsfunction(lonlats,terrainProvider,callback):封装根据指定的坐标点采样地形高程数据获取高程
 *transformToCesiumCoords(coordDatas):常规经纬度坐标数组转换为cesium常用格式的经纬度坐标数组
 *transToCartesian3Coords(coordDatas):常规经纬度坐标数组转换为cesium使用的Cartesian3坐标数组
 *************************三、Cesium扩展*************************
 *viewer.then(callback):延迟回调   
 * 
 *
 *    
 *    
 **************************四、注意*************************
 *
 *
 * */

var myCesium={};
window.myCesium=myCesium;

/****************封装在primitiveCollection集合中添加多个primitiveCollection图层**************
*参数:PrimitiveCollectionId(number):PrimitiveCollection集合id
*无返回值
*/
myCesium.addManyPrimitiveCollection=function(primitiveCollection="",priCollections=""){
if(primitiveCollection&&priCollections){
for(let i=0;i<priCollections.length;i++){
primitiveCollection.add(priCollections[i]);
}
}	
}//e

/*********************封装通过id查找PrimitiveCollection图层******************
*参数:PrimitiveCollectionId(number):PrimitiveCollection集合id
*返回值:primitiveCollection(PrimitiveCollection):查找的PrimitiveCollection集合
*/
myCesium.findPrimitiveCollection=function(PrimitiveCollectionId){
let primitiveCollection="";
if(PrimitiveCollectionId){
let Len=viewer.scene.primitives._primitives.length;//图层数
let lyrCollection=viewer.scene.primitives._primitives;
for(let i=0;i<layerLen;i++){
let lyr=lyrCollection[i];
if(lyr.id&&(lyr.id==PrimitiveCollectionId)){
primitiveCollection=lyr;
break;
}
}
}
return primitiveCollection;
}//e


/*********************封装WGS84坐标Wercator投影坐标(arcgis坐标转换的结果一样)******************
*参数:wgsLon(number):经度
*****wgsLat(number):纬度
*****elevation(number):地面高程
*返回值:wercatorObj(object):该对象包含x、y、z、srs属性
*/
myCesium.WGS84ToWercator=function(wgsLon,wgsLat,elevation=0){
let wercatorObj={};
if(wgsLon&&wgsLat&&height){
let x=wgsLon*20037508.342789/180;
let y=Math.log(Math.tan((90+wgsLat)*Math.PI/360))/(Math.PI/180);
y =y*20037508.34789/180+7.081154553416204e-10;	
wercatorObj={
"x":x,
"y":y,
"z":elevation,
"srs":"ESPG3857"
};
}
return wercatorObj;
}//e

/*********************封装空间笛卡尔坐标转WGS84坐标******************
*参数:cartesian3(cartesian3):空间笛卡尔坐标，例如:{x:"",y:"",z:""}
*返回值:WGS84Obj(object):该对象包含longitude、latitude、height、srs属性
*注解:使用该方法前需要提前引入Cesium.js文件，否则使用不了
*/
myCesium.cartesian3ToWGS84=function(cartesian3){
let WGS84Obj={};
if(cartesian3){
let cartographic=Cesium.Cartographic.fromCartesian(cartesian3);//地理弧度坐标
let lon=Cesium.Math.toDegrees(cartographic.longitude);//经度
let lat=Cesium.Math.toDegrees(cartographic.latitude);//纬度
let height=cartographic.height;//高度
WGS84Obj={
longitude:lon,
latitude:lat,
height:height,
srs:"ESPG4326"		
};
}
return WGS84Obj;
}//e

/*********************封装根据指定的坐标点采样地形高程数据获取高程******************
*参数:lonlats(array):查询高程的坐标点数组，例如:[{lon:"",lat:""}]
*****terrainProvider(TerrainProvider):查询高程的TerrainProvider对象，即高程数据源
*****callback(function):查询结果的回调函数
*无返回值
*注解:使用该方法前需要提前引入Cesium.js文件，否则使用不了
*/
myCesium.sampleTerrainDataByPtsfunction=function(lonlats,terrainProvider,callback){
let pointArrInput=[];//需要查询高程的坐标点数组
let terrainLevel=14;//数据等级
if(lonlats&&lonlats.length>0&&terrainProvider){
for(let i=0;i<lonlats.length;i++){
let cartographic=Cesium.Cartographic.fromDegrees(lonlats[i].lon,lonlats[i].lat);//将经纬度坐标转为弧度坐标，例如：{longitude:"",latitude:"",height:""}
pointArrInput.push(cartographic);//
}
let promise=Cesium.sampleTerrain(terrainProvider,terrainLevel,pointArrInput);//高程采样
Cesium.when(promise,function(updatedPositions){
callback(updatedPositions);//返回查询高程结果
});
}
}//e


/******************常规经纬度坐标数组转换为cesium使用的Cartesian3坐标数组******************
*参数:coordDatas(array):常规的坐标数组，例如:[[lon1,lat1],[lon2,lat2]]
*返回值:Cartesian3Coords(array):cesium格式的Cartesian3坐标数组，例如[{x:"",y:"",z:""},{x:"",y:"",z:""}]
*注解:使用该方法前需要提前引入Cesium.js文件，否则使用不了
*该方法用于转换经纬度的数组格式[[lon1,lat1],[lon2,lat2]]为常规经纬度格式
*[{x:"",y:"",z:""},{x:"",y:"",z:""}]为cesium使用的Cartesian3数组
*/
myCesium.transToCartesian3Coords=function(coordDatas){
let Cartesian3Coords=[];//cesium常用格式数组
if(coordDatas&&coordDatas.length>0){
let cesiumCoords=transformToCesiumCoords(coordDatas);//cesium格式的经纬度坐标
Cartesian3Coords=Cesium.Cartesian3.fromDegreesArray(cesiumCoords);//转为为Cartesian3数组
}
return Cartesian3Coords;
function transformToCesiumCoords(coordDatas){
let cesiumCoords=[];//cesium常用格式数组
if(coordDatas&&coordDatas.length>0){
for(let i=0;i<coordDatas.length;i++){
let coord=coordDatas[i];
let lon=coord[0] || "";
let lat=coord[1] || "";
if(lon&&lat){
cesiumCoords.push(lon);
cesiumCoords.push(lat);
}
}
}
return cesiumCoords;
}//e1
}//e


/******************常规经纬度坐标数组转换为cesium常用格式的经纬度坐标数组******************
*参数:coordDatas(array):常规的坐标数组，例如:[[lon1,lat1],[lon2,lat2]]
*返回值:cesiumCoords(array):cesium格式的坐标数组，例如[lon1,lat1,lon2,lat2]
*注解:该方法用于转换经纬度的数组格式[[lon1,lat1],[lon2,lat2]]为常规经纬度格式
*[lon1,lat1,lon2,lat2]为cesium常用经纬度格式
*/
myCesium.transformToCesiumCoords=function(coordDatas){
let cesiumCoords=[];//cesium常用格式数组
if(coordDatas&&coordDatas.length>0){
for(let i=0;i<coordDatas.length;i++){
let coord=coordDatas[i];
let lon=coord[0] || "";
let lat=coord[1] || "";
if(lon&&lat){
cesiumCoords.push(lon);
cesiumCoords.push(lat);
}
}
}
return cesiumCoords;
}//e

/*************************封装根据相机的高度获取地图的级别************************
 *参数:cameraHeight(number):当前相机高度
 *返回地图级别结果
 */
myCesium.getMapLevelByHeight=function(cameraHeight){
if(cameraHeight>48000000){
return 0;
}else if(cameraHeight>24000000){
return 1;
}else if(cameraHeight >12000000){
return 2;
}else if(cameraHeight>6000000){
 return 3;
}else if(cameraHeight>3000000){
return 4;
}else if(cameraHeight>1500000){
return 5;
}else if(cameraHeight>750000){
return 6;
}else if(cameraHeight>375000){
return 7;
}else if(cameraHeight>187500){
return 8;
}else if(cameraHeight>93750){
return 9;
}else if(cameraHeight>46875){
return 10;
}else if(cameraHeight>23437.5){
return 11;
}else if(cameraHeight>11718.75){
return 12;
}else if(cameraHeight>5859.38){
return 13;
}else if(cameraHeight>2929.69){
return 14;
}else if(cameraHeight>1464.84){
return 15;
}else if(cameraHeight>732.42){
return 16;
}else if(cameraHeight>366.21){
return 17;
}else{
return 18;
}
}//e


/*************************封装设置山体是否遮挡要素************************
 *参数:viewer(Viewer):当前视图对象
 *无返回值
 *注解:当“drawStatus=true”时不会开启地形遮挡
 */
window.drawStatus=false;//地图绘制几何状态
myCesium.setMountainCover=function(viewer){
if(viewer){
viewer.scene.preRender.addEventListener(function(evt){
var pitch=viewer.scene.camera.pitch;//相机俯角(-1.5-0)范围
if(pitch&&eval(pitch)>-0.45){
if(!window.drawStatus){
viewer.scene.globe.depthTestAgainstTerrain=true;//开启地形遮挡
}
}
else{
viewer.scene.globe.depthTestAgainstTerrain=false;//关闭地形遮挡
}
});	
}
}//e

/*************************封装禁止相机进入地下************************
 *参数:viewer(Viewer):当前视图对象
 *无返回值
 */
myCesium.disableSeeUndergroud=function(viewer=""){
let startMousePosition;
let mousePosition;
if(viewer){
viewer.clock.onTick.addEventListener(function(){
setMinCamera()
}); 
let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
handler.setInputAction(function(movement){
mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
handler.setInputAction(function(movement) {
mousePosition = movement.endPosition;
var y = mousePosition.y - startMousePosition.y;
if(y>0){
viewer.scene.screenSpaceCameraController.enableTilt = true;
}
},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);
handler.setInputAction(function(movement){
handler.setInputAction(function(movement){
	
},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
},Cesium.ScreenSpaceEventType.MIDDLE_UP);
}
function setMinCamera(){
if(viewer.camera.pitch>0){
viewer.scene.screenSpaceCameraController.enableTilt = false;
}
}//e1
}//e


/*************************封装获取当前场景相机的高度************************
 *参数:viewer(Viewer):当前视图对象
 *返回值:height(object):包含中心点信息对象
 */
myCesium.getCameraHeight=function(viewer=""){
if(viewer){
let scene = viewer.scene;
let ellipsoid=scene.globe.ellipsoid;
let height=ellipsoid.cartesianToCartographic(viewer.camera.position).height;
return height;
}
}//e


/*************************封装获取当前场景视图的中心坐标************************
 *参数:viewer(Viewer):当前视图对象
 *返回值:height(object):包含中心点信息对象
 */
myCesium.getViewCenterPt=function(viewer=""){
if(viewer){
let result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth/2,viewer.canvas.clientHeight/2));
let curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
let lon = curPosition.longitude * 180 / Math.PI;
let lat = curPosition.latitude * 180 / Math.PI;
let height=getCameraHeight();
return{
lon:lon,
lat:lat,
height:height
};
}
function getCameraHeight(){
if (viewer){
let scene = viewer.scene;
let ellipsoid = scene.globe.ellipsoid;
let height = ellipsoid.cartesianToCartographic(viewer.camera.position).height;
return height;
}
}//e1
}//e

/*************************封装获取当前场景视图的范围************************
 *参数:viewer(Viewer):当前视图对象
 *返回值:extent(object):包含地图视图范围信息对象
 */
myCesium.getCurrentViewExtent=function(viewer=""){
if(viewer){
let extent = {};// 范围对象
let scene = viewer.scene;//得到当前三维场景
let ellipsoid = scene.globe.ellipsoid;//得到当前三维场景的椭球体
let canvas = scene.canvas;
let car3_lt = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid);//canvas左上角
let car3_rb = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid);//canvas右下角
if(car3_lt&&car3_rb){ // 当canvas左上角和右下角全部在椭球体上
let carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
let carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
}
else if(!car3_lt && car3_rb){// 当canvas左上角不在但右下角在椭球体上
let car3_lt2 = null;
let yIndex = 0;
do{
//这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
yIndex <= canvas.height ? yIndex += 10 : canvas.height;
car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, yIndex), ellipsoid);
} 
while (!car3_lt2);
let carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
let carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
}
extent.height = Math.ceil(viewer.camera.positionCartographic.height);//获取相机高度
return extent;
}
}//e

/*********************************Cesium扩展函数*************************************/
//1.viewer.then()
if(Cesium&&!Cesium.Viewer.prototype.then){
Cesium.Viewer.prototype.then=function(callback=function(){}){
window.setTimeout(callback,1000);	
}
}//end