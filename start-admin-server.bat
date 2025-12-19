@echo off
echo 启动后端管理服务器...
cd /d "C:\Users\孙可馨\CodeBuddy\个人博客\dist-admin"
echo 服务器地址: http://localhost:8888
echo 按 Ctrl+C 停止服务器
python -m http.server 8888
pause