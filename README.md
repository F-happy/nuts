# Nuts 前端构建工具
[![Build Status](https://travis-ci.org/F-happy/nuts.svg?branch=develop)](https://travis-ci.org/F-happy/nuts)
[![npm](https://img.shields.io/npm/v/wishbao.svg?style=flat)](https://www.npmjs.com/package/wishbao)
[![npm](https://img.shields.io/npm/l/wishbao.svg?style=flat)](https://www.npmjs.com/package/wishbao)
[![npm](https://img.shields.io/npm/dt/wishbao.svg?style=flat)](https://www.npmjs.com/package/wishbao)

> 这是一个基于 gulp#4.x 的前端工程构建集合，包括了最常见的新建项目，开发项目和最后的编译发布项目。其中 JavaScript 支持 ES2015 的语法，CSS 部分采用 SCSS。


### 新建项目目录结构说明。

    --- dist 这个目录是线上编译出来的代码，属于最终用户访问的代码。
        --- 源码目录中对应的最终代码目录，仅仅只放html文件
        --- static 放置静态文件的地方，真实环境中为CDN的目录地址
    --- dev 开发模式下的目标文件夹。
    --- src 源代码目录，所有的源代码都放在这里
    --- nuts.config.json 配置文件
    --- package.json 项目的依赖说明文件，可用于初始化项目和安装依赖包

    
### 工具安装

> 初始化的时候执行以下命令安装必要的依赖

-	nodejs运行环境  
    * node >= 6.6.0 npm >= 3.10.3

```
$ npm install -g n
$ n stable
```

-    通过 npm 进行安装

```
$ npm install -g wishbao
```


## Nuts 文档

#### 初始化项目：
```
// 如果需要更新配置文件则需要添加 --update 参数
$ nuts init [--update]
```

#### 新建项目：
```
// 新建项目支持下划线的命名方式, 项目会按照驼峰命名的方式进行下划线的转换

$ nuts create --name <项目名称>
```

#### 开发项目：
```
$ nuts dev --name <项目名称> [--port <端口号>]
```

#### 清除缓存：
```
$ nuts clean
```

#### 编译项目：
```
// 如果需要编译出指定版本请在后面添加 --ver 参数
$ nuts build --dir <项目名称> [--ver <指定版本号>]
```

#### 导入静态资源：
```
$ nuts include --name <项目名称>
```

### 命令说明：
* 安装之后修改配置文件之后就可以通过 create 命令来创建新的项目了。
* 项目默认监听端口号2333，在浏览器中打开 http://localhost:2333 即可看到当前项目页面，如果端口号冲突或者同时启动多个项目则在 dev 命令后面添加 --port 参数来动态修改端口号。
* 关于具体配置的内容，请查看配置文件中的说明。

### 配置文件说明：
```javascript
{
	// 本地开发服务器监听的端口号
    "serverPort": 2333,
    
	// 开发环境中的源码路径
    "sourceDir": "src",

	// 需要部署的目标路径
    "distDir": "dist",

	// 目标路径中静态文件需要放置的目录
    "staticDir": "static",

	// 开发环境中需要开发的项目名称
    "name": "example",

	// 项目作者
    "author": "jonnyf",

	// 开发时的编译目录
    "devDir": "dev",

	// 编译是否需要添加 cdn
    "needCDN": true,

	// 默认的CDN路径
    "staticURL": "http://cdn.jonnyf.com/images",

    // 代码中的字符串替换内容
    "replaceStr": 666,

    // html 文件的 title
    "title": "exampleTitle",

    // 样式预编译支持版本
    "styleType": "css",

    // JavaScript 版本
    "target": "ES6",

	// 引入的 sass 库,默认采用了 nuts-scss 库,使用时需要先安装。传入的值需要是一个数组。
    // 'sassLib': []
    "sassLib": ["nuts-scss"]
}
```

### 关于 CDN：
> cdn 根目录的子目录 cdn_dir/指向dist/static/

```
* cdn 项目中包含的图片，字体，css和js文件都会部署到 CDN 目录中。
* cdn 更新通过发布新版本进行更新。
* 项目中的html文件不在缓存中！
* 例子：http://cdn.jonyf.com/cdn_dir/test/1.1.1/css/test.css
```

### 更新日志 [CHANGELOG]

[CHANGELOG]: CHANGELOG.md
