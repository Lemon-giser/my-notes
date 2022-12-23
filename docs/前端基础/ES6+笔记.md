# ES6+笔记

视频地址：[尚硅谷Web前端ES6教程，涵盖ES6-ES11](https://www.bilibili.com/video/BV1uK411H7on?share_source=copy_web)

## 一、ES6新特性速览

### 1. let

```js
//let声明
let a
let b,c,d
let e = 100
let f = 521, g = 'iloveyou', h = []
//1. 块级作用域
{
    let boy = '罗'
}
console.log(boy) //报错
//2. 不存在变量提升
//3. 不影响作用域链
```

### 2. const

```js
//const声明
const SCHOOL = 'hue'
//1. 初始值必须声明
//2. 一般常量使用大写
//3. 常量的值不能修改
//4. 块级作用域
//5. 对于数组和对象的元素，不算做常量修改，不会报错
//    指向的地址没有发生改变
```

### 3. 解构赋值

```js
const F4 = ['小沈阳','刘能','赵四','宋小宝']
let [xiao,liu,zhao,song] = F4
console.log(xiao)
console.log(liu)
console.log(zhao)
console.log(song)
```

 对象的解构

```js
const ZHAO = {
    name: '赵本山',
    age: '不详',
    xiaopin:()=>{
        console.log("我可以演小品")
    }
}
let {name, age, xiaopin} = ZHAO
console.log(name)
console.log(age)
xiaopin()
```

### 4. 模板字符串

模板字符串

```js
let str = `Hello World`
console.log(str)
//内容中可以出现换行符
str = `
<div>
<p>你好</p>    
</div>
`
```

变量拼接

```js
let aa = "你好"
let out = `${aa},233`
console.log(out)
```

### 5. 简化对象写法

```js
let name = "bilibili"
let change = function(){
    console.log('我是change')
}
const school = {
    name,
    change,
    improve(){
        console.log("你好啊aa")
    }
}
console.log(school)
```

### 6. 箭头函数

箭头函数

```js
let fn = function(){
}
let fn2 = () => {
}
```

特性：

```js
//1. this是静态的，始终指向函数声明时所在作用域下的this
function getName(){
    console.log(this.name)
}
let getName2 = () => {
    console.log(this.name)
}
window.name = "bishi"
const home = {
    name:"Xiaomi"
}
//直接调用
getName()//bishi
getName2()//bishi
//call 方法调用
getName.call(home)//Xiaomi
getName2.call(home)//bishi
//2. 不能作为构造实例化对象
//3. 不能使用arguments变量
//4. 箭头函数的简写
//4.1 省略小括号 在只有一个参数的时候
let add = n => {
    return n + n
}
console.log(add(9))
//4.2 省略花括号 在只有一条语句的时候 而且return必须省略，语句的执行结果就是函数的返回值
let pow = n => n*n
console.log(pow(9))
```

### 7. 给函数的参数赋值初始值

```js
//这种参数一般放到最后
function add(a,b,c=10){
    return a + b + c
}
console.log(add(1,2))
//与解构赋值结合使用
function connect({host="127.0.0.1", username, password, port}){
    console.log(host)
    console.log(username)
    console.log(password)
    console.log(port)
}
connect({
    host:'localhost',
    username: 'root',
    password: 'root',
    port: 3306
})
```

```js
/**
 * getData
 * @param {string} [opt.localhost='127.0.0.1']
 * @param {string} [opt.username='1']
 * @param {number} [opt.post=null]
 */
function getData (data, opt = {localhost : '127.0.0.1', username: '1', post: null}) {
    const {localhost, username, post} = opt
    console.log(localhost, post, username, data)
}

getData(11, {
    localhost: '1',
    username: '2'
})

getData()
```



### 8.rest参数

 获取函数的实参，代替arguments

```js
//ES5中获取实参的方式
function data(){
    console.log(arguments)//一个object
}
data('戴尔','联想','ROG')
//rest参数
function data2(...args){
    //可以使用filter some every map等 提高对参数的处理的灵活程度
    console.log(args)//一个数组
}
data2('小米','一加','华为')
//注意：rest参数必须放到参数最后
```

### 9.扩展运算符

```js
// 【...】 扩展运算符能将【数组】转换为逗号分隔的【参数序列】
const arr = ['QQ', '微信', '支付宝']
function show(){
    console.log(arguments)
}
show(...arr)//相当于show('QQ', '微信', '支付宝')
```

### 10.symbol

```js
// 创建Symbol
let s = Symbol()
console.log(s,typeof s); //Symbol() "symbol"
let s2 = Symbol('哔哩哔哩')
let s3 = Symbol('哔哩哔哩')
console.log(s2 === s3) //false
//通过Symbol.for 创建
let s4 = Symbol.for('尚硅谷')
let s5 = Symbol.for('尚硅谷')
console.log(s4 === s5)//true
//symbol不能与其他数据进行运算
```

### 11.迭代器

```js
/*
    只要部署了Symbol.iterator接口，就可以使用迭代器
    工作原理：
        创建一个指针对象，指向当前数据结构的起始位置
        第一次调用对象的next方法，指针自动指向数据结构的第一个成员
        接下来不断调用next方法，指针一直往后移动，知道指向最后一个成员
        每调用next方法返回一个包含value 和 done属性的对象
*/
const xiyou = ['唐僧','孙悟空','猪八戒','沙僧']
for(let v in xiyou){
    console.log(v)//打印索引
}
for(let v of xiyou){
    console.log(v)//打印数组的值
}
let iterotor = xiyou[Symbol.iterator]()
console.log(iterotor.next())//{value: "唐僧", done: false}
console.log(iterotor.next())
console.log(iterotor.next())
console.log(iterotor.next())
console.log(iterotor.next())//{value: undefined, done: true}
```

### 12.生成器

异步解决方案。生成器就是一个特殊的函数。

```js
function * gen(){
    console.log(111)
    yield '老李'
    console.log(222)
    yield '老宋'
    console.log(333)
    yield '老王'
    console.log(444)
}
let iterator = gen()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
/*
    111
    {value: "老李", done: false}
    222
    {value: "老宋", done: false}
    333
    {value: "老王", done: false}
    444
    {value: undefined, done: true}
*/
```

生成器函数的参数

```js
function * gen(arg){
    console.log(arg)
    let one = yield 111
    console.log(one)
    yield 222
    let three = yield 333
    console.log(three)
}
let iterator = gen('AAA')
console.log(iterator.next())
console.log(iterator.next('BBB'))
console.log(iterator.next())
console.log(iterator.next('DDD'))
/*
    AAA
    {value: 111, done: false}
    BBB
    {value: 222, done: false}
    {value: 333, done: false}
    DDD
    {value: undefined, done: true}
*/
```

### 13.Promise

```js
const p = new Promise(function(resolve,reject){
    setTimeout(()=>{
        // let data = '数据库中的用户数据'
        // resolve(data)
        let data = '数据读取失败'
        reject(data)
    },1000)
})

p.then(function(value){
    console.log(value)
},function(reason){
    console.error(reason)
})
```

### 14.Set集合

回顾：JS中数组的操作

```js
/*
方法：
    toString()  把数组转换为数组值（逗号分隔）的字符串
    pop() 从数组中删除最后一个元素，返回“被弹出”的值
    push() （在数组结尾处）向数组添加一个新的元素，返回新数组的长度
    shift() 方法会删除首个数组元素，并把所有其他元素“位移”到更低的索引。返回被“位移出”的字符串
    unshift() 方法（在开头）向数组添加新元素，并“反向位移”旧元素，返回新数组的长度
    splice() 方法可用于向数组添加新项
        var fruits = ["Banana", "Orange", "Apple", "Mango"];
        fruits.splice(2, 0, "Lemon", "Kiwi");
        第一个参数（2）定义了应添加新元素的位置（拼接）。
        第二个参数（0）定义应删除多少元素。
        其余参数（“Lemon”，“Kiwi”）定义要添加的新元素。
        splice() 方法返回一个包含已删除项的数组
    concat() 方法通过合并（连接）现有数组来创建一个新数组
    slice() 方法用数组的某个片段切出新数组
        slice() 方法创建新数组。它不会从源数组中删除任何元素。
*/
```

Set集合

```js
//Set集合
let s = new Set(['大事儿','小事儿','好事儿','坏事儿','小事儿'])
//会自动去重
console.log(s,typeof s)  //Set(4) {"大事儿", "小事儿", "好事儿", "坏事儿"}  "object"
//查看个数
console.log(s.size)  //4
//增加元素
s.add('喜事儿')
//删除元素
s.delete('坏事儿')
//查询是否有某个元素
console.log(s.has('小事儿')) //true
console.log(s.has('破事儿')) //false
//遍历
for(let v of s){
    console.log(v)
}
```

### 15.Map

Map类似于对象，但是它的键可以不是字符串

```js
//声明
let m = new Map()
//添加元素
m.set('name','Lemon')
m.set('change',function(){
    console.log("你好！")
})
let key = {
    school:'HUE'
}
m.set(key,['光明','丛台'])
//size
console.log(m.size) //3
//删除
m.delete('name')
console.log(m)
//获取
console.log(m.get(key))
//遍历
for(v of m){
    console.log(v)//[键,值]
}
//清空
m.clear()
console.log(m)
```

### 16.class 类

```js
class Phone{
    constructor(brand,price){
        this.brand = brand
        this.price = price
    }
    call(){//注意这里不能使用ES5的写法
        console.log('我可以打电话！')
    }
}
let huawei = new Phone('huawei',17999)
huawei.call()
console.log(huawei)
let oneplus = new Phone('1+',3999)
console.log(oneplus)
```

### 17.数值扩展

```js
//0. Number.EPSILON是表示的最小精度
console.log(0.1 + 0.2 ===0.3) //false
function equal(a, b){
    //abs() 方法可返回数的绝对值
    return Math.abs(a-b) < Number.EPSILON
}
console.log(equal(0.1+0.2, 0.3))//true
//1. 二进制和八进制
let b = 0b1010
let o = 0o777
let d = 100
let x = 0xff
console.log(b)
console.log(o)
console.log(d)
console.log(x)
//2. Number.isFinite 检测一个数是不是有限数
console.log(Number.isFinite(100))//true
console.log(Number.isFinite(100/0))//false
console.log(Number.isFinite(Infinity))//无穷 false
//3. Number.isNaN 检测一个数是不是NaN
console.log(Number.isNaN(123))
console.log(Number.isNaN('123'))
//4. Number.parseInt Number.parseFloat 字符串转整数
console.log(Number.parseInt('5211314iloveyou')) //5211314
console.log(Number.parseFloat('3.1415926神奇')) //3.1415926
//5. Number.isInteger 判断是否为整数
console.log(Number.isInteger(20)) //true
console.log(Number.isInteger(20.22)) //false
//6. Math.trunc 把数字的小数部分抹掉
console.log(Math.trunc(3.5)) //3
//7. Math.sign 判断一个数是正数、0、还是负数
console.log(Math.sign(100)) //1
console.log(Math.sign(0)) //0
console.log(Math.sign(-100)) //-1
```

### 18.对象方法的扩展

```js
// 1. Object.is 判断两个值是否相等
console.log(Object.is(200,200)) //true
console.log(Object.is(NaN,NaN)) //true
console.log(Object.is(null,null)) //true
console.log(NaN === NaN) //false
console.log(null === null) //true
// 2. Object.assign 对象的合并
const config1 = {
    host: 'localhost',
    port: 3306,
    name: 'root',
    pass: 'root',
    test: 'test'
}
const config2 = {
    host: 'http://atguigu.com',
    port: 33060,
    name: 'atguigu',
    pass: 'iloveyou',
    test2: 'test2'
}
console.log(Object.assign(config1,config2))
/*
    host: "http://atguigu.com"
    name: "atguigu"
    pass: "iloveyou"
    port: 33060
    test: "test"
    test2: "test2"
*/
// 3. Object.setPrototypeOf设置原型对象（不建议这样用，应使用create）
//    Object.getPrototypeOf获取原型对象
const school = {
    name: '尚硅谷'
}
const cities = {
    xiaoqu: ['北京','上海','深圳']
}
Object.setPrototypeOf(school,cities)
console.log(school)
/*
    {
        "name": "尚硅谷"
        __proto__:{
            "xiaoqu": [
                "北京",
                "上海",
                "深圳"
            ]
        }
    }
*/
console.log(Object.getPrototypeOf(school))
/*
     {
         "xiaoqu": [
             "北京",
             "上海",
             "深圳"
         ]
     }
*/
```

### 19.模块化

export import

## 一之二、ES6部分特性实践

### 6.箭头函数

1）要求：div点击 2s后变成粉色

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div {
            width: 200px;
            height: 200px;
            background: #58a;
        }
    </style>
</head>
<body>
    <div id="ad"></div>
</body>
</html>
```

```js
// 解决1
let ad = document.getElementById('ad')
ad.addEventListener('click',function(){
    //保存this
    let _this = this
    setTimeout(function(){
        //这里不能使用this，因为this指向window
        _this.style.background = 'pink'
    },2000)
})
// 解决2
let ad = document.getElementById('ad')
ad.addEventListener('click',function(){
    //保存this
    setTimeout(()=>{
        //这里this指向ad的处理函数
        this.style.background = 'pink'
    },2000)
})

```

2）从数组中返回偶数的元素

```js
// 从数组中返回偶数的元素
// 解决1
const arr = [1,2,3,4,5,6]
const result = arr.filter(function(item){
    if(item%2 === 0){
        return true
    }else{
        return false
    }
})
console.log(result)
// 解决2
const arr = [1,2,3,4,5,6]
const result = arr.filter(item=>item%2 === 0)
console.log(result)

```

> 总结：
>
> 箭头函数适合与this无关的回调函数，定时器，数组的方法回调
>
> 箭头函数不适合与this有关的回调函数，事件回调，对象的方法

### 9.扩展运算符

1） 数组的合并

```js
const kuaizi = ['王太利','肖央']
const fenghuang = ['曾毅','玲花']
//const zuixuanxiaopingguo = kuaizi.concat(fenghuang)
const zuixuanxiaopingguo = [...kuaizi,...fenghuang]
console.log(zuixuanxiaopingguo)
```

2）数组的克隆

```js
const sanzhihua = ['E','G','M']
const sanyecao = [...sanzhihua]
//如果数组里有对象的，只是浅克隆
console.log(sanyecao)
```

3）将伪数组转为真正的数组

```html
<html lang="en">
<body>
    <div></div>
    <div></div>
    <div></div>
</body>
</html>
```

```js
const divs = document.querySelectorAll('div')
const divArr = [...divs]
console.log(divArr)
```

### 10.symbol

向对象中添加方法

```js
//方法1
let game = {
    name: '俄罗斯方块',
    up: ()=>{},
    down: ()=>{}
}
let methods = {
    up: Symbol(),
    down: Symbol()
}
game[methods.up] = function(){
    console.log('我可以改变形状')
}
game[methods.down] = function(){
    console.log('我可以快速下降')
}
console.log(game)
//方法2
let youxi = {
    name: '狼人杀',
    [Symbol('say')]: function(){
        console.log('我可以发言')
    },
    [Symbol('zibao')]:function(){
        console.log('我可以自爆')
    }
}
console.log(youxi)
```

symbol内置属性（举例）

```js
//设置监测类型属性
class Person{
    static [Symbol.hasInstance](){
        console.log('我用来被监测类型了')
    }
}
let s = {}
console.log(s instanceof Person)

//设置不可扩展属性
const arr = [1,2,3]
const arr2 = [4,5,6]
console.log(arr.concat(arr2))//[1,2,3,4,5,6]
arr2[Symbol.isConcatSpreadable] = false
console.log(arr.concat(arr2))//[1,2,3,Array(3)]
```

### 11.迭代器

自定义遍历数据

```js
//自定义遍历数据
const banji = {
    name: '嗷嗷嗷',
    students: [
        'leijun',
        'mahuateng',
        'mayun'
    ],
    [Symbol.iterator](){
        let index = 0
        return {
            next:()=>{
                if(index<this.students.length){
                    const result = {value:this.students[index], done:false}
                    index++
                    return result
                }else{
                    return {value:undefined, done: true}
                }
            }
        }
    }
}
//遍历对象
for(let v of banji){
    console.log(v)
}
```

### 12.生成器

异步操作：文件操作 网络操作(ajax, request) 数据库操作

一个例子：

```js
function one(){
    setTimeout(function(){
        console.log(111)
        iterator.next()
    },1000)
}
function two(){
    setTimeout(function(){
        console.log(222)
        iterator.next()
    },2000)
}
function three(){
    setTimeout(function(){
        console.log(333)
        iterator.next()
    },3000)
}
function * gen(){
    yield one()
    yield two()
    yield three()
}
let iterator = gen()
iterator.next()
```

模拟 获取用户数据 订单数据 商品数据

```js
function getUsers(){
    setTimeout(()=>{
        let data = '用户数据'
        iterator.next(data)
    },1000)
}
function getOrders(){
    setTimeout(()=>{
        let data = '订单数据'
        iterator.next(data)
    },1000)
}
function getGoods(){
    setTimeout(()=>{
        let data = '商品数据'
        iterator.next(data)
    },1000)
}
function *gen(){
    let users = yield getUsers()
    console.log(users)
    let orders = yield getOrders()
    console.log(orders)
    let goods = yield getGoods()
    console.log(goods)
}
let iterator = gen()
iterator.next()
```

### 13.Promise

0）Promise.prototype.then方法

```js
const p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('用户数据')
        // reject('出错了')
    },1000)
})
//1. 返回值为非promise，则状态为成功
//2. 返回值为promise, 要看返回的promise的resolve和reject
//3. 抛出错误，则返回状态为失败
const result = p.then(value=>{
    console.log(value)
    //不写return，则返回undefined
    // return 123
    // return new Promise((resolve,reject)=>{
    //     // resolve('ok')
    //     reject('not ok')
    // })
    throw new Error('出错啦')
},reason=>{
    console.warn(reason)
})

