// Copyright Cedar Contributors
// SPDX-License-Identifier: Apache-2.0
/*
 * updates each index.html file with *.cedar files
 */
const path = require('path');
const fs = require('fs');

function buildExamples() {
  let html = '';

  const files = fs
    .readdirSync(path.join(__dirname, 'data'))
    .filter((f) => f.endsWith('.cedar'));
  files.forEach((file) => {
    const code = fs.readFileSync(path.join(__dirname, 'data', file), 'utf8');

    html += `
    <h2>${file}</h2>
    <pre><code class="language-cedar">
${code.replaceAll('<', '&lt;')}
</code></pre>
`;
  });

  return html;
}

const BEGIN = `    <!-- BEGIN generated code -->\n`;
const END = `    <!-- END generated code -->\n`;

function update(path, examples) {
  const code = fs.readFileSync(path).toString();

  const start = code.indexOf(BEGIN);
  if (start > 0) {
    const end = code.indexOf(END);
    if (end > 0) {
      const html =
        code.substring(0, start + BEGIN.length) +
        examples +
        code.substring(end);
      fs.writeFileSync(path, html);
    }
  }
}

const examples = buildExamples();
update(path.join(__dirname, 'static', 'index.html'), examples);
