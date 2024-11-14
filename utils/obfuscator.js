import fs from 'fs'
import path from 'path'
import JavaScriptObfuscator from 'javascript-obfuscator';
import { JavascriptObfuscatorConfig, final_dir } from '../config/index.js';
import { encode as jsFuckEncode } from '../model/jsfuck.js'
import cliProgress from 'cli-progress';

async function recordObfuscatedCode(pre_processed_datamap) {
    const obfuscationConfigs = [
        JavascriptObfuscatorConfig.logicObfuscation(),
        JavascriptObfuscatorConfig.randomObfuscation(),
        JavascriptObfuscatorConfig.dataObfuscation(),
        JavascriptObfuscatorConfig.encodeObfuscation(),
        JavascriptObfuscatorConfig.presetLowObfuscation(),
        JavascriptObfuscatorConfig.presetMediumObfuscation(),
        JavascriptObfuscatorConfig.presetHighObfuscation(),
        JavascriptObfuscatorConfig.trickObfuscation(),
    ];

    const totalTasks = pre_processed_datamap.size * (obfuscationConfigs.length + 1);
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    let completedTasks = 0;
    progressBar.start(totalTasks, 0);

    for (const [filename, code] of pre_processed_datamap.entries()) {
        const origin_filename = filename.substring(0, filename.indexOf('.'));
        const ext_name = filename.substring(filename.indexOf('.') + 1);

        for (const config of obfuscationConfigs) {
            const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, config).getObfuscatedCode();
            const outputFilename = `${origin_filename}_${config.name}.${ext_name}`;
            await fs.promises.writeFile(path.join(final_dir, outputFilename), obfuscatedCode);
            completedTasks++;
            progressBar.update(completedTasks);
        }

        const jsFuckCode = jsFuckEncode(code, true, false);
        await fs.promises.writeFile(path.join(final_dir, `${origin_filename}_jsfuck.${ext_name}`), jsFuckCode);
        completedTasks++;
        progressBar.update(completedTasks);
    }

    progressBar.stop();
}

export { recordObfuscatedCode }