# 网页版 GitHub 详细部署步骤

## 📋 前期准备

### 1. 确保本地环境准备就绪
- [ ] 已安装 Node.js
- [ ] 已安装 Git
- [ ] 项目代码已下载到本地
- [ ] 已运行 `npm install` 安装依赖

### 2. 获取 GitHub 用户名
- 登录 GitHub，查看右上角头像旁的用户名
- 例如：如果地址显示 `github.com/zhangsan`，则用户名是 `zhangsan`

---

## 🎯 第一步：在 GitHub 创建两个仓库

### 创建前端仓库 (sun-kexin-portfolio)

1. **登录 GitHub**
   - 打开 https://github.com
   - 登录你的账号

2. **创建新仓库**
   - 点击右上角的 `+` 号
   - 选择 `New repository`

3. **填写仓库信息**
   ```
   Repository name: sun-kexin-portfolio
   Description: 孙可馨个人作品展示网站
   Public: ✅ 选择 Public (免费版必须选择公开)
   Add a README file: ❌ 不要勾选
   Add .gitignore: ❌ 不要勾选
   Choose a license: ❌ 不要勾选
   ```

4. **点击创建**
   - 点击绿色按钮 `Create repository`

5. **复制仓库地址**
   - 创建后会显示快速设置页面
   - 复制 HTTPS 地址：`https://github.com/你的用户名/sun-kexin-portfolio.git`

### 创建后端仓库 (sun-kexin-admin)

1. **重复上述步骤**
   - 再次点击 `+` → `New repository`
   - 仓库名填写：`sun-kexin-portfolio`

2. **填写仓库信息**
   ```
   Repository name: sun-kexin-admin
   Description: 孙可馨个人网站后台管理系统
   Public: ✅ 选择 Public
   其他选项都不要勾选
   ```

3. **创建并复制地址**
   - 点击 `Create repository`
   - 复制地址：`https://github.com/你的用户名/sun-kexin-admin.git`

---

## 🔄 第二步：分离代码并推送到 GitHub

### 方法一：使用自动化脚本（推荐）

1. **打开命令提示符**
   - 按 `Win + R`，输入 `cmd`，回车
   - 或按 `Win + X`，选择 `Windows PowerShell`

2. **进入项目目录**
   ```bash
   cd C:\Users\孙可馨\CodeBuddy\个人博客
   ```

3. **运行分离脚本**
   ```bash
   node split-repos.js all
   ```

4. **等待脚本执行完成**
   - 脚本会创建两个文件夹：`sun-kexin-portfolio` 和 `sun-kexin-admin`
   - 会显示复制的文件列表

### 方法二：手动操作（如果脚本失败）

如果自动化脚本失败，你可以手动复制，但建议优先使用脚本。

---

## 📤 第三步：推送前端代码到 GitHub

### 1. 进入前端目录
```bash
cd sun-kexin-portfolio
```

### 2. 初始化 Git 仓库
```bash
git init
git add .
git commit -m "Initial commit - 前端展示网站"
```

### 3. 连接到 GitHub 仓库
```bash
git remote add origin https://github.com/你的用户名/sun-kexin-portfolio.git
git branch -M main
```

### 4. 推送代码
```bash
git push -u origin main
```

### 5. 输入 GitHub 凭据
- 如果提示输入用户名，输入你的 GitHub 用户名
- 如果提示输入密码，输入你的 Personal Access Token（不是登录密码）
   - 获取 Token 方法：GitHub → Settings → Developer settings → Personal access tokens → Generate new token

---

## 📤 第四步：推送后端代码到 GitHub

### 1. 返回主目录，进入后端目录
```bash
cd ..
cd sun-kexin-admin
```

### 2. 初始化 Git 仓库
```bash
git init
git add .
git commit -m "Initial commit - 后端管理系统"
```

### 3. 连接到 GitHub 仓库
```bash
git remote add origin https://github.com/你的用户名/sun-kexin-admin.git
git branch -M main
```

