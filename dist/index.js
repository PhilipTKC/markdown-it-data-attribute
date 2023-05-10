"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataAttributePlugin = void 0;
const nanoid_1 = require("nanoid");
/**
* This plugin assigns a random data-key attribute to all headings.
* This plugin also adds data-key-content to all sibling elements belonging to the same heading.
*/
const dataAttributePlugin = (md) => {
    return md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
        tokens[idx].attrPush(['data-key', (0, nanoid_1.nanoid)(8)]);
        let nextHeaderIdx = idx + 1;
        while (nextHeaderIdx < tokens.length && tokens[nextHeaderIdx].type !== 'heading_open') {
            nextHeaderIdx++;
        }
        for (let i = idx + 1; i < nextHeaderIdx; i++) {
            if (tokens[i].type === 'text')
                continue;
            const parentSlug = tokens[idx].attrs.filter(attr => attr[0] === 'data-key')[0][1];
            tokens[i].attrPush(['data-key-content', parentSlug]);
        }
        return self.renderToken(tokens, idx, options);
    };
};
exports.dataAttributePlugin = dataAttributePlugin;
