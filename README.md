# Prism support for Cedar policy language

[Prism](https://prismjs.com/index.html) (a lightweight, extensible syntax highlighter) support for Cedar policy language based on [Grammar specification for Cedar policy syntax](https://docs.cedarpolicy.com/syntax-grammar.html).

See it in action by cloning this repository and viewing `test/index.html` in your browser.  The `test` folder includes a downloaded copy of PrismJS 1.29.0 and loads `dist/prism-cedar.min.js`.

## Building

`dist/prism-cedar.min.js` is built from `src/prism-cedar.js` using [esbuild](https://esbuild.github.io/) with the `--minify` option.

```bash
npm run install
npm run build
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.
