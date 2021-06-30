import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'
import fs from 'fs'
import lessToJs from 'less-vars-to-js'
import config from './config'
const themeVariables = lessToJs(
  fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8')
)

const env = process.argv[process.argv.length - 1]
const base = config[env]
console.log('process:::env', process.argv)

// https://vitejs.dev/config/
export default defineConfig({
  base: base.cdn,
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`
          // style: (name) => `antd/lib/${name}/style/index.less`
        }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联js
        javascriptEnabled: true,
         // 重写 less 变量，定制样式
        modifyVars: themeVariables 
      }
    }
  }
})
