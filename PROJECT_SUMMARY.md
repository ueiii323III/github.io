# 孙可馨个人博客 - 项目总结

## 项目概述

这是一个为孙可馨（武汉理工大学经济专业学生）定制的个人博客网站，采用温暖的粉色主题设计，提供完整的前台展示和后台管理功能。

## 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 组件库**: shadcn/ui
- **样式**: Tailwind CSS
- **路由**: React Router v6
- **表单**: React Hook Form + Zod
- **Markdown**: react-markdown
- **通知**: Sonner

### 后端
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **存储**: Supabase Storage
- **实时**: Supabase Realtime

## 数据库设计

### 表结构

#### profiles (用户资料表)
- id: UUID (主键，关联 auth.users)
- username: TEXT (用户名，唯一)
- email: TEXT (邮箱)
- role: user_role (角色：user/admin)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ

#### categories (分类表)
- id: UUID (主键)
- name: TEXT (分类名称，唯一)
- slug: TEXT (URL标识，唯一)
- description: TEXT (描述)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ

#### posts (文章表)
- id: UUID (主键)
- title: TEXT (标题)
- slug: TEXT (URL标识，唯一)
- content: TEXT (内容)
- excerpt: TEXT (摘要)
- cover_image: TEXT (封面图URL)
- category_id: UUID (外键 → categories)
- author_id: UUID (外键 → profiles)
- published: BOOLEAN (发布状态)
- view_count: INTEGER (浏览量)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ

#### personal_info (个人信息表)
- id: UUID (主键)
- name: TEXT (姓名)
- age: INTEGER (年龄)
- school: TEXT (学校)
- major: TEXT (专业)
- contact: TEXT (联系方式)
- bio: TEXT (个人简介)
- avatar: TEXT (头像URL)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ

#### friend_links (友情链接表)
- id: UUID (主键)
- name: TEXT (名称)
- url: TEXT (链接)
- description: TEXT (描述)
- created_at: TIMESTAMPTZ

### 权限策略 (RLS)

#### profiles
- 管理员可以查看和更新所有用户资料
- 用户可以查看和更新自己的资料（角色除外）

#### categories
- 所有人可以查看分类
- 管理员可以管理分类

#### posts
- 所有人可以查看已发布文章
- 管理员可以查看和管理所有文章

#### personal_info
- 所有人可以查看个人信息
- 管理员可以管理个人信息

#### friend_links
- 所有人可以查看友情链接
- 管理员可以管理友情链接

### 存储桶
- **app-8c1ei1cfun7l_blog_images**: 存储文章封面和头像
  - 大小限制: 1MB
  - 支持格式: JPEG, PNG, GIF, WEBP, AVIF
  - 自动压缩: 超过1MB自动转换为WEBP并压缩

## 功能模块

### 前台功能

#### 1. 首页
- 展示已发布文章列表
- 分页功能（每页6篇）
- 显示文章封面、标题、摘要、分类、发布时间、浏览量
- 点击文章跳转到详情页

#### 2. 文章详情页
- 显示文章完整内容
- Markdown 渲染
- 自动增加浏览量
- 显示文章元信息（分类、时间、浏览量）

#### 3. 分类页面
- 按分类筛选文章
- 显示分类信息和文章数量
- 文章列表展示

#### 4. 关于我页面
- 展示个人信息（头像、姓名、年龄、学校、专业、联系方式、简介）
- 展示友情链接

#### 5. 侧边栏
- 个人简介卡片
- 分类导航
- 响应式设计

### 后台管理功能

#### 1. 登录/注册
- 用户名 + 密码方式
- 第一个注册用户自动成为管理员
- 注册后自动登录

#### 2. 管理后台概览
- 统计数据展示（文章数、分类数、用户数、浏览量）
- 快速操作入口
- 系统提示

#### 3. 文章管理
- 文章列表（显示标题、分类、状态、浏览量、创建时间）
- 新建文章
- 编辑文章
- 删除文章
- 发布/草稿切换
- 上传封面图

#### 4. 分类管理
- 分类列表
- 新建分类
- 编辑分类
- 删除分类

#### 5. 个人信息管理
- 编辑个人资料
- 上传头像
- 实时预览

#### 6. 用户管理
- 用户列表
- 修改用户角色
- 显示注册时间

## 设计系统

### 颜色方案

