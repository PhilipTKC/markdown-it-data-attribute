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
        // Push the data-key attribute to the current heading.
        tokens[idx].attrPush([headerKey, id]);
        /*
        * Loop through tokens and find the next heading index.
        * idx is the current heading index.
        * Example
        * Start (idx): 0, Next (nextHeadingIdx): Unknown
        * Loop through tokens to find next heading.
        * Start (idx): 0, Next (nextHeadingIdx): 5
        */
        let nextHeaderIdx = tokens.findIndex((token, i) => i > idx && token.type === 'heading_open');
        /*
        * If there is no next heading
        * Example
        * ```
        * # Heading 1 (Current Data Attribute Set)
        * Paragraph 1 Set in the for loop below.
        * # Heading 2 (Current Data Attribute Set)
        * Paragraph 2 (Data attribute cannot be set because no next header was found, nextHeaderIdx === -1)
        * ```
        *
        * Set the nextHeaderIdx to the length of the tokens.
        * This is require to loop through the remaining tokens.
        * Paragraph 2 can now be set in the for loop below.
        */
        if (nextHeaderIdx === -1) {
            nextHeaderIdx = tokens.length - 1;
        }
        /*
        * Loop through all tokens and set the current header and its siblings to the same id attribute.
        */
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
