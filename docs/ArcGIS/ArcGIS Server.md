## ArcGIS Server

## 发布服务目录

+ 发布动态地图服务

+ 发布切片地图服务

+ 发布要素服务

+ 发布影像服务

+ 发布网络分析服务

+ 发布GP服务-返回矢量数据

+ 发布结果地图服务

+ 发布地理编码服务 x

+ SOE x

+ 扩展几何网络分析 x

+ 发布松散型切片服务

  

## 发布动态地图服务

1. 文件-分享为服务

2. 利用ArcMap连接ArcGIS Server

3. 通过服务管理器查看服务

   http://localhost:6080/arcgis/manager

4. 通过Services Directory查看服务

   http://localhost:6080/arcgis/rest/services

   



## 发布切片地图服务

发布前修改地图服务属性为切片即可。

## 发布要素服务

需要使用ArcSDE地理数据库

> ​	   要素服务可用来通过 Internet 提供要素，并提供显示要素时所要使用的符号系统。之后，客户端可执行查询操作以获取要素，并执行相应的编辑操作。要素服务提供了可用于提高客户端编辑体验的模板。此外，要素服务也可以对关系类和非空间表中的数据进行查询和编辑。

*待编辑

## 发布影像服务

> ​	   影像服务是将栅格数据和影像数据作为服务发布出去。此时客户端便可以对栅格数据的进行访问。例如：**查看栅格的波段信息**，**查看栅格某一个像元的值**等等。

数据限制：

+ 栅格数据集
+ 栅格图层
+ 镶嵌数据集
+ 镶嵌图层

发布：ArcCatalog

1. 找到栅格数据集
2. 共享为服务

## 发布网络分析服务

1. 新建几何网络
2. 新建路径、服务区（修改为英文）
3. 共享为服务
4. 功能打开Network Analysis

发布：ArcMap

## 发布GP服务-返回矢量数据

1. 创建GP模型

2. 修改模型参数，运行一次模型

3. 在结果窗口共享为地理处理服务

   参数的执行模式改为**同步**

4. 进入ArcGIS REST Services Directory

5. 执行GP服务，点击Execute Task进入执行页面

6. Input输入以下

   ```javascript
   {
   "fields":[],
   "geometryType":"esriGeometryPoint",
   "features":[{"geometry":{"x":21266163.705518104,"y":4004678.1217188686,"spatialReference":{"wkid":2334,"latestWkid":2334}}},
   {"geometry":{"x":21265688.294761922,"y":4008771.9365637503,"spatialReference":{"wkid":2334,"latestWkid":2334}}}],
   "sr":{"wkid":2334,"latestWkid":2334}
   }
   ```

## 发布结果地图服务

1. 创建模型，克里金法，重命名英文

2. 修改模型参数，输入为要素集。运行一次模型

3. 修改符号系统

4. 共享为服务

5. 服务编辑器，执行模式异步，包含结果

6. 执行MyKinging服务，Input输入

   ```javascript
   {
   "fields":[{"name":"h","type":"esriFieldTypeSmallInteger","alias":"h"}],
   "geometryType":"esriGeometryPoint",
   "features":[
   {"geometry":{"x":21261594.47991704,"y":3998735.4872666216,"spatialReference":{"wkid":2334,"latestWkid":2334}},"attributes":{"h":30}},
   {"geometry":{"x":21265424.177675154,"y":3997758.254045585,"spatialReference":{"wkid":2334,"latestWkid":2334}},"attributes":{"h":40}},
   {"geometry":{"x":21267431.46753458,"y":4000822.0122520775,"spatialReference":{"wkid":2334,"latestWkid":2334}},"attributes":{"h":50}},
   {"geometry":{"x":21267827.64316473,"y":4003938.5938759227,"spatialReference":{"wkid":2334,"latestWkid":2334}},"attributes":{"h":60}},
   {"geometry":{"x":21265873.176722657,"y":4005576.1198138753,"spatialReference":{"wkid":2334,"latestWkid":2334}},"attributes":{"h":70}},
   {"geometry":{"x":21262439.654594693,"y":4002301.06793797,"spatialReference":{"wkid":2334,"latestWkid":2334}},"attributes":{"h":80}},
   {"geometry":{"x":21265397.76596648,"y":4001191.7761735506,"spatialReference":{"wkid":2334,"latestWkid":2334}},"attributes":{"h":90}}],
   "sr":{"wkid":2334,"latestWkid":2334}
   }
   ```

7. 查看结果：

   D:\arcgisserver\directories\arcgisjobs\test\mykinging_gpserver\j4c7ea6c0c35346db9e1db854bb22584d

   在ArcCatalog中查看

## 发布地理编码服务

## SOE

## 扩展几何网络分析

## 发布松散型切片服务

缓存：使用缓存中的切片

缓存高级设置：

+ 切片格式：PNG
+ 高级：高度宽度：256 x 256
+ 高级：存储格式EXPLODED

查看缓存数据：

D:\arcgisserver\directories\arcgiscache\Test_SSQiepian