console.log(result)

//链式调用
p.then(value=>{

}).then(value=>{

})
```

1）使用promise读取文件

```
<dir> resources
		春晓.md
		望岳.md
		为学.md
Promise读取多个文件.js
```

```js
const fs = require('fs')

//回调地狱
// fs.readFile('./resources/为学.md',(err,data1)=>{
//     fs.readFile('./resources/春晓.md',(err,data2)=>{
//         fs.readFile('./resources/望岳.md',(err,data3)=>{
//             const result = `${data1}\r\n${data2}\r\n${data3}`
//             console.log(result)
//         })
//     })
// })

//使用promise
const p = new Promise((resolve,reject)=>{
    fs.readFile('./resources/为学.md',(err,data)=>{
        resolve(data)
    })
})

p.then(value=>{
    return new Promise((resolve,reject)=>{
        fs.readFile('./resources/春晓.md',(err,data)=>{
            resolve([value,data])
        })
    })
}).then(value=>{
    return new Promise((resolve,reject)=>{
        fs.readFile('./resources/望岳.md',(err,data)=>{
            value.push(data)
            resolve(value)
        })
    })
}).then(value=>{
    console.log(value.join('\r\n'))
})
```

2）Promise封装AJAX请求

```js
const p = new Promise((resolve, reject) => {
    //1. 创建对象
    const xhr = new XMLHttpRequest()
    //2. 初始化
    xhr.open("GET", "https://api.apiopen.top/getJoke")
    //3. 发送
    xhr.send()
    //4. 绑定事件，处理响应结果
    xhr.onreadystatechange = function () {
        //判断
        if (xhr.readyState === 4) {
            //判断响应状态码 200-299
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response)
            } else {
                reject(xhr.status)
            }
        }
    }
})

