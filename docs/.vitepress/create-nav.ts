const path = require('path')
const fs = require('fs')
const rootPath = path.resolve('./docs')

const result = {
  nav: [],
  sidebar: {}
}

const addSubLink = (path, dirName) => {
  const resultItem = result.nav.find(x => x.text === dirName)

  const arr = fs.readdirSync(path)

  for (let i = 0; i < arr.length; i++) {
    const fileName = arr[i]
    if (fileName.endsWith('.md')) {
      if (resultItem.link === '') resultItem.link = `/${dirName}/${fileName}`
      result.sidebar[`/${dirName}/`][0].items.push({
        text: fileName,
        link: `/${dirName}/${fileName}`
      })
    }
  }
}

const excludeDirNames = ['.vitepress', 'public']

const fileDisplay = (rootPath) => {
  const arr = fs.readdirSync(rootPath)
  arr.forEach(fileName => {
      const fileDir = path.join(rootPath, fileName)
      const stats = fs.statSync(fileDir)

      const isFile = stats.isFile();//是文件
      const isDir = stats.isDirectory();//是文件夹
      if (isFile) {
        // console.log(fileDir);
        // if (fileDir.endsWith('json')) {
        //   sum++
        // }
      }
      if (isDir) {
        if (excludeDirNames.includes(fileName)) {
          // // 删除node_modules
          // fs.rmdirSync(fileDir, {
          //   recursive: true
          // })
          console.log(fileDir)
          // sum++
        } else {
          result.nav.push({
            text: fileName,
            link: ''
          })
          result.sidebar[`/${fileName}/`] = [{
            text: fileName,
            items: []
          }]
          addSubLink(fileDir, fileName)
          // fileDisplay(fileDir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }
      }
    }
  )
}
fileDisplay(rootPath)

const reSort = () => {
  const index = result.nav.findIndex(x => x.text === '其他')
  if (index !== -1 ) {
    result.nav.push(...result.nav.splice(index, 1))
  }
}
reSort()
// console.log(result)
// fs.writeFileSync('./docs/.vitepress/menu.js',`export default ${JSON.stringify(result)}`)
export default result
