import {mkdir, writeFile} from 'node:fs/promises';
import * as allColorScales from './colors/src/index';

Promise.all(
    Object.entries(allColorScales).map(async ([colorScaleName, scale]) => {
        const isDark = /DarkA?$/.test(colorScaleName);
        const selector = isDark
            ? '[data-theme="dark"]'
            : '[data-theme="light"], :root:not([data-theme="dark"])';

        const scaleAsCssProperties = Object.entries(scale)
            .map(([name, value]) => `  --${name}: ${value};`)
            .join('\n');
        let scaleAsCssFile = `${selector} {\n${scaleAsCssProperties}\n}`;

        if (isDark) {
            const indented = scaleAsCssProperties
                .split('\n')
                .map(prop => `  ${prop}`)
                .join('\n');
            scaleAsCssFile += `\n\n@media only screen and (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${indented}\n  }\n}`;
        }

        await mkdir('lib/', {recursive: true});
        return writeFile('lib/' + colorScaleName + '.css', scaleAsCssFile);
    }),
)
    .then(() => {
        console.log('built successfully');
    })
    .catch(console.error);
