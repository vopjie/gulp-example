### 版本说明 ###
1，新增animate.css @mixin
2，优化browser-sync 的使用方式（proxy指向所配置的域名，开启监听文件变化，自动刷新浏览器）
3，优化postcss 的使用方式（1，浏览器前缀自动添加，2，H5:px2rem转换）
4，新增@mixin backImg()（背景图标）
5，修改 @mixin rgba(), @mixin hexa()（新增css属性变量）
6，优化H5精灵图 图标调用方式（循环引用@mixin）
7，新增图片压缩处理任务（命令行运行 gulp imgmin 压缩指定目录下的图片）

### 使用说明 ###
注：根据项目是WEB端或H5，按需配置gulpfile.js和_icons.scss,以及调用不同的@mixin

1，下载安装nodejs,ruby,如需要请安装git

2，命令行安装ruby:
gem install ruby

3，命令行安装compass
gem install compass

3，如需引用normalize请安装normalize.css
命令行安装compass-normalize
gem install compass-normalize

4，安装插件(非全局)
npm i

5，运行开启gulp自动化
gulp

### 其他说明 ###
README.md           说明文档
gulpfile.js         gulp配置文件
package.js          nodejs插件安装包
config.rb           compass配置文件
.editorconfig       编辑器风格统一配置文件
.jshintrc

/app                项目目录
/app/images/icon/   icon目录
/node_modules       nodejs插件安装目录
