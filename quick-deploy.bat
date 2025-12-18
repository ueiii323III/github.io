@echo off
echo 🚀 孙可馨个人博客 - 分离部署工具
echo.

:menu
echo 请选择操作：
echo 1. 构建前端 (Portfolio)
echo 2. 构建后端 (Admin)
echo 3. 自动分离代码仓库
echo 4. 一键部署到 GitHub
echo 5. 退出
echo.
set /p choice="请输入选项 (1-5): "

if "%choice%"=="1" goto build-portfolio
if "%choice%"=="2" goto build-admin
if "%choice%"=="3" goto split-repos
if "%choice%"=="4" goto deploy-all
if "%choice%"=="5" goto end
echo 无效选项，请重试
goto menu

:build-portfolio
echo.
echo 📦 构建前端项目...
npm run build:portfolio
if %errorlevel%==0 (
  echo ✅ 前端构建成功！输出目录：dist-portfolio
) else (
  echo ❌ 前端构建失败
)
pause
goto menu

:build-admin
echo.
echo 📦 构建后端管理项目...
npm run build:admin
if %errorlevel%==0 (
  echo ✅ 后端构建成功！输出目录：dist-admin
) else (
  echo ❌ 后端构建失败
)
pause
goto menu

:split-repos
echo.
echo 🔄 分离代码仓库...
set /p username="请输入你的 GitHub 用户名: "
node split-repos.js all
echo.
echo 📝 接下来的步骤：
echo 1. 访问 GitHub 创建仓库：sun-kexin-portfolio 和 sun-kexin-admin
echo 2. 分别进入目录并推送代码
pause
goto menu

:deploy-all
echo.
echo 🌐 一键部署到 GitHub Pages...
set /p username="请输入你的 GitHub 用户名: "
set /p repo="请输入部署的仓库 (portfolio/admin): "

if "%repo%"=="portfolio" (
  npm run build:portfolio
  gh-pages -d dist-portfolio --repo https://github.com/%username%/sun-kexin-portfolio.git
  echo ✅ 前端部署成功！
  echo 🌍 访问地址: https://%username%.github.io/sun-kexin-portfolio/
)
if "%repo%"=="admin" (
  npm run build:admin
  gh-pages -d dist-admin --repo https://github.com/%username%/sun-kexin-admin.git
  echo ✅ 后端部署成功！
  echo 🌍 访问地址: https://%username%.github.io/sun-kexin-admin/
)

pause
goto menu

:end
echo 👋 再见！
pause