p.then(function(value){
    console.log(value)
},function(reason){
    console.error(reason)
})
```

3）Promise的catch方法

```js
//catch等同于then方法不传入第一个参数
const p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('出错了！')
    },1000)
})
// p.then(value=>{},reason=>{
//     console.error(reason)
// })
p.catch(reason=>{
    console.warn(reason)
})
```

### 14.Set集合

```js
let arr = [1,2,3,4,5,4,3,2,1]
//1. 数组去重
// let result = [...new Set(arr)]
// console.log(result)
//2. 交集
let arr2 = [4,5,6,5,6]
// let result =[...new Set(arr.filter(item=>new Set(arr2).has(item)))]
// console.log(result)
//3. 并集
// let union = [...new Set([...arr,...arr2])]
// console.log(union)
//4. 差集
let diff = [...new Set(arr.filter(item => !new Set(arr2).has(item)))]
let diff2 = [...new Set(arr2.filter(item => !new Set(arr).has(item)))]
console.log(diff2)
```

### 16.class类

1）class的静态成员

ES5写法

```js
function Phone(){

}
Phone.name = '手机' //这是静态成员
Phone.call = function(){
    console.log('我可以改变世界')
}
Phone.prototype.price = 2000  //这是原型
let nokia = new Phone()
console.log(nokia.name)//undefined
console.log(nokia.price)//2000
```

class

```js
class Phone{
    static name = '手机'
    static call(){
        console.log('我可以改变世界')
    }
}
let nokia = new Phone()
console.log(nokia.name)//undifined
```

2）类的继承

ES5写法

```js
function Phone(brand,price){
    this.brand = brand
    this.price = price
}
Phone.prototype.call = function(){
    console.log('我可以打电话')
}
function SmartPhone(brand,price,color,size){
    Phone.call(this, brand, price)
    this.color = color
    this.size = size
}

