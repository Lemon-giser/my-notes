# ArcGIS JS API 4 学习总结

# 一、基础地图功能

## 1. 地图、三维地图 MapView  SceneView 

+ esri/Map 地图 
+ esri/views/MapView 二维地图
+ esri/views/SceneView 三维地图

```javascript
require(["esri/config", "esri/Map", "esri/views/MapView"], function (esriConfig, Map, MapView) {
    esriConfig.apiKey = "AAPK5c8f521b99804aab928daf48d64b48b1o0SLNtFEmxKTxYxxIOCfpiY3j0YPnUDB9jDBSF-O6osKl8JOnf94699Hna8bkbrT";

    const map = new Map({
      basemap: "arcgis-topographic" // Basemap layer service
    });
    const view = new MapView({
      map: map,
      center: [-118.805, 34.027], // Longitude, latitude
      zoom: 13, // Zoom level
      container: "viewDiv" // Div element
    });
  });
```

```javascript
    const view = new SceneView({
      container: "viewDiv",
      map: map,
      camera: {
        position: {
          x: -118.808, //Longitude
          y: 33.961, //Latitude
          z: 2000 //Meters
        },
        tilt: 75
      }
    });
```

## 2. 切换底图组件 BasemapToggle BasemapGallery

+ esri/widgets/BasemapToggle
+ esri/widgets/BasemapGallery

```js
    const basemapToggle = new BasemapToggle({
      view: view,
      nextBasemap: "arcgis-imagery"
    });
    view.ui.add(basemapToggle,"bottom-right");
    const basemapGallery = new BasemapGallery({
      view: view,
      source: {
        query: {
          title: '"World Basemaps for Developers" AND owner:esri'
        }
      }
    });
    view.ui.add(basemapGallery, "top-right"); // Add to the view
```

## 3. 添加要素服务 FeatureLayer

+ esri/layers/FeatureLayer

```js
    const trailheadsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
    });
    map.add(trailheadsLayer)
```

## 4. 添加图形和弹窗 GraphicsLayer popupTemplate

+ esri/Graphic
+ esri/layers/GraphicsLayer

```js
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);
```

​		添加点

```js
    // 点
    const point = { //Create a point
      type: "point",
      longitude: -118.80657463861,
      latitude: 34.0005930608889
    };
    const simpleMarkerSymbol = {
      type: "simple-marker",
      color: [226, 119, 40],  // Orange
      outline: {
        color: [255, 255, 255], // White
        width: 1
      }
    };
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol
    })
    graphicsLayer.add(pointGraphic)

```

添加线

```js
    // 线
    const polyline = {
      type: "polyline",
      paths: [
        [-118.821527826096, 34.0139576938577], //Longitude, latitude
        [-118.814893761649, 34.0080602407843], //Longitude, latitude
        [-118.808878330345, 34.0016642996246]  //Longitude, latitude
      ]
    };
    const simpleLineSymbol = {
      type: "simple-line",
      color: [226, 119, 40], // Orange
      width: 2
    };
    const polylineGraphic = new Graphic({
      geometry: polyline,
      symbol: simpleLineSymbol
    });
    graphicsLayer.add(polylineGraphic);

```

添加面

```js
    // 面
    const polygon = {
      type: "polygon",
      rings: [
        [-118.818984489994, 34.0137559967283], //Longitude, latitude
        [-118.806796597377, 34.0215816298725], //Longitude, latitude
        [-118.791432890735, 34.0163883241613], //Longitude, latitude
        [-118.79596686535, 34.008564864635],   //Longitude, latitude
        [-118.808558110679, 34.0035027131376]  //Longitude, latitude
      ]
    };

    const simpleFillSymbol = {
      type: "simple-fill",
      color: [227, 139, 79, 0.8],  // Orange, opacity 80%
      outline: {
        color: [255, 255, 255],
        width: 1
      }
    };

    // 添加弹窗
    const popupTemplate = {
      title: "{Name}",
      content: "{Description}"
    }
    const attributes = {
      Name: "Graphic",
      Description: "I am a polygon"
    }
    const polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
      // 弹窗属性
      attributes: attributes,
      popupTemplate: popupTemplate
    });
    graphicsLayer.add(polygonGraphic);

```

