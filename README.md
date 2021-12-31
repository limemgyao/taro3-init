node >= 9.10.0
Taro version >= 1.2.21

### INSTALL
```js
npm i
```

### DEV
```js
npm run dev:weapp
npm run dev:weapp:production

```

### BUILD
```js
npm run build:weapp
npm run build:weapp:production
```

###发布
```
npm run build:weapp:production
```

如果package.json文件里命令中没有配置BUILD_ENV这个字段
process会找不到根目录下的.env对应环境的文件，则默认是.env文件

process.env一般只有两个值 
    development
    production

只有配置这个dotenv-flow process才会集合.env的变量

package.json 里npm  BUILD_ENV 变量值 对应的是.env.production 不同环境变量名


















