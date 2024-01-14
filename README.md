# radixui-colors-classless

[![npm](https://img.shields.io/npm/v/radixui-colors-classless)](https://www.npmjs.com/package/radixui-colors-classless)

Modification of [@radix-ui/colors](https://github.com/radix-ui/colors) that works
without classes, adapted from <https://github.com/radix-ui/colors/pull/27>.

## Installation

### NPM

```sh
npm i radixui-colors-classless
```

### PNPM

```sh
pnpm add radixui-colors-classless
```

### Yarn

```sh
yarn add radixui-colors-classless
```

### CDN (jsDelivr)

```html
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/radixui-colors-classless@latest/slate.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/radixui-colors-classless@latest/slate-alpha.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/radixui-colors-classless@latest/slate-dark.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/radixui-colors-classless@latest/slate-dark-alpha.css">
    ...
</head> 
```

## Usage

Regular:

```css
@import "radixui-colors-classless/slate.css";
@import "radixui-colors-classless/slate-alpha.css";
@import "radixui-colors-classless/slate-dark.css";
@import "radixui-colors-classless/slate-dark-alpha.css";
```

With `url()`:

```css
@import url("radixui-colors-classless/slate.css");
@import url("radixui-colors-classless/slate-alpha.css");
@import url("radixui-colors-classless/slate-dark.css");
@import url("radixui-colors-classless/slate-dark-alpha.css");
```

From jsDelivr CDN:

```css
@import "https://cdn.jsdelivr.net/npm/radixui-colors-classless@latest/slate.css";
@import "https://cdn.jsdelivr.net/npm/radixui-colors-classless@latest/slate-alpha.css";
@import "https://cdn.jsdelivr.net/npm/radixui-colors-classless@latest/slate-dark.css";
@import "https://cdn.jsdelivr.net/npm/radixui-colors-classless@latest/slate-dark-alpha.css";
```

Or

```css
@import url("https://cdn.jsdelivr.net/npm/radixui-colors-classless@latest/slate.css");
@import url("https://cdn.jsdelivr.net/npm/radixui-colors-classless@latest/slate-alpha.css");
@import url("https://cdn.jsdelivr.net/npm/radixui-colors-classless@latest/slate-dark.css");
@import url("https://cdn.jsdelivr.net/npm/radixui-colors-classless@latest/slate-dark-alpha.css");
```

The variables are named in the following format:

```plaintext
--slate-1, --slate-2, ..., --slate-12
--slate-a1,--slate-a2, ..., --slate-a12
```

Example usage:

```css
.button {
    background-color: var(--cyan-9);
    color: var(--slate-1);
}
.button:hover {
    background-color: var(--cyan-10);
}
```

See <https://www.radix-ui.com/colors> for documentation of the colors themselves.

By default, these color schemes respect `prefers-color-scheme` for dark theme.
If you only import non-dark-theme files, their colors will be used. If you import
only dark theme files but your `prefers-color-scheme` is `light`,
no colors will be usable.

Forcing a color scheme:

```html
<div data-theme="light">...</div>
<div data-theme="dark">...</div>
```

You can check the format of the CSS files used at <https://www.npmjs.com/package/radixui-colors-classless?activeTab=code>

### Changing color scheme

## Editor Integration

### VSCode

Enable autocompletion for the CSS variables in VSCode by installing the
[CSS Var Complete](https://marketplace.visualstudio.com/items?itemName=phoenisx.cssvar)
extension  and adding the following in a `.vscode/settings.json` file
in the root of your project.

```json
{
    "cssvar.files": [
        "node_modules/radixui-colors-classless/*.css"
    ],
    // Do not ignore css files in node_modules, which is ignored by default
    "cssvar.ignore": [],
}
```

Autocompletion for CSS file paths are blocked by [vscode#869](https://github.com/microsoft/vscode/issues/869).
In the meantime, it's possible to do:

```css
@import "/node_modules/radixui-colors-classless/slate.css";
@import "/node_modules/radixui-colors-classless/slate-alpha.css";
@import "/node_modules/radixui-colors-classless/slate-dark.css";
@import "/node_modules/radixui-colors-classless/slate-dark-alpha.css";
```

Or

```css
@import url("/node_modules/radixui-colors-classless/slate.css");
@import url("/node_modules/radixui-colors-classless/slate-alpha.css");
@import url("/node_modules/radixui-colors-classless/slate-dark.css");
@import url("/node_modules/radixui-colors-classless/slate-dark-alpha.css");
```
