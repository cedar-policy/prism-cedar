// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/*
 * vitest script for prism-cedar.min.js
 */
import { describe, expect, it } from 'vitest';
import * as path from 'path';
import * as fs from 'fs';
import Prism from './static/prism.js';
import '../dist/prism-cedar.min.js';

describe('data/*.cedar files', () => {
  const files = fs
    .readdirSync(path.join(__dirname, 'data'))
    .filter((f) => f.endsWith('.cedar'));
  files.forEach((file) => {
    it(file, () => {
      const code = fs.readFileSync(path.join(__dirname, 'data', file), 'utf8');
      const result = Prism.highlight(code, Prism.languages.cedar, 'cedar');

      expect(result).toMatchFileSnapshot(
        path.join(__dirname, 'data', file.replace('.cedar', '.html')),
      );
    });
  });
});