## 5. 矢量瓦片图层 VectorTileLayer

+ esri/layers/VectorTileLayer

```js
    const vtlLayer = new VectorTileLayer({
      url: "https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer/"
    });
    const map = new Map({
      basemap: "arcgis-light-gray", // Basemap layer service
      layers: [vtlLayer]
    });
```

## 6. 自定义底图（protal）VectorTileLayer TileLayer

+ esri/layers/TileLayer

```js

    const vectorTileLayer = new VectorTileLayer({
      portalItem: {
        id: "6976148c11bd497d8624206f9ee03e30" // Forest and Parks Canvas
      },
      opacity: .75
    });

    const imageTileLayer = new TileLayer({
      portalItem: {
        id: "1b243539f4514b6ba35e7d995890db1d" // World Hillshade
      }
    });

    const basemap = new Basemap({
      baseLayers: [
        imageTileLayer,
        vectorTileLayer
      ]
    });
```

## 7.  弹窗、图表 layer/popupTemplate

+ popupTemplate 模板对象 title、content
+ outFields 字段

```js
    // 添加弹窗
    // Define a pop-up for Trailheads
    const popupTrailheads = {
      "title": "Trailhead",
      "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
    }
    const trailheads = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
      outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
      popupTemplate: popupTrailheads
    });

    map.add(trailheads);
```

```js
    // 添加图表
    // Define a popup for Trails
    const popupTrails = {
      title: "Trail Information",
      content: [{
        type: "media",
        mediaInfos: [{
          type: "column-chart",
          caption: "",
          value: {
            fields: [ "ELEV_MIN","ELEV_MAX" ],
            normalizeField: null,
            tooltipField: "Min and max elevation values"
          }
        }]
      }]
    }

    const trails = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
      outFields: ["TRL_NAME","ELEV_GAIN"],
      popupTemplate: popupTrails
    });

    map.add(trails,0);
```



## 8. 添加webmap（protal）、图例、比例尺 

+ esri/WebMap
+ esri/widgets/ScaleBar
+ esri/widgets/Legend

```js
    const webmap = new WebMap({
      portalItem: {
        id: "41281c51f9de45edaf1c8ed44bb10e30"
      }
    });
    const view = new MapView({
      // map: map,
      // center: [-118.805, 34.027], // Longitude, latitude
      // zoom: 13, // Zoom level
      container: "viewDiv", // Div element
      map: webmap
    });
    const scalebar = new ScaleBar({
      view: view
    });

    view.ui.add(scalebar, "bottom-left");
    const legend = new Legend ({
      view: view
    });
    view.ui.add(legend, "top-right");
```

# 二、数据查询、编辑

## 1. 按属性查询 FeatureLayer： queryFeatures

+ parcelLayer.queryFeatures(parcelQuery).then()

+ ```js
    const parcelQuery = {
      where: whereClause,  // 查询语句 UseType = 'Residential'
      spatialRelationship: "intersects", // Relationship operation to apply
      geometry: extent, // view.extent
      outFields: ["APN","UseType","TaxRateCity","Roll_LandValue"], // Attributes to return
      returnGeometry: true
    };
  ```

+ view.graphics.addMany(results.features);

