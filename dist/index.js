"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const markdown_it_1 = __importDefault(require("markdown-it"));
const token_1 = __importDefault(require("markdown-it/lib/token"));
const nanoid_1 = require("nanoid");
const dataAttributePlugin = (md) => {
    const headerKey = "data-key";
    const contentKey = "data-key-content";
    let containsFrontMatter;
    md.core.ruler.push("data-attributes", (state) => {
        const tokens = state.tokens;
        const sections = [];
        let currentSection = [];
        for (let i = 0; i < tokens.length; i++) {
            if (i === 0) {
                containsFrontMatter = tokens[0].markup === "---" && tokens[0].tag === "hr";
            }
            if (tokens[i].type === "heading_open") {
                if (currentSection.length > 0) {
                    sections.push(currentSection);
                }
                currentSection = [i];
            }
            else if (tokens[i].type.includes("open") && currentSection.length > 0) {
                currentSection.push(i);
            }
            else if (tokens[i].type.includes("close") && currentSection.length > 0) {
                currentSection.push(i);
            }
        }
        if (currentSection.length > 0) {
            sections.push(currentSection);
        }
        for (let j = sections.length - 1; j >= 0; j--) {
            const [headerIndex, ...contentIndices] = sections[j];
            const id = (0, nanoid_1.nanoid)(8);
            tokens[headerIndex].attrPush([headerKey, id]);
            const map = tokens[headerIndex].map && tokens[headerIndex].map[0];
            const lineNumber = containsFrontMatter ? map - 1 : map;
            if (lineNumber) {
                tokens[headerIndex].attrPush(["data-line-number", lineNumber.toString()]);
            }
            contentIndices.forEach((index) => {
                var _a, _b;
                const parentKey = (_b = (_a = tokens[headerIndex].attrs) === null || _a === void 0 ? void 0 : _a.find((attr) => attr[0] === headerKey)) === null || _b === void 0 ? void 0 : _b[1];
                if (!tokens[index].type.includes("_close")) {
                    tokens[index].attrPush([contentKey, parentKey]);
                    const map = tokens[index].map && tokens[index].map[0];
                    const lineNumber = containsFrontMatter ? map - 1 : map;
                    if (lineNumber) {
                        tokens[index].attrPush(["data-line-number", lineNumber.toString()]);
                    }
                }
            });
            const sectionCloseToken = new token_1.default("section_close", "section", -1);
            const sectionOpenToken = new token_1.default("section_open", "section", 1);
            sectionOpenToken.attrSet("data-id", id);
            const lastContentIndex = contentIndices[contentIndices.length - 1];
            tokens.splice(lastContentIndex + 1, 0, sectionCloseToken);
            tokens.splice(headerIndex, 0, sectionOpenToken);
        }
        return true;
    });
};
exports.default = dataAttributePlugin;
const md = new markdown_it_1.default();
md.use(dataAttributePlugin);
const result = md.render(`
---
title: This is a title
---

## This is a README

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget leo sapien. Proin varius posuere orci vitae sagittis. Pellentesque ultricies porttitor elit, id tempor arcu pellentesque non. Nulla ac leo sagittis, laoreet elit a, consectetur justo. Curabitur pharetra malesuada vulputate. Praesent pretium sed turpis ut tempor. Donec accumsan consectetur bibendum. Sed quis vestibulum turpis. Duis luctus, turpis at convallis sagittis, ex odio scelerisque nisl, nec bibendum quam sapien non ante.
`);
console.log(result);
