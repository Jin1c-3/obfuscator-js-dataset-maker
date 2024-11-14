export default function simplify(code) {
    return removeComments(reserverScript(code));
}

function removeComments(code) {
    return code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//gm, '');
}

function reserverScript(code) {
    const scriptMatch = code.match(/<script.*?>([\s\S]*?)<\/script>/i);
    return scriptMatch ? scriptMatch[1] : code;
}
