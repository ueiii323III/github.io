# 前端和后端分离部署指南

## 项目结构

### 仓库 1: sun-kexin-portfolio (前端展示)
- 包含首页、作品展示、关于页面
- 不包含管理功能
- 部署到 GitHub Pages

### 仓库 2: sun-kexin-admin (后端管理)
- 包含完整的后台管理系统
- 包含作品管理、设置等功能
- 部署到 GitHub Pages 或其他平台

## 部署步骤

### 前端仓库部署

1. **创建新仓库**
   ```bash
   # 在 GitHub 上创建 sun-kexin-portfolio 仓库
   git clone https://github.com/你的用户名/sun-kexin-portfolio.git
   ```

2. **配置 vite.config.ts**
   ```typescript
   export default defineConfig({
     // ... 其他配置
     base: '/sun-kexin-portfolio/', // GitHub Pages 仓库名
   })
   ```

3. **部署命令**
   ```bash
   npm run build
   npm run deploy
   ```

### 后端仓库部署

1. **创建新仓库**
   ```bash
   # 在 GitHub 上创建 sun-kexin-admin 仓库
   git clone https://github.com/你的用户名/sun-kexin-admin.git
   ```

2. **配置 vite.config.ts**
   ```typescript
   export default defineConfig({
     // ... 其他配置
     base: '/sun-kexin-admin/',
   })
   ```

3. **构建和部署**
   ```bash
   npm run build
   npm run deploy
   ```

## 代码分离说明

### 前端保留的文件：
- `src/views/Home.vue`
- `src/views/Portfolio.vue`
- `src/views/PortfolioDetail.vue`
- `src/views/About.vue`
- `src/components/AppHeader.vue`
- `src/components/AppFooter.vue`
- `src/stores/works.ts` (只读版本)
- 相关样式和资源

### 后端保留的文件：
- 所有 admin 相关文件
- `src/views/admin/`
- `src/layouts/AdminLayout.vue`
- 完整的管理功能

## 访问地址
- 前端：`https://你的用户名.github.io/sun-kexin-portfolio/`
- 后端：`https://你的用户名.github.io/sun-kexin-admin/`