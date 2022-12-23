# CesiumJS 第二次学习

## 第一章：开始

### 1. 快速开始

安装：

```bash
pnpm add cesium
```

复制静态文件到根目录：

- `node_modules/cesium/Build/Cesium/Workers`
- `node_modules/cesium/Build/Cesium/ThirdParty`
- `node_modules/cesium/Build/Cesium/Assets`
- `node_modules/cesium/Build/Cesium/Widgets`

设置静态文件的路径：

```javascript
window.CESIUM_BASE_URL = '/';
```

申请Cesium Ion账号，这里是github登录：

```js
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMmM0YWVmYS00MDk2LTRlMDgtYTg0Yy1kNzQ3Mzg5N2NhYTEiLCJpZCI6NTMyNTEsImlhdCI6MTYxOTA3MDc4Nn0.5yy3umIR7t9LTggTybJ-m9bflwzDKAbHL_Idn_ZBQDg';
```

完整的代码：

```vue
<template>
  <div id="cesiumContainer"></div>
</template>

<script setup lang="ts">
// The URL on your server where CesiumJS's static files are hosted.
import { onMounted } from 'vue'

window.CESIUM_BASE_URL = '/';

import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token from your ion account

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMmM0YWVmYS00MDk2LTRlMDgtYTg0Yy1kNzQ3Mzg5N2NhYTEiLCJpZCI6NTMyNTEsImlhdCI6MTYxOTA3MDc4Nn0.5yy3umIR7t9LTggTybJ-m9bflwzDKAbHL_Idn_ZBQDg';
onMounted(() => {
  // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
  const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
  });
  // Add Cesium OSM Buildings, a global 3D buildings layer.
  const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
  // Fly the camera to San Francisco at the given longitude, latitude, and height.
  viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation : {
      heading : Cesium.Math.toRadians(0.0),
      pitch : Cesium.Math.toRadians(-15.0),
    }
  });
})
</script>

<style scoped>
#cesiumContainer {
  height: 100%;
}
</style>
```



### 2. 构建飞行追踪器

1. 添加地形、建筑物

```js
const viewer = new Cesium.Viewer('cesiumContainer', {
  // 添加地形
  terrainProvider: Cesium.createWorldTerrain()
})
// 添加建筑物
const osmBuildings = viewer.scene.primitives.add(Cesium.createOsmBuildings())
```

2. 获取飞行雷达数据

注意，这里的高度并不是海拔高度。而是相对于原点的坐标。Cesium使用的是笛卡尔坐标系（直角坐标系）。

用下面的方法转换：

```js
 Cesium.Cartesian3.fromDegrees(经度, 纬度, 高度)
```

```js
  // 飞行样本的雷达数据
  const flightData = JSON.parse(
      '[{"longitude":-122.39053,"latitude":37.61779,"height":-27.32},{"longitude":-122.39035,"latitude":37.61803,"height":-27.32},{"longitude":-122.39019,"latitude":37.61826,"height":-27.32},{"longitude":-122.39006,"latitude":37.6185,"height":-27.32},{"longitude":-122.38985,"latitude":37.61864,"height":-27.32},{"longitude":-122.39005,"latitude":37.61874,"height":-27.32},{"longitude":-122.39027,"latitude":37.61884,"height":-27.32}]'
  )
```

3. 设置时钟

假设每个点之间是30秒，我们已经知道了开始时间是'2020-03-09T23:10:00Z'。

注意我们已知的时间是PST时区，要转换到UTC时区。

```js
Cesium.JulianDate.fromIso8601('2020-03-09T23:10:00Z')
```

```js
// 两个点之间间隔30秒
const timeStepInSeconds = 30
// 计算得到总时间
const totalSeconds = timeStepInSeconds * (flightData.length - 1)
// 开始时间，Cesium使用的时Julian时间，需要转换
const start = Cesium.JulianDate.fromIso8601('2020-03-09T23:10:00Z')
// 结束时间，调用addSeconds方法可以得到。
const stop = Cesium.JulianDate.addSeconds(start, totalSeconds, new Cesium.JulianDate())
viewer.clock.startTime = start.clone()
viewer.clock.stopTime = stop.clone()
viewer.clock.currentTime = start.clone()
// 把时间轴的开始和结束跳转到刚刚计算的时间
viewer.timeline.zoomTo(start, stop)
// 调成50倍速
viewer.clock.multiplier = 50
// 把播放状态改成开始
viewer.clock.shouldAnimate = true
```

4. 添加飞行点位，给每个点位加上时间戳。

```js
// SampledPositionedProperty存储雷达样本序列中每个样本的位置和时间戳。
const positionProperty = new Cesium.SampledPositionProperty()

for (let i = 0; i < flightData.length; i++) {
  const dataPoint = flightData[i]

  // 声明此单个示例的时间，并将其存储在新的JulianDate实例中。
  const time = Cesium.JulianDate.addSeconds(start, i * timeStepInSeconds, new Cesium.JulianDate())
  // 将经纬度转为笛卡尔坐标。这里的高度是已经预先处理过的，不是海拔高度
  const position = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height)
  // Store the position along with its timestamp.
  // Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
  positionProperty.addSample(time, position)

  viewer.entities.add({
    description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
    position: position,
    point: { pixelSize: 10, color: Cesium.Color.RED }
  })
}
```

5. 添加飞机模型

```js
async function loadModel() {
  // Load the glTF model from Cesium ion.
  const airplaneUri = await Cesium.IonResource.fromAssetId(955260);
  const airplaneEntity = viewer.entities.add({
    availability: new Cesium.TimeIntervalCollection([ new Cesium.TimeInterval({ start: start, stop: stop }) ]),
    position: positionProperty,
    // Attach the 3D model instead of the green point.
    model: { uri: airplaneUri },
    // 根据位置自动计算方向。
    orientation: new Cesium.VelocityOrientationProperty(positionProperty),
    path: new Cesium.PathGraphics({ width: 3 })
  });

  viewer.trackedEntity = airplaneEntity;
}

loadModel();
```