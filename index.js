const xlsx = require('node-xlsx')
const fs = require('fs')
const { writeFile: _writeFile } = require('fs')
const path = require('path')
export class ReadExcel2Json {
  constructor () {
    return (dirPath, outputFileName) => this.writeFile(dirPath, outputFileName)
  }

  /**
   * 递归读取文件夹数据
   * @param {String} entry 文件入口
   * @returns {String} 序列化的对象数据
   */
  readDir (entry) {
    const allData = {}
    const dirInfo = fs.readdirSync(entry)
    console.log('dirInfo===', dirInfo)
    dirInfo.forEach(item => {
      const location = path.join(entry, item)
      const info = fs.statSync(location)
      if (info.isDirectory()) {
        console.log(`dir:${location}`)
        this.readDir(location)
      } else {
        console.log(`file:${location}`)
        const list = xlsx.parse(location) // 需要转换的excel文件
        const data = list[0].data.slice(1) // 数据处理 获取excel表格第一个表除去表头的数据
        const len = data.length
        const cloumn = list[0].data.splice(0, 1)[0]
        const outData = []
        for (let i = 0; i < len; i++) {
          const item = data[i]
          var innerItem = cloumn.reduce((total, current, currentIndex) => {
            if (!total[current]) {
              total[current] = item[currentIndex]
            }
            return total
          }, {})
          outData.push(innerItem)
        }
        // 文件名作为key存入json
        allData[item.slice(0, item.length)] = outData
      }
    })
    return JSON.stringify(allData)
  }

  /**
   *将读取到的数据写出
   * @param {String} dirPath 文件夹入口
   * @param {String} outputFileName  文件输出名
   */
  writeFile (dirPath, outputFileName) {
    const allData = this.readDir(dirPath)
    // 文件编码格式  utf-8
    _writeFile(outputFileName, allData, 'utf-8', err => {
      if (!err) {
        console.log('文件生成成功')
      } else {
        console.log('文件生成失败')
      }
    })
  }
}