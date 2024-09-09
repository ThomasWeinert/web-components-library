const sass = require('sass');
const fs = require('fs').promises;
const path = require('path');

async function compileStyles(sourceFile, targetFile) {
  const result = sass.compile(sourceFile);
  return fs.writeFile(
    targetFile,
    result.css
  );
}

compileStyles(
  path.resolve(__dirname, '../src/widgets.scss'),
  path.resolve(__dirname, '../build/widgets/widgets.css')
).then(
  () => console.log('Done'),
  (e) => console.error(e)
);
