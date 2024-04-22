// Copyright Cedar Contributors
// SPDX-License-Identifier: Apache-2.0
/*
 * updates each index.html file with *.cedar and *.cedarschema files
 */
const path = require('node:path');
const fs = require('node:fs');

function buildExamples() {
  let html = '',
    cedarHTML = '',
    cedarschemaHTML = '';

  const files = fs.readdirSync(path.join(__dirname, 'data')).filter((f) => {
    return f.endsWith('.cedar') || f.endsWith('.cedarschema');
  });
  files.forEach((file) => {
    const code = fs.readFileSync(path.join(__dirname, 'data', file), 'utf8');

    if (file.endsWith('.cedarschema')) {
      cedarschemaHTML += `
    <h3>${file}</h3>
    <pre><code class="language-cedarschema">
${code.replaceAll('<', '&lt;')}
</code></pre>
`;
    } else {
      cedarHTML += `
    <h3>${file}</h3>
    <pre><code class="language-cedar">
${code.replaceAll('<', '&lt;')}
</code></pre>
`;
    }
  });

  html = `
    <h2>Cedar</h2>
${cedarHTML}
    <hr />

    <h2>Cedar schema</h2>
${cedarschemaHTML}
`;

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