### 4. 推送代码
```bash
git push -u origin main
```

---

## 🏗️ 第五步：构建项目

### 1. 返回主目录
```bash
cd ..
```

### 2. 构建前端项目
```bash
npm run build:portfolio
```

### 3. 构建后端项目
```bash
npm run build:admin
```

### 4. 确认构建成功
- 检查是否出现 `dist-portfolio` 和 `dist-admin` 文件夹
- 确认没有红色错误信息

---

## 🌐 第六步：启用 GitHub Pages

### 启用前端仓库的 GitHub Pages

1. **访问前端仓库**
   - 打开 https://github.com/你的用户名/sun-kexin-portfolio

2. **进入设置页面**
   - 点击仓库顶部的 `Settings` 标签

3. **找到 Pages 设置**
   - 在左侧菜单中找到 `Pages`
   - 点击进入

4. **配置 Pages**
   ```
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   ```

5. **保存设置**
   - 点击 `Save` 按钮

6. **等待部署**
   - 页面会显示 "Your site is ready to be published at..."
   - 等待几分钟让 GitHub 完成部署

### 启用后端仓库的 GitHub Pages

1. **访问后端仓库**
   - 打开 https://github.com/你的用户名/sun-kexin-admin

2. **重复上述步骤**
   - 进入 `Settings` → `Pages`
   - 选择 `main` 分支，`/ (root)` 文件夹
   - 点击 `Save`

---

## 🎯 第七步：验证部署成功

### 检查前端网站
1. **访问地址**
   - 打开：`https://你的用户名.github.io/sun-kexin-portfolio/`

2. **检查功能**
   - [ ] 首页正常显示
   - [ ] 作品展示页面正常
   - [ ] 关于页面正常
   - [ ] 图片正常显示

### 检查后端管理
1. **访问地址**
   - 打开：`https://你的用户名.github.io/sun-kexin-admin/`

2. **检查功能**
   - [ ] 自动跳转到登录页面
   - [ ] 登录功能正常
   - [ ] 管理界面正常显示

---

## 🛠️ 故障排除

### 如果图片不显示
1. **检查 Vite 配置**
   - 确认 `vite.portfolio.config.ts` 和 `vite.admin.config.ts` 中的 `base` 配置正确
   - 应该是：`base: '/sun-kexin-portfolio/'` 和 `base: '/sun-kexin-admin/'`

2. **重新构建**
   ```bash
   npm run build:portfolio
   npm run build:admin
   ```

### 如果推送失败
1. **检查 Token 权限**
   - Personal Access Token 需要 `repo` 权限

2. **重新推送**
   ```bash
   git push -u origin main --force
   ```

### 如果 Pages 不工作
1. **等待更长时间**
   - GitHub Pages 最多需要 10 分钟生效

2. **检查仓库设置**
   - 确认仓库是 Public（免费版要求）
   - 确认选择了正确的分支和文件夹

---

## 📝 重要提醒

### Personal Access Token 获取方法

1. **登录 GitHub**
2. **点击右上角头像 → Settings**
3. **左侧菜单 → Developer settings**
4. **Personal access tokens → Tokens (classic)**
5. **Generate new token → Generate new token (classic)**
6. **填写信息**
   ```
   Note: 个人博客部署
   Expiration: No expiration
   Select scopes: ✅ repo
   ```
7. **Generate token → 复制 token（只显示一次，请保存）**

### 安全提醒
- 不要在公共场合暴露你的 Personal Access Token
- 建议使用 No expiration 以免 token 过期
- token 就相当于密码，请妥善保管

---

## 🎉 成功标志

当你看到以下内容时，说明部署成功：

✅ 前端网站可以正常访问：`https://你的用户名.github.io/sun-kexin-portfolio/`
✅ 后端管理可以正常访问：`https://你的用户名.github.io/sun-kexin-admin/`
✅ 所有图片正常显示
✅ 所有功能正常工作

恭喜你！现在你拥有了一个分离部署的个人博客系统！🎊