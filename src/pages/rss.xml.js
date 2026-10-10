import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getPosts, postUrl } from '../lib/posts';
export async function GET(context) {
  const posts = await getPosts(false);
  return rss({
    title: SITE_TITLE, description: SITE_DESCRIPTION, site: context.site,
    items: posts.map(post => ({ title: post.data.title, description: post.data.description, pubDate: post.data.pubDate, link: postUrl(post.id) })),
    customData: '<language>zh-cn</language>',
  });
}
