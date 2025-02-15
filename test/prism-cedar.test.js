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

const processLanguage = (language) => {
  const files = fs
    .readdirSync(path.join(__dirname, 'data'))
    .filter((f) => f.endsWith(`.${language}`));
  files.forEach((file) => {
    it(file, async () => {
      const code = fs.readFileSync(path.join(__dirname, 'data', file), 'utf8');
      const result = Prism.highlight(code, Prism.languages[language], language);

      await expect(result).toMatchFileSnapshot(
        path.join(__dirname, 'data', file.replace(`.${language}`, '.html')),
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
