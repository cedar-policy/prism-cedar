# Prism support for Cedar policy language

[Prism](https://prismjs.com/index.html) (a lightweight, extensible syntax highlighter) support for Cedar policy language based on [Grammar specification for Cedar policy syntax](https://docs.cedarpolicy.com/syntax-grammar.html).

## Install

Install the project dependencies using `npm install`.

`src/prism-cedar.js` is the main source file.

## Build

The `npm run build` script uses [esbuild](https://esbuild.github.io/api/) to create `dist/prism-cedar.min.js` with the `--minify` option.

## Test

`npm run test` uses [vitest](https://vitest.dev) to syntax highlight `test/data/*.cedar` files and compares against a generated `.html`
[File Snapshots](https://vitest.dev/guide/snapshot.html#file-snapshots) for each Cedar file.

View the static `test/static/index.html` in your browser which loads `dist/prism-cedar.min.js`.  The `test/static` folder includes a downloaded copy of PrismJS 1.29.0.

When new `test/data/*.cedar` files are created, `npm run testdata` will update the contents of each `index.html` file.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.
