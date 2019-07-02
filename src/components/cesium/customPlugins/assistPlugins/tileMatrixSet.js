/**************************************geoserver Tile Matrix Set(即格网集)2019.5.9****************************************
 *1.gridset_EPSG4326(object):geoServer默认EPSG4326数据格网对象,包含matrixIds、resolutions、scale属性
 *2.gridset_Google4326(object):google数据格网对象,包含matrixIds、resolutions、scale属性   
 *3.gridset_EPSG900913(object):geoServer默认EPSG900913数据格网对象,包含matrixIds、resolutions、scale属性
 */

/*************************************1.EPSG:4326*************************************/
var EPSG4326={};
window.gridset_EPSG4326=EPSG4326;
//矩阵id集合(gridset名+id)
EPSG4326.matrixIds=["EPSG:4326:0","EPSG:4326:1","EPSG:4326:2","EPSG:4326:3","EPSG:4326:4",
                  "EPSG:4326:5","EPSG:4326:6","EPSG:4326:7","EPSG:4326:8","EPSG:4326:9",
                  "EPSG:4326:10","EPSG:4326:11","EPSG:4326:12","EPSG:4326:13","EPSG:4326:14",
                  "EPSG:4326:15","EPSG:4326:16","EPSG:4326:17","EPSG:4326:18","EPSG:4326:19",
                  "EPSG:4326:20","EPSG:4326:21"
                  ];
//地图分辨率(resolution),geoserver默认EPSG:4326的切片分辨率级别
EPSG4326.resolutions=[
                        0.703125,//0
                        0.3515625,//1
                        0.17578125,//2
                        0.087890625,//3
                        0.0439453125,//4
                        0.02197265625,//5
                        0.010986328125,//6
                        0.0054931640625,//7
                        0.00274658203125,//8
                        0.001373291015625,//9
                        0.0006866455078125,//10
                        0.0003433227539062,//11
                        0.0001716613769531,//12
                        0.0000858306884766,//13
                        0.0000429153442383,//14
                        0.0000214576721191,//15
                        0.0000107288360596,//16
                        0.0000053644180298,//17
                        0.0000026822090149,//18
                        0.0000013411045074,//19
                        0.0000006705522537,//20
                        0.0000003352761269//21
                    ];
//地图比例尺(scale)
EPSG4326.scale=[
                   279541132.0143589,//0
                   139770566.00717944,//1
                   69885283.00358972,//2
                   34942641.50179486,//3
                   17471320.75089743,//4
                   8735660.375448715,//5
                   4367830.1877243575,//6
                   2183915.0938621787,//7
                   1091957.5469310894,//8
                   545978.7734655447,//9
                   272989.38673277234,//10
                   136494.69336638617,//11
                   68247.34668319309,//12
                   34123.67334159654,//13
                   17061.83667079827,//14
                   8530.918335399136,//15
                   4265.459167699568,//16
                   2132.729583849784,//17
                   1066.364791924892,//18
                   533.182395962446,//19
                   266.591197981223,//20
                   133.2955989906115//21
               ];
/*************************************2.GoogleCRS84Quad*************************************/
var Google4326={};
window.gridset_Google4326=Google4326;
//矩阵id集合(id)
Google4326.matrixIds=["GoogleCRS84Quad:0","GoogleCRS84Quad:1","GoogleCRS84Quad:2","GoogleCRS84Quad:3",
                      "GoogleCRS84Quad:4","GoogleCRS84Quad:5","GoogleCRS84Quad:6","GoogleCRS84Quad:7",
                      "GoogleCRS84Quad:8","GoogleCRS84Quad:9","GoogleCRS84Quad:10","GoogleCRS84Quad:11",
                      "GoogleCRS84Quad:12","GoogleCRS84Quad:13","GoogleCRS84Quad:14","GoogleCRS84Quad:15",
                      "GoogleCRS84Quad:16","GoogleCRS84Quad:17","GoogleCRS84Quad:18"
                      ];
//地图分辨率(resolution),Google的切片分辨率级别
Google4326.resolutions=[
                       	1.4062499999999998,//0
                       	0.7031249999999999,//1
                       	0.3515624999999999,//2
                       	0.17578125,//3
                       	0.087890625,//4
                       	0.0439453125,//5
                       	0.02197265625,//6
                       	0.010986328125,//7
                       	0.0054931640625,//8
                       	0.00274658203125,//9
                       	0.001373291015625,//10
                       	0.0006866455078125,//11
                       	0.0003433227539062,//12
                       	0.0001716613769531,//13
                       	0.0000858306884766,//14
                       	0.0000429153442383,//15
                       	0.0000214576721191,//16
                       	0.0000107288360596,//17
                       	0.0000053644180298,//18
                      ];
