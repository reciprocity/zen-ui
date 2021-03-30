const path = require('path');
const { promises: fs } = require('fs');

(async () => {
  const cwd = process.cwd();
  const [changelog, base] = await Promise.all([
    fs.readFile(path.join(cwd, 'CHANGELOG.md'), 'utf-8'),
    fs.readFile(path.join(__dirname, 'changelog-base.mdx'), 'utf-8'),
  ]);

  await fs.writeFile(path.join(cwd, 'src', 'stories', 'changelog.stories.mdx'), `${base.trim()}\n${changelog}`);
})();
