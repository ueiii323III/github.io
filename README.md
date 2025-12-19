# 欢迎使用你的秒哒应用代码包
秒哒应用链接
    URL:https://www.miaoda.cn/projects/app-8c1ei1cfun7l

## 介绍

孙可馨个人博客 - 一个温暖、清新的个人博客网站，采用粉色主题设计，为武汉理工大学经济专业学生孙可馨量身打造。

### ✨ 特色功能

- 🎨 **温暖粉色主题** - 精心设计的粉色配色方案
- 📝 **Markdown 支持** - 使用 Markdown 编写文章
- 🖼️ **图片自动压缩** - 超过1MB自动压缩优化
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🔐 **权限管理** - 完善的用户角色和权限控制
- 💾 **实时保存** - 草稿自动保存，不怕丢失
- 🎯 **分类管理** - 灵活的文章分类系统

### 📚 快速开始

查看 [快速启动指南](./QUICKSTART.md) 5分钟快速上手！

### 📖 文档

- [快速启动指南](./QUICKSTART.md) - 5分钟快速上手
- [使用说明](./USAGE.md) - 详细的功能使用指南
- [项目总结](./PROJECT_SUMMARY.md) - 完整的技术文档

### 🎯 主要功能

#### 前台展示
- ✅ 文章列表展示（支持分页）
- ✅ 文章详情页（Markdown渲染）
- ✅ 分类浏览
- ✅ 个人信息展示
- ✅ 友情链接
- ✅ 侧边栏导航

#### 后台管理
- ✅ 用户登录/注册
- ✅ 文章管理（创建、编辑、删除、发布）
- ✅ 分类管理
- ✅ 个人信息管理
- ✅ 用户管理
- ✅ 图片上传（自动压缩）

### 🛠️ 技术栈

- **前端**: React 18 + TypeScript + Vite
- **UI**: shadcn/ui + Tailwind CSS
- **后端**: Supabase (PostgreSQL + Auth + Storage)
- **路由**: React Router v6
- **Markdown**: react-markdown

### 📦 初始数据

系统已预设以下数据：

**个人信息**
- 姓名：孙可馨
- 年龄：20
- 学校：武汉理工大学
- 专业：经济2403
- 联系方式：13154715568

**文章分类**
- 生活随笔
- 学习笔记
- 旅行游记
- 读书感悟

**示例文章**
- 欢迎来到我的博客
- 大学生活的第一年

### 🎨 设计特色

- **主色调**：温暖的粉色系 (#FFB6C1)
- **设计风格**：圆润卡片、柔和阴影、简约图标
- **布局**：左侧主内容区 + 右侧个人简介和分类导航
- **响应式**：完美适配桌面和移动设备

### 🔒 安全特性

- ✅ Supabase Auth 认证
- ✅ Row Level Security (RLS)
- ✅ 管理员权限控制
- ✅ 路由守卫
- ✅ 数据验证

### 💡 使用提示

1. **第一个注册的用户将自动成为管理员**
2. 图片上传限制1MB，超出会自动压缩
3. 文章支持 Markdown 格式
4. 可以保存草稿，不会在前台显示

### 📞 技术支持

如遇到问题，请查看：
- [使用说明文档](./USAGE.md)
- [项目总结文档](./PROJECT_SUMMARY.md)

## 目录结构

```
├── README.md # 说明文档
├── components.json # 组件库配置
├── index.html # 入口文件
├── package.json # 包管理
├── postcss.config.js # postcss 配置
├── public # 静态资源目录
│   ├── favicon.png # 图标
│   └── images # 图片资源
├── src # 源码目录
│   ├── App.tsx # 入口文件
│   ├── components # 组件目录
│   ├── contexts # 上下文目录
│   ├── db # 数据库配置目录
│   ├── hooks # 通用钩子函数目录
│   ├── index.css # 全局样式
│   ├── layout # 布局目录
│   ├── lib # 工具库目录
│   ├── main.tsx # 入口文件
│   ├── routes.tsx # 路由配置
│   ├── pages # 页面目录
│   ├── services  # 数据库交互目录
│   ├── types   # 类型定义目录
├── tsconfig.app.json  # ts 前端配置文件
├── tsconfig.json # ts 配置文件
├── tsconfig.node.json # ts node端配置文件
└── vite.config.ts # vite 配置文件
```

## 技术栈

Vite、TypeScript、React、Supabase

## 本地开发

### 如何在本地编辑代码？

您可以选择 [VSCode](https://code.visualstudio.com/Download) 或者您常用的任何 IDE 编辑器，唯一的要求是安装 Node.js 和 npm.

### 环境要求

```
# Node.js ≥ 20
# npm ≥ 10
例如：
# node -v   # v20.18.3
# npm -v    # 10.8.2
```

具体安装步骤如下：

### 在 Windows 上安装 Node.js

```
# Step 1: 访问Node.js官网：https://nodejs.org/，点击下载后，会根据你的系统自动选择合适的版本（32位或64位）。
# Step 2: 运行安装程序：下载完成后，双击运行安装程序。
# Step 3: 完成安装：按照安装向导完成安装过程。
# Step 4: 验证安装：在命令提示符（cmd）或IDE终端（terminal）中输入 node -v 和 npm -v 来检查 Node.js 和 npm 是否正确安装。
```

### 在 macOS 上安装 Node.js

```
# Step 1: 使用Homebrew安装（推荐方法）：打开终端。输入命令brew install node并回车。如果尚未安装Homebrew，需要先安装Homebrew，
可以通过在终端中运行如下命令来安装：
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
或者使用官网安装程序：访问Node.js官网。下载macOS的.pkg安装包。打开下载的.pkg文件，按照提示完成安装。
# Step 2: 验证安装：在命令提示符（cmd）或IDE终端（terminal）中输入 node -v 和 npm -v 来检查 Node.js 和 npm 是否正确安装。
```

### 安装完后按照如下步骤操作：

```
# Step 1: 下载代码包
# Step 2: 解压代码包
# Step 3: 用IDE打开代码包，进入代码目录
# Step 4: IDE终端输入命令行，安装依赖：npm i
# Step 5: IDE终端输入命令行，启动开发服务器：npm run dev -- --host 127.0.0.1
```

### 如何开发后端服务？

配置环境变量，安装相关依赖
如需使用数据库，请使用 supabase 官方版本或自行部署开源版本的 Supabase

### 如何配置应用中的三方 API？

具体三方 API 调用方法，请参考帮助文档：[源码导出](https://cloud.baidu.com/doc/MIAODA/s/Xmewgmsq7)，了解更多详细内容。

## 了解更多

您也可以查看帮助文档：[源码导出](https://cloud.baidu.com/doc/MIAODA/s/Xmewgmsq7)，了解更多详细内容。
