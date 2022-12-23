## vue脚手架

### 创建项目
1. 第一种方式

    vue create vue_proj_01
    
2. 第二种方式

    vue ui
### 更改启动端口
1. 第一种方式（不推荐）

    在`package.json`中添加：
    ```
      "vue": {
        "devServer": {
          "port": 8888,
          "open": true
        }
    ```
2. 第二种方式
   
    创建`vue.config.js`文件
    ```js
    module.exports = {
      devServer: {
        // 自动打开浏览器
        open: true,
        port: 8878
      }
    }
    ```

###  使用Element-UI
#### 第一种方式
1. npm i element-ui -S
2. 在`main.js`中添加代码：
    ```js
    // 导入组件库
    import ElementUI from 'element-ui'
    // 导入组件相关样式
    import 'element-ui/lib/theme-chalk/index.css'
    // 配置Vue插件
    Vue.use(ElementUI)
    ```
#### 第二种方式
1. 启动vue ui
2. 插件中添加vue-cli-plugin-element
3. 选择按需导入

