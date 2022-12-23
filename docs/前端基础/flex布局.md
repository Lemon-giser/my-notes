## 版本

老版本：display: -webkit- box	

新版本：display: flex	小div会自动缩小

flex与float: left不同

## 调整主轴和侧轴是哪一根

老版本

属性：-webkit-box-orient	

值：

​	horizontal	主轴是横轴

​	vertical	纵轴

新版本

display : flex

flex-direction : row	

flex-direction : column

## 容器排列方向

项目永远向正方向排列

老版本

控制主轴方向

-webkit-box-direction : normal

-webkit-box-direction : reverse

新版本

flex-direction : column-reverse

## 富裕空间（主轴）

老版本

-webkit-box-pack :

属性值

+ start 在右边	下边
+ end 在左边     上边
+ center 在两边
+ justify 在项目之间

新版本

justify-content

属性值

+ flex-start 在主轴正方向
+ flex-end 在主轴反方向
+ center
+ space-between 在项目之间
+ space-around 在项目之间及两边

## 富裕空间（侧轴）

老版本

-webkit-box-align

属性值

+ start 在侧轴的下边
+ end 在侧轴上边
+ center 在侧轴两边

新版本

align-items

属性值

+ flex-start
+ flex-end
+ center
+ baseline 按基线对齐
+ stretch 等高布局