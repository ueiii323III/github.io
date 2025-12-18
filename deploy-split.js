#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);
const target = args[0]; // 'portfolio' 或 'admin'
const username = args[1]; // GitHub 用户名

if (!target || !username) {
  console.error('用法: node deploy-split.js [portfolio|admin] [GitHub用户名]');
  process.exit(1);
}

console.log(`🚀 开始部署 ${target} 到 GitHub Pages...`);

try {
  // 1. 构建项目
  console.log('📦 正在构建项目...');
  execSync(`npm run build:${target}`, { stdio: 'inherit' });

  // 2. 部署到指定的 GitHub 仓库
  console.log('🌐 正在部署到 GitHub Pages...');
  const repo = `https://github.com/${username}/sun-kexin-${target}.git`;
  const distDir = target === 'portfolio' ? 'dist-portfolio' : 'dist-admin';
  
  execSync(`gh-pages -d ${distDir} --repo ${repo}`, { stdio: 'inherit' });

  console.log(`✅ ${target} 部署成功！`);
  console.log(`🌍 访问地址: https://${username}.github.io/sun-kexin-${target}/`);

} catch (error) {
  console.error('❌ 部署失败:', error.message);
  process.exit(1);
}