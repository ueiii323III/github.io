# GitHub Pages 部署指南

## 🚀 快速部署步骤

### 第一步：安装 Git
1. 访问 [Git 官网](https://git-scm.com/download/win)
2. 下载并安装 Git for Windows
3. 安装完成后，打开命令行运行：
```bash
git --version
```

### 第二步：创建 GitHub 账号和仓库
1. 访问 [GitHub](https://github.com/) 并注册账号
2. 点击右上角 "+" → "New repository"
3. 仓库名称：`sun-kexin-personal-website`
4. 选择 "Public"（必须为公开仓库才能使用 GitHub Pages）
5. 勾选 "Add a README file"
6. 点击 "Create repository"

### 第三步：配置本地 Git
```bash
git config --global user.name "您的用户名"
git config --global user.email "您的邮箱"
```

### 第四步：初始化本地仓库
```bash
cd "c:/Users/孙可馨/CodeBuddy/个人博客"
git init
git add .
git commit -m "Initial commit: 个人博客项目"
```

### 第五步：连接远程仓库
```bash
git remote add origin https://github.com/您的用户名/sun-kexin-personal-website.git
git branch -M main
git push -u origin main
```

### 第六步：启用 GitHub Pages
1. 进入您的 GitHub 仓库
2. 点击 "Settings" 标签
3. 在左侧菜单找到 "Pages"
4. 在 "Source" 部分选择 "GitHub Actions"
5. 保存设置

### 第七步：触发自动部署
1. 推送代码到仓库会自动触发部署：
```bash
git add .
git commit -m "Update project"
git push origin main
```

2. 在 GitHub 仓库中查看 "Actions" 标签页的部署状态

### 第八步：访问您的网站
部署成功后，您的网站将在以下地址可用：
```
https://您的用户名.github.io/sun-kexin-personal-website/
```

## 📝 注意事项

### 重要配置
- ✅ 项目已配置 GitHub Actions 自动部署
- ✅ 路由配置支持 GitHub Pages
- ✅ 构建优化已完成
- ✅ 资源路径已修复

### 自定义域名（可选）
如果需要使用自定义域名：
1. 在仓库的 Settings → Pages 中配置自定义域名
2. 修改 `vite.config.ts` 中的 `base` 配置

### 更新网站
每次更新代码后，只需要：
```bash
git add .
git commit -m "更新内容"
git push origin main
```

GitHub Actions 会自动构建并部署最新版本！

## 🛠️ 手动部署方案

如果不想使用 GitHub Actions，可以手动部署：

### 方案一：使用 gh-pages
```bash
npm install -g gh-pages
npm run deploy
```

### 方案二：手动上传构建文件
1. 构建项目：
```bash
npm run build
```
2. 将 `dist` 文件夹中的所有文件上传到 GitHub 仓库的 `gh-pages` 分支

## 📞 获取帮助

如果遇到问题：
1. 检查 Actions 页面的部署日志
2. 确保仓库是公开的
3. 检查 `package.json` 中的脚本是否正确
4. 验证 `vite.config.ts` 的配置

祝您部署成功！🎉