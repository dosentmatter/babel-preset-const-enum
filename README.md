# babel-preset-const-enum

> Babel preset for TypeScript `const` enums

## Install

Using npm:

```sh
npm install --save-dev babel-preset-const-enum
```

or using yarn:

```sh
yarn add babel-preset-const-enum --dev
```

## Description

This preset runs
[`babel-plugin-const-enum`](https://github.com/dosentmatter/babel-plugin-const-enum)
only on files with extensions `.ts` or `.tsx`. This prevents `SyntaxError`s from
happening when mistakenly running `babel-plugin-const-enum` on non-TypeScript
files such as [flow](https://flow.org/), which uses a `.js` extension.

A babel preset is required because plugins don't have access to the file
extension of the file the plugin may run on.

## Usage

You are most likely using
[`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript)
as along with this preset. Make sure that `babel-preset-const-enum` comes after
`@babel/preset-typescript` in the preset array so that
`babel-preset-const-enum` [runs first](https://babeljs.io/docs/en/presets#preset-ordering).
This preset needs to run first to transform the `const enum`s into code that
`@babel/preset-typescript` allows.

`.babelrc`

```json
{
  "presets": ["@babel/typescript", "const-enum"]
}
```

### `allExtensions`

`boolean`, defaults to `false`.

Indicates that every file extension should be parsed.

### `transform: removeConst` (default)

Removes the `const` keyword to use regular `enum`.
Can be used in a slower dev build to allow `const`, while prod still uses `tsc`.
See [babel#6476](https://github.com/babel/babel/issues/6476).

```ts
// Before:
const enum MyEnum {
  A = 1,
  B = A,
  C,
  D = C,
  E = 1,
  F,
  G = A * E,
  H = A ** (B ** C),
  I = A << 20,
}

// After:
enum MyEnum {
  A = 1,
  B = A,
  C,
  D = C,
  E = 1,
  F,
  G = A * E,
  H = A ** (B ** C),
  I = A << 20,
}
```

`.babelrc`

```json
{
  "presets": ["const-enum"]
}
```

Or Explicitly:

`.babelrc`

```json
{
  "presets": [
    [
      "const-enum",
      {
        "transform": "removeConst"
      }
    ]
  ]
}
```

### `transform: constObject`

Transforms into a `const` object literal.
Can be further compressed using Uglify/Terser to inline `enum` access.
See [babel#8741](https://github.com/babel/babel/issues/8741).

```ts
// Before:
const enum MyEnum {
  A = 1,
  B = A,
  C,
  D = C,
  E = 1,
  F,
  G = A * E,
  H = A ** (B ** C),
  I = A << 20,
}

// After:
const MyEnum = {
  A: 1,
  B: 1,
  C: 2,
  D: 2,
  E: 1,
  F: 2,
  G: 1,
  H: 1,
  I: 1048576,
};
```

`.babelrc`

```json
{
  "presets": [
    [
      "const-enum",
      {
        "transform": "constObject"
      }
    ]
  ]
}
```
