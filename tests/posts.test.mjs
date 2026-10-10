import test from 'node:test';
import assert from 'node:assert/strict';
import { selectPosts, readingMinutes } from '../src/lib/post-utils.ts';

const post = (id, date, extra = {}) => ({ id, data: { pubDate: new Date(date), draft: false, example: false, ...extra } });
test('drafts never publish; examples may display but never enter the feed', () => {
  const input = [post('draft', '2026-01-03', { draft: true }), post('example', '2026-01-02', { example: true }), post('real', '2026-01-01')];
  assert.deepEqual(selectPosts(input).map(p => p.id), ['example', 'real']);
  assert.deepEqual(selectPosts(input, false).map(p => p.id), ['real']);
  assert.equal(input[0].id, 'draft');
});
test('newest first with stable id order for matching dates', () => {
  assert.deepEqual(selectPosts([post('z', '2026-01-01'), post('b', '2026-01-02'), post('a', '2026-01-02')]).map(p => p.id), ['a', 'b', 'z']);
});
test('reading time supports Chinese and English with a one minute minimum', () => {
  assert.equal(readingMinutes(''), 1);
  assert.equal(readingMinutes('学'.repeat(600)), 2);
  assert.equal(readingMinutes('word '.repeat(400)), 2);
});