//设置子级构造函数的原型
SmartPhone.prototype = new Phone
SmartPhone.prototype.constructor = SmartPhone

//声明子类方法
SmartPhone.prototype.photo = function(){
    console.log('我可以拍照')
}
SmartPhone.prototype.playGame = function(){
    console.log('我可以玩游戏')
}

const chuizi = new SmartPhone('锤子',2499,'黑色','5.5inch')
console.log(chuizi)
```

class写法

```js
class Phone{
    constructor(brand, price){
        this.brand = brand
        this.price = price
    }
    call(){
        console.log('我可以打电话！')
    }    
}

class SmartPhone extends Phone{
    constructor(brand, price, color, size){
        super(brand, price)// Phone.call(this, brand, price)
        this.color = color
        this.size = size
    }
    photo(){
        console.log('拍照')
    }
    playGame(){
        console.log('打游戏')
    }
}

const xiaomi = new SmartPhone('小米', 799, '黑色', '4.7inch')
console.log(xiaomi)
xiaomi.call()
xiaomi.photo()
xiaomi.playGame()
```

3）class继承-子类对父类的重写

```js
class Phone{
    constructor(brand, price){
        this.brand = brand
        this.price = price
    }
    call(){
        console.log('我可以打电话！')
    }    
}
class SmartPhone extends Phone{
    constructor(brand, price, color, size){
        super(brand, price)// Phone.call(this, brand, price)
        this.color = color
        this.size = size
    }
    //子类不能调用父类的同名方法，只能重写
    call(){
        console.log("我可以视频通话")
    }
}
const xiaomi = new SmartPhone('小米', 799, '黑色', '4.7inch')
console.log(xiaomi)
xiaomi.call()//我可以视频通话
```

4）class的get和set

```js
class Phone{
    get price(){
        console.log('价格属性被读取了')
        return 'iloveyou'
    }
    //必须要有参数
    set price(newVal){
        console.log('价格属性被修改了')
    }
}
let s = new Phone()
console.log(s.price)
/*
        价格属性被读取了
        iloveyou
        */
