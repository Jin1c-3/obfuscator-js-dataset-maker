import fs from 'fs';
import path from 'path';
import { pre_processed_dir, final_dir } from '../config/index.js'

export async function recordOutputs(codeMap, newStart = true) {
    if (newStart) {
        await fs.promises.rm(pre_processed_dir, { recursive: true, force: true });
        await fs.promises.mkdir(pre_processed_dir, { recursive: true });
        await fs.promises.rm(final_dir, { recursive: true, force: true });
        await fs.promises.mkdir(final_dir, { recursive: true });
    }
    let newCodeMap = new Map(codeMap);
    for (const [filename, code] of codeMap.entries()) {
        const outputFile = filename + '.out';
        let output = '';

        const consoleLog = console.log;
        try {
            console.log = (msg) => { output += msg + '\n'; };
            eval(code);
        } catch (error) {
            console.log(`Error executing code in ${filename}:`, error);
            newCodeMap.delete(filename);
            console.log = consoleLog;
            continue;
        }
        console.log = consoleLog;

        if (output) {
            try {
                await Promise.all([
                    fs.promises.writeFile(path.join(pre_processed_dir, filename), code),
                    fs.promises.writeFile(path.join(final_dir, outputFile), output)
                ]);
            } catch (error) {
                newCodeMap.delete(filename);
                console.error(`Error writing files for ${filename}:`, error);
            }
        } else {
            newCodeMap.delete(filename);
            console.log(`No output for ${filename}`);
        }
    };
    return newCodeMap;
}
