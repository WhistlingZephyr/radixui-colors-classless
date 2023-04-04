import {writeFile} from 'node:fs/promises';
import * as allColorScales from './colors/src/index';

Promise.all(
    Object.entries(allColorScales).map(async ([colorScaleName, scale]) => {
        const isDark = /DarkA?$/.test(colorScaleName);
        const selector = isDark
            ? '[data-theme="dark"]'
            : '[data-theme="light"], :root:not([data-theme="dark"])';

        const scaleAssCssProperties = Object.entries(scale)
            .map(([name, value]) => `  --${name}: ${value};`)
            .join('\n');
        let scaleAsCssFile = `${selector} {\n${scaleAssCssProperties}\n}`;

        if (isDark) {
            const indented = scaleAssCssProperties
                .split('\n')
                .map(prop => `  ${prop}`)
                .join('\n');
            scaleAsCssFile += `\n\n@media only screen and (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${indented}\n  }\n}`;
        }

        return writeFile('lib/' + colorScaleName + '.css', scaleAsCssFile);
    }),
)
    .then(() => {
        console.log('built successfully');
    })
    .catch(console.error);
