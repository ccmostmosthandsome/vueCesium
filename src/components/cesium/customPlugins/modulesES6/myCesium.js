/*
 ***********************时间:2019.5.26 wxt**********************
 *更新时间:2019.5.26
 *************************一、插件概述************************
 *该插件封装了一个myCesium对象，该对象包含着关于Cesium地图的相关方法
 *************************二、方法*************************
 *addManyPrimitiveCollection(primitiveCollection,priCollections):封装在primitiveCollection集合中添加多个primitiveCollection图层
 *createPicPtEntity(lon,lat,imgSrc,attr,entityId,lyrId,parentEntity):封装创建点图标要素entity(point,WGS84坐标)
 *createPicPtEntity_car(cartesian3,imgSrc,attr,entityId,lyrId,parentEntity):封装创建点图标要素entity(point,世界坐标)
 *createPolylineEntity(lineDatas,attr,entityId,lyrId,parentEntity):封装创建线要素entity(polyline,WGS84坐标)
 *createPolylineEntity_car(lineDatas,attr,entityId,lyrId,parentEntity):封装创建线要素entity(polyline,世界坐标)
 *createPolygonEntity(mianDatas,attr,entityId,lyrId,parentEntity):封装创建面要素entity(polygon,WGS84坐标)
 *createPolygonEntity_car(mianDatas,attr,entityId,lyrId,parentEntity):封装创建面要素entity(polygon,世界坐标)
 *cartesian3ToWGS84(cartesian3):封装空间笛卡尔坐标转WGS84坐标
 *cartesian3sToWGS84s(cartesian3Array):笛卡尔空间坐标数组转WGS84坐标数组(常用坐标格式)
 *disableSeeUndergroud(viewer):封装禁止相机进入地下
 *findPrimitiveCollection(viewer,PrimitiveCollectionId):封装通过id查找PrimitiveCollection图层
 *getCurrentViewExtent(viewer):封装获取当前场景视图的范围
 *getViewCenterPt(viewer):封装获取当前场景视图的中心坐标
 *getCameraHeight(viewer):封装获取当前场景相机的高度
 *getMapLevelByHeight(cameraHeight):封装根据相机的高度获取地图的级别
 *getPolygonGraphicsCenter(polygonGraphic):封装获取面图形PolygonGraphics的中心世界坐标点
 *hoverTipInfo(screen_x,screen_y,tipContent,offset_x,offset_y):封装鼠标悬空要素提示信息功能
 *WGS84ToWercator(wgsLon,wgsLat,elevation):封装WGS84坐标Wercator投影坐标(arcgis坐标转换的结果一样)
 *setMountainCover(viewer):封装设置山体是否遮挡要素
 *sampleTerrainDataByPtsfunction(lonlats,terrainProvider,callback):封装根据指定的坐标点采样地形高程数据获取高程
 *setLayerFeatVisible(viewer,layerId,visibleStatus):封装图层几何要素显隐控制器
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

import Cesium from 'cesium/Cesium';//导入cesium对象
var myCesium={};
//window.myCesium=myCesium;




/********************封装获取面图形PolygonGraphics的中心世界坐标点*****************
 *参数:polygonGraphic(PolygonGraphic):几何面图形
 *返回值:cartesian3Center(cartesian3):中心点坐标(世界坐标)，例如:{x:"",y:"",z:""}
 *注解:使用该方法必须先引入Cesium.js和turf.min.js文件，否则使用不了
 */
