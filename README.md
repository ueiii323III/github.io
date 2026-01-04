# 孙可馨个人简历网站

一个轻量化的个人简历展示平台，支持前端信息展示和后端内容管理，可快速部署至 Vercel/GitHub Pages。

## 🌟 项目特性

### 前端展示
- **响应式设计**：完美适配 PC、平板、手机等多种设备
- **现代UI**：基于 TailwindCSS 的简洁美观界面
- **流畅交互**：平滑滚动、悬停效果、加载动画
- **信息模块化**：基础信息、技能特长、实践经历、教育背景分模块展示
- **联系方式保护**：手机号自动脱敏显示

### 后台管理
- **安全认证**：管理员密码登录，多次失败自动锁定
- **数据管理**：支持简历所有模块的增删改操作
- **实时预览**：修改后立即在前端生效
- **备份恢复**：支持数据备份导出和导入恢复
- **操作日志**：记录所有管理操作，便于追踪和审计

## 🚀 技术栈

- **前端框架**：Next.js 14 + React 18 + TypeScript
- **样式框架**：TailwindCSS 3.3
- **图标库**：Lucide React
- **表单处理**：React Hook Form
- **通知提示**：React Hot Toast
- **数据存储**：JSON 文件（轻量化部署）
- **部署平台**：Vercel / GitHub Pages

## 📁 项目结构

```
个人简历/
├── app/                    # Next.js App Router
│   ├── admin/             # 管理后台页面
│   ├── api/               # API 接口
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx          # 主页
├── components/            # React 组件
│   ├── admin/            # 管理后台组件
│   ├── BasicInfo.tsx     # 基础信息组件
│   ├── SkillsSection.tsx # 技能展示组件
│   ├── ExperienceSection.tsx # 经历展示组件
│   ├── EducationSection.tsx  # 教育背景组件
│   └── ...               # 其他组件
├── data/                 # 数据文件
│   ├── initialData.json  # 初始数据
│   └── resumeData.json   # 运行时数据
├── types/                # TypeScript 类型定义
├── public/               # 静态资源
└── README.md            # 项目文档
```

## 🛠 安装和运行

### 环境要求
- Node.js 18.0+
- npm 或 yarn

### 本地开发

1. **克隆项目**
```bash
git clone <repository-url>
cd 个人简历
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
# 或
yarn dev
```

4. **访问应用**
- 前端展示：http://1069.jialaner.top/
- 管理后台：http://1069.jialaner.top/
- 管理后台账户：sunkx
- 密码：WUT2024@

### 构建和部署

1. **构建生产版本**
```bash
npm run build
npm start
```

2. **静态导出（用于 GitHub Pages）**
```bash
npm run export
```

## 🔐 管理后台

### 默认登录信息
- **用户名**：sunkx
- **密码**：WUT2024@*

### 功能模块
1. **基础信息管理**：个人信息、联系方式
2. **技能特长管理**：分类管理技能，支持拖拽排序
3. **实践经历管理**：时间轴形式展示，支持详细成果记录
4. **教育背景管理**：学校信息、GPA、课程管理
5. **数据备份恢复**：JSON格式数据导出导入
6. **操作日志**：查看所有管理操作记录

### 安全特性
- 登录失败3次自动锁定10分钟
- 密码加密传输和存储
- 30分钟无操作自动登出
- 操作日志不可篡改

## 📱 响应式设计

### 断点设置
- **手机端**：< 768px
- **平板端**：768px - 1199px  
- **桌面端**：≥ 1200px

### 适配特性
- 移动端折叠导航菜单
- 自适应网格布局
- 触控友好的交互设计
- 优化的字体大小和间距

## 🚀 部署指南

### Vercel 部署（推荐）

1. **连接 Git 仓库**
   - 登录 [Vercel](https://vercel.com)
   - 导入 Git 仓库
   - 选择 Next.js 框架

2. **配置环境变量**（可选）
   - 无需特殊环境变量

3. **一键部署**
   - Vercel 自动检测配置并部署
   - 部署完成后提供 HTTPS 域名

### GitHub Pages 部署

1. **启用静态导出**
```bash
npm run export
```

2. **配置 GitHub Pages**
   - 在仓库设置中启用 GitHub Pages
   - 选择 `gh-pages` 分支或 `/docs` 文件夹
   - 上传 `out` 目录内容

3. **访问网站**
   - `https://[username].github.io/[repository]/`

### 其他平台
项目支持部署到任何支持静态网站的云平台：
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- 阿里云 OSS + CDN

## 📊 性能指标

- **首次加载**：≤ 3秒
- **页面切换**：≤ 1秒
- **API响应**：≤ 500ms
- **图片优化**：自动 WebP 格式转换
- **代码分割**：按需加载组件

## 🔧 自定义配置

### 修改主题色彩
编辑 `tailwind.config.js`：
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 自定义主色调
      }
    }
  }
}
```

### 添加新模块
1. 在 `types/index.ts` 定义数据类型
2. 创建对应的展示组件
3. 在管理后台添加表单组件
4. 更新初始数据文件

### 修改初始数据
编辑 `data/initialData.json`：
```json
{
  "basicInfo": {
    "name": "您的姓名",
    // ...
  }
}
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- **项目作者**：孙可馨
- **邮箱**：sunkexin@example.com
- **学校**：武汉理工大学 经济学专业

## 🙏 致谢

感谢以下开源项目的支持：
- [Next.js](https://nextjs.org/) - React 全栈框架
- [TailwindCSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Lucide](https://lucide.dev/) - 美观的图标库
- [React Hook Form](https://react-hook-form.com/) - 高性能表单库

---


⭐ 如果这个项目对您有帮助，请给个 Star 支持一下！
