# GitHub Pages 部署指南

## 前置条件

1. 安装 Git for Windows：
   - 访问 https://git-scm.com/download/win
   - 下载并安装 Git for Windows
   - 安装时选择默认选项即可

2. 创建 GitHub 仓库：
   - 访问 https://github.com
   - 创建新仓库，命名为 `sun-kexin-personal-website`
   - 可以选择公开或私有

## 部署步骤

### 1. 初始化 Git 仓库
```bash
cd "c:/Users/孙可馨/CodeBuddy/个人博客"
git init
git add .
git commit -m "Initial commit - 完整版个人网站"
```

### 2. 连接到 GitHub 仓库
```bash
git remote add origin https://github.com/你的用户名/sun-kexin-personal-website.git
git branch -M main
git push -u origin main
```

### 3. 部署到 GitHub Pages
```bash
npm run deploy
```

## 如果部署失败

### 方法一：手动部署
1. 构建项目：
   ```bash
   npm run build
   ```

2. 将 `dist` 文件夹内容推送到 `gh-pages` 分支：
   ```bash
   git checkout --orphan gh-pages
   git --work-tree add -A
   git --work-tree commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   git checkout main
   ```

### 方法二：使用 GitHub Actions
在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 启用 GitHub Pages

1. 访问您的 GitHub 仓库
2. 进入 Settings > Pages
3. 在 Source 中选择：
   - 如果使用 `gh-pages` 分支：选择 `gh-pages` 分支和 `/ (root)`
   - 如果使用 GitHub Actions：选择 `GitHub Actions`

4. 点击 Save

## 验证部署

部署完成后，您的网站将在以下地址可用：
```
https://你的用户名.github.io/sun-kexin-personal-website
```

## 当前项目状态

✅ 已完成：
- 恢复了完整的 TDesign 组件库
- 恢复了原始的导航栏和页脚设计
- 恢复了原始的 Home.vue 页面
- 项目构建成功（包含所有资源文件）
- 安装了 gh-pages 工具

⏳ 待完成：
- 安装 Git
- 创建 GitHub 仓库
- 执行部署命令

## 项目特性

当前版本包含：
- 🎨 TDesign Vue Next 组件库
- 📱 响应式设计
- 🌈 现代化玻璃拟态UI
- 🖼️ 图片展示功能
- ⚡ 快速加载优化
- 🎯 SEO 友好配置

## 注意事项

1. 确保在 GitHub 仓库设置中启用了 Pages 功能
2. 如果使用自定义域名，需要在 `vite.config.ts` 中配置正确的 `base` 路径
3. 大文件（如图片）可能需要一些时间来首次加载

## 故障排除

如果页面无法正常显示：
1. 检查浏览器控制台是否有错误信息
2. 确认资源文件路径是否正确
3. 检查 GitHub Pages 设置是否正确启用
4. 清除浏览器缓存后重试