myCesium.getPolygonGraphicsCenter=function(polygonGraphic){
let cartesian3Center="";
let turf=window.turf || "";	
if(polygonGraphic&&turf){
let geoCoords=polygonGraphic.hierarchy.getValue().positions;//世界坐标数组
let wgs84Coords=cartesian3sToWGS84s(geoCoords);
let polygon = turf.polygon([wgs84Coords]);
let centroid=turf.centroid(polygon);
let centerCoord=turf.getCoord(centroid);
if(centerCoord&&centerCoord.length>0){
cartesian3Center=Cesium.Cartesian3.fromDegrees(centerCoord[0],centerCoord[1]); 
}
}
else{
console.log("请检查turf.min.js文件是否被引入！");
}
return cartesian3Center;
function cartesian3sToWGS84s(cartesian3Array){
let lonLatArray=[];
if(cartesian3Array&&cartesian3Array.length>0){
for(let i=0;i<cartesian3Array.length;i++){
let cartesian3=cartesian3Array[i];
let WGS84=cartesian3ToWGS84(cartesian3);
let lon=WGS84.longitude;
let lat=WGS84.latitude;
lonLatArray.push([lon,lat]);
}
}
return lonLatArray;
}//e2
function cartesian3ToWGS84(cartesian3){
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
}//e1
}//e

/**************************笛卡尔空间坐标数组转WGS84坐标数组(常用坐标格式)************************
 *参数:cartesian3Array(Array):需要转换的世界坐标数组,例如:[{x:"",y:"",z:""},{x:"",y:"",z:""}]
 *返回值:lonLatArray(array):常用格式WGS84坐标数组，例如:[[lon,lat],[lon,lat]]
 */
myCesium.cartesian3sToWGS84s=function(cartesian3Array){
let lonLatArray=[];
if(cartesian3Array&&cartesian3Array.length>0){
for(let i=0;i<cartesian3Array.length;i++){
let cartesian3=cartesian3Array[i];
let WGS84=cartesian3ToWGS84(cartesian3);
let lon=WGS84.longitude;
let lat=WGS84.latitude;
lonLatArray.push([lon,lat]);
}
}
return lonLatArray;
function cartesian3ToWGS84(cartesian3){
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
}//e1
}//e


/***************************封装创建面要素entity(polygon，WGS84坐标)***********************
 *参数:mianDatas(array):坐标数组，例如:[[lon,lat],[lon,lat]]    
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *返回值:lineEntity(Entity):线实体对象
 */
myCesium.createPolygonEntity=function(mianDatas,attr={},entityId="",lyrId=null,parentEntity=null){
let mianEntity="";
if(mianDatas&&mianDatas.length>0&&entityId){
let ringPath=transToCartesian3Coords(mianDatas);
mianEntity=new Cesium.Entity({
id:entityId,
title:"面实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线图形
positions:[].concat(ringPath),//边界线
width:2,
clampToGround:true,//是否贴地线
material:Cesium.Color.fromCssColorString("#FF0000").withAlpha(0.9),
}),
polygon:new Cesium.PolygonGraphics({//面图形,默认贴地
hierarchy:ringPath,//面层级数据
material:Cesium.Color.fromCssColorString("#0000FF").withAlpha(0.1),//面颜色
})
});
}
else if(mianDatas&&mianDatas.length>0){
let ringPath=transToCartesian3Coords(mianDatas);
mianEntity=new Cesium.Entity({
title:"面实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线图形
positions:[].concat(ringPath),//边界线
width:2,
clampToGround:true,//是否贴地线
material:Cesium.Color.fromCssColorString("#FF0000").withAlpha(0.9),
}),
polygon:new Cesium.PolygonGraphics({//面图形,默认贴地
hierarchy:ringPath,//面层级数据
material:Cesium.Color.fromCssColorString("#0000FF").withAlpha(0.1),//面颜色
})
});
}
return mianEntity;
function transToCartesian3Coords(coordDatas){
let Cartesian3Coords=[];//cesium常用格式数组
if(coordDatas&&coordDatas.length>0){
let cesiumCoords=transformToCesiumCoords(coordDatas);//cesium格式的经纬度坐标
Cartesian3Coords=Cesium.Cartesian3.fromDegreesArray(cesiumCoords);//转为为Cartesian3数组
}
return Cartesian3Coords;
}//e2
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


/***************************封装创建面要素entity(polygon,世界坐标)***********************
 *参数:mianDatas(array):笛卡尔空间直角坐标数组，例如:[{x:"",y:"",z:""},{x:"",y:"",z:""}]    
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *返回值:lineEntity(Entity):线实体对象
 */
