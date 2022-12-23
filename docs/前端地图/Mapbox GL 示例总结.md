## Mapbox GL 示例总结

#### 1.  Display a globe on a webpage


 投影为三维地球：`projection: 'globe'`

```js
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/satellite-streets-v11',
zoom: 1.5,
center: [30, 50],
projection: 'globe'
});
```



#### 2. Display a web map using an alternate projection

投影

 ` projection: 'naturalEarth' `



#### 3. Display a map on a webpage

在globe投影的基础上改了改zoom，看着像二维地图



#### 4. Accept coordinates as input to a geocoder

根据经纬度查询的示例

 MapboxGeocoder 类 



#### 5. Add 3D terrain to a map

 map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 }); 
 

#### *6. Add a 3D model


通过three.js添加gltf模型 

#### *7. Add a canvas source

将canvas添加到地图中
 