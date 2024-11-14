import fs from 'fs'
import path from 'path'
import JavaScriptObfuscator from 'javascript-obfuscator';
import { JavascriptObfuscatorConfig, final_dir } from '../config/index.js';
import { encode as jsFuckEncode } from '../model/jsfuck.js'

async function recordObfuscatedCode(pre_processed_datamap) {
    for (const [filename, code] of pre_processed_datamap.entries()) {
        const origin_filename = filename.substring(0, filename.indexOf('.'))
        const ext_name = filename.substring(filename.indexOf('.') + 1)
        try {
            await Promise.all([
                fs.promises.writeFile(path.join(final_dir, `${origin_filename}_jo_${JavascriptObfuscatorConfig.getConfigInstance.name}.${ext_name}`), JavaScriptObfuscator.obfuscate(code, JavascriptObfuscatorConfig.getConfigInstance()).getObfuscatedCode()),
                fs.promises.writeFile(path.join(final_dir, `${origin_filename}_jf.${ext_name}`), jsFuckEncode(code, true, false)),
            ]);
        } catch (error) {
            console.error(`Error writing files for origin_filename ${filename}:`, error);
        }
    };
}

export { recordObfuscatedCode }