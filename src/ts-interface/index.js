const { getFile, writeFile } = require('../utils/file');
const parse = require('@babel/parser');
const traverse = require("@babel/traverse").default;
const types = require('@babel/types');
const generate = require('@babel/generator').default;
const path = require('path');

let filePath = path.resolve(__dirname, './app.ts');
const code = getFile(filePath);
const ast = parse.parse(code, {
    sourceType: "module",
    plugins: [
        'typescript'
    ]
});

const badInterfaceNameMap = {};
traverse(ast, {
    TSInterfaceDeclaration(node) {
        if (!(/^I.*?/gm.test(node.node.id.name))) {
            let newName = `I${ node.node.id.name }`;
            badInterfaceNameMap[node.node.id.name] = newName
            node.node.id = types.identifier(newName)
        }
    }
})

const newCode = generate(ast);

writeFile(`${ filePath }.new`, newCode.code);