```js
	// SQL query array
    const parcelLayerSQL = ["Choose a SQL where clause...",
      "UseType = 'Residential'",
      "UseType = 'Government'",
      "UseType = 'Irrigated Farm'",
      "TaxRateArea = 10853",
      "TaxRateArea = 10860",
      "TaxRateArea = 08637",
      "Roll_LandValue > 1000000",
      "Roll_LandValue < 1000000"];
    let whereClause = parcelLayerSQL[0];

    /*
    * 选择区域
    * */
    // Add SQL UI
    const select = document.createElement("select","");
    select.setAttribute("class", "esri-widget esri-select");
    select.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em");
    parcelLayerSQL.forEach(function(query){
      let option = document.createElement("option");
      option.innerHTML = query;
      option.value = query;
      select.appendChild(option);
    });
    view.ui.add(select, "top-right");
    view.ui.add(select, "top-right");

    // Listen for changes
    select.addEventListener('change', (event) => {
      whereClause = event.target.value;
      queryFeatureLayer(view.extent);

    });
	// Get query layer and set up query
    const parcelLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
    });

    // 根据当前范围查询要素
    function queryFeatureLayer(extent) {
      const parcelQuery = {
        where: whereClause,  // Set by select element
        spatialRelationship: "intersects", // Relationship operation to apply
        geometry: extent, // Restricted to visible extent of the map
        outFields: ["APN","UseType","TaxRateCity","Roll_LandValue"], // Attributes to return
        returnGeometry: true
      };
      parcelLayer.queryFeatures(parcelQuery)
          .then((results) => {
            console.log("Feature count: " + results.features.length)
            displayResults(results);
          }).catch((error) => {
        console.log(error.error);
      });
    }
    // 展示查询结果，并添加弹窗
    function displayResults(results) {
      // Create a blue polygon
      const symbol = {
        type: "simple-fill",
        color: [ 20, 130, 200, 0.5 ],
        outline: {
          color: "white",
          width: .5
        },
      };

      const popupTemplate = {
        title: "Parcel {APN}",
        content: "Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}"
      };
      // Assign styles and popup to features
      results.features.map((feature) => {
        feature.symbol = symbol;
        feature.popupTemplate = popupTemplate;
        return feature;
      });

      // Clear display
      view.popup.close();
      view.graphics.removeAll();
      // Add features to graphics layer
      view.graphics.addMany(results.features);

    }
```

## 2. 空间查询 FeatureLayer：queryFeatures

+ esri/widgets/Sketch 绘制组件

+ esri/layers/GraphicsLayer

+ parcelLayer.queryFeatures(parcelQuery).then()

+ ```js
  const parcelQuery = {
          spatialRelationship: "intersects", // Relationship operation to apply
          geometry: geometry,  // The sketch feature geometry
          outFields: ["APN","UseType","TaxRateCity","Roll_LandValue"], // Attributes to return
          returnGeometry: true
        };
  ```

```js

    // Add sketch widget
    const graphicsLayerSketch = new GraphicsLayer();
    map.add(graphicsLayerSketch);

    /*
    * 添加绘制控件
    * */
    const sketch = new Sketch({
      layer: graphicsLayerSketch,
      view: view,
      creationMode: "update" // Auto-select
    });

    view.ui.add(sketch, "top-right");
    // 监听
    // Add sketch events to listen for and execute query
    sketch.on("update", (event) => {
      console.log('点击工具条', event)
      // Create
      if (event.state === "start") {
        /*
        * 手动绘制完毕触发
        * */
        queryFeaturelayer(event.graphics[0].geometry);
      }
      if (event.state === "complete"){
        /*
        * 查询结束后，点击清楚，移除绘制的图形
        * */
        graphicsLayerSketch.remove(event.graphics[0]); // Clear the graphic when a user clicks off of it or sketches new one
      }
      // Change
      if (event.toolEventInfo && (event.toolEventInfo.type === "scale-stop" || event.toolEventInfo.type === "reshape-stop" || event.toolEventInfo.type === "move-stop")) {
        queryFeaturelayer(event.graphics[0].geometry);
      }
    });

    // Reference query layer
    const parcelLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
    });

    function queryFeaturelayer(geometry) {

      const parcelQuery = {
        spatialRelationship: "intersects", // Relationship operation to apply
        geometry: geometry,  // The sketch feature geometry
        outFields: ["APN","UseType","TaxRateCity","Roll_LandValue"], // Attributes to return
        returnGeometry: true
      };

      parcelLayer.queryFeatures(parcelQuery)
          .then((results) => {

            console.log("Feature count: " + results.features.length)
            displayResults(results);

          }).catch((error) => {
        console.log(error);
      });

    }

```

## 3. 过滤显示的要素 FeatureLayer：definitionExpression

+ featureLayer.definitionExpression = expression;

