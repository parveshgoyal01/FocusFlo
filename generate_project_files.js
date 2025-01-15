const fs = require('fs');
const path = require('path');

const sourceFile = 'project_structure.txt';

function createFile(filePath, content) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created: ${filePath}`);
}

function parseAndCreateFiles(data) {
    const fileSections = data.split('// ');

    fileSections.forEach(section => {
        if (!section.trim()) return;
        const [header, ...contentLines] = section.split('\n');
        const filePath = header.trim();
        const content = contentLines.join('\n');
        createFile(filePath, content);
    });
}

if (fs.existsSync(sourceFile)) {
    const data = fs.readFileSync(sourceFile, 'utf8');
    parseAndCreateFiles(data);
    console.log('All files have been created successfully.');
} else {
    console.error(`Source file not found: ${sourceFile}`);
}
