import { origin_dir } from "./config/index.js";
import { recordOutputs, recordObfuscatedCode, getTargetFile } from "./utils/index.js";

async function makeDateset(code_dir) {
    const codeMap = await getTargetFile(code_dir); // 1.1. 遍历文件夹内所有.js结尾的文件
    const newCodeMap = await recordOutputs(codeMap, true); // 1.2. eval()这些代码并存储输出
    return newCodeMap;
}

async function obfuscate(pre_processed_data) {
    recordObfuscatedCode(pre_processed_data); // 2.1. 根据配置混淆代码并存储
}

async function main() {
    const pre_processe_codes = await makeDateset(origin_dir); // 1. 制作未混淆的数据集
    await obfuscate(pre_processe_codes); // 2. 混淆上述数据集
    return;
}

main();