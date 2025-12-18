#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 需要复制的文件和目录
const commonFiles = [
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'vite.config.ts',
  '.gitignore',
  'src/assets',
  'src/styles',
  'src/types',
  'src/data',
  'src/stores',
  'README.md'
];

// 前端专用文件
const portfolioFiles = [
  'src/components/AppHeader.vue',
  'src/components/AppFooter.vue',
  'src/views/Home.vue',
  'src/views/Portfolio.vue',
  'src/views/PortfolioDetail.vue',
  'src/views/About.vue',
  'src/router/portfolio.ts',
  'src/main.portfolio.ts',
  'src/App.portfolio.vue',
  'vite.portfolio.config.ts',
  'index.portfolio.html'
];

// 后端专用文件
const adminFiles = [
  'src/components/ImageUpload.vue',
  'src/views/admin',
  'src/layouts/AdminLayout.vue',
  'src/router/admin.ts',
  'src/main.admin.ts',
  'src/App.admin.vue',
  'vite.admin.config.ts',
  'index.admin.html'
];

function copyFileOrDir(src, dest) {
  const srcStat = fs.statSync(src);
  
  if (srcStat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src);
    items.forEach(item => {
      const itemSrc = path.join(src, item);
      const itemDest = path.join(dest, item);
      copyFileOrDir(itemSrc, itemDest);
    });
  } else {
    // 确保目标目录存在
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

function createPortfolioRepo(destPath) {
  console.log('🎨 创建前端仓库...');
  
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
  }
  
  // 复制通用文件
  commonFiles.forEach(file => {
    const src = path.join('.', file);
    const dest = path.join(destPath, file);
    if (fs.existsSync(src)) {
      copyFileOrDir(src, dest);
      console.log(`✓ 复制 ${file}`);
    }
  });
  
  // 复制前端专用文件
  portfolioFiles.forEach(file => {
    const src = path.join('.', file);
    const dest = path.join(destPath, file);
    if (fs.existsSync(src)) {
      copyFileOrDir(src, dest);
      console.log(`✓ 复制前端文件 ${file}`);
    }
  });
  
  // 创建前端专用的 package.json
  const portfolioPackageJson = {
    ...require('./package.json'),
    name: 'sun-kexin-portfolio',
    scripts: {
      ...require('./package.json').scripts,
      "dev": "vite --config vite.portfolio.config.ts",
      "build": "vue-tsc && vite build --config vite.portfolio.config.ts",
      "preview": "vite preview --config vite.portfolio.config.ts",
      "deploy": "npm run build && gh-pages -d dist-portfolio"
    }
  };
  
  fs.writeFileSync(
    path.join(destPath, 'package.json'),
    JSON.stringify(portfolioPackageJson, null, 2)
  );
  
  console.log('✅ 前端仓库创建完成！');
}

function createAdminRepo(destPath) {
  console.log('⚙️ 创建后端管理仓库...');
  
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
  }
  
  // 复制通用文件
  commonFiles.forEach(file => {
    const src = path.join('.', file);
    const dest = path.join(destPath, file);
    if (fs.existsSync(src)) {
      copyFileOrDir(src, dest);
      console.log(`✓ 复制 ${file}`);
    }
  });
  
  // 复制后端专用文件
  adminFiles.forEach(file => {
    const src = path.join('.', file);
    const dest = path.join(destPath, file);
    if (fs.existsSync(src)) {
      copyFileOrDir(src, dest);
      console.log(`✓ 复制后端文件 ${file}`);
    }
  });
  
  // 创建后端专用的 package.json
  const adminPackageJson = {
    ...require('./package.json'),
    name: 'sun-kexin-admin',
    scripts: {
      ...require('./package.json').scripts,
      "dev": "vite --config vite.admin.config.ts",
      "build": "vue-tsc && vite build --config vite.admin.config.ts",
      "preview": "vite preview --config vite.admin.config.ts",
      "deploy": "npm run build && gh-pages -d dist-admin"
    }
  };
  
  fs.writeFileSync(
    path.join(destPath, 'package.json'),
    JSON.stringify(adminPackageJson, null, 2)
  );
  
  console.log('✅ 后端管理仓库创建完成！');
}

// 获取命令行参数
const args = process.argv.slice(2);
const action = args[0]; // 'portfolio', 'admin', 或 'all'

if (!action || !['portfolio', 'admin', 'all'].includes(action)) {
  console.error('用法: node split-repos.js [portfolio|admin|all]');
  process.exit(1);
}

console.log('🔄 开始分离代码仓库...');

try {
  if (action === 'portfolio' || action === 'all') {
    createPortfolioRepo('./sun-kexin-portfolio');
  }
  
  if (action === 'admin' || action === 'all') {
    createAdminRepo('./sun-kexin-admin');
  }
  
  console.log('\n🎉 代码分离完成！');
  console.log('\n📝 接下来的步骤：');
  console.log('1. 在 GitHub 上创建两个仓库：sun-kexin-portfolio 和 sun-kexin-admin');
  console.log('2. 分别进入对应的目录：');
  console.log('   cd sun-kexin-portfolio');
  console.log('   git init');
  console.log('   git add .');
  console.log('   git commit -m "Initial commit"');
  console.log('   git remote add origin https://github.com/你的用户名/sun-kexin-portfolio.git');
  console.log('   git push -u origin main');
  console.log('');
  console.log('   cd ../sun-kexin-admin');
  console.log('   git init');
  console.log('   git add .');
  console.log('   git commit -m "Initial commit"');
  console.log('   git remote add origin https://github.com/你的用户名/sun-kexin-admin.git');
  console.log('   git push -u origin main');
  
} catch (error) {
  console.error('❌ 分离失败:', error.message);
  process.exit(1);
}