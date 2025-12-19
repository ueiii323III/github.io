# 📸 添加真实照片操作指南

## 🚀 快速开始

### 1. 创建文件夹结构
将您的照片按照以下结构放到 `src/assets/images/` 文件夹中：

```
src/assets/images/
├── avatar/
│   ├── profile.jpg          # 个人照片 (用于首页、关于页面)
│   └── hero.jpg           # 首页主图
├── works/
│   ├── photography/         # 摄影作品
│   ├── painting/           # 绘画作品
│   └── digital/           # 数字艺术作品
├── timeline/              # 时间线图片
└── campus/              # 校场景观图
```

### 2. 添加照片方法一：直接修改组件（推荐新手）

#### 修改首页照片 (src/views/Home.vue)

```vue
<!-- 找到这行 -->
<div class="image-placeholder">
  <t-icon name="image" size="100px" />
  <p>个人形象展示</p>
</div>

<!-- 替换为 -->
<img 
  src="/src/assets/images/avatar/profile.jpg" 
  alt="孙可馨的个人照片" 
  class="hero-image"
  style="max-width: 280px; border-radius: 16px; object-fit: cover;"
/>
```

#### 修改作品展示页 (src/views/Portfolio.vue)

```vue
<!-- 找到这行 -->
<div class="image-placeholder">
  <t-icon name="image" size="28px" />
</div>

<!-- 替换为 -->
<img 
  src="/src/assets/images/works/photography/campus-sunset.jpg" 
  alt="夕阳下的校园" 
  class="work-thumbnail-image"
  style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;"
/>
```

#### 修改关于页面 (src/views/About.vue)

```vue
<!-- 找到这行 -->
<div class="image-placeholder">
  <t-icon name="user-avatar" size="100px" />
  <p>个人照片</p>
</div>

<!-- 替换为 -->
<img 
  src="/src/assets/images/avatar/profile.jpg" 
  alt="孙可馨" 
  class="intro-photo"
  style="max-width: 220px; border-radius: 16px; object-fit: cover;"
/>
```

### 3. 添加照片方法二：使用图片组件（推荐进阶用户）

我已经创建了 `ImageDisplay.vue` 组件，可以这样使用：

```vue
<!-- 在组件顶部导入 -->
import ImageDisplay from '@/components/ImageDisplay.vue'

<!-- 使用组件 -->
<ImageDisplay 
  src="/src/assets/images/avatar/profile.jpg" 
  alt="个人照片" 
  size="medium"
/>
```

## 📝 推荐的图片规格

| 用途 | 推荐尺寸 | 格式 | 说明 |
|------|----------|------|------|
| 个人头像 | 400x400px | JPG | 正方形，清晰度适中 |
| 首页主图 | 1200x800px | JPG | 横向构图，高质量 |
| 作品缩略图 | 300x200px | JPG | 按比例，快速加载 |
| 作品大图 | 800x600px | JPG | 高清展示 |
| 时间线图片 | 600x400px | JPG | 宽度适中 |

## 🎨 图片处理建议

1. **格式选择**：JPG适合照片，PNG适合图标
2. **文件大小**：控制在500KB以内，确保加载速度
3. **命名规范**：使用英文+连字符，如 `campus-sunset.jpg`
4. **备份原图**：保留高分辨率版本以备后续使用

## ⚡ 实时预览

添加照片后，网站会自动刷新显示。如果没有变化，可能需要：

1. 刷新浏览器 (F5)
2. 重启开发服务器 (Ctrl+C 然后 npm run dev)
3. 清除浏览器缓存

## 🔧 常见问题

**Q: 图片不显示怎么办？**
A: 检查文件路径是否正确，确保图片文件确实存在

**Q: 图片变形怎么办？**
A: 使用 `object-fit: cover` 和合适的宽高比

**Q: 加载太慢怎么办？**
A: 压缩图片，使用WebP格式

---

现在开始添加您的照片吧！ 🎉