s.price = 'free'//价格属性被修改了
```

### 19.模块化

1）模块化的三种导入方式和三种暴露方式

文件结构：

```
<dir> js
        m1.js
        m2.js
        m3.js
模块化.html
```

m1.js

```js
// 分别暴露
export let school = 'atguigu'
export function teach(){
    console.log('我可以改变世界')
}
```

m2.js

```js
let school = '尚硅谷'
function findJob(){
    console.log('findjob')
}
//统一暴露
export {school, findJob}
```

m3.js

```js
//默认暴露
export default{
    school: 'ATGUIGU',
    change:function(){
        console.log('2333')
    }
}
```

模块化.html

```js
<script type="module">
    //1. 通用导入方式
    // import * as m1 from './js/m1.js'
    // import * as m2 from './js/m2.js'
    // import * as m3 from './js/m3.js'
    // m3.default.change()

    //2. 解构赋值形式
    import {school, teach} from './js/m1.js'
    // console.log(school)
    // console.log(teach)
    // 可以设置别名来区分变量
    import {school as guigu, findJob} from './js/m2.js'
    // console.log(guigu,findJob)
    // 导入默认暴露的模块：必须起一个别名
    // import {default as m3} from './js/m3.js'

    //3. 简便形式 只能导入默认暴露
    import m3 from './js/m3.js'
    console.log(m3)
</script>
```

2）在index.html文件中只导入一个app.js

要求：将页面背景改为粉色（用node安装jquery）

```
<dir> js
		app.js
        m1.js
        m2.js
        m3.js
index.html
```

app.js

```js
//入口文件
//模块引入
import * as m1 from './m1.js'
import * as m2 from './m2.js'
import * as m3 from './m3.js'

import $ from 'jquery' // const $ = require('jquery')
$('body').css('background','pink')
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <script src='./src/js/app.js' type="module"></script>
</body>
</html>
```

3）babel打包

对2）这个项目进行打包

```
<dir> js
		app.js
        m1.js
        m2.js
        m3.js
home.html
index.html
```

home.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <!-- 
        1. 安装工具 babel-cli babel-perset-env browserify(webpack)
            npm i babel-cli babel-preset-env browserify -D
        2.  npx babel src/js -d dist/js --presets=babel-preset-env 
            npx babel 文件路径 -d 文件路径 参数
        3. 打包 npx browserify dist/js/app.js -o dist/bundle.js
        4. 如果发生更改，重复第二步和第三步
    -->
    <script src="dist/bundle.js"></script>
</body>
</html>
```

生成的文件结构：

```
<dir> dist
		<dir> js
        		app.js
                m1.js
                m2.js
                m3.js
		bundle.js
<dir> node_modules
<dir> js
		app.js
        m1.js
        m2.js
        m3.js
home.html
index.html
```

## 二、ES7新特性速览

### 1.数组的includes和indexOf

```js
const mingzhu = ['西游记','红楼梦','三国演义','水浒传']
console.log(mingzhu.includes('西游记')) //true
console.log(mingzhu.includes('水经注')) //false

console.log(mingzhu.indexOf('西游记')) // 0
console.log(mingzhu.indexOf('水经注')) // -1 不存在
```

### 2. **运算符

```js
console.log(2 ** 10)
console.log(Math.pow(2,10))
```

## 三、ES8新特性速览

### 1.async await

async 为了使异步看起来更像同步

```js
//1. 如果返回的不是一个Promise对象，返回的结果就是一个成功的Promise对象
async function fn(){
    return '尚硅谷'
}
const result = fn()
console.log(result)
/*
        Promise{
            [[PromiseState]]: "fulfilled"
            [[PromiseResult]]: "尚硅谷"
        }  
        */
//2. 抛出错误，返回的结果是一个失败的Promise
async function fn2(){
    throw new Error('出错啦！')
}
const result = fn2()
console.log(result)
/*
        Promise{
            [[PromiseState]]: "rejected"
            [[PromiseResult]]: Error: 出错啦！
        }
        Uncaught (in promise) Error: 出错啦！
        */
//3. 返回的是一个Promise对象
async function fn3(){
    return new Promise((resolve,reject)=>{
        // resolve('这是一个成功的数据')
        reject('这是一个失败的数据')
    })
}
const result = fn3()
console.log(result)
/*
        Promise{
            [[PromiseState]]: "fulfilled"
            [[PromiseResult]]: "这是一个成功的数据"
        }
        Promise{
            [[PromiseState]]: "rejected"
            [[PromiseResult]]: "这是一个失败的数据"
        }
        */
result.then(value=>{
    console.log(value) //这是一个成功的数据
},reason=>{
    console.warn(reason) //这是一个失败的数据
})
```

