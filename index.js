const fs = require('fs');
const path = require('path');

function getRandomChar() {
    const chars = '23456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

function generateCode() {
    const prefixes = ['M', 'B', 'L'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    let code = prefix;

    for (let i = 0; i < 5; i++) {
        code += getRandomChar();
    }

    return code;
}

function generateUniqueCodes(count) {
    const codes = new Set();

    while (codes.size < count) {
        codes.add(generateCode());
    }

    return Array.from(codes);
}

const totalCodes = 200000;
const codesPerFile = 10000;
const numberOfFiles = totalCodes / codesPerFile;

const allCodes = generateUniqueCodes(totalCodes);

const outputDir = path.join(__dirname, 'codes');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

for (let i = 0; i < numberOfFiles; i++) {
    const start = i * codesPerFile;
    const end = start + codesPerFile;
    const codes = allCodes.slice(start, end);
    const filename = path.join(outputDir, `codes_${i + 1}.txt`);
    fs.writeFileSync(filename, codes.join('\n'));
}

console.log('200,000 unique codes have been generated and saved into 20 files in the "codes" directory.');
