const fs = require('fs');
const path = require('path');

const fileManager = (rootDir) => {
  const srcDis = path.resolve(rootDir, 'src');
  const pagesDir = path.resolve(srcDis, 'pages');

  const getEntryPoints = () => {
    const result = {};
    fs.readdirSync(pagesDir).forEach((page) => {
      const pageDir = path.resolve(pagesDir, page);
      const filesInPageFolder = fs.readdirSync(pageDir);
      const hasPugFile = filesInPageFolder.some((el) => el.endsWith('pug'));
      const hasJsFile = filesInPageFolder.some((el) => el.endsWith('js'));
      const hasScssFile = filesInPageFolder.some((el) => el.endsWith('scss'));
      const isReallyPage = hasPugFile && hasScssFile && hasJsFile;
      if (isReallyPage) {
        result[page] = path.resolve(pagesDir, `${page}/${page}.js`);
      }
    });
    return result;
  };
  return { getEntryPoints };
};

module.exports = { fileManager };
