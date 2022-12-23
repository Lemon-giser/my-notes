### echarts 地图开发

+ layer图层在echarts中相当于series，开发时将series提取为一个配置文件，方便开发
+ 官网有示例
+ 地图下钻部分有代码实例

#### 线、面图层

series：

type="map"

面配置项参考：

```js
let series = [{
    type: 'map',
    name: '',
    // 指定地图的名字，需要使用echarts.registerMap(mapname, geojson)
    map: '',
    label: {
      show: true,
      color: '',
      fontSize: 26,
      fontFamily: ''
    },
    data: null,
    itemStyle: {
      borderColor: '',
      areaColor: '',
      borderWidth: 2
    },
    // 地图宽高比例，1是正常的
    aspectScale: 1,
    emphasis: {
      label: {
        show: true,
        color: '',
        fontSize: 30
      },
      itemStyle: {
        borderColor: '',
        areaColor: '',
        borderWidth: 4
      }
    },
    // 下面两个使地图居中并放大。必须组合使用
    layoutCenter: ['50%', '50%'],
    layoutSize: '125%',
    // 精细控制标签的位置
    labelLayout: function(params) {
      const result = {
        x: params.rect.x + params.rect.width / 2,
        moveOverlap: 'shiftY'
      }
      if (params.text === 'xx') {
        result.x = params.rect.x + params.rect.x * 0.95
        result.y = params.rect.height - params.rect.height * 0.25
      }
      return result
    }]
```

面配置参考2：

```js
const series = [{
    type: 'map',
    name: '',
    map: '',
    selectedMode: true,
    silent: true, // 不响应鼠标
    label: {
      show: true,
      color: '#',
      fontSize: 16,
      fontFamily: ''
    },
    // data: getSeriesData(villagePolygons),
    itemStyle: {
      borderColor: '#',
      areaColor: '#',
      borderWidth: 0.5
    },
    aspectScale: 1,
    // 高亮的样式
    emphasis: {
      label: {
        show: true,
        color: '#'
      },
      itemStyle: {
        borderColor: '#',
        areaColor: '#'
      }
    },
    // 选中的样式
    select: {
      label: {
        show: true,
        color: '#fdf0ca'
      },
      itemStyle: {
        borderColor: '#',
        areaColor: '#'
      }
    },
    layoutCenter: ['50%', '50%'],
    layoutSize: '125%'
  }]
```

面data：

```js
// 从GeoJSON中提取名称、要素，生成series中的data
const getSeriesData = function(featureCollection, fieldName = 'name') {
  const seriesData = []
  featureCollection.features.forEach(feature => {
    seriesData.push({
      name: feature.properties[fieldName],
      feature
    })
  })
  return seriesData
}
```

线配置：

```js
const series = [{
    name: '',
    type: 'map',
    map: '',
    aspectScale: 1,
    layoutCenter: ['50%', '50%'],
    layoutSize: '125%',
    silent: true, // 不响应鼠标
    itemStyle: {
      borderColor: '#968671',
      areaColor: '#ffffff11',
      borderWidth: 4
    }
  }]
```



#### 点图层



https://blog.csdn.net/qq_32953185/article/details/107399473



series：

type="scatter"

coordinateSystem="geo"

必须在option中配置geo，确定坐标系，才能显示点。



点配置参考：

```js
const series = [{
    name: '',
    type: 'scatter',
    // 指定坐标系
    coordinateSystem: 'geo',
    label: {
      show: true,
      formatter: '{b}',
      position: 'right',
      color: '#',
      fontSize: 16,
      fontFamily: ''
    },
    // 控制标签显示哪个字段，与data格式相关，比较复杂，此处为官方示例
    encode: {
      value: 2
    },
    labelLayout: function(params) {
      return {
        moveOverlap: 'shiftY'
      }
    },
    emphasis: {
      label: {
        show: true,
        color: '#'
      },
      itemStyle: {
        borderColor: '#',
        areaColor: '#'
      }
    },
    itemStyle: {
      // borderColor: '#',
      // areaColor: '#',
      // borderWidth: 4
    }]
```

点data：

```js
// 点GeoJSON中提取data。由name、value组成。value为坐标。
const getSeriesPointData = function(featureCollection) {
  const seriesData = []
  featureCollection.features.forEach(feature => {
    seriesData.push({
      name: feature.properties.name,
      value: feature.geometry.coordinates.concat(feature.properties.name)
    })
  })
  // console.log(seriesData)
  return seriesData
}
```



#### 地图下钻

https://blog.csdn.net/qq_23447231/article/details/121928744

新版本下钻没有动画，需要注意

上钻一般替换为初始的图层即可



初始化时不设置geo坐标系。下钻的时候，添加点的时候再手动添加坐标系，如果初始化时添加坐标系，坐标系不会变