import { getCollection } from 'astro:content';
import { selectPosts } from './post-utils';
export const getPosts = async (includeExamples = true) => selectPosts(await getCollection('blog'), includeExamples);
export const postUrl = (id: string) => '/blog/' + id.split('/').map(encodeURIComponent).join('/') + '/';
