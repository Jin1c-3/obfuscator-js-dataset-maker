export default class JavascriptObfuscatorConfig {
    constructor(config) {
        Object.assign(this, config);
    }

    static global_target = ['browser', 'browser-no-eval', 'node'][1]; // 目标环境。browser-no-eval会在混淆代码中禁用eval

    static getConfigInstance() {
        const config = new JavascriptObfuscatorConfig({
            compact: false, // 一行输出
            // config: './config.json', // 配置文件
            controlFlowFlattening: false, // 控制流平坦化，把代码放在死循环里
            controlFlowFlatteningThreshold: 0.5, // 平坦化阈值
            deadCodeInjection: false, // 无用代码注入，会强制开启stringArray
            deadCodeInjectionThreshold: 0.4, // 无用代码注入阈值，控制死代码注入节点比例
            debugProtection: false, // 禁止调试
            debugProtectionInterval: 0, // 每隔多久强制打开调试，会影响其他调试工具的使用，建议2000-4000，单位毫秒
            disableConsoleOutput: false, // 把console.log()等输出改为[]，让别人没法调用
            domainLock: [], // 只允许在指定域名下运行，如果有子域名，则配置为 .domain.com
            // domainLockRedirectUrl: 'about:blank', // 重定向到指定页面
            // exclude: [], // 排除的文件
            forceTransformStrings: [], // 使用正则表达式替换字符串，只影响不被stringArray处理的字符串
            identifierNamesCache: null, // 方便在多文件混淆保护全局变量
            identifierNamesGenerator: ['dictionary', 'hexadecimal', 'mangled', 'mangled-shuffled'][2], // 就这几个参数
            identifiersDictionary: ['yujingyi', 'yujinger'], // 为上面的dictionary提供自定义字典
            identifiersPrefix: '', // 标识符全局前缀
            ignoreImports: false, // 防止混淆import、require
            inputFileName: '',
            log: false, // 输出日志
            numbersToExpressions: false, // 把数字转为表达式
            optionsPreset: ['default', 'low-obfuscation', 'medium-obfuscation', 'high-obfuscation'][0], // 预设配置，会影响其他选项
            renameGlobals: false, // 混淆全局变量
            renameProperties: false, // 启用后受renamePropertiesMode、identifierNamesGenerator和reservedNames影响
            renamePropertiesMode: ['safe', 'unsafe'][0], // safe会尝试避免一些runtime error，如果文件使用了其他文件的属性，建议开启identifierNamesCache
            reservedNames: [], // 支持正则
            reservedStrings: [], // 保护一些静态字符串
            seed: 0, // 可生成重复的结果
            selfDefending: false, // 如果美化代码会导致代码执行失败。该选项强制开启compact
            simplify: false, // 通过简化代码来混淆代码
            sourceMap: false, // 方便在生产环境调试混淆的代码
            sourceMapBaseUrl: '', // 上述文件的网址
            sourceMapFileName: '', // 上述设置开启后，默认的文件名是out.js.map，可以自定义
            sourceMapMode: ['separate', 'inline'][0], // seperate会生成单独的map文件，到时候点点点就行。inline则是每个混淆文件末尾都生成.map
            sourceMapSourcesMode: ['sources-content', 'soureces'][0], // 没看懂
            splitStrings: false, // 把字符串拆分成数组
            splitStringsChunkLength: 10000, // 拆分字符串的长度阈值
            stringArray: false, // 把用到的字符串都放进数组中
            stringArrayCallsTransform: false, // 让数组的参数变成函数调用，作用域应该是整个代码
            stringArrayCallsTransformThreshold: 0.5, // 数组的参数变换的概率
            stringArrayEncoding: [], // ['none', 'base64', 'rc4'] 将字符串编码，选项可组合。rc4的混淆比较强，但是会导致代码体积变大，开启后建议禁用unicodeEscapeSequence
            stringArrayIndexesType: ['hexadecimal-numeric-string'], // ['hexadecimal-number', 'hexadecimal-numeric-string'] 将字符串数组调用变为16进制数字或字符串，字符串可以阻止去混淆器的工作。选项可组合。
            stringArrayIndexShift: false, // 让字符串数组进行索引偏移
            stringArrayRotate: false, // 改变字符串数组的位置
            stringArrayShuffle: false, // 打乱字符串数组
            stringArrayWrappersCount: 0, // 作用域中字符串数组包装器的个数，和节点数目也有关系
            stringArrayWrappersChainedCalls: false, // 允许字符串包装器之间链式调用
            stringArrayWrappersParametersMaxCount: 2, // 允许字符串包装器的最大参数数目，建议2-5，必须2以上
            stringArrayWrappersType: ['variable', 'function'][0], // 字符串包装器的类型
            stringArrayThreshold: 0, // 字符串被放入数组的概率，默认0.8
            // target: ['browser', 'browser-no-eval', 'node'][2], // 目标环境。browser-no-eval会在混淆代码中禁用eval
            targrt: this.global_target,
            transformObjectKeys: false, // 允许转换对象的键
            unicodeEscapeSequence: false // 使用unicode转义字符。会让代码膨胀，且容易反混淆
        });
        config.name = 'unknown';
        return config;
    }

    static trickObfuscation() {
        const config = new JavascriptObfuscatorConfig({
            debugProtection: true, // 禁止调试
            debugProtectionInterval: 2000, // 每隔多久强制打开调试，会影响其他调试工具的使用，建议2000-4000，单位毫秒
            disableConsoleOutput: true, // 把console.log()等输出改为[]，让别人没法调用
            domainLock: ['.test.com', 'testdomin.com'], // 只允许在指定域名下运行，如果有子域名，则配置为 .domain.com
            domainLockRedirectUrl: 'about:blank', // 重定向到指定页面
            selfDefending: true, // 如果美化代码会导致代码执行失败。该选项强制开启compact

            compact: false, // 一行输出
            // config: './config.json', // 配置文件
            controlFlowFlattening: false, // 控制流平坦化，把代码放在死循环里
            controlFlowFlatteningThreshold: 0.5, // 平坦化阈值
            deadCodeInjection: false, // 无用代码注入，会强制开启stringArray
            deadCodeInjectionThreshold: 0.4, // 无用代码注入阈值，控制死代码注入节点比例
            // exclude: [], // 排除的文件
            forceTransformStrings: [], // 使用正则表达式替换字符串，只影响不被stringArray处理的字符串
            identifierNamesCache: null, // 方便在多文件混淆保护全局变量
            identifierNamesGenerator: ['dictionary', 'hexadecimal', 'mangled', 'mangled-shuffled'][2], // 就这几个参数
            identifiersDictionary: ['yujingyi', 'yujinger'], // 为上面的dictionary提供自定义字典
            identifiersPrefix: '', // 标识符全局前缀
            ignoreImports: false, // 防止混淆import、require
            inputFileName: '',
            log: false, // 输出日志
            numbersToExpressions: false, // 把数字转为表达式
            optionsPreset: ['default', 'low-obfuscation', 'medium-obfuscation', 'high-obfuscation'][0], // 预设配置，会影响其他选项
            renameGlobals: false, // 混淆全局变量
            renameProperties: false, // 启用后受renamePropertiesMode、identifierNamesGenerator和reservedNames影响
            renamePropertiesMode: ['safe', 'unsafe'][0], // safe会尝试避免一些runtime error，如果文件使用了其他文件的属性，建议开启identifierNamesCache
            reservedNames: [], // 支持正则
            reservedStrings: [], // 保护一些静态字符串
            seed: 0, // 可生成重复的结果
            simplify: false, // 通过简化代码来混淆代码
            sourceMap: false, // 方便在生产环境调试混淆的代码
            sourceMapBaseUrl: '', // 上述文件的网址
            sourceMapFileName: '', // 上述设置开启后，默认的文件名是out.js.map，可以自定义
            sourceMapMode: ['separate', 'inline'][0], // seperate会生成单独的map文件，到时候点点点就行。inline则是每个混淆文件末尾都生成.map
            sourceMapSourcesMode: ['sources-content', 'soureces'][0], // 没看懂
            splitStrings: false, // 把字符串拆分成数组
            splitStringsChunkLength: 10000, // 拆分字符串的长度阈值
            stringArray: false, // 把用到的字符串都放进数组中
            stringArrayCallsTransform: false, // 让数组的参数变成函数调用，作用域应该是整个代码
            stringArrayCallsTransformThreshold: 0.5, // 数组的参数变换的概率
            stringArrayEncoding: [], // ['none', 'base64', 'rc4'] 将字符串编码，选项可组合。rc4的混淆比较强，但是会导致代码体积变大，开启后建议禁用unicodeEscapeSequence
            stringArrayIndexesType: ['hexadecimal-numeric-string'], // ['hexadecimal-number', 'hexadecimal-numeric-string'] 将字符串数组调用变为16进制数字或字符串，字符串可以阻止去混淆器的工作。选项可组合。
            stringArrayIndexShift: false, // 让字符串数组进行索引偏移
            stringArrayRotate: false, // 改变字符串数组的位置
            stringArrayShuffle: false, // 打乱字符串数组
            stringArrayWrappersCount: 0, // 作用域中字符串数组包装器的个数，和节点数目也有关系
            stringArrayWrappersChainedCalls: false, // 允许字符串包装器之间链式调用
            stringArrayWrappersParametersMaxCount: 2, // 允许字符串包装器的最大参数数目，建议2-5，必须2以上
            stringArrayWrappersType: ['variable', 'function'][0], // 字符串包装器的类型
            stringArrayThreshold: 0, // 字符串被放入数组的概率，默认0.8
            // target: ['browser', 'browser-no-eval', 'node'][2], // 目标环境。browser-no-eval会在混淆代码中禁用eval
            targrt: this.global_target,
            transformObjectKeys: false, // 允许转换对象的键
            unicodeEscapeSequence: false // 使用unicode转义字符。会让代码膨胀，且容易反混淆
        });
        config.name = 'trick';
        return config;
    }

    static presetLowObfuscation() {
        const config = new JavascriptObfuscatorConfig({
            targrt: this.global_target,
            optionsPreset: ['default', 'low-obfuscation', 'medium-obfuscation', 'high-obfuscation'][1], // 预设配置，会影响其他选项
        });
        config.name = 'presetLowObfuscation';
        return config;
    }

    static presetMediumObfuscation() {
        const config = new JavascriptObfuscatorConfig({
            targrt: this.global_target,
            optionsPreset: ['default', 'low-obfuscation', 'medium-obfuscation', 'high-obfuscation'][2], // 预设配置，会影响其他选项
        });
        config.name = 'presetMediumObfuscation';
        return config;
    }
    
    static presetHighObfuscation() {
        const config = new JavascriptObfuscatorConfig({
            targrt: this.global_target,
            optionsPreset: ['default', 'low-obfuscation', 'medium-obfuscation', 'high-obfuscation'][3], // 预设配置，会影响其他选项
        });
        config.name = 'presetHighObfuscation';
        return config;
    }

    static logicObfuscation() {
        const config = new JavascriptObfuscatorConfig({
            compact: true, // 一行输出
            controlFlowFlattening: true, // 控制流平坦化，把代码放在死循环里
            controlFlowFlatteningThreshold: 1, // 平坦化阈值
            simplify: true, // 通过简化代码来混淆代码
            // 上面是打开的选项，下面是关闭的选项
            targrt: this.global_target, // 目标环境。browser-no-eval会在混淆代码中禁用eval
            // config: './config.json', // 配置文件
            deadCodeInjection: false, // 无用代码注入，会强制开启stringArray
            deadCodeInjectionThreshold: 0, // 无用代码注入阈值，控制死代码注入节点比例
            debugProtection: false, // 禁止调试
            // debugProtectionInterval: 0, // 每隔多久强制打开调试，会影响其他调试工具的使用，建议2000-4000，单位毫秒
            disableConsoleOutput: false, // 把console.log()等输出改为[]，让别人没法调用
            // domainLock: [], // 只允许在指定域名下运行，如果有子域名，则配置为 .domain.com
            // domainLockRedirectUrl: '', // 重定向到指定页面
            // exclude: [], // 排除的文件
            // forceTransformStrings: [], // 使用正则表达式替换字符串，只影响不被stringArray处理的字符串
            identifierNamesCache: null, // 方便在多文件混淆保护全局变量
            identifierNamesGenerator: ['dictionary', 'hexadecimal', 'mangled', 'mangled-shuffled'][3], // 就这几个参数
            // identifiersDictionary: [], // 为上面的dictionary提供自定义字典
            // identifiersPrefix: '', // 标识符全局前缀
            // ignoreImports: false, // 防止混淆import、require
            // inputFileName: '',
            log: false, // 输出日志
            numbersToExpressions: false, // 把数字转为表达式
            // optionsPreset: ['default', 'low-obfuscation', 'medium-obfuscation', 'high-obfuscation'][0], // 预设配置，会影响其他选项
            renameGlobals: false, // 混淆全局变量
            renameProperties: false, // 启用后受renamePropertiesMode、identifierNamesGenerator和reservedNames影响
            renamePropertiesMode: ['safe', 'unsafe'][0], // safe会尝试避免一些runtime error，如果文件使用了其他文件的属性，建议开启identifierNamesCache
            reservedNames: [], // 支持正则
            reservedStrings: [], // 保护一些静态字符串
            seed: 0, // 可生成重复的结果
            selfDefending: false, // 如果美化代码会导致代码执行失败。该选项强制开启compact
            sourceMap: false, // 方便在生产环境调试混淆的代码
            // sourceMapBaseUrl: '', // 上述文件的网址
            // sourceMapFileName: '', // 上述设置开启后，默认的文件名是out.js.map，可以自定义
            // sourceMapMode: ['separate', 'inline'][0], // seperate会生成单独的map文件，到时候点点点就行。inline则是每个混淆文件末尾都生成.map
            // sourceMapSourcesMode: ['sources-content', 'soureces'][0], // 没看懂
            splitStrings: false, // 把字符串拆分成数组
            splitStringsChunkLength: 10000, // 拆分字符串的长度阈值
            stringArray: false, // 把用到的字符串都放进数组中
            stringArrayCallsTransform: false, // 让数组的参数变成函数调用，作用域应该是整个代码
            stringArrayCallsTransformThreshold: 0, // 数组的参数变换的概率
            stringArrayEncoding: [], // ['none', 'base64', 'rc4'] 将字符串编码，选项可组合。rc4的混淆比较强，但是会导致代码体积变大，开启后建议禁用unicodeEscapeSequence
            // stringArrayIndexesType: ['hexadecimal-number', 'hexadecimal-numeric-string'], // ['hexadecimal-number', 'hexadecimal-numeric-string'] 将字符串数组调用变为16进制数字或字符串，字符串可以阻止去混淆器的工作。选项可组合。
            stringArrayIndexShift: false, // 让字符串数组进行索引偏移
            stringArrayRotate: false, // 改变字符串数组的位置
            stringArrayShuffle: false, // 打乱字符串数组
            stringArrayWrappersCount: 0, // 作用域中字符串数组包装器的个数，和节点数目也有关系
            stringArrayWrappersChainedCalls: false, // 允许字符串包装器之间链式调用
            stringArrayWrappersParametersMaxCount: 2, // 允许字符串包装器的最大参数数目，建议2-5
            stringArrayWrappersType: ['variable', 'function'][0], // 字符串包装器的类型
            stringArrayThreshold: 0, // 字符串被放入数组的概率，默认0.8
            transformObjectKeys: false, // 允许转换对象的键
            unicodeEscapeSequence: false // 使用unicode转义字符。会让代码膨胀，且容易反混淆
        });
        config.name = 'logic';
        return config;
    }

    static randomObfuscation() {
        const config = new JavascriptObfuscatorConfig({
            deadCodeInjection: true, // 无用代码注入，会强制开启stringArray
            deadCodeInjectionThreshold: 0.4, // 无用代码注入阈值，控制死代码注入节点比例
            // identifierNamesCache: null, // 方便在多文件混淆保护全局变量
            identifierNamesGenerator: ['dictionary', 'hexadecimal', 'mangled', 'mangled-shuffled'][3], // 就这几个参数
            // identifiersDictionary: ['yujingyi', 'yujinger'], // 为上面的dictionary提供自定义字典
            // identifiersPrefix: 'prefix_', // 标识符全局前缀
            renameGlobals: true, // 混淆全局变量
            renameProperties: true, // 启用后受renamePropertiesMode、identifierNamesGenerator和reservedNames影响
            renamePropertiesMode: ['safe', 'unsafe'][0], // safe会尝试避免一些runtime error，如果文件使用了其他文件的属性，建议开启identifierNamesCache

            compact: false, // 一行输出
            // config: './config.json', // 配置文件
            controlFlowFlattening: false, // 控制流平坦化，把代码放在死循环里
            // controlFlowFlatteningThreshold: 0.5, // 平坦化阈值
            debugProtection: false, // 禁止调试
            // debugProtectionInterval: 0, // 每隔多久强制打开调试，会影响其他调试工具的使用，建议2000-4000，单位毫秒
            disableConsoleOutput: false, // 把console.log()等输出改为[]，让别人没法调用
            // domainLock: [], // 只允许在指定域名下运行，如果有子域名，则配置为 .domain.com
            // domainLockRedirectUrl: 'about:blank', // 重定向到指定页面
            // exclude: [], // 排除的文件
            // forceTransformStrings: ['a\d', 'b\d'], // 使用正则表达式替换字符串，只影响不被stringArray处理的字符串
            // ignoreImports: false, // 防止混淆import、require
            // inputFileName: '',
            log: false, // 输出日志
            numbersToExpressions: false, // 把数字转为表达式
            // optionsPreset: ['default', 'low-obfuscation', 'medium-obfuscation', 'high-obfuscation'][0], // 预设配置，会影响其他选项
            // reservedNames: [], // 支持正则
            // reservedStrings: [], // 保护一些静态字符串
            seed: 0, // 可生成重复的结果
            selfDefending: false, // 如果美化代码会导致代码执行失败。该选项强制开启compact
            simplify: false, // 通过简化代码来混淆代码
            sourceMap: false, // 方便在生产环境调试混淆的代码
            // sourceMapBaseUrl: '', // 上述文件的网址
            // sourceMapFileName: '', // 上述设置开启后，默认的文件名是out.js.map，可以自定义
            // sourceMapMode: ['separate', 'inline'][0], // seperate会生成单独的map文件，到时候点点点就行。inline则是每个混淆文件末尾都生成.map
            // sourceMapSourcesMode: ['sources-content', 'soureces'][0], // 没看懂
            splitStrings: false, // 把字符串拆分成数组
            // splitStringsChunkLength: 10000, // 拆分字符串的长度阈值
            // stringArray: false, // 把用到的字符串都放进数组中
            stringArrayCallsTransform: false, // 让数组的参数变成函数调用，作用域应该是整个代码
            // stringArrayCallsTransformThreshold: 0, // 数组的参数变换的概率
            // stringArrayEncoding: [], // ['none', 'base64', 'rc4'] 将字符串编码，选项可组合。rc4的混淆比较强，但是会导致代码体积变大，开启后建议禁用unicodeEscapeSequence
            // stringArrayIndexesType: ['hexadecimal-numeric-string'], // ['hexadecimal-number', 'hexadecimal-numeric-string'] 将字符串数组调用变为16进制数字或字符串，字符串可以阻止去混淆器的工作。选项可组合。
            stringArrayIndexShift: false, // 让字符串数组进行索引偏移
            stringArrayRotate: false, // 改变字符串数组的位置
            stringArrayShuffle: false, // 打乱字符串数组
            stringArrayWrappersCount: 0, // 作用域中字符串数组包装器的个数，和节点数目也有关系
            stringArrayWrappersChainedCalls: false, // 允许字符串包装器之间链式调用
            // stringArrayWrappersParametersMaxCount: 2, // 允许字符串包装器的最大参数数目，建议2-5，必须2以上
            stringArrayWrappersType: ['variable', 'function'][0], // 字符串包装器的类型
            stringArrayThreshold: 0, // 字符串被放入数组的概率，默认0.8
            // target: ['browser', 'browser-no-eval', 'node'][2], // 目标环境。browser-no-eval会在混淆代码中禁用eval
            targrt: this.global_target,
            transformObjectKeys: false, // 允许转换对象的键
            unicodeEscapeSequence: false // 使用unicode转义字符。会让代码膨胀，且容易反混淆
        });
        config.name = 'random';
        return config;
    }

    static dataObfuscation() {
        const config = new JavascriptObfuscatorConfig({
            numbersToExpressions: true, // 把数字转为表达式
            ignoreImports: true, // 防止混淆import、require
            splitStrings: true, // 把字符串拆分成数组
            splitStringsChunkLength: 2, // 拆分字符串的长度阈值
            stringArray: true, // 把用到的字符串都放进数组中
            stringArrayThreshold: 0.8, // 字符串被放入数组的概率，默认0.8
            transformObjectKeys: true, // 允许转换对象的键
            stringArrayCallsTransform: true, // 让数组的参数变成函数调用，作用域应该是整个代码
            stringArrayCallsTransformThreshold: 0.5, // 数组的参数变换的概率
            stringArrayRotate: true, // 改变字符串数组的位置
            stringArrayShuffle: true, // 打乱字符串数组
            stringArrayEncoding: ['none'], // ['none', 'base64', 'rc4'] 将字符串编码，选项可组合。rc4的混淆比较强，但是会导致代码体积变大，开启后建议禁用unicodeEscapeSequence
            // stringArrayIndexesType: ['hexadecimal-number', 'hexadecimal-numeric-string'], // ['hexadecimal-number', 'hexadecimal-numeric-string'] 将字符串数组调用变为16进制数字或字符串，字符串可以阻止去混淆器的工作。选项可组合。
            stringArrayIndexShift: false, // 让字符串数组进行索引偏移
            stringArrayWrappersCount: 2, // 作用域中字符串数组包装器的个数，和节点数目也有关系
            stringArrayWrappersChainedCalls: true, // 允许字符串包装器之间链式调用
            stringArrayWrappersParametersMaxCount: 4, // 允许字符串包装器的最大参数数目，建议2-5
            stringArrayWrappersType: ['variable', 'function'][1], // 字符串包装器的类型

            compact: false, // 一行输出
            // config: './config.json', // 配置文件
            controlFlowFlattening: false, // 控制流平坦化，把代码放在死循环里
            // controlFlowFlatteningThreshold: 0, // 平坦化阈值
            deadCodeInjection: false, // 无用代码注入，会强制开启stringArray
            deadCodeInjectionThreshold: 0, // 无用代码注入阈值，控制死代码注入节点比例
            debugProtection: false, // 禁止调试
            debugProtectionInterval: 0, // 每隔多久强制打开调试，会影响其他调试工具的使用，建议2000-4000，单位毫秒
            disableConsoleOutput: false, // 把console.log()等输出改为[]，让别人没法调用
            // domainLock: [], // 只允许在指定域名下运行，如果有子域名，则置为 .domain.com
            // domainLockRedirectUrl: 'about:blank', // 重定向到指定页面
            // exclude: [], // 排除的文件
            // forceTransformStrings: [], // 使用正则表达式替换字符串，只影响不被stringArray处理的字符串
            // identifierNamesCache: null, // 方便在多文件混淆保护全局变量
            // identifierNamesGenerator: ['dictionary', 'hexadecimal', 'mangled', 'mangled-shuffled'][2], // 就这几个参数
            // identifiersDictionary: ['yujingyi', 'yujinger'], // 为上面的dictionary提供自定义字典
            // identifiersPrefix: '', // 标识符全局前缀
            // inputFileName: '',
            log: false, // 输出日志
            // optionsPreset: ['default', 'low-obfuscation', 'medium-obfuscation', 'high-obfuscation'][0], // 预设配置，会影响其他选项
            renameGlobals: false, // 混淆全局变量
            renameProperties: false, // 启用后受renamePropertiesMode、identifierNamesGenerator和reservedNames影响
            renamePropertiesMode: ['safe', 'unsafe'][0], // safe会尝试避免一些runtime error，如果文件使用了其他文件的属性，建议开启identifierNamesCache
            // reservedNames: [], // 支持正则
            // reservedStrings: [], // 保护一些静态字符串
            seed: 0, // 可生成重复的结果
            selfDefending: false, // 如果美化代码会导致代码执行失败。该选项强制开启compact
            simplify: false, // 通过简化代码来混淆代码
            sourceMap: false, // 方便在生产环境调试混淆的代码
            // sourceMapBaseUrl: '', // 上述文件的网址
            // sourceMapFileName: '', // 上述设置开启后，默认的文件名是out.js.map，可以自定义
            // sourceMapMode: ['separate', 'inline'][0], // seperate会生成单独的map文件，到时候点点点就行。inline则是每个混淆文件末尾都生成.map
            // sourceMapSourcesMode: ['sources-content', 'soureces'][0], // 没看懂
            // target: ['browser', 'browser-no-eval', 'node'][2], // 目标环境。browser-no-eval会在混淆代码中禁用eval
            unicodeEscapeSequence: false, // 使用unicode转义字符。会让代码膨胀，且容易反混淆
            targrt: this.global_target,
        });
        config.name = 'data';
        return config;
    }

    static encodeObfuscation() {
        const config = new JavascriptObfuscatorConfig({
            unicodeEscapeSequence: true, // 使用unicode转义字符。会让代码膨胀，且容易反混淆
            stringArrayEncoding: ['base64', 'rc4'], // ['none', 'base64', 'rc4'] 将字符串编码，选项可组合。rc4的混淆比较强，但是会导致代码体积变大，开启后建议禁用unicodeEscapeSequence
            stringArrayIndexesType: ['hexadecimal-number', 'hexadecimal-numeric-string'], // ['hexadecimal-number', 'hexadecimal-numeric-string'] 将字符串数组调用变为16进制数字或字符串，字符串可以阻止去混淆器的工作。选项可组合。
            stringArrayIndexShift: true, // 让字符串数组进行索引偏移

            compact: false, // 一行输出
            // config: './config.json', // 配置文件
            controlFlowFlattening: false, // 控制流平坦化，把代码放在死循环里
            // controlFlowFlatteningThreshold: 0.5, // 平坦化阈值
            deadCodeInjection: false, // 无用代码注入，会强制开启stringArray
            // deadCodeInjectionThreshold: 0.4, // 无用代码注入阈值，控制死代码注入节点比例
            debugProtection: false, // 禁止调试
            // debugProtectionInterval: 0, // 每隔多久强制打开调试，会影响其他调试工具的使用，建议2000-4000，单位毫秒
            disableConsoleOutput: false, // 把console.log()等输出改为[]，让别人没法调用
            // domainLock: [], // 只允许在指定域名下运行，如果有子域名，则配置为 .domain.com
            // domainLockRedirectUrl: 'about:blank', // 重定向到指定页面
            // exclude: [], // 排除的文件
            // forceTransformStrings: [], // 使用正则表达式替换字符串，只影响不被stringArray处理的字符串
            // identifierNamesCache: null, // 方便在多文件混淆保护全局变量
            // identifierNamesGenerator: ['dictionary', 'hexadecimal', 'mangled', 'mangled-shuffled'][2], // 就这几个参数
            // identifiersDictionary: ['yujingyi', 'yujinger'], // 为上面的dictionary提供自定义字典
            // identifiersPrefix: '', // 标识符全局前缀
            ignoreImports: false, // 防止混淆import、require
            // inputFileName: '',
            log: false, // 输出日志
            numbersToExpressions: false, // 把数字转为表达式
            // optionsPreset: ['default', 'low-obfuscation', 'medium-obfuscation', 'high-obfuscation'][0], // 预设配置，会影响其他选项
            renameGlobals: false, // 混淆全局变量
            renameProperties: false, // 启用后受renamePropertiesMode、identifierNamesGenerator和reservedNames影响
            renamePropertiesMode: ['safe', 'unsafe'][0], // safe会尝试避免一些runtime error，如果文件使用了其他文件的属性，建议开启identifierNamesCache
            // reservedNames: [], // 支持正则
            // reservedStrings: [], // 保护一些静态字符串
            seed: 0, // 可生成重复的结果
            selfDefending: false, // 如果美化代码会导致代码执行失败。该选项强制开启compact
            simplify: false, // 通过简化代码来混淆代码
            sourceMap: false, // 方便在生产环境调试混淆的代码
            // sourceMapBaseUrl: '', // 上述文件的网址
            // sourceMapFileName: '', // 上述设置开启后，默认的文件名是out.js.map，可以自定义
            // sourceMapMode: ['separate', 'inline'][0], // seperate会生成单独的map文件，到时候点点点就行。inline则是每个混淆文件末尾都生成.map
            // sourceMapSourcesMode: ['sources-content', 'soureces'][0], // 没看懂
            splitStrings: false, // 把字符串拆分成数组
            // splitStringsChunkLength: 10000, // 拆分字符串的长度阈值
            stringArray: true, // 把用到的字符串都放进数组中
            stringArrayCallsTransform: false, // 让数组的参数变成函数调用，作用域应该是整个代码
            // stringArrayCallsTransformThreshold: 0.5, // 数组的参数变换的概率
            stringArrayRotate: false, // 改变字符串数组的位置
            stringArrayShuffle: false, // 打乱字符串数组
            stringArrayWrappersCount: 0, // 作用域中字符串数组包装器的个数，和节点数目也有关系
            stringArrayWrappersChainedCalls: false, // 允许字符串包装器之间链式调用
            stringArrayWrappersParametersMaxCount: 2, // 允许字符串包装器的最大参数数目，建议2-5，必须2以上
            stringArrayWrappersType: ['variable', 'function'][0], // 字符串包装器的类型
            stringArrayThreshold: 0, // 字符串被放入数组的概率，默认0.8
            // target: ['browser', 'browser-no-eval', 'node'][2], // 目标环境。browser-no-eval会在混淆代码中禁用eval
            targrt: this.global_target,
            transformObjectKeys: false, // 允许转换对象的键
        });
        config.name = 'encode';
        return config;
    }


}