await 搭配async使用 要使用try……catch语句

```js
const p = new Promise((resolve,reject)=>{
    resolve('用户数据')
    // reject('失败啦')
})
async function main(){
    try{
        let result = await p
        console.log(result) //用户数据
    }catch(e){
        console.log(e) //失败啦
    }
}
main()
```

### 2.对象方法的扩展

```js
const school = {
    name: '尚硅谷',
    cities: ['北京','上海','深圳'],
    xueke: ['前端','JAVA']
}
//获取对象的所有键
console.log(Object.keys(school))
//获取对象所有值
console.log(Object.values(school))
//创建Map
console.log(Object.entries(school))
const m = new Map(Object.entries(school))
console.log(m.get('cities'))
//对象属性的描述对象
console.log(Object.getOwnPropertyDescriptors(school))
/*
        {
            "name": {
                "value": "尚硅谷",
                "writable": true,
                "enumerable": true,
                "configurable": true
            },
            "cities": {
                "value": [
                    "北京",
                    "上海",
                    "深圳"
                ],
                "writable": true,
                "enumerable": true,
                "configurable": true
            },
            "xueke": {
                "value": [
                    "前端",
                    "JAVA"
                ],
                "writable": true,
                "enumerable": true,
                "configurable": true
            }
        }
        */
```

## 三之二、ES8部分特性实践

### 1.async await

1）async与await发送AJAX请求

```js
function sendAJAX(url) {
    const x = new XMLHttpRequest()
    return new Promise((resolve, reject) => {
        x.open('GET', url)
        x.send()
        x.onreadystatechange = function () {
            if (x.readyState === 4) {
                if (x.status >= 200 && x.status < 300) {
                    resolve(x.response)
                }
            }
        }
    })
}
async function main() {
    let sentences = await sendAJAX('http://poetry.apiopen.top/sentences')
    console.log(sentences)
    let time = await sendAJAX('http://poetry.apiopen.top/getTime')
    console.log(time)
}
main()
```

2）async与await读取文件

```
<dir> resources
		春晓.md
		望岳.md
		为学.md
25async与await读取文件.js
```

```js
const fs = require('fs')
function readWeiXue(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./resources/为学.md',(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}
function readChunXiao(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./resources/春晓.md',(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    }) 
}
function readWangYue(){
    return new Promise((resolve,reject)=>{
        fs.readFile('./resources/望岳.md',(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    }) 
}
async function main(){
    let weixue = await readWeiXue()
    let chunxiao = await readChunXiao()
    let wangyue = await readWangYue()
    console.log(weixue.toString())
    console.log(chunxiao.toString())
    console.log(wangyue.toString())
}
main()
```

## 四、ES9新特性速览

### 1. Rest参数与spread扩展运算符用于对象

```js
function connect({host, port, ...user}){
    console.log(host)
    console.log(port)
    console.log(user)//{username: "root", password: "root", type: "master"}
}
connect({
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    type: 'master'
})
```

```js
const part1 = {
    SOC : '888'
}
const part2 = {
    screen: '天马'
}
const part3 = {
    battery: '4000mAh'
}
const phone = {...part1,...part2,...part3}
console.log(phone)
/*
    {
        "SOC": "888",
        "screen": "天马",
        "battery": "4000mAh"
    }
*/
```

### 2.正则扩展-命名捕获分组、反向断言、dotAll模式

1）命名捕获分组

```js
//命名捕获分组
let str = '<a href="http://www.atguigu.com">尚硅谷</a>'
//原来的方法
let reg = /<a href="(.*)">(.*)<\/a>/
console.log(reg.exec(str))
/*
    0: "<a href="http://www.atguigu.com">尚硅谷</a>"
    1: "http://www.atguigu.com"
    2: "尚硅谷"
    groups: undefined
    index: 0
    input: "<a href="http://www.atguigu.com">尚硅谷</a>"
    length: 3
*/
//新方法
reg = /<a href="(?<url>.*)">(?<text>.*)<\/a>/
console.log(reg.exec(str))
/*
    0: "<a href="http://www.atguigu.com">尚硅谷</a>"
    1: "http://www.atguigu.com"
    2: "尚硅谷"
    groups: {
        text: "尚硅谷"
        url: "http://www.atguigu.com"
    }
    index: 0
    input: "<a href="http://www.atguigu.com">尚硅谷</a>"
    length: 3
*/
```

2）正向断言与反向断言

```js
//正则-正向断言
let str = 'JS12345232你知道么555啦啦啦'
let reg = /\d+(?=啦)/
let result = reg.exec(str)
console.log(result) //获取到555
//反向断言
reg = /(?<=么)\d+/
result = reg.exec(str)
console.log(result) //获取到555
```

3）正则dotAll模式

```js
let str = `
<ul>
    <li>
        <a>肖申克的救赎</a>
        <p>上映日期：1994-09-10</p>   
    </li>
    <li>
        <a>阿甘正传</a>
        <p>上映日期：1994-07-06</p>   
    </li>    
</ul>`
//旧方法
// let reg = /<li>\s+<a>(.*?)<\/a>\s+<p>(.*?)<\/p>/
//新方法
let reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs
// let result = reg.exec(str)
let data = []
while(result = reg.exec(str)){
    let name = result[1]
    let time = result[2]
    data.push({'name':name,'time':time})
}
console.log(data)
```

## 四之二、正则回顾

1）正则语法及简单使用

