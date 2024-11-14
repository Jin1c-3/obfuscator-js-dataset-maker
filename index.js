import { origin_dir } from './config/index.js';
import { recordOutputs, recordObfuscatedCode, getTargetFile } from './utils/index.js'

async function makeDateset(code_dir) {
    const codeMap = await getTargetFile(code_dir);
    const newCodeMap = await recordOutputs(codeMap, true);
    return newCodeMap
}

async function obfuscate(pre_processed_data) {
    recordObfuscatedCode(pre_processed_data)
}

// var singleObfuscationResult = JavaScriptObfuscator.obfuscate();
async function main() {
    const pre_processe_codes = await makeDateset(origin_dir);
    await obfuscate(pre_processe_codes)
    return
}

main();