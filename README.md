# vue-shopback

项目的启动步骤
如果没有使用npm install命令下载相关的依赖包首先需要安装依赖包（项目的根目录和/server目录都需要执行）
1.使用vue ui命令打开可视化的项目
2.项目的启动有两种方式
    第一种是开发环境中启动，第二种是生产环境的启动
    开发环境很简单，直接在任务中的service中启动就行
    生产环境要求较高，需要各种优化达到项目的最优。具体的优化方式详见optimize目录下的pdf文件
3.在生产环境中项目的部署：
    首先新建一个文件夹server,使用npm init命令初始化，然后安装express （使用命令 npm install express -s）
    将优化好的项目build，生成的dist文件夹复制到server目录下
    新建app.js文件，(详见本项目的app.js) 此文件就是项目的启动入口，使用node app.js启动
    项目就算是部署完成了   