//地图比例尺(scale)
Google4326.scale=[
            	   559082264.0287178,//0
            	   279541132.0143589,//1
            	   139770566.0071794,//2
            	   69885283.00358972,//3
            	   34942641.50179486,//4
            	   17471320.75089743,//5
            	   8735660.375448715,//6
            	   4367830.187724357,//7
            	   2183915.093862179,//8
            	   1091957.546931089,//9
            	   545978.7734655447,//10
            	   272989.3867327723,//11
            	   136494.6933663862,//12
            	   68247.34668319309,//13
            	   34123.67334159654,//14
            	   17061.83667079827,//15
            	   8530.918335399136,//16
            	   4265.459167699568,//17
            	   2132.729583849784,//18
             ];
/*************************************2.EPSG:900913(geoServer默认)*************************************/
var EPSG900913={};
window.gridset_EPSG900913=EPSG900913;
//矩阵id集合(id)
EPSG900913.matrixIds=["EPSG:900913:0","EPSG:900913:1","EPSG:900913:2","EPSG:900913:3",
                      "EPSG:900913:4","EPSG:900913:5","EPSG:900913:6","EPSG:900913:7",
                      "EPSG:900913:8","EPSG:900913:9","EPSG:900913:10","EPSG:900913:11",
                      "EPSG:900913:12","EPSG:900913:13","EPSG:900913:14","EPSG:900913:15",
                      "EPSG:900913:16","EPSG:900913:17","EPSG:900913:18","EPSG:900913:19",
                      "EPSG:900913:20","EPSG:900913:21","EPSG:900913:22","EPSG:900913:23",
                      "EPSG:900913:24","EPSG:900913:25","EPSG:900913:26","EPSG:900913:27","EPSG:900913:28",
                      "EPSG:900913:29","EPSG:900913:30"
                      ];
//地图分辨率(resolution),Google的切片分辨率级别
EPSG900913.resolutions=[
                       	156543.03390625,//0
                       	78271.516953125,//1
                       	39135.7584765625,//2
                       	19567.87923828125,//3
                       	9783.939619140625,//4
                       	4891.9698095703125,//5
                       	2445.9849047851562,//6
                       	1222.9924523925781,//7
                       	611.4962261962891,//8
                       	305.74811309814453,//9
                       	152.87405654907226,//10
                       	76.43702827453613,//11
                       	38.218514137268066,//12
                       	19.109257068634033,//13
                       	9.554628534317017,//14
                       	4.777314267158508,//15
                       	2.388657133579254,//16
                       	1.194328566789627,//17
                       	0.5971642833948135,//18
                       	0.2985821416974068,//19
                       	0.1492910708487034,//20
                       	0.0746455354243517,//21
                       	0.0373227677121758,//22
                       	0.0186613838560879,//23
                       	0.009330691928044,//24
                       	0.004665345964022,//25
                       	0.002332672982011,//26
                       	0.0011663364910055,//27
                       	0.0005831682455027,//28
                       	0.0002915841227514,//29
                       	0.0001457920613757,//30
                      ];
//地图比例尺(scale)
EPSG900913.scale=[
            	   559082263.9508929,//0
            	   279541131.97544646,//1
            	   139770565.98772323,//2
            	   69885282.99386162,//3
            	   34942641.49693081,//4
            	   17471320.748465404,//5
            	   8735660.374232702,//6
            	   4367830.187116351,//7
            	   2183915.0935581755,//8
            	   1091957.5467790877,//9
            	   545978.7733895439,//10
            	   272989.38669477194,//11
            	   136494.69334738597,//12
            	   68247.34667369298,//13
            	   34123.67333684649,//14
            	   17061.836668423246,//15
            	   8530.918334211623,//16
            	   4265.4591671058115,//17
            	   2132.7295835529058,//18
            	   1066.3647917764529,//19
            	   533.1823958882264,//20
            	   266.5911979441132,//21
            	   133.2955989720566,//22
            	   66.6477994860283,//23
            	   33.32389974301415,//24
            	   16.661949871507076,//25
            	   8.330974935753538,//26
            	   4.165487467876769,//27
            	   2.0827437339383845,//28
            	   1.0413718669691923,//29
            	   0.5206859334845961,//30
             ];