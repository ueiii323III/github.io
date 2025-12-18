# GitHub Personal Access Token 获取指南

## 📋 为什么需要 Personal Access Token？

当你使用命令行推送代码到 GitHub 时，GitHub 不再支持密码登录，需要使用 Personal Access Token (PAT) 作为密码。

## 🔑 获取步骤

### 第一步：登录 GitHub
1. 打开 https://github.com
2. 登录你的账号

### 第二步：进入设置
1. 点击右上角你的头像
2. 选择 `Settings`

### 第三步：进入开发者设置
1. 在左侧菜单最下方找到 `Developer settings`
2. 点击进入

### 第四步：创建 Personal Access Token
1. 在左侧菜单中点击 `Personal access tokens`
2. 选择 `Tokens (classic)`

### 第五步：生成新 Token
1. 点击右上角的 `Generate new token`
2. 选择 `Generate new token (classic)`

### 第六步：配置 Token
按照以下设置填写：

```
Note: 个人博客部署
Expiration: No expiration  (永不过期，推荐)
Scopes: ✅ repo (必须勾选)
```

**重要说明：**
- `Note`：给这个 Token 起个名字，便于识别
- `Expiration`：选择 `No expiration` 避免过期
- `Scopes`：**必须勾选 `repo`**，这包含所有仓库操作权限

### 第七步：生成并复制
1. 点击页面底部的 `Generate token` 按钮
2. **立即复制生成的 Token**（非常重要！）
3. Token 是一串长字符串，如：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 第八步：保存 Token
- **保存在安全的地方**，如密码管理器
- Token 只显示一次，离开页面后无法再次查看
- 如果忘记，只能重新生成

## 🚀 使用方法

### 在命令行中使用
当执行 `git push` 命令时：

```
Username for 'https://github.com': 你的GitHub用户名
Password for 'https://你的用户名@github.com': 粘贴你的Token
```

**重要：**
- 用户名输入你的 GitHub 用户名
- 密码输入 Personal Access Token（不是登录密码）

### 在 Git 配置中使用（可选）
如果你不想每次都输入，可以设置：

```bash
git config --global credential.helper store
```

## ⚠️ 安全提醒

### 必须做：
✅ **复制并保存 Token** - 只显示一次
✅ **选择 `No expiration`** - 避免频繁更新
✅ **勾选 `repo` 权限** - 必要权限
✅ **妥善保管 Token** - 相当于你的密码

### 绝对不要：
❌ **不要把 Token 提交到代码仓库**
❌ **不要在公共场合暴露 Token**
❌ **不要与他人分享 Token**
❌ **不要在不信任的网站输入 Token**

## 🔧 故障排除

### Token 无效
如果收到 "authentication failed" 错误：
1. 检查 Token 是否复制完整（包含 `ghp_` 前缀）
2. 检查 Token 是否设置了 `repo` 权限
3. 检查 Token 是否过期

### Token 忘记
如果忘记了 Token：
1. 重复上述步骤重新生成
2. 新 Token 生效后，旧 Token 自动失效
3. 更新所有使用旧 Token 的地方

### 权限不足
如果收到 "permission denied" 错误：
1. 确认 Token 有 `repo` 权限
2. 确认仓库是公开的（免费版要求）
3. 确认用户名和仓库名正确

## 📝 常见问题

**Q: 为什么不能使用登录密码？**
A: GitHub 为了安全，已停用密码登录 API，推荐使用 Token。

**Q: Token 泄露了怎么办？**
A: 立即到 GitHub 删除该 Token，然后重新生成一个新的。

**Q: Token 有什么权限？**
A: 根据你勾选的 Scopes 决定，`repo` 包含所有仓库相关操作。

**Q: 可以设置 Token 过期时间吗？**
A: 可以，但不推荐，因为过期后需要重新配置，比较麻烦。

## 🎯 生成成功标志

当你看到类似下面的内容时，说明 Token 生成成功：

```
ghp_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s
```

这个 Token 就是你 GitHub 操作的"密码"，请妥善保管！

---

现在你已经准备好使用 GitHub 进行代码推送和部署了！🎉