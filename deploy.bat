@echo off
echo =================================
echo   GitHub Pages 部署脚本
echo =================================

echo.
echo 检查 Git 是否已安装...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git 未安装！
    echo 请先访问 https://git-scm.com/download/win 安装 Git
    echo 安装完成后请重新运行此脚本
    pause
    exit /b 1
)

echo ✅ Git 已安装

echo.
echo 初始化 Git 仓库...
git init
git add .
git commit -m "Initial commit - 完整版个人网站"

echo.
echo 请输入您的 GitHub 用户名:
set /p username=GitHub 用户名: 

echo.
echo 请输入您的 GitHub 仓库名称 (默认: sun-kexin-personal-website):
set /p repo=仓库名称: 
if "%repo%"=="" set repo=sun-kexin-personal-website

echo.
echo 添加远程仓库...
git remote add origin https://github.com/%username%/%repo%.git
git branch -M main

echo.
echo 推送到 GitHub...
git push -u origin main

echo.
echo 部署到 GitHub Pages...
npm run deploy

echo.
echo =================================
echo 🎉 部署完成！
echo =================================
echo 您的网站将在以下地址可用：
echo https://%username%.github.io/%repo%
echo.
echo 如果无法访问，请：
echo 1. 访问 GitHub 仓库的 Settings > Pages
echo 2. 启用 GitHub Pages 功能
echo 3. 选择 gh-pages 分支作为源
echo =================================

pause