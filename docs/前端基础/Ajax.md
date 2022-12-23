## 课程地址

https://www.bilibili.com/video/BV1WC4y1b78y

## 请求报文

```

行	POST
头	
	Host:
	Cookie:
	Content-type:
    User-Agent:
空行	
体(get请求，体为空;Post 体可以不为空)

```

## 响应报文

```
行
头
空行
体
```

安装node.js

npm	express框架

IDE中在最外层打开终端，输入

npm init --yes

npm i express

## 打开端口

在文件夹右键在终端打开

输入

```
node xxx.js
```

浏览器进入127.0.0.1:8000

## 基本操作

html中

```js
//1.创建对象
const xhr = new XMLHttpRequest()
//2.初始化
xhr.open('GET',"http://127.0.0.1:8000/")
//3.发送
xhr.send()
//4.事件绑定
//ready 表示状态 0 1 2 3 4 
xhr.onreadystatechange = function(){
    //判断
    if(xhr.readyState === 4){
       		//判断响应状态码
        	if(xhr.status>=200&xhr.status<300){
                //处理结果
                //1.响应行
                
            }
       }
}
```

server中

```js
//1. 引入express
const express = require('express');
//2. 创建应用对象
const app = express()
//3. 创建路由规则
app.get('/server',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*')
    response.send('Hello Ajax! This is a GET.')
})
app.post('/server',function (request,response) {
    response.setHeader('Access-Control-Allow-Origin','*')
    response.send('Hello Ajax! This is a POST.')
})
//4. 监听端口启动服务
app.listen(8000,()=>{
    console.log('服务已经启动，8000端口监听中...')
})
```

## 设置请求头

http中的js代码

```js
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
```

server中的代码

```js
app.all('/json-server',function (request,response) {
    //设置响应头，允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    //响应头，可以在请求时自定义头，但是要使用app.all
    response.setHeader('Access-Control-Allow-Headers','*')
})
```



## JSON

sever中的代码，使用JSON.stringify()转化

```js
app.all('/json-server',function (request,response) {
    //设置响应头，允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    //响应头，可以在请求时自定义头，但是要使用app.all
    response.setHeader('Access-Control-Allow-Headers','*')
    const data = {
        name:"Lemon"
    }
    let str = JSON.stringify(data)
    response.send(str)
})
```

http中代码，转化为对象

```js
let obj = JSON.parse(xhr.response)
$('#result').html(obj.name)
```

或者是

```js
//设置响应体的格式
xhr.responseType = 'json'
$('#result').html(xhr.response.name)
```

## npm安装nodemon

```
npm -g install nodemon --registry https://registry.npm.taobao.org
```

镜像：https://www.cnblogs.com/yuzizsj/p/11845240.html

## 解决IE缓存问题

```js
xhr.open('GET','http://127.0.0.1:8000/ie?t='+Date.now())
```

## 网络延时和网络异常的问题

在server中设置延迟

```js
app.get('/delay',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*')
    setTimeout(function(){
      response.send('Hello Ajax!')
    },3000)
})
```

在html中

```js
//超时两秒设置
xhr.timeout = 2000//小于设定的3000
//超时执行函数
xhr.ontimeout = function(){
	$('#result').append('请求超时！<br/>')
}
```

在开发者工具中改成脱机状态

```js
//网络异常
xhr.onerror = function(){
  $('#result').append('网络异常！<br/>')
}
```

![[assets/Ajax.assets/image-20201010211006898.png|image-20201010211006898]]

## 取消请求

```
xhr.abort();
```

## 解决重复请求问题

```js
let isSending = false//先定义变量
$('#btn1').click(function(){
    if (isSending){//点击以后先检查有没有之前的请求
      xhr.abort()
 	}
    xhr = new XMLHttpRequest()
    isSending = true
    xhr.open('GET','http://127.0.0.1:8000/delay')
    xhr.send()
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
   		isSending = false
        }
      }
    }
  })
```

## jQuery-AJAX

引用jQuery 可以加 crossorigin="anonymous" 属性防止控制台警告

```html
<script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```

请求方法

```js
//$.方法('url',参数,回调函数,指定数据类型(可选))
$.get('http://127.0.0.1:8000/jquery-server',{a:'100',b:'2000'},function (data) {
       console.log(data)
     },'json')
```

通用方法，更多设置查文档

```js
$.ajax({
 //设置url
 url:'\'http://127.0.0.1:8000/jquery-server\'',
 //设置参数
 data:{a:100,b:300},
 //设置请求类型
 type:'GET',
 //设置数据类型
 //dataType:'json',
 //设置成功回调
 success:function () {
 },
 //设置超时
 timeout:2000,
 //设置失败回调
 error:function () {
 },
 //头信息 在server要设置允许自定义
 header:{
  a:100,
  b:100
 }
})
```

## axios-AJAX

可以先配置baseURL

```js
//配置 baseURL
axios.defaults.baseURL = 'http://127.0.0.1:8000';
```

get

```js
 //get不能设置请求体
 axios.get('/axios-server',{
 //url参数
 params:{
     id : 11
 },
 //请求头信息
 headers:{
     type:'header'
 }
}).then(function (value) {
     console.log(value)
    })
```

post

```js
//在post中，第二个参数可以设置请求体(负载)
 axios.post('/axios-server',
 {
   name:'Lemon'
 },{
   //url参数
   params:{
     id : 11
 },
 //请求头信息
 headers:{
     type:'header'
 }
}).then(function (value) {
     console.log(value)
    })
```

原生

```js
 axios({
 //方法
 method:'POST',
 //url
 url:'/axios-server',
 //url参数
 params:{
   vip:10,
   level:30
 },
 //请求头
 headers:{
   a:1000,
  b:222
 },
 //请求体参数
 data:{
  username: 'admin',
  password: 'admin'
 }
}).then(function (response) {
 //响应状态码
 console.log(response.status)
 //响应状态字符串
 console.log(response.statusText)
 //响应头信息
 console.log(response.headers)
 //响应体
 console.log(response.data)
    })
```

## fetch-AJAX

```js
fetch('http://127.0.0.1:8000/fetch-server',{
 //请求方法
 method:'POST',
 //请求头
 headers:{
   name:'Lemon'
 },
 //请求体
 body:'username:Lemon&age:18'
}).then(function (response) {
  // return response.text()
 return response.json()
   }).then(function (response) {
  console.log(response)
   })
```

## 传参数

原生

1. 不设置请求头，在url后加上?a=100&200 GET POST

   会出现字符串参数

2. 在设置请求头的情况下，在send()传参数

   xhr.send('a=100&b=200&c=300');

   会出现表单数据

3. 不设置请求头，在send()传参数

   xhr.send('a=100&b=200&c=300');

   会出现负载

jQuery

1. 指定参数 GET 

   会出现字符串参数

2. 指定参数 POST

   会出现表单数据，名称中不会有？

3. 在url后加上?a=100&200 GET POST

   会出现字符串参数

axios

1. get  在params中

   会出现字符串参数

2. post 第二个参数

   会出现负载

fetch

1. 在body中传字符串

   出现负载