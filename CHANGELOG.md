# 更新记录

> 以下带有 [update] 前缀的为更新，需要注意。而带有 [fix] 前缀的更新为异常修复，建议尽快更新。

## 3.3.4

* [fix] 修复 gulp#4.0 在编译文件之后不修改文件时间的问题。[#issue1461](https://github.com/gulpjs/gulp/issues/1461)

## 3.3.3

* [fix] 修复 CDN 前缀操作无效的问题。

## 3.3.2

* [fix] 修复 include 命令引入.开头的资源时 scss 报错的问题。
* [fix] 修复不使用 CDN 前缀的时候目录层级嵌套错误的问题。
* [update] 更新了第三方依赖包的版本。

## 3.3.0

* [update] 新增 include 命令引入图片资源时当文件小于2K时会用base64替换图片的功能。
* [update] 更新了第三方依赖包的版本。

## 3.2.3

* [fix] 修复 include 命令引入数字开头的资源时 scss 报错的问题。

## 3.2.2

* [fix] 修复在开发模式下无法正确编译 scss 的问题。

## 3.2.1

* [fix] 修复在开发模式下无法正确识别 scss 的问题。

## 3.2.0

* [update] 现在提供原生 css 和 ES5 代码的支持。
* [update] 更新了一些依赖库的版本。
* [update] 更新了 README 文档的部分描述。

## 3.1.3

* [fix] 修复在使用``` include ```命令的时候会重复写入的问题。

## 3.1.2

* 在编译任务中添加了生成环境的判断代码。
* [fix] 修复第三方 sass 无法使用的问题。

## 3.1.0

* 修改 SASS 库引入方式为数组传值
* 新增``` init ```命令的``` --update ```来进行平缓升级
* 修改二维码尺寸
* 隐藏``` UglifyJsPlugin ```在部署代码时输出警告

## 3.0.4

* 现在 nuts 优先加载本地的代码，如果本地不存在才会加载全局的任务。
* [fix] 修正了开发时无法及时刷新页面的问题。
* [fix] 修正了编译时缺失关键字的问题。(add ```--dir xxx```)
* [fix] 修正了编译时无法正确加载插件的问题。

## 3.0.0

* [update] 安装方式改为全局安装, 现在可以在全局中使用下面的命令了。
* [update] 更新了 gulp 的版本（3.x=>4.x）。
* [update] 新增了``` nuts init ```命令。
* [update] 更新了``` gulp create ```命令 =>``` nuts create ```。
* [update] 更新了``` gulp dev ```命令 =>``` nuts dev```。
* [update] 更新了``` gulp build ```命令 =>``` nuts build```。
* [update] 更新了``` gulp include ```命令 =>``` nuts include```。
* [update] 更新了``` gulp clean ```命令 =>``` nuts clean```。
* [fix] 修复一些积累的问题。

## 2.1.4

* [fix] 修复 build 命令静态资源重复替换的问题。
* 优化了一些代码结构,引入了Generator。

## 2.1.3

* [fix] 修复 create 命令在创建多级目录时报错的问题。
* 配置文件中移除了多余的字段。
* 更新的引用库的版本号。
* 优化了一些代码结构。

## 2.1.2

* [fix] 修复在活动类页面时 include 命令失效的问题。
* 新增了 include 命令的帮助命令,具体可查看 --help 命令。

## 2.1.0

* [update] 新增了 include 命令,通过这个命令可以将 image 文件夹下的图片方便的引入到 scss 文件中。

## 2.0.0

* [fix]    修正了在src 文件不存在时执行 create 命令报错的问题
* [update] 移除了之前使用的compass 编译工具，替换成了 node-sass 来进行 scss 文件的编译
* [update] 移除了多余默认的 scss 库，替换成了我自己的 nuts-scss 库来作为compass 的替代。
* [update] 更新了配置文件，从而可以通过修改配置文件来进行 scss 库的配置

## 1.0.0

* #21  版本更新到稳定的1.0.0版本
* 替换了 gulp-replace 插件
* 修改了修改 HTML 文件的顺序
* 添加注释

## 0.5.1

* 更新 README 文档说明。
* [fix]   clean 命令现在将会正确删除对应的文件夹，并且可以接受参数来删除特定的目录了 #18
```
eg：gulp clean --dir xxx,xxx,xxx
```
* [fix]    修正了 dev 模式下的根目录错误问题 #17
* [update] 丰富了模板的内容，并更新了 create 命令。
* [update] 现在更新之前都会删除之前存在的 nuts 文件夹了。

## 0.5.0
* 更新了 README 文档，更加准确的描述项目了。
* [update] 更新了配置文件。
* [fix]    删除了基础文件中不用的模板，并添加了常用的模板。
* [update] 新增了 controller 文件来替代之前的 main 入口。
* [fix]    重构了各个任务文件，将相互的依赖和需要的参数抽象到 controller 模块中。
* [update] 添加了通过配置来控制是否添加 CDN 的功能。
* [update] 使用 create 任务代替之前的 init_project 任务。
* 更新了第三方依赖的版本号。
* #14 需求内的内容也全部完成。
