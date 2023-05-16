"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
/**
* This plugin assigns a random data-key attribute to all headings.
* This plugin also adds data-key-content to all sibling elements belonging to the same heading.
*/
const dataAttributePlugin = (md) => {
    const headerKey = "data-key";
    const contentKey = "data-key-content";
    md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
        const id = (0, nanoid_1.nanoid)(8);
        tokens[idx].attrPush([headerKey, id]);
        let nextHeaderIdx = idx + 1;
        while (nextHeaderIdx < tokens.length && tokens[nextHeaderIdx].type !== 'heading_open') {
            nextHeaderIdx++;
        }
        for (let i = idx + 1; i < nextHeaderIdx; i++) {
            if (!tokens[i].type.includes("_close")) {
                const parentKey = tokens[idx].attrs.filter(attr => attr[0] === headerKey)[0][1];
                tokens[i].attrPush([contentKey, parentKey]);
            }
        }
        return self.renderToken(tokens, idx, options);
    };
};
exports.default = dataAttributePlugin;
