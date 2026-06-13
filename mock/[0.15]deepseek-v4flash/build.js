const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const outFile = path.join(__dirname, 'js', 'pages.js');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

let output = 'const PAGES = {\n';

for (const file of files) {
  const name = file.replace('.html', '');
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
  const escaped = content
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
  output += `  "${name}": \`${escaped}\`,\n`;
}

output += '};\n';
fs.writeFileSync(outFile, output, 'utf-8');
console.log(`Generated ${outFile} with ${files.length} pages`);