```js
/*
    正则-第一种语法
    let 变量 = new RegExp('正则表达式','匹配模式')
        匹配模式：i忽略大小写 g全局匹配模式
    使用test()方法检查
*/
let reg = new RegExp('a')
console.log(reg, typeof reg) // /a/ "object"
let str = 'a'
let result = reg.test(str)
console.log(result)//true

/*
    正则-第2种语法
    let 变量 = /正则表达式/匹配模式     
*/
let reg
reg = /a|b/i    //|表示或者
reg = /[ab]/    //[]里的内容是或的关系
reg = /[a-z]/   //[a-z]表示任意小写字母[A-Z]任意大写字母[A-z]任意字母
reg  = /a[bde]c/    //检查是否含有abc或adc或aec
reg = /[^ab]/   //[^ ]除了
reg = /[^0-9]/   //[0-9]任意数字
console.log(reg.test('1aa'))
```

2）字符串和正则相关的方法

```js
//字符串和正则相关的方法
/*
    split()将字符串拆分成数组
*/
let str = "1a2s3r4g5g66h7g9"
let result = str.split(/[A-z]/)
console.log(result)//["1", "2", "3", "4", "5", "66", "7", "9"]
/*
    search()搜索字符串是否含有指定内容
    如果搜索到结果，返回第一次出现的索引，如果没有搜索到，返回-1
*/
str = "Hello abc hello aec"
result = str.search(/a[bde]c/)
console.log(result)
/*
            match()提取字符串中满足条件的部分
            默认只提取第一个满足条件的字符串，可以设置全局模式提取所有字符串
        */
str = "1a2s3r4g5g66h7g9"
result = str.match(/[0-9]/gi)
console.log(result)
/*
    replace()替换字符串中的指定内容，默认只会替换第一个
*/
str = '1a2a3a4a5b6c'
result = str.replace(/[a-z]/gi,'')
console.log(result)
```

3）正则的量词

```js
let reg = /a{3}/    //3次a
console.log(reg.test('aa'))
reg = /(ab){3}/     //3次ab
console.log(reg.test('ababab'))
reg = /ab{1,3}c/    //b出现1到3次
console.log(reg.test('abbc'))
reg = /ab{3,}c/    //b出现至少3次
console.log(reg.test('abbbbbc'))
reg = /ab+c/    //b出现至少一个
console.log(reg.test('abbc'))
reg = /ab*c/    //相当于b{0,}
console.log(reg.test('ac'))
reg = /ab?c/    //b{0,1}
console.log(reg.test('abc'))
```

4）正则-开头结尾

```js
reg = /^a/
console.log(reg.test('abc'))
reg = /a$/
console.log(reg.test('wabca'))
reg = /^a$/
console.log(reg.test('a'))

reg = /^1[3-9][0-9]{9}$/
console.log(reg.test('13622223332'))
```

5）检查一个字符串中是否含有 . \

```js
/*
    . 表示除换行符外的任意单个字符
    \是转义字符
    使用\.表示.
    使用\\表示\
    注意在构造函数中
        用\\.表示.
        用\\\\表示\
*/
reg = /\./
console.log(reg.test('acs.sss'))
reg = /\\/
console.log(reg.test('acs\\sss'))
```

6）转义字符

```js
/*
    \w  任意字母、数字、_   [A-z0-9_]
    \W  除了字母、数字、_   [^A-z0-9_]
    \d  [0-9]
    \D  [^0-9]
    \s  空格
    \S  除了空格
    \b  单词边界
    \B  除了单词边界
*/
reg = /\W/
console.log(reg.test('123ssd__'))
reg = /\S/
console.log(reg.test(' '))
reg = /\bchild\B/
console.log(reg.test('Hello children'))
```

7）实例

```js
str = '   Hel  lo  '
console.log(str)
//去除开头空格
reg = /^\s*/
str = str.replace(reg,'')
console.log(str)
//去除结尾空格
reg = /\s*$/
str = str.replace(reg,'')
console.log(str)
//去除开头和结尾的空格
reg = /^\s*|\s*$/g
str = str.replace(reg,'')
console.log(str)

//邮件的正则表达式
//user@mail.server.name
//任意字母或数字或下划线至少三位 .任意字母或数字或下划线 @ 任意字母或数字 .任意字母2-5位 .任意字母2-5位
let reg = /^\w{3,}(\.\w+)*@[A-Za-z0-9]+(\.[a-zA-Z]{2,5}){1,2}/
let result = reg.test('1501731393.t_@qq.com')
console.log(result)
```



## 五、ES10新特性速览

### 1.Object.fromEntries()

```js
//Object.fromEntries()
//此方法将一个二维数组或一个map对象转换为普通对象
const arr = [
    ['name','atguigu'],
    ['cities','北京，上海','深圳']
]
const result = Object.fromEntries(arr)
console.log(result)
/*
{
    "name": "atguigu",
    "cities": "北京，上海"
}
*/
const arr = new Map([
    ['name','尚硅谷'],
    ['xueke','前端,Java']]
)
const result = Object.fromEntries(arr)
console.log(result)
/*
{
    "name": "尚硅谷",
    "xueke": "前端,Java"
}
*/
//此方法可以看作是ES8中Object.entries()的逆运算
const arr = Object.entries({
    name:'尚硅谷',
    xueke: '前端'
})
console.log(arr)
/*
[
    [
        "name",
        "尚硅谷"
    ],
    [
        "xueke",
        "前端"
    ]
]
*/
```

### 2.trimStart trimEnd 清除左侧/右侧空格

```js
//trimStart trimEnd 清除左侧/右侧空格
let str = '    iloveyou    '
console.log(str)
console.log(str.trimStart())
console.log(str.trimEnd())
console.log(str.trim())
```

### 3.flat flatMap

