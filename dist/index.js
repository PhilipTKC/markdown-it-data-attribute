"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const markdown_it_1 = __importDefault(require("markdown-it"));
const nanoid_1 = require("nanoid");
/**
* This plugin assigns a random data-key attribute to all headings.
* This plugin also adds data-key-content to all sibling elements belonging to the same heading.
*/
const dataAttributePlugin = (md) => {
    const HEADER_KEY = "data-key";
    const CONTENT_KEY = "data-key-content";
    md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
        tokens[idx].attrPush([HEADER_KEY, (0, nanoid_1.nanoid)(8)]);
        let nextHeaderIdx = idx + 1;
        while (nextHeaderIdx < tokens.length && tokens[nextHeaderIdx].type !== 'heading_open') {
            nextHeaderIdx++;
        }
        for (let i = idx + 1; i < nextHeaderIdx; i++) {
            if (!tokens[i].type.includes("_close")) {
                const parentKey = tokens[idx].attrs.filter(attr => attr[0] === HEADER_KEY)[0][1];
                tokens[i].attrPush([CONTENT_KEY, parentKey]);
            }
        }
        return self.renderToken(tokens, idx, options);
    };
};
exports.default = dataAttributePlugin;
const md = new markdown_it_1.default();
md.use(dataAttributePlugin);
