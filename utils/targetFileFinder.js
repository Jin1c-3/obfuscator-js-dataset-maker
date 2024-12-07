import fs from 'fs';
import path from 'path';
import simplify from './codeSimplifier.js'

async function getTargetFile(dir) {
    let codes = new Map();
    async function traverseDirectory(currentDir) {
        const items = fs.readdirSync(currentDir);
        items.forEach(async item => {
            const itemPath = path.join(currentDir, item);
            const itemStat = fs.statSync(itemPath);
            if (itemStat.isDirectory()) {
                if (item.startsWith('.')) return;
                traverseDirectory(itemPath);
            } else if (itemStat.isFile() && (item.endsWith('js') || item.endsWith('.html'))) {
                const code = fs.readFileSync(itemPath, 'utf8');
                if(item.endsWith('.html')) {
                    console.log(simplify(code))
                }
                codes.set(path.relative(dir, itemPath).split(path.sep).join('_'), simplify(code));
            }
        })
    }
    await traverseDirectory(dir);
    return codes;
}

export { getTargetFile };
