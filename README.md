# 前端页面构建工具

## 下面是各目录的说明。

    --- base_libiary 这个目录是放置的一些公共代码
    --- dist 这个目录是线上编译出来的代码，属于最终用户访问的代码，不添加到git托管，现在是为了说明目录结构才进行托管
        --- 源码目录中对应的最终代码目录，仅仅只放html文件
        --- static 放置静态文件的地方，真实环境中为CDN的目录地址
    --- nuts 这个目录是gulp的任务和配置目录
        --- task 任务目录
        --- util 工具目录
        --- main.js gulp的入口文件
    --- src 源代码目录，所有的源代码都托管在这里
            --- test 具体的活动目录
    --- gulpfile.js gulp的开始文件以及开发模式下的配置文件
    --- package.json 项目的依赖说明文件，可用于初始化项目和安装依赖包
    --- README.md 项目的说明文件
    
### 部署方式

> 初始化的时候执行以下命令安装必要的工具

-	compass编译工具

	-	gem install compass

-	compass中引用的第三方库animation

	-	gem install animation --pre

-	nodejs运行环境  
    * 由于部分脚本使用ES6开发，所以请安装最新版本的node。
    * node >= 6.2.0 npm >= 3.8.9

```
    npm install -g n    
    n stable
```

-   安装第三方依赖包

```
npm install 
```

-   运行初始化命令

```
npm run release
```

-   修改配置文件
> 复制gulpfile.js.example为gulpfile.js，并将之前的CDN路径填写到新配置文件中的staticURL字段中。

### 如何部署代码？

#### 执行命令：

-   gulp build --dir xxx
    - 例如： gulp build --dir test
    - 如果需要编译出指定版本请在后面添加 --ver 参数
    - 例如： gulp build --dir test --ver 1.2.0
    - 服务器需要修改gulpfile文件为线上信息
    
#### 关于CDN：cdn根目录的子目录duobao-activity/指向dist/static/
    * cdn 目录下项目中包含的图片，字体，css和js文件都会缓存
    * cdn 更新通过发布新版本进行更新
    * 项目中的html文件不在缓存中！
    * 例子：http://www-static1.iduobao.net/duobao-activity/transfer6/1.1.1/css/transfer6.css

### 开发环境说明：

#### 在开发环境中同样使用gulp进行构建：

* 安装完成后即可通过gulp命令来进行开发了，执行gulp dev 命令进入开发模式。
* 当前项目监听端口号2333，在浏览器中打开 http://localhost:2333 即可看到当前项目页面。
* 在开发一个活动前需要将gulpfile.js.example文件复制出一份并删除后缀中的.example。
* 关于具体配置的内容，在文件中都有相关的说明。

## 前端代码开发规范

### 代码书写规范 [CodeGuide]

[CodeGuide]: http://alloyteam.github.io/CodeGuide/

### 项目开发规范 [git-flow]

* 首先开始新活动时需要先从develop分支上新开feature-分支。
* 开发完成后需要添加merge requests。
* 如果发现线上bug时需要在master分支上新开hotfix分支进行修正。

[git-flow]: http://danielkummer.github.io/git-flow-cheatsheet/index.zh_CN.html