```js
    // 添加要素服务
    // Add a feature layer to map with all features visible on client (no filter)
    const featureLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
      outFields: ["*"],
      popupTemplate: {
        title: "{UseType}",
        content: "Description: {UseDescription}. Land value: {Roll_LandValue}"
      },
      // 筛选表达式
      definitionExpression: "1=0"
    });
    map.add(featureLayer);

```

```js
 const sqlExpressions = 
       ['Choose a SQL where clause...',
        'Roll_LandValue < 200000',
        'TaxRateArea = 10853',
        'Bedrooms5 > 0',
        'UseType = \'Residential\'',
        'Roll_RealEstateExemp > 0']    
// Server-side filter
    function setFeatureLayerFilter(expression) {
      // 重新定义筛选表达式
      featureLayer.definitionExpression = expression;
    }
```

## 4. 编辑要素图层 Editor

+ esri/widgets/Editor

```js
    // Editor widget
    const editor = new Editor({
      view: view
    });
    // Add widget to the view
    view.ui.add(editor, "top-right");
```

# 三、搜索

## 1. 定位、追踪功能 Locate Track

+ esri/widgets/Locate
+ esri/widgets/Track
+ esri/Graphic

```js
    /*
    * 定位
    * */

    const locate = new Locate({
      view: view,
      useHeadingEnabled: false,
      goToOverride: function (view, options) {
        options.target.scale = 1500
        return view.goTo(options.target)
      }
    })
    view.ui.add(locate, 'top-left')
```

```js
/*
    * 追踪
    * */
    const track = new Track({
      view: view,
      graphic: new Graphic({
        symbol: {
          type: "simple-marker",
          size: "12px",
          color: "green",
          outline: {
            color: "#efefef",
            width: "1.5px"
          }
        }
      }),
      useHeadingEnabled: false
    });
    view.ui.add(track, "top-left");
```

## 2. 查找位置 locator  GeocodeServer

+ esri/rest/locator
+ const locatorUrl = 'http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer'

```js
    const places = [
        'Choose a place type...',
        'Parks and Outdoors',
        'Coffee shop',
        'Gas station',
        'Food', 'Hotel']

```

```js
    /*
    * category 查询的值，如 Parks and Outdoors
    * pt  当前范围的中心
    * */
    function findPlaces(category, pt) {
      return locator.addressToLocations(locatorUrl, {
        location: pt,// 坐标
        categories: [category], // 类别
        maxLocations: 25,
        outFields: ['Place_addr', 'PlaceName']
      })
    }

      findPlaces(places[0], view.center).then(results => {
        console.log('res', results)
        view.popup.close()
        view.graphics.removeAll()

        /*
        * 添加点
        * */
        results.forEach(function (result) {
          view.graphics.add(
              new Graphic({
                attributes: result.attributes,  // Data attributes returned
                geometry: result.location, // Point returned
                symbol: {
                  type: 'simple-marker',
                  color: '#000000',
                  size: '12px',
                  outline: {
                    color: '#ffffff',
                    width: '2px'
                  }
                },
                popupTemplate: {
                  title: '{PlaceName}', // Data attribute names
                  content: '{Place_addr}'
                }
              }))
        })
      })

```

## 3. 搜索功能组件 Search

+ esri/widgets/Search

```js
    /*
    * 搜索组件
    * */
    const search = new Search({  //Add Search widget
      view: view
    });

    view.ui.add(search, "top-right"); //Add to the map
```

## 3. 反向地理编码 （坐标查询）  Geocoding service 

+ 点击地图获取坐标后调用locator.locationToAddress

```js
view.on("click", function(evt){
      const params = {
        location: evt.mapPoint
      };
      locator.locationToAddress(serviceUrl, params)
          .then(function(response) { // Show the address found
            const address = response.address;
            showAddress(address, evt.mapPoint);
          }, function(err) { // Show no address found
            showAddress("No address found.", evt.mapPoint);
          });
    });
    function showAddress(address, pt) {
      view.popup.open({
        title:  + Math.round(pt.longitude * 100000)/100000 + ", " + Math.round(pt.latitude * 100000)/100000,
        content: address,
        location: pt
      });
    }
```

# 四、路径

## 1. 查找路径和方向 route

