# 🚀 GitHub Pages 部署指南

## ✅ 已完成的准备工作

- [x] Git 安装程序已下载并正在安装
- [x] .gitignore 文件已创建
- [x] package.json 已添加 deploy 脚本
- [x] GitHub Actions 自动部署工作流已配置

---

## 📋 接下来需要您手动完成的步骤（约 10 分钟）

### 第一步：确认 Git 安装完成

打开**新的命令行窗口**（PowerShell 或 CMD），输入：

```bash
git --version
```

如果显示版本号（如 `git version 2.47.1`），说明安装成功！✅

---

### 第二步：注册/登录 GitHub 账号

1. 打开浏览器访问：https://github.com
2. 点击 **"Sign up"** 注册新账号 或 **"Sign in"** 登录现有账号
3. **免费注册即可**，无需付费

> 💡 **提示**：如果已有账号直接登录即可

---

### 第三步：创建新的 GitHub 仓库

1. 登录后，点击右上角 **"+"** → **"New repository"**
2. 填写仓库信息：
   - **Repository name**: `wenxue` （或您喜欢的名字）
   - **Description**: `我的文学作品展示网站` （可选）
   - **选择 Private 或 Public**：
     - **Public（公开）**：任何人都能访问您的网站 ✅ **推荐**
     - **Private（私有）**：只有您能看到（但需要 GitHub Pro 才能启用 Pages）
3. **⚠️ 不要勾选** "Add a README file"
4. 点击 **"Create repository"**

---

### 第四步：初始化本地 Git 并推送代码

打开 PowerShell 或 CMD，**进入项目目录**：

```bash
cd D:\yusan\Documents\wenxue
```

然后依次执行以下命令：

#### 4.1 初始化 Git 仓库

```bash
git init
```

#### 4.2 配置用户信息（首次使用需要）

```bash
git config user.name "您的名字"
git config user.email "您的邮箱"
```

> ⚠️ 这里的邮箱应该和 GitHub 账号邮箱一致

#### 4.3 添加所有文件到暂存区

```bash
git add .
```

#### 4.4 创建第一次提交

```bash
git commit -m "初始提交：文学作品展示网站"
```

#### 4.5 连接远程仓库

将下面的 `YOUR_USERNAME` 替换为您的 GitHub 用户名：

```bash
git remote add origin https://github.com/YOUR_USERNAME/wenxue.git
```

例如，如果您的 GitHub 用户名是 `zhangsan`，则输入：

```bash
git remote add origin https://github.com/zhangsan/wenxue.git
```

#### 4.6 推送到 GitHub

```bash
git branch -M main
git push -u origin main
```

系统会弹出窗口要求**输入 GitHub 用户名和密码**：
- **用户名**：您的 GitHub 用户名或邮箱
- **密码**：⚠️ **不是 GitHub 密码**，而是 **Personal Access Token**

#### 4.7 如何获取 Personal Access Token（PAT）

1. 在 GitHub 网站，点击右上角头像 → **Settings**
2. 左侧菜单最底部 → **Developer settings**
3. 选择 **Personal access tokens** → **Tokens (classic)**
4. 点击 **"Generate new token (classic)"**
5. 设置：
   - **Note**: `wenxue-deploy`
   - **Expiration**: 选择 90 days 或 No expiration
   - **勾选权限**：✅ `repo` (完整仓库访问权限)
6. 点击 **"Generate token"**
7. ⚠️ **立即复制 token**（只显示一次！）
8. 粘贴到密码输入框中

---

### 第五步：启用 GitHub Pages

推送成功后：

1. 打开您的仓库页面：`https://github.com/YOUR_USERNAME/wenxue`
2. 点击顶部 **Settings** 标签
3. 左侧菜单找到 **Pages**
4. **Source** 部分选择：
   - **Source**: GitHub Actions
5. 页面会显示："GitHub Actions is ready to deploy your site"
6. 等待 2-3 分钟...

---

### 第六步：🎉 获取您的公网网址！

部署成功后，回到 **Settings → Pages**，您会看到：

> **Your site is live at: https://YOUR_USERNAME.github.io/wenxue/**

🎊 **恭喜！现在全世界都可以访问您的文学网站了！**

---

## 🔧 后续更新流程

当您修改了作品或代码后，只需：

```bash
cd D:\yusan\Documents\wenxue
git add .
git commit -m "更新了XX作品"
git push
```

推送后 **自动触发部署**，约 1-2 分钟后网站就会更新！

---

## ❓ 常见问题

### Q: 推送时提示 "Authentication failed"？
A: 您需要使用 Personal Access Token 而不是密码（见第四步 4.7）

### Q: 网站显示 404？
A: 等待 2-3 分钟让 GitHub 完成初次部署，或检查 Settings → Pages 是否启用成功

### Q: 如何修改域名？
A: 在 Settings → Pages → Custom domain 中可以绑定自己的域名（如 www.yourname.com）

### Q: 如何删除网站？
A: 删除 GitHub 仓库或在 Settings → Pages 中禁用即可

---

## 📞 需要帮助？

如果在部署过程中遇到问题，可以：
1. 检查每一步的输出信息是否有报错
2. 访问 GitHub Pages 官方文档：https://docs.github.com/pages
3. 或者告诉我具体的错误信息，我帮您解决！

---

## ✨ 部署后的效果

- **网址格式**：`https://YOUR_USERNAME.github.io/wenxue/`
- **完全免费**：无流量限制、无存储限制
- **全球加速**：GitHub CDN 全球分发
- **HTTPS 加密**：自动提供 SSL 证书
- **自动部署**：每次 push 代码自动更新

祝您部署顺利！🎉