```js
//flat 将多维数组转化为低维数组
//1. 二维降一维
const arr = [1,2,3,4,5,[6,7]]
console.log(arr.flat()) //[1, 2, 3, 4, 5, 6, 7]
//2. 三维降二维
const arr = [1,2,3,4,5,[6,7,[8,9]]]
console.log(arr.flat()) //[1, 2, 3, 4, 5, 6, 7,[8,9]]
//3. 三维降一维
const arr = [1,2,3,4,5,[6,7,[8,9]]]
//flat() 参数为深度，默认为1
console.log(arr.flat(2)) //[1, 2, 3, 4, 5, 6, 7, 8, 9]
//flatMap
const arr = [1,2,3,4]
const result = arr.flatMap(item => [item*10]) //相当于arr.map(item => item*10)
console.log(result) //[10, 20, 30, 40]
```

### 4.Symbol.prototype.description

```js
let s = Symbol('尚硅谷')
console.log(s.description) //尚硅谷
```

## 六、ES11新特性速览

### 1.class私有属性

```js
//私有属性
class Person{
    name
    #age
    #weight
    constructor(name,age,weight){
        this.name = name
        this.#age = age
        this.#weight = weight
    }
intro(){
    console.log(this.name)
    console.log(this.#age)
                console.log(this.#weight)
                }
}
const girl = new Person('晓红',18,'45kg')
console.log(girl)
/*
{
    name: "晓红"
    #age: 18
    #weight: "45kg"
}
*/
console.log(girl.#age) //报错
            girl.intro()
/*
    晓红
    18
    45kg
*/
```

### 2.Promise.allSettled()方法

```js
//Promise.allSettled()方法
//接受promise的数组，返回的是一个成功的promise，里面包含promise数组中的状态和成功或失败值
const p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('商品数据 -1')
    },1000)
})
const p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        // resolve('商品数据 -2')
        reject('出错啦')
    },1000)
})
const result = Promise.allSettled([p1,p2])
console.log(result)
/*
{
    [[PromiseState]]: "fulfilled",
    [[PromiseResult]]: [
        {
            "status": "fulfilled",
            "value": "商品数据 -1"
        },
        {
            "status": "rejected",
            "reason": "出错啦"
        }
    ]
}
*/

//Promise.all()方法，
//如果都成功，返回每个成功的值，如果有失败，报错并返回失败的值
const result = Promise.all([p1,p2])
console.log(result)
/*全部成功
{
        [[PromiseState]]: "fulfilled",
        [[PromiseResult]]: [
            "商品数据 -1",
            "商品数据 -2"
        ]
}
*/
/*有失败
{
    [[PromiseState]]: "rejected"
    [[PromiseResult]]: "出错啦"
}

Uncaught (in promise) 出错啦
*/
```

### 3.String.prototype.matchAll()方法

```js
//String.prototype.matchAll()方法
let str = `
<ul>
    <li>
        <a>肖申克的救赎</a>
        <p>上映日期：1994-09-10</p>   
    </li>
    <li>
        <a>阿甘正传</a>
        <p>上映日期：1994-07-06</p>   
    </li>    
</ul>`
//声明正则
const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>.*?<\/li>/sg
//旧方法
while(result = reg.exec(str)){
    console.log(result)
}
//新方法
const result = str.matchAll(reg)
// str.matchAll(reg)是一个可迭代对象，可以使用for...of或扩展运算符来获取数据
for(let v of result){
    console.log(v)
}
/*
[
    "<li>\n                <a>肖申克的救赎</a>\n                <p>上映日期：1994-09-10</p>   \n            </li>",
    "肖申克的救赎",
    "上映日期：1994-09-10"
]
[
    "<li>\n                <a>阿甘正传</a>\n                <p>上映日期：1994-07-06</p>   \n            </li>",
    "阿甘正传",
    "上映日期：1994-07-06"
]
*/
console.log([...result])
/*
[
    [
        "<li>\n                <a>肖申克的救赎</a>\n                <p>上映日期：1994-09-10</p>   \n            </li>",
        "肖申克的救赎",
        "上映日期：1994-09-10"
    ],
    [
        "<li>\n                <a>阿甘正传</a>\n                <p>上映日期：1994-07-06</p>   \n            </li>",
        "阿甘正传",
        "上映日期：1994-07-06"
    ]
]
*/
```

### 4.可选链操作符

```js
//可选链操作符
//语法：?.
function main(config) {
    //旧语法
    // const dbhost = config && config.db && config.db.host
    //新语法
    const dbhost = config?.db?.host
    console.log(dbhost)
    }
main({
    db: {
        host: '192.168.1.100',
        username: 'root'
    },
    cache: {
        host: '192.168.1.200',
        username: 'admin'
    }
})
```

### 5.动态import

```
<dir> js
		app.js
		hello.js
index.html
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <input type="button" value="点击" id="btn">
    <script src="./js/app.js"></script>
</body>
</html>
```

hello.js

```js
export function sayHello(){
    console.log('Hello')
}
```

app.js

```js
const btn = document.getElementById('btn')
btn.onclick = function(){
    import('./hello.js').then(module=>{
        module.sayHello()
    })
}
```

### 6.BigInt大整形

```js
//BigInt大整形
let n = 123n
console.log(n, typeof n) //123n "bigint"
//函数
let n = 123
console.log(BigInt(n)) //123n
//注意只能是整数才能转换为大整形，浮点数不可以
//大数值运算
//最大安全数值
let max = Number.MAX_SAFE_INTEGER
console.log(max) //9007199254740991
console.log(max+1) //9007199254740992
console.log(max+2) //9007199254740992
//转换为大整形进行运算
console.log(BigInt(max)) //9007199254740991n
console.log(BigInt(max)+BigInt(1)) //9007199254740992n
console.log(BigInt(max)+BigInt(2)) //9007199254740993n
```

### 7.globalThis

```js
//浏览器中、nodejs中都可以使用。可以忽略环境操作全局变量
console.log(globalThis)//在浏览器中就是Window对象
```