+ esri/rest/route
+ esri/rest/support/RouteParameters
+ esri/rest/support/FeatureSet
+ const routeUrl = 'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World'

```js
view.on('click', function (event) {
      // 根据当前图形数量，判断点击的是起始点还是终止点
      if (view.graphics.length === 0) {
        addGraphic('origin', event.mapPoint)
      } else if (view.graphics.length === 1) {
        addGraphic('destination', event.mapPoint)
        getRoute() // Call the route service
      } else {
        view.graphics.removeAll()
        addGraphic('origin', event.mapPoint)
      }
    })

    function addGraphic(type, point) {
      const graphic = new Graphic({
        symbol: {
          type: 'simple-marker',
          color: (type === 'origin') ? 'white' : 'black',
          size: '8px'
        },
        geometry: point
      })
      view.graphics.add(graphic)
    }

    function getRoute() {
      const routeParams = new RouteParameters({
        stops: new FeatureSet({
          features: view.graphics.toArray() // 传入站点
        }),
        returnDirections: true
      })

      route.solve(routeUrl, routeParams)
          .then(function (data) {
            console.log('路径分析结果', data)
            data.routeResults.forEach(function (result) {
              result.route.symbol = {
                type: 'simple-line',
                color: [5, 150, 255],
                width: 3
              }
              view.graphics.add(result.route)
            })

            // 将获取到的路径信息（每一站）展示出来。
            if (data.routeResults.length > 0) {
              const directions = document.createElement('ol')
              directions.classList = 'esri-widget esri-widget--panel esri-directions__scroller'
              directions.style.marginTop = '0'
              directions.style.padding = '15px 15px 15px 30px'
              const features = data.routeResults[0].directions.features
              // Show each direction
              features.forEach(function (result, i) {
                const direction = document.createElement('li')
                direction.innerHTML = result.attributes.text + ' (' + result.attributes.length.toFixed(2) + ' miles)'
                directions.appendChild(direction)
              })

              view.ui.empty('top-right')
              view.ui.add(directions, 'top-right')
            }


          })

    }
```

## 2. 查找服务区 serviceArea e.g. 查找5,10,15分钟服务区

+ esri/rest/serviceArea
+ esri/rest/support/ServiceAreaParameters
+ esri/rest/support/FeatureSet

```js
    const serviceAreaUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/ServiceAreas/NAServer/ServiceArea_World/solveServiceArea";
    view.on("click", function(event){
      const locationGraphic = createGraphic(event.mapPoint);

      const driveTimeCutoffs = [5,10,15]; // Minutes
      const serviceAreaParams = createServiceAreaParams(locationGraphic, driveTimeCutoffs, view.spatialReference);

      solveServiceArea(serviceAreaUrl, serviceAreaParams);
    });
    // Create the location graphic
    function createGraphic(point) {
      view.graphics.removeAll();
      const graphic = new Graphic({
        geometry: point,
        symbol: {
          type: "simple-marker",
          color: "white",
          size: 8
        }
      });

      view.graphics.add(graphic);
      return graphic;
    }
    function createServiceAreaParams(locationGraphic, driveTimeCutoffs, outSpatialReference) {
      // Create one or more locations (facilities) to solve for
      const featureSet = new FeatureSet({
        features: [locationGraphic]
      });
      // Set all of the input parameters for the service
      const taskParameters = new ServiceAreaParams({
        facilities: featureSet, // 站点
        defaultBreaks: driveTimeCutoffs, // 按照时间分级
        trimOuterPolygon: true, // 修建外多边形
        outSpatialReference: outSpatialReference // 空间参考
      });
      return taskParameters;
    }

    function solveServiceArea(url, serviceAreaParams) {
      return serviceArea.solve(url, serviceAreaParams)
          .then(function(result){
            if (result.serviceAreaPolygons.length) {
              // Draw each service area polygon
              result.serviceAreaPolygons.forEach(function(graphic){
                graphic.symbol = {
                  type: "simple-fill",
                  color: "rgba(255,50,50,.25)"
                }
                view.graphics.add(graphic,0);
              });
            }
          }, function(error){
            console.log(error);
          });
    }
```

