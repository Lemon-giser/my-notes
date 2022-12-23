## node 打包 ncc

https://github.com/vercel/ncc



## 基本使用

```
$ ncc build input.js -o dist
```



## TS

```
pnpm add typescript -D
```



添加 tsconfig.json

```JSON
{
  "compilerOptions": {
    "target": "ES2015",
    "moduleResolution": "Node"
  }
}
```

