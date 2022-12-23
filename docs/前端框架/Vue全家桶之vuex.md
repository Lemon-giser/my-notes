## 总结Vuex的用法

### 1. 在vue ui 中安装vuex后，生成src/store文件夹

index.js文件结构应当如下：

```js
import Vue from 'vue'
import Vuex from 'vuex'

import modulesOne from './modules/modulesOne'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const state = {
  musiclist: [],
  nowmusic: '',
  nowmusicmenu: {},
  musicmenus: []
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    modulesOne
  }
})
```

### 2. 解释

1. 将数据存放到`state`对象当中
2. 暴露 `new Vuex.Store(options)`对象
3. options应当包括
   1. state
   2. mutations
   3. getters
   4. actions
   5. modules

## State

在一个组件中，引用数据的方式如下：

1. 使用`this.$store.state.变量名`

   ```js
   this.$store.state.count
   ```

2. 导入语句` import {mapState} from 'vuex'`，在一个方法中使用扩展运算符`...mapState(['变量名'])`导入

    ```js
    import {mapState} from 'vuex'
    computed:{
        ...mapState(['count'])
    }
    ```

## Mutation

使用Mutations定义方法，在这些方法中去修改state的数据。例如：

```js
mutations: {
    add(state){//第一个参数必须为state
        state.count++
    }
}
```

引用Mutations的方法：

1. 使用` this.$store.commit('add'[,参数])`语句

2. 导入`import {mapState,mapMutations} from 'vuex'`，用扩展运算符导入方法，直接调用方法`this.函数名()`

   ```js
   import {mapState,mapMutations} from 'vuex'
   methods:{
       ...mapMutations(['sub']),
       remove(){
           this.sub()
       }
   },
   ```

3. 注意：不能写异步操作 setTime...  因为调试器不能监听到变量的改变

## Action

用来处理异步的方法放在actions中。用法与Mutations类似。

1. 定义异步的方法

   ```js
   actions: {
       addAsync(context){  // 传参 step
           setTimeout(()=>{
               context.commit('add') // 传参 step
           },1000)
       }
   },
   ```

2. 调用方式1：语句`this.$store.dispatch('addAsync')`

3. 调用方式2：导入`import {mapState,mapMutations,mapActions} from 'vuex'`，扩展运算符导入方法，直接调用

   ```js
   import {mapState,mapMutations,mapActions} from 'vuex'
   methods:{
       ...mapActions(['subAsync'])
       remove3(){
           this.subAsync()
       },
   }
   ```

## Getter

用于包装数据并产生新的数据，但不会改变数据。

1. 定义方法：

   ```js
   getters:{
       showNum(state){
           return `当前的最新数量是${state.count}`
       }
   }
   ```

2. 调用`$store.getters.函数名`

3. `...mapGetters(['showNum'])`

   ```js
   import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
   computed:{
       ...mapState(['count']),
       ...mapGetters(['showNum']), //映射为方法
   }
   ```

   

## modules

用来导入子库

## 小结

1. 第一种引用方式：
   + this.$store.state.变量名
   + this.$store.commit('add'[,参数])
   + this.$store.dispatch('addAsync')
   + $store.getters.方法名

2. 第二种引用方式

   ```js
   import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
   ```

   ```
   computed:{
       ...mapState(['count']),
       ...mapGetters(['showNum']), //映射为方法
   }
   ```

   ```js
   methods:{
       ...mapActions(['subAsync']),
       ...mapMutations(['sub']),
   }
   ```

   

