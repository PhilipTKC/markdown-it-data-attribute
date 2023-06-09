"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("markdown-it/lib/token"));
const nanoid_1 = require("nanoid");
const dataAttributePlugin = (md) => {
    const headerKey = "data-key";
    const contentKey = "data-key-content";
    md.core.ruler.push("data-attributes", (state) => {
        const tokens = state.tokens;
        const sections = [];
        let currentSection = [];
        for (let i = 0; i < tokens.length; i++) {
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
            contentIndices.forEach((index) => {
                var _a, _b;
                const parentKey = (_b = (_a = tokens[headerIndex].attrs) === null || _a === void 0 ? void 0 : _a.find((attr) => attr[0] === headerKey)) === null || _b === void 0 ? void 0 : _b[1];
                if (!tokens[index].type.includes("_close")) {
                    tokens[index].attrPush([contentKey, parentKey]);
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
