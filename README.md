# Prism support for Cedar policy language and Cedar human-readable schema

[Prism](https://prismjs.com/index.html) (a lightweight, extensible syntax highlighter) support for Cedar policy language based on [Grammar specification for Cedar policy syntax](https://docs.cedarpolicy.com/syntax-grammar.html) and for Cedar human-readable schema based on [Grammar specification for human-readable schemas](https://docs.cedarpolicy.com/schema/human-readable-schema-grammar.html) and mapped tp [Prism tokens](https://prismjs.com/tokens.html).

## Use

Web browser `<script src=>` usage example from `test/static/index.html` (adjust the script `src` paths as required):

```html
    <script src="prism.js"></script>
    <script src="prism-cedar.js"></script>
```

## Development

### Install

Install the project dependencies using `npm install`.

`src/prism-cedar.js` is the main source file.

### Build

The `npm run build` script uses [esbuild](https://esbuild.github.io/api/) to create `dist/prism-cedar.min.js` with the `--minify` option.

### Test

`npm run test` uses [vitest](https://vitest.dev) to syntax highlight `test/data/*.cedar` and `test/data/*.cedarschema` files and compares against a generated `.html`
[File Snapshots](https://vitest.dev/guide/snapshot.html#file-snapshots) for each Cedar and Cedar human-readable schema file.

View the static `test/static/index.html` in your browser which loads `dist/prism-cedar.min.js`.  The `test/static` folder includes a downloaded copy of PrismJS 1.29.0.

When new `test/data/*.cedar` or `test/data/*.cedarschema` files are created, `npm run testdata` will update the contents of each `index.html` file.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.
