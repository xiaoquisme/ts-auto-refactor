const fs = require('fs');

function getFile(path) {
    return fs.readFileSync(path).toString();
}

function writeFile(path, content) {
    fs.writeFileSync(path, content);
}

module.exports = { getFile, writeFile }


