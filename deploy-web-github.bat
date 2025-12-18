@echo off
chcp 65001 >nul
title GitHub 网页版部署助手
color 0A

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║               GitHub 网页版部署助手 v1.0                      ║
echo ║              孙可馨个人博客 - 分离部署工具                     ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM 检查是否在正确的目录
if not exist "package.json" (
    echo ❌ 错误：请在项目根目录运行此脚本！
    echo 当前目录：%CD%
    pause
    exit /b 1
)

REM 获取用户名
set /p username="请输入你的 GitHub 用户名："

echo.
echo 🔄 正在分离代码仓库...
node split-repos.js all

if %errorlevel% neq 0 (
    echo ❌ 代码分离失败，请检查错误信息
    pause
    exit /b 1
)

echo.
echo ✅ 代码分离完成！
echo.
echo 📝 接下来请按以下步骤操作：
echo.
echo 1️⃣  在浏览器中访问：https://github.com
echo 2️⃣  创建两个新仓库：
echo      • sun-kexin-portfolio (前端展示)
echo      • sun-kexin-admin (后端管理)
echo.
echo 3️⃣  仓库设置：
echo      • Repository name: 按上面要求填写
echo      • Description: 可写任意描述
echo      • Public: ✅ 必须选择 Public
echo      • 其他选项都不要勾选
echo.
echo 4️⃣  创建仓库后，复制 HTTPS 地址
echo.
echo 按任意键继续推送代码...
pause >nul

REM 推送前端代码
echo.
echo 📤 正在推送前端代码...
cd sun-kexin-portfolio

git init >nul 2>&1
git add . >nul 2>&1
git commit -m "Initial commit - 前端展示网站" >nul 2>&1
git remote add origin https://github.com/%username%/sun-kexin-portfolio.git >nul 2>&1
git branch -M main >nul 2>&1

echo.
echo 🔄 推送中，请稍候...
echo 如果提示输入用户名，请输入：%username%
echo 如果提示输入密码，请输入 GitHub Personal Access Token
echo.

git push -u origin main

if %errorlevel% neq 0 (
    echo ❌ 前端代码推送失败，请检查：
    echo    • GitHub 用户名是否正确
    echo    • Personal Access Token 是否有效
    echo    • 网络连接是否正常
    pause
    exit /b 1
)

echo ✅ 前端代码推送成功！

REM 推送后端代码
echo.
echo 📤 正在推送后端代码...
cd ..\sun-kexin-admin

git init >nul 2>&1
git add . >nul 2>&1
git commit -m "Initial commit - 后端管理系统" >nul 2>&1
git remote add origin https://github.com/%username%/sun-kexin-admin.git >nul 2>&1
git branch -M main >nul 2>&1

echo.
echo 🔄 推送中，请稍候...
git push -u origin main

if %errorlevel% neq 0 (
    echo ❌ 后端代码推送失败
    pause
    exit /b 1
)

echo ✅ 后端代码推送成功！

REM 构建项目
echo.
echo 🏗️ 正在构建项目...
cd ..

echo 📦 构建前端...
call npm run build:portfolio

if %errorlevel% neq 0 (
    echo ❌ 前端构建失败
    pause
    exit /b 1
)

echo 📦 构建后端...
call npm run build:admin

if %errorlevel% neq 0 (
    echo ❌ 后端构建失败
    pause
    exit /b 1
)

echo ✅ 所有构建完成！

REM 部署到 GitHub Pages
echo.
echo 🌐 正在部署到 GitHub Pages...

echo 📤 部署前端...
gh-pages -d dist-portfolio --repo https://github.com/%username%/sun-kexin-portfolio.git

if %errorlevel% neq 0 (
    echo ❌ 前端部署失败，请手动启用 GitHub Pages
    echo 访问：https://github.com/%username%/sun-kexin-portfolio/settings/pages
) else (
    echo ✅ 前端部署成功！
)

echo 📤 部署后端...
gh-pages -d dist-admin --repo https://github.com/%username%/sun-kexin-admin.git

if %errorlevel% neq 0 (
    echo ❌ 后端部署失败，请手动启用 GitHub Pages
    echo 访问：https://github.com/%username%/sun-kexin-admin/settings/pages
) else (
    echo ✅ 后端部署成功！
)

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                      🎉 部署完成！                         ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 🌐 访问地址：
echo    前端展示：https://%username%.github.io/sun-kexin-portfolio/
echo    后端管理：https://%username%.github.io/sun-kexin-admin/
echo.
echo ⏱️  GitHub Pages 可能需要几分钟时间生效，请耐心等待
echo.
echo 📝 如果某些功能不工作，请检查：
echo    • 访问 GitHub 仓库设置页面
echo    • 进入 Settings → Pages
echo    • 确认 Source 选择 "Deploy from a branch"
echo    • 确认 Branch 选择 "main/main"，Folder 选择 "/(root)"
echo.
pause