myCesium.createPolygonEntity_car=function(mianDatas,attr={},entityId="",lyrId=null,parentEntity=null){
let mianEntity="";
if(mianDatas&&mianDatas.length>0&&entityId){
let firstCoord=mianDatas[0];
let lastCoord=mianDatas[mianDatas.length-1];
if(firstCoord.x!=lastCoord.x || firstCoord.y!=lastCoord.y || firstCoord.z!=lastCoord.z){
mianDatas.push(firstCoord);	
}
mianEntity=new Cesium.Entity({
id:entityId,
title:"面实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线图形
positions:[].concat(mianDatas),//边界线
width:2,
clampToGround:true,//是否贴地线
material:Cesium.Color.fromCssColorString("#FF0000").withAlpha(0.9),
}),
polygon:new Cesium.PolygonGraphics({//面图形,默认贴地
hierarchy:mianDatas,//面层级数据
material:Cesium.Color.fromCssColorString("#0000FF").withAlpha(0.1),//面颜色
})
});
}
else if(mianDatas&&mianDatas.length>0){
let firstCoord=mianDatas[0];
let lastCoord=mianDatas[mianDatas.length-1];
if(firstCoord.x!=lastCoord.x || firstCoord.y!=lastCoord.y || firstCoord.z!=lastCoord.z){
mianDatas.push(firstCoord);	
}
mianEntity=new Cesium.Entity({
title:"面实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
properties:attr,//实体属性
show:true,
polyline:new Cesium.PolylineGraphics({//线图形
positions:[].concat(mianDatas),//边界线
width:2,
clampToGround:true,//是否贴地线
material:Cesium.Color.fromCssColorString("#FF0000").withAlpha(0.9),
}),
polygon:new Cesium.PolygonGraphics({//面图形,默认贴地
hierarchy:mianDatas,//面层级数据
material:Cesium.Color.fromCssColorString("#0000FF").withAlpha(0.1),//面颜色
})
});
}
return mianEntity;
}//e

/***************************封装创建线要素entity(polyline)***********************
 *参数:lineDatas(array):坐标数组，例如:[[lon,lat],[lon,lat]]    
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *返回值:lineEntity(Entity):线实体对象
 */
