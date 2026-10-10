import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const read = path => readFileSync(join('dist', path), 'utf8');
const htmlFiles = readdirSync('dist', { recursive: true }).filter(path => path.endsWith('.html'));
for (const file of htmlFiles) {
  const html = read(file);
  assert.match(html, /lang="zh-CN"/, `${file}: Chinese document language`);
  assert.match(html, /https:\/\/luxizon-blog.pages.dev/, `${file}: canonical site`);
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) {
    const target = decodeURIComponent(url);
    assert.ok(existsSync(join('dist', target)) || existsSync(join('dist', target, 'index.html')), `${file}: broken link ${url}`);
  }
}
for (const id of ['first-post', 'second-post', 'third-post']) {
  const html = read(`blog/${id}/index.html`);
  assert.match(html, /noindex, follow/);
  assert.match(html, /这是一篇演示文章/);
  assert.ok(!read('rss.xml').includes(`/blog/${id}`));
  assert.ok(!read('sitemap-0.xml').includes(`/blog/${id}`));
}
assert.ok(!existsSync('dist/blog/using-mdx/index.html'));
assert.ok(!existsSync('dist/blog/markdown-style-guide/index.html'));
assert.match(read('blog/first-post/index.html'), /--shiki-light/);
assert.match(read('blog/index.html'), /0 篇正式笔记/);
assert.match(read('index.html'), /https:\/\/github.com\/Luxizon/);
console.log(`Validated ${htmlFiles.length} HTML pages: local links, language, canonical URLs, draft and example exclusion, syntax highlighting.`);
