import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const sourceRoot = process.argv[2];

if (!sourceRoot) {
  throw new Error('Usage: node scripts/migrate-kde-blog.mjs <KDEBlog checkout>');
}

const posts = [
  {
    source: '2024OSPP KDE社区项目：Porting KDE Games to Android platform.md',
    slug: 'porting-kde-games-to-android',
    title: 'Porting KDE Games to Android: My 2024 OSPP Project',
    description: 'An introduction to my 2024 OSPP project with KDE and the plan for porting a KDE game to Android.',
    publishedAt: '2024-07-03',
    tags: ['OSPP', 'KDE', 'Android'],
  },
  {
    source: '2024OSPP KDE项目中期总结.md',
    slug: 'ospp-kde-project-midterm-summary',
    title: 'Mid-Term Summary of My 2024 OSPP KDE Project',
    description: 'The first three weeks of porting Blinken to Android with QML, C++, and KDE tooling.',
    publishedAt: '2024-07-21',
    tags: ['OSPP', 'KDE', 'QML'],
  },
  {
    source: 'QML 安卓应用构建与运行.md',
    slug: 'building-running-qml-android-applications',
    title: 'Building and Running QML Android Applications',
    description: 'Notes on updating Android Gradle Plugin and Gradle versions when building QML applications for Android.',
    publishedAt: '2024-07-23',
    tags: ['Android', 'QML', 'Qt'],
  },
  {
    source: '2024OSPP KDE项目末期总结.md',
    slug: 'ospp-kde-project-late-stage-summary',
    title: 'Late-Stage Summary of My 2024 OSPP KDE Project',
    description: 'Finishing the QML port of Blinken and working through KF6, Craft, Android, and CI integration issues.',
    publishedAt: '2024-08-17',
    tags: ['OSPP', 'KDE', 'QML', 'Android'],
  },
];

const blogRoot = resolve('src/content/blog');
const assetRoot = resolve('public/images/kde');
await mkdir(blogRoot, { recursive: true });
await mkdir(assetRoot, { recursive: true });

for (const post of posts) {
  const sourcePath = resolve(sourceRoot, 'docs/posts', post.source);
  let body = await readFile(sourcePath, 'utf8');

  body = body.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n+/, '');
  body = body.replace(/^\s*# .+\r?\n+/, '');

  const imageMatch = body.match(/\[BlinkenDraft\]: data:image\/jpeg;base64,([^\r\n]+)/);
  if (imageMatch) {
    await writeFile(resolve(assetRoot, 'blinken-draft.jpg'), Buffer.from(imageMatch[1], 'base64'));
    body = body
      .replace('![Blinken Draft][BlinkenDraft]', '![Blinken interface draft](/images/kde/blinken-draft.jpg)')
      .replace(/\r?\n\[BlinkenDraft\]: data:image\/jpeg;base64,[^\r\n]+/, '');
  }

  body = body
    .replace(
      /https:\/\/heeiya\.github\.io\/KDEBlog\/posts\/QML%20[^)]+\.html#building-qml-android-applications/,
      '/blog/building-running-qml-android-applications/',
    )
    .replace(
      '[Qt Online Installer]((https://doc.qt.io/qt-6/get-and-install-qt.html#using-qt-maintenance-tool)',
      '[Qt Online Installer](https://doc.qt.io/qt-6/get-and-install-qt.html#using-qt-maintenance-tool)',
    )
    .replace(/```C\+\+/g, '```cpp')
    .replace(/\r\n/g, '\n')
    .trim();

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(post.title)}`,
    `description: ${JSON.stringify(post.description)}`,
    `publishedAt: ${post.publishedAt}`,
    'tags:',
    ...post.tags.map((tag) => `  - ${tag}`),
    'draft: false',
    '---',
    '',
  ].join('\n');

  await writeFile(resolve(blogRoot, `${post.slug}.md`), `${frontmatter}${body}\n`);
}

console.log(`Migrated ${posts.length} English KDEBlog posts into the blog collection.`);
