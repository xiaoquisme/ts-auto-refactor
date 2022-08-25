const parser = require("vue-eslint-parser");
const escodegen = require("escodegen");
const esrecurse = require("esrecurse");
const builder = require("ast-types").builders;
const vueParser = require("@vue/compiler-dom");
const { baseParse, generate } = require("@vue/compiler-core");

const fs = require("fs");

let content = fs.readFileSync("src/App.vue").toString();

var rootNode = vueParser.parse(content);

let { code } = generate(rootNode, {
    mode: "module",
    isTS: true,
    filename: "App.vue"
});
function mapType(node) {
    if (node === undefined) {
        return;
    }
    node.type = nodeTypes[node.type];
    if ((node.children || []).length > 0) {
        node.children.forEach((item) => {
            mapType(item);
        });
    }
    if ((node.props || []).length > 0) {
        node.props.forEach((item) => {
            mapType(item);
        });
    }
}

mapType(rootNode);

let vueSourceAst = parser.parseForESLint(content, {
    sourceType: "module"
});

esrecurse.visit(vueSourceAst.ast, {
    ImportDeclaration(node) {
        const regex = /^\/@\/.*/gm;
        if (regex.test(node.source.value)) {
            node.source = builder.literal(node.source.value.substring(1));
        }
    }
});

console.log(escodegen.generate(vueSourceAst.ast));
