// Copyright Cedar Contributors
// SPDX-License-Identifier: Apache-2.0
/*
 * vitest script for prism-cedar.min.js
 */
import { describe, expect, it } from 'vitest';
import * as path from 'node:path';
import * as fs from 'node:fs';
import Prism from './static/prism.js';
import '../dist/prism-cedar.min.js';

const dataDir = path.join(__dirname, 'data');

const processLanguage = (language) => {
  const files = fs
    .readdirSync(dataDir)
    .filter((f) => f.endsWith(`.${language}`));
  files.forEach((file) => {
    it(file, async () => {
      const code = fs.readFileSync(path.join(dataDir, file), 'utf8');
      const result = Prism.highlight(code, Prism.languages[language], language);

      await expect(result).toMatchFileSnapshot(
        path.join(dataDir, file.replace(`.${language}`, '.html')),
      );
    });
  });
};

describe('data/*.cedar files', () => {
  processLanguage('cedar');
});

describe('data/*.cedarschema files', () => {
  processLanguage('cedarschema');
});

// A .cedar and a .cedarschema input sharing a base name would both snapshot to
// <base>.html and silently overwrite each other, so guard against it.
describe('data/ snapshot targets', () => {
  it('no two inputs map to the same .html snapshot', () => {
    const seen = new Map();
    const collisions = [];
    fs.readdirSync(dataDir)
      .filter((f) => f.endsWith('.cedar') || f.endsWith('.cedarschema'))
      .forEach((file) => {
        const html = file.replace(/\.cedarschema$|\.cedar$/, '.html');
        if (seen.has(html)) {
          collisions.push(`${seen.get(html)} and ${file} both map to ${html}`);
        }
        seen.set(html, file);
      });
    expect(collisions).toEqual([]);
  });
});