#### Light Mode
- Primary: `hsl(350, 100%, 76%)` - 粉色
- Secondary: `hsl(330, 60%, 90%)` - 浅粉色
- Background: `hsl(330, 100%, 98%)` - 极浅粉色
- Accent: `hsl(330, 100%, 96%)` - 淡粉色

#### Dark Mode
- Primary: `hsl(350, 100%, 76%)` - 粉色
- Secondary: `hsl(330, 20%, 18%)` - 深灰粉
- Background: `hsl(330, 20%, 10%)` - 深色背景
- Accent: `hsl(330, 20%, 15%)` - 深灰

### 设计特点
- 圆角: 1rem
- 温暖的粉色系
- 柔和的阴影效果
- 圆润的卡片设计
- 流畅的过渡动画

## 图片处理

### 上传流程
1. 前端验证文件类型和文件名
2. 检查文件大小
3. 如果超过1MB，自动压缩：
   - 转换为 WEBP 格式
   - 限制最大分辨率为 1920x1080
   - 质量设置为 0.8
4. 上传到 Supabase Storage
5. 返回公开 URL

### 文件名规则
- 只允许英文字母、数字、下划线、连字符
- 自动生成唯一文件名：`时间戳_随机字符串.扩展名`

## 路由设计

### 前台路由
- `/` - 首页
- `/posts/:slug` - 文章详情
- `/category/:slug` - 分类页面
- `/about` - 关于我
- `/login` - 登录/注册

### 后台路由（需要登录）
- `/admin` - 管理后台概览
- `/admin/posts` - 文章管理
- `/admin/posts/new` - 新建文章
- `/admin/posts/edit/:id` - 编辑文章
- `/admin/categories` - 分类管理
- `/admin/personal-info` - 个人信息管理
- `/admin/users` - 用户管理

## 安全措施

1. **认证系统**
   - 基于 Supabase Auth
   - JWT Token 验证
   - 自动刷新 Token

2. **权限控制**
   - Row Level Security (RLS)
   - 管理员权限检查
   - 路由守卫

3. **数据验证**
   - 前端表单验证
   - 后端数据库约束
   - 文件类型和大小验证

4. **SQL 注入防护**
   - 使用 Supabase 客户端
   - 参数化查询

## 性能优化

1. **图片优化**
   - 自动压缩
   - WEBP 格式
   - 懒加载

2. **代码分割**
   - React.lazy
   - 路由级别代码分割

3. **缓存策略**
   - 图片缓存（3600秒）
   - 静态资源缓存

4. **数据库优化**
   - 索引优化
   - 分页查询
   - 选择性字段查询

## 响应式设计

### 断点
- Mobile: < 1024px
- Desktop: ≥ 1024px

### 布局适配
- 移动端：单列布局，侧边栏移至底部
- 桌面端：主内容区 + 侧边栏（3:1比例）
- 管理后台：侧边栏 + 主内容区

## 部署说明

### 环境变量
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_ID=app-8c1ei1cfun7l
```

### 构建命令
```bash
npm run build
```

### 预览命令
```bash
npm run preview
```

## 初始数据

### 个人信息
- 姓名: 孙可馨
- 年龄: 20
- 学校: 武汉理工大学
- 专业: 经济2403
- 联系方式: 13154715568

### 预设分类
1. 生活随笔 (life)
2. 学习笔记 (study)
3. 旅行游记 (travel)
4. 读书感悟 (reading)

### 示例文章
1. 欢迎来到我的博客
2. 大学生活的第一年

## 未来扩展建议

1. **功能扩展**
   - 文章标签系统
   - 评论功能
   - 文章搜索
   - RSS 订阅
   - 文章归档

2. **性能优化**
   - CDN 加速
   - 服务端渲染 (SSR)
   - 图片 CDN

3. **用户体验**
   - 深色模式切换
   - 阅读进度条
   - 文章目录导航
   - 分享功能

4. **数据分析**
   - 访问统计
   - 热门文章
   - 用户行为分析

## 维护建议

1. **定期备份**
   - 数据库备份
   - 图片备份
   - 配置备份

2. **安全更新**
   - 依赖包更新
   - 安全补丁
   - 密码策略

3. **内容管理**
   - 定期发布文章
   - 更新个人信息
   - 清理无用图片

4. **性能监控**
   - 页面加载速度
   - 数据库查询性能
   - 错误日志

## 开发团队

- 项目开发: 秒哒 AI
- 设计风格: 温暖粉色系
- 开发时间: 2025年

## 许可证

© 2025 孙可馨的博客. All rights reserved.
