# 完整的前端和后端分离部署指南

## 📋 概述

本指南将帮助你将个人博客项目分离为两个独立的 GitHub 仓库：
- `sun-kexin-portfolio` - 前端展示网站
- `sun-kexin-admin` - 后端管理系统

## 🚀 快速开始

### 方法一：自动分离脚本（推荐）

```bash
# 1. 分离代码为两个仓库
node split-repos.js all

# 2. 手动创建 GitHub 仓库后，进入对应目录推送代码
cd sun-kexin-portfolio
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/sun-kexin-portfolio.git
git push -u origin main

cd ../sun-kexin-admin
git init
git add .
git commit -m "Initial commit"  
git remote add origin https://github.com/你的用户名/sun-kexin-admin.git
git push -u origin main
```

### 方法二：手动部署

#### 1. 在 GitHub 创建仓库
- `sun-kexin-portfolio` - 前端展示
- `sun-kexin-admin` - 后端管理

#### 2. 克隆仓库
```bash
git clone https://github.com/你的用户名/sun-kexin-portfolio.git
git clone https://github.com/你的用户名/sun-kexin-admin.git
```

#### 3. 使用自动化部署脚本
```bash
# 部署前端
node deploy-split.js portfolio 你的用户名

# 部署后端
node deploy-split.js admin 你的用户名
```

## 📁 项目结构

### 前端仓库 (sun-kexin-portfolio)
```
sun-kexin-portfolio/
├── src/
│   ├── views/
│   │   ├── Home.vue          # 首页
│   │   ├── Portfolio.vue     # 作品展示
│   │   ├── PortfolioDetail.vue # 作品详情
│   │   └── About.vue         # 关于页面
│   ├── components/
│   │   ├── AppHeader.vue     # 头部组件
│   │   └── AppFooter.vue     # 底部组件
│   ├── stores/
│   │   └── works.ts          # 作品数据（只读）
│   └── router/
│       └── portfolio.ts      # 前端路由
├── vite.portfolio.config.ts  # 前端构建配置
└── package.json             # 前端依赖配置
```

### 后端仓库 (sun-kexin-admin)
```
sun-kexin-admin/
├── src/
│   ├── views/
│   │   └── admin/            # 管理页面
│   ├── components/
│   │   └── ImageUpload.vue  # 图片上传组件
│   ├── layouts/
│   │   └── AdminLayout.vue  # 管理后台布局
│   ├── stores/
│   │   ├── auth.ts           # 认证管理
│   │   ├── works.ts          # 作品管理
│   │   └── settings.ts       # 设置管理
│   └── router/
│       └── admin.ts          # 后端路由
├── vite.admin.config.ts     # 后端构建配置
└── package.json             # 后端依赖配置
```

## ⚙️ 配置说明

### Vite 配置差异

**前端配置 (vite.portfolio.config.ts):**
```typescript
export default defineConfig({
  base: '/sun-kexin-portfolio/',  // GitHub Pages 仓库名
  build: {
    outDir: 'dist-portfolio',     // 构建输出目录
  }
})
```

**后端配置 (vite.admin.config.ts):**
```typescript
export default defineConfig({
  base: '/sun-kexin-admin/',      // GitHub Pages 仓库名
  build: {
    outDir: 'dist-admin',         // 构建输出目录
  }
})
```

### 入口文件差异

**前端入口 (main.portfolio.ts):**
- 只包含前台页面组件
- 不包含 TDesign 组件库（简化前端体积）
- 只初始化作品数据

**后端入口 (main.admin.ts):**
- 包含完整的后台管理功能
- 包含 TDesign 组件库
- 初始化认证、作品和设置数据

## 🌐 访问地址

部署成功后，访问地址为：
- **前端展示**: `https://你的用户名.github.io/sun-kexin-portfolio/`
- **后端管理**: `https://你的用户名.github.io/sun-kexin-admin/`

## 🔧 开发调试

### 本地开发
```bash
# 前端开发
npm run dev:portfolio
# 访问: http://localhost:3000

# 后端开发  
npm run dev:admin
# 访问: http://localhost:3001
```

### 构建预览
```bash
# 构建前端
npm run build:portfolio
npm run preview:portfolio

# 构建后端
npm run build:admin
npm run preview:admin
```

## 📦 部署命令

### 使用 npm scripts
```bash
# 部署前端（需要先修改 package.json 中的仓库名）
npm run deploy:portfolio

# 部署后端
npm run deploy:admin
```

### 使用自动化脚本
```bash
# 部署到指定仓库
node deploy-split.js portfolio 你的用户名
node deploy-split.js admin 你的用户名
```

## 🔄 数据同步

### 作品数据共享
两个仓库共享相同的作品数据，但前端是只读的，后端可以编辑。建议：

1. **开发阶段**: 在后端仓库编辑作品
2. **部署前**: 将 `src/stores/works.ts` 的最新内容复制到前端仓库
3. **自动方案**: 使用 GitHub Actions 自动同步

### GitHub Actions 自动同步示例
在前端仓库的 `.github/workflows/sync.yml`:
```yaml
name: Sync Data
on:
  schedule:
    - cron: '0 0 * * *'  # 每天同步一次
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Sync from admin repo
        run: |
          # 同步数据的脚本
```

## 🎯 优势

### 分离部署的好处：
1. **独立维护**: 前端和后端可以独立开发和部署
2. **性能优化**: 前端只加载必要资源，加载速度更快
3. **安全增强**: 后端管理系统独立部署，减少攻击面
4. **团队协作**: 前端和后端可以由不同人员维护
5. **扩展性强**: 未来可以轻松添加更多独立模块

## 🚨 注意事项

1. **路径配置**: 确保 `vite.config.ts` 中的 `base` 路径与仓库名一致
2. **资源路径**: 使用 Vite 的 import 语法导入图片，确保路径正确
3. **路由模式**: 两个仓库都使用 `createWebHistory` 适配 GitHub Pages
4. **数据同步**: 确保两个仓库的作品数据保持同步
5. **环境变量**: 如需要，可以为不同仓库设置不同的环境变量

## 🛠️ 故障排除

### 图片不显示
- 检查 `vite.config.ts` 中的 `base` 配置
- 确认图片使用 import 导入而非字符串路径

### 路由跳转失败
- 检查路由配置是否正确
- 确认 GitHub Pages 的 404 页面重定向设置

### 部署失败
- 检查仓库名称是否正确
- 确认 `gh-pages` 包已正确安装
- 检查 GitHub Pages 设置是否启用

## 📞 技术支持

如果在部署过程中遇到问题，请检查：
1. GitHub 仓库是否正确创建
2. 构建配置是否正确
3. 网络连接是否正常
4. 依赖包是否完整安装

祝你部署成功！🎉