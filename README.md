# Luxizon's Blog

基于 Astro 7 的中文个人技术博客。静态输出，面向 Cloudflare Pages；本项目不会自动部署。

## 本地预览

要求 Node.js >= 22.12.0。Windows PowerShell 使用 `npm.cmd` 可避免 npm.ps1 执行策略限制。

```powershell
npm.cmd install
npm.cmd run dev -- --background
```

打开 http://localhost:4321 。

```powershell
npm.cmd run astro -- dev status
npm.cmd run astro -- dev logs
npm.cmd run astro -- dev stop
```

## 验证

```powershell
npm.cmd test
npm.cmd run check
npm.cmd run build
npm.cmd run check:build
```

构建结果在 `dist/`。静态部署使用构建命令 `npm run build`、输出目录 `dist`，无需服务端适配器。部署由站点所有者自行决定。

## 内容

文章放在 `src/content/blog/`，支持 Markdown 与 MDX：

```yaml
---
title: '你的文章标题'
description: '一两句话说明本文内容'
pubDate: '2026-10-10'
category: 'C++ 与算法'
tags: ['C++', 'STL']
draft: true
example: false
---
```

- 分类取值：C++ 与算法、Linux 与系统、网络安全、AI 应用安全、开发与思考。
- `draft: true` 不生成文章页面，也不出现在列表或 RSS。
- `example: true` 显示明确的演示标记，页面 noindex，不进入 RSS 或 sitemap。正式发表自己写作的内容时再设为 false。
- 当前三篇演示文章仅用于排版预览，不是作者真实学习成果；另两篇原模板文章保留为草稿。
- 文章 ID 默认来自文件路径；保持文件名即可保留链接。
- 日期采用 UTC 格式化，避免本地时区改变发布日期。
- 阅读时间按中文字符与英文词数粗略估计。

## 结构

- `src/consts.ts`：站点信息、GitHub、分类定义。
- `src/layouts/BaseLayout.astro`：统一语言、SEO、导航与页脚。
- `src/layouts/BlogPost.astro`：文章排版和演示标记。
- `src/components/PostCard.astro`：首页与列表复用文章组件。
- `src/lib/posts.ts`、`post-utils.ts`：统一内容读取、草稿过滤、排序与阅读时间。
- `src/styles/tokens.css`：浅色与深色设计变量。
- `src/styles/global.css`、`prose.css`：网站布局与正文样式。
- `tests/`、`scripts/check-build.mjs`：内容逻辑及静态输出检查。

主题默认跟随系统，可手动选择浅色或深色，并在浏览器中记忆；禁用 JavaScript 时仍可跟随系统，主题选择控件隐藏。

## 当前范围

第一阶段已提供：首页、文章列表、基础文章详情、关于、404、响应式、语法高亮、基础 SEO、RSS，以及主题切换。

后续：分类筛选、文章目录、代码复制、上一篇/下一篇、静态搜索和分享图。未实现的功能不展示为可用入口。项目区仅展示真实存在的本博客；联系方式待补充。
