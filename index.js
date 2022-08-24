// this file can be converted ts file;
const parser = require('vue-eslint-parser');
const escodegen = require('escodegen');
const esrecurse = require('esrecurse');
const builder = require('ast-types').builders; // vueSourceAst types
const fs = require('fs');

let content = fs.readFileSync('App.vue');

let vueSourceAst = parser.parseForESLint(content.toString(), {
    sourceType: 'module',
});

esrecurse.visit(vueSourceAst.ast, {
    ImportDeclaration(node) {
        const regex = /^\/@\/.*/gm;
        if (regex.test(node.source.value)) {
            node.source = builder.literal(node.source.value.substring(1));
        }
    },
});

console.log(escodegen.generate(vueSourceAst.ast));
