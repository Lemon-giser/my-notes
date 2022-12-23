## 一、写在前面

mapbox 支持 二维 和 简单的三维， 地图样式比较好看，api文档写的很好，添加数据比较简单。

有两种表达式可以精细化控制图层，需要学习

如果需要cgcs2000坐标系，使用@cgcs2000/mapboxgl 这个包

+ 官网 https://docs.mapbox.com/mapbox-gl-js/guides/
+ 多看示例，找代码。
+ 控制要素样式一般使用表达式，一个例子https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/
+ 样式的配置文档：https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#fill

1. mapbox style规范

https://my.oschina.net/u/3185947/blog/4819218

2. mapbox 开发 常用的代码 和 坑

https://zhuanlan.zhihu.com/p/338534345

## 二、总结用mapbox的自定义图层

### 自定义图层 (custom layer) 能做什么

mapbox使用的canvas进行绘制，因此可以获取到webgl上下文context。

在自定义图层中，可以获取到变量。

利用这个特性，我们可以把three.js中的特效放到mapbox上，亦可以结合deck.gl

### 遇到的问题

three.js和mapbox的坐标系毕竟不同，mapbox官方给出的示例可以实现坐标中心点同步。

但是无法把three.js中场景内的物品限制到地图上某一个区域

### 代码示例

```js
      // 确保模型在地图上正确地理参考的参数
      const modelOrigin = centerCoordinate
      const modelAltitude = 0
      const modelRotate = [Math.PI / 2, 0, 0]

      const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin,
        modelAltitude
      )

      // 将 3D 模型定位、旋转和缩放到地图上的转换参数
      const modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        /* 由于 3D 模型以现实世界的米为单位，因此需要应用比例变换，因为 CustomLayerInterface 需要墨卡托坐标中的单位。*/
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
      }
      
	  // 根据 CustomLayerInterface 为 3D 模型配置自定义层
      const customLayer = {
        id: '3d-model',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function(map, gl) {
          /*
          * ==================== three start =========================
          * */
          // 在这里写逻辑，一般把变量放到this上。比如 this.camera。方便下面的render调用。
          /*
          * ==================== three end =========================
          * */
          this.map = map
          this.renderer.autoClear = false
        },
        render: function(gl, matrix) {
          const material = this.material
          // start


          // end
          // 下面的是官方给出的投影办法，可以看到使用了 camera.projectionMatrix 进行投影。
          const rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            modelTransform.rotateX
          )
          const rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            modelTransform.rotateY
          )
          const rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            modelTransform.rotateZ
          )

          const m = new THREE.Matrix4().fromArray(matrix)
          const l = new THREE.Matrix4()
            .makeTranslation(
              modelTransform.translateX,
              modelTransform.translateY,
              modelTransform.translateZ
            )
            .scale(
              new THREE.Vector3(
                modelTransform.scale,
                -modelTransform.scale,
                modelTransform.scale
              )
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ)
          // this.camera.projectionMatrix = m
          // TODO 网上一些代码使用的是`this.camera.projectionMatrix = m`，下面的代码参考mapbox网站示例
          this.camera.projectionMatrix = m.multiply(l)
          this.renderer.resetState()
          this.renderer.render(this.scene, this.camera)
          this.map.triggerRepaint()
        }
      }
```



### 相关资源

1. three.js下雨特效

> https://www.wjceo.com/blog/threejs2/2019-02-28/185.html

2. [唐玥璨 | 博客](https://www.tangyuecan.com/)

> Deck.gl 如何与mapbox结合

3. threebox-plugin

> 将three和mapbox结合的插件，看着还不错

4. 一些特效

```
bubblesEffect(气泡效果)
https://chenxuan0000.github.io/vue-canvas-effect/index.html#/router_2

下雪
https://www.kirilv.com/canvas-confetti/
雨
https://hovertree.com/texiao/html5/4.htm
风
https://github.com/Esri/wind-js
```



## 三、总结mapbox的canvas图层

### canvas图层是什么

canvas图层和自定义图层类似。但暴露的是2d的上下文。我们可以在此基础上进行扩展。

### canvas图层实现区域内2d特效

在此使用的是fill类型图层的 fill-pattern 属性，即纹理。

### 代码示例

```js
      const size = 300

      const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),
        onAdd: function() {
          const canvas = document.createElement('canvas')
          canvas.width = this.width
          canvas.height = this.height
          this.context = canvas.getContext('2d')
        },

        // Call once before every frame where the icon will be used.
        render: async function() {
          const context = this.context
          const canvas = context.canvas

          // 在此写逻辑。
          
          // Update this image's data with data from the canvas.
          this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
          ).data
          // Continuously repaint the map, resulting
          // in the smooth animation of the dot.
          map.triggerRepaint()
          // Return `true` to let the map know that the image was updated.
          return true
        }
      }     
      
	  map.addImage('pulsing-dot', pulsingDot)

      map.addSource('hangzhou', {
        type: 'geojson',
        data: HangZhou
      })
      map.addLayer({
        id: 'hangzhou',
        type: 'fill',
        source: 'hangzhou',
        layout: {},
        paint: {
          'fill-color': '#0080ff',
          'fill-opacity': 0.5,
          'fill-pattern': 'pulsing-dot'
        }
      })
```

### 相关资源

1. 下雨特效

> https://www.cnblogs.com/shimily/articles/15500108.html

## 四、mapbox 编辑器

> https://maputnik.github.io/

## 五、mapbox组件化

```
vue-mapbox-ts
```

