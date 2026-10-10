type PostLike = { id: string; data: { pubDate: Date; draft: boolean; example: boolean } };

export function selectPosts<T extends PostLike>(posts: T[], includeExamples = true): T[] {
  return posts.filter(({ data }) => !data.draft && (includeExamples || !data.example))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id));
}

export function readingMinutes(body: string): number {
  const chinese = (body.match(/[\u3400-\u9fff]/g) || []).length;
  const words = (body.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9_]+/g) || []).length;
  return Math.max(1, Math.ceil(chinese / 300 + words / 200));
}