myCesium.createPolylineEntity=function(lineDatas,attr={},entityId="",lyrId=null,parentEntity=null){
let lineEntity="";
if(lineDatas&&lineDatas.length>0&&entityId){
let linePath=transToCartesian3Coords(lineDatas);
lineEntity=new Cesium.Entity({
id:entityId,
title:"线实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
properties:attr,//实体属性
show:true,
polyline:{//线几何
positions:linePath,//线的坐标点
width:3,//线的宽度
material:Cesium.Color.fromCssColorString("#00f").withAlpha(0.9),//线的符号
clampToGround:true,//是否为贴地线
}
});
}
else if(lineDatas&&lineDatas.length>0){
let linePath=transToCartesian3Coords(lineDatas);
lineEntity=new Cesium.Entity({
title:"线实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
properties:attr,//实体属性
show:true,
polyline:{//线几何
positions:linePath,//线的坐标点
width:3,//线的宽度
material:Cesium.Color.fromCssColorString("#00f").withAlpha(0.9),//线的符号
clampToGround:true,//是否为贴地线
}
});	
}
return lineEntity;
function transToCartesian3Coords(coordDatas){
let Cartesian3Coords=[];//cesium常用格式数组
if(coordDatas&&coordDatas.length>0){
let cesiumCoords=transformToCesiumCoords(coordDatas);//cesium格式的经纬度坐标
Cartesian3Coords=Cesium.Cartesian3.fromDegreesArray(cesiumCoords);//转为为Cartesian3数组
}
return Cartesian3Coords;
}//e2
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



/***************************封装创建线要素entity(polyline,世界坐标)***********************
 *参数:lineDatas(array):世界坐标数组，例如:[{x:"",y:"",z:""},{x:"",y:"",z:""}]    
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *返回值:lineEntity(Entity):线实体对象
 */
myCesium.createPolylineEntity_car=function(lineDatas,attr={},entityId="",lyrId=null,parentEntity=null){
let lineEntity="";
if(lineDatas&&lineDatas.length>0&&entityId){
lineEntity=new Cesium.Entity({
id:entityId,
title:"线实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
properties:attr,//实体属性
show:true,
polyline:{//线几何
positions:lineDatas,//线的坐标点
width:3,//线的宽度
material:Cesium.Color.fromCssColorString("#00f").withAlpha(0.9),//线的符号
clampToGround:true,//是否为贴地线
}
});
}
else if(lineDatas&&lineDatas.length>0){
lineEntity=new Cesium.Entity({
title:"线实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
properties:attr,//实体属性
show:true,
polyline:{//线几何
positions:lineDatas,//线的坐标点
width:3,//线的宽度
material:Cesium.Color.fromCssColorString("#00f").withAlpha(0.9),//线的符号
clampToGround:true,//是否为贴地线
}
});	
}
return lineEntity;
}//e

/***************************封装创建点图标要素entity(point)***********************
 *参数:lon(number):经度    
 *****lat(number):纬度
 *****imgSrc(string):图标路径
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *返回值:ptEntity(Entity):点图标实体对象
 */
myCesium.createPicPtEntity=function(lon,lat,imgSrc,attr={},entityId="",lyrId=null,parentEntity=null){
let ptEntity="";
if(lon&&lat&&imgSrc&&entityId){
ptEntity=new Cesium.Entity({
id:entityId,
title:"点图标实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
position:Cesium.Cartesian3.fromDegrees(lon,lat),//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
billboard:{//图标符号
image:imgSrc,//图标路径
scale:1.0,//图标比例
//width:25,//图标宽度
//height:28,//图标高度
//eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0,0,-150)),//默认为0，相机可视高度，偏移-500，当前相机高度减去100
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,//贴地
}
});
}
else if(lon&&lat&&imgSrc){
ptEntity=new Cesium.Entity({
title:"点图标实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
position:Cesium.Cartesian3.fromDegrees(lon,lat),//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
billboard:{//图标符号
image:imgSrc,//图标路径
scale:1.0,//图标比例
//width:25,//图标宽度
//height:28,//图标高度
//eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0,0,-150)),//默认为0，相机可视高度，偏移-500，当前相机高度减去100
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,//贴地
}
});	
}
return ptEntity;
}//e


/***************************封装创建点图标要素entity(point,世界坐标)***********************
 *参数:cartesian3(object):世界坐标，例如:{x:"",y:"",z:""}
 *****imgSrc(string):图标路径
 *****[attr(object)]:该实体属性
 *****[entityId(string)]:entity实体id值
 *****[lyrId(string)]:该实体所属图层id
 *****[parentEntity(Entity)]:该实体关联的父实体实例
 *返回值:ptEntity(Entity):点图标实体对象
 */
myCesium.createPicPtEntity_car=function(cartesian3,imgSrc,attr={},entityId="",lyrId=null,parentEntity=null){
let ptEntity="";
if(cartesian3&&imgSrc&&entityId){
ptEntity=new Cesium.Entity({
id:entityId,
title:"点图标实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
position:cartesian3,//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
billboard:{//图标符号
image:imgSrc,//图标路径
scale:1.0,//图标比例
//width:25,//图标宽度
//height:28,//图标高度
//eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0,0,-150)),//默认为0，相机可视高度，偏移-500，当前相机高度减去100
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,//贴地
}
});
}
else if(cartesian3&&imgSrc){
ptEntity=new Cesium.Entity({
title:"点图标实体要素",
layerId:lyrId,
parent:parentEntity,//父实体
position:cartesian3,//实体位置，坐标类型是cartesian3坐标系
show:true,
properties:attr,
billboard:{//图标符号
image:imgSrc,//图标路径
scale:1.0,//图标比例
//width:25,//图标宽度
//height:28,//图标高度
//eyeOffset: new Cesium.ConstantProperty(new Cesium.Cartesian3(0,0,-150)),//默认为0，相机可视高度，偏移-500，当前相机高度减去100
//scaleByDistance: new Cesium.NearFarScalar(1000,1.0,100000,0.0),//通过相机远近控制显示的比例大小
scaleByDistance: new Cesium.NearFarScalar(1.5e2,1.0, 8.0e6,0.0),
heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,//贴地
}
});	
}
return ptEntity;
}//e


/***************************封装鼠标悬空要素提示信息功能***********************
 *参数:screen_x(number):屏幕坐标x     
 *****screen_y(number):屏幕坐标y         屏幕坐标的原点为屏幕的坐上角   
 *****tipContent(string):设置提示的内容  
 *****offset_x(number):鼠标所在的屏幕与表与提示框显示位置坐标的x差值   
 *****offset_y(number):鼠标所在的屏幕与表与提示框显示位置坐标的y差值   
 *无返回值
 */
myCesium.hoverTipInfo=function(screen_x,screen_y,tipContent,offset_x=0,offset_y=0){
if(screen_x&&screen_y&&tipContent){
var tipdivNode=document.getElementById("tipDiv");
if(!tipdivNode){
tipdivNode=document.createElement("div");
tipdivNode.id="tipDiv";
tipdivNode.style="position:absolute;" 
+"z-index:9999;font-size:14px;color: #003EF5;border: 1px solid #87E3F1;padding: 1px 8px;"
+"background-color: rgb(255, 255, 255);box-shadow: 0px 0px 10px 0PX rgba(17, 186, 236, 0.78);" 
+"border-radius:8px;padding-top:5px;padding-bottom:5px;";
window.document.body.appendChild(tipdivNode);	
}
tipdivNode.innerHTML=tipContent;
tipdivNode.style.display="block";
tipdivNode.style.left=screen_x+offset_x+"px";
tipdivNode.style.top=screen_y+offset_y+"px";
}
}//e


/**************************封装图层几何要素显隐控制器************************
 *参数:viewer(Viewer):Viewer实例
 *****layerId(String):需要控制的图层id,即entity要素实体关联的图层id
 *****visibleStatus(boolean):设置图层实体要素显示的状态
 *返回值:lyrEntities(array):该图层关联的所有同类型的实体要素
 *注解:如果想使用该方法Entity实体要素中必须要有“layerId”属性，否则使用不了，例如new Entity({layerId:""})
 */
function setLayerFeatVisible(viewer="",layerId="",visibleStatus=true){
let lyrEntities=[];//该图层关联的所有同类型的实体要素
if(viewer&&layerId){
let entityCollection=viewer.entities.values;//获取地图上所有的entity实体
for(let i=0;i<entityCollection.length;i++){
let entity=entityCollection[i];//获取实体要素
let entityLyrId=entity.layerId || "";//实体所关联的图层id
if(entityLyrId==layerId){
entity.show=visibleStatus;
lyrEntities.push(entity);
}
}
}
return lyrEntities;
}//e


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
*参数:viewer(Viewer):Viewer实例
*****PrimitiveCollectionId(number):PrimitiveCollection集合id
*返回值:primitiveCollection(PrimitiveCollection):查找的PrimitiveCollection集合
*/
myCesium.findPrimitiveCollection=function(viewer="",PrimitiveCollectionId=""){
let primitiveCollection="";
if(viewer&&PrimitiveCollectionId){
let Len=viewer.scene.primitives._primitives.length;//图层数
let lyrCollection=viewer.scene.primitives._primitives;
for(let i=0;i<Len;i++){
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
if(wgsLon&&wgsLat&&elevation){
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
//yIndex <= canvas.height ? yIndex += 10 : canvas.height;
yIndex = canvas.height ? yIndex += 10 : canvas.height;
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
if(Cesium){
Cesium.Ion.defaultAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NjRjNGFjNy1jNDM3LTQzMTktODVlYS05YmFmOTAxYjk5MWUiLCJpZCI6Mzk5MSwic2NvcGVzIjpbImFzbCIsImFzciIsImFzdyIsImdjIl0sImlhdCI6MTUzOTU3OTE2NX0.-25udUzENRJ66mnICMK8Hfc6xgF_VP7P4sWkSHaUjOQ";	
}
else{
console.error("未引入cesium.js文件！");
}
export default myCesium;//暴露出去