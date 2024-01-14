import {mkdir, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import * as allColorScales from '@radix-ui/colors';

const outputDir = '.';
const supportsP3AtRule = '@supports (color: color(display-p3 1 1 1))';
const matchesP3MediaRule = '@media (color-gamut: p3)';
await Promise.all(
    Object.keys(allColorScales)
        .filter(key => !key.includes('P3') && key !== 'default')
        .map(async key => {
            let selector =
                '[data-theme="light"], :root:not([data-theme="dark"])';

            if (key === 'blackA' || key === 'whiteA') {
                selector = ':root';
            }

            if (key.includes('Dark')) {
                selector = '[data-theme="dark"]';
            }

            const srgbValues = Object.entries(allColorScales).find(
                ([name]) => name === key,
            )![1];
            const srgbCssProperties = Object.entries(srgbValues)
                .map(([name, value]) => [toCssCasing(name), value])
                .map(([name, value]) => `  --${name}: ${value};`)
                .join('\n');
            const srgbCssRule = `${selector} {\n${srgbCssProperties}\n}`;
            const p3Values = Object.entries(allColorScales).find(
                ([name]) =>
                    name === key + 'P3' || name === key.replace(/.$/, 'P3A'),
            )![1];
            const p3CssProperties = Object.entries(p3Values)
                .map(([name, value]) => [toCssCasing(name), value])
                .map(([name, value]) => `${indent(3)}--${name}: ${value};`)
                .join('\n');
            const p3CssRule =
                `${supportsP3AtRule} {\n` +
                `${indent(1)}${matchesP3MediaRule} {\n` +
                `${indent(2)}${selector} {\n` +
                `${p3CssProperties}\n${indent(2)}}\n${indent(1)}}\n}`;

            let css = `${srgbCssRule}\n\n${p3CssRule}`;
            if (key.includes('Dark')) {
                const indented = css
                    .replaceAll(selector, `:root:not([data-theme="light"])`)
                    .split('\n')
                    .map(prop => `${indent(1)}${prop}`)
                    .join('\n');
                css += `\n\n@media only screen and (prefers-color-scheme: dark) {\n${indented}\n}`;
            }

            await mkdir('lib/', {recursive: true});
            await writeFile(join(outputDir, toFileName(key) + '.css'), css);
        }),
);
console.log('built successfully');

function toCssCasing(text: string) {
    return text
        .replace(/([a-z])(\d)/, '$1-$2')
        .replaceAll(/([A-Z])/g, '-$1')
        .toLowerCase();
}

function toFileName(text: string) {
    return toCssCasing(text).replace(/-a$/, '-alpha');
}

function indent(levels = 1) {
    return ' '.repeat(levels * 2);
}
