# JesterTester

This is a sample repo to illustrate and debug issues running jest tests with next.js

This is possibly/probably user error, but took a long time to figure out.

## Setup

This repo was initialized with `create-next-app` using the `with-jest` option with current Next.js version (14.0.1).

```bash
npx create-next-app --example with-jest with-jest-app
```

## Problem

Let's add a dependency like `camelcase-keys`, and use it in a test file (`app/component.test.tx`).

When we `npm run test`, we get this ugly import error.

```
Jest encountered an unexpected token

Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

By default "node_modules" folder is ignored by transformers.

Here's what you can do:
 • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
 • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
 • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
 • If you need a custom transformation specify a "transform" option in your config.
 • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

You'll find more details and examples of these config options in the docs:
https://jestjs.io/docs/configuration
For information about custom transformations, see:
https://jestjs.io/docs/code-transformation

Details:

/Users/bear/src/tmp/nextjest/with-jest-app/node_modules/camelcase-keys/index.js:1
({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import mapObject from 'map-obj';
                                                                                  ^^^^^^

SyntaxError: Cannot use import statement outside a module
```

I suppose steps in the error message might make more sense to the experienced typescripter (javascripter?), but took a while to click for me.

So we need to add some modules (namely `camelcase-keys`) to `transformIgnorePatterns` in `jest.config.js`.

However, there's a catch! We can't just override the value in the config that's passed to Jest. Since we're configuring Jest through next, we need to ensure our override comes in after the next config. `createJestConfig` is an async function, so we need to `await` that, then layer in the `transformIgnorePatterns` on top of that.

Would never have found that without [this clutch StackOverflow post](https://stackoverflow.com/a/75604417)
