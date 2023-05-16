import MarkdownIt, { PluginSimple } from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';

import { nanoid } from "nanoid";

/**
* This plugin assigns a random data-key attribute to all headings.
* This plugin also adds data-key-content to all sibling elements belonging to the same heading.
*/
const dataAttributePlugin: PluginSimple = (md: MarkdownIt) => {

    const headerKey = "data-key";
    const contentKey = "data-key-content";

    md.renderer.rules.heading_open = (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: Renderer) => {
        const id = nanoid(8);
        tokens[idx].attrPush([headerKey, id]);

        let nextHeaderIdx = idx + 1;
        while (nextHeaderIdx < tokens.length && tokens[nextHeaderIdx].type !== 'heading_open') {
            nextHeaderIdx++;
        }

        for (let i = idx + 1; i < nextHeaderIdx; i++) {
            if (!tokens[i].type.includes("_close")) {
                const parentKey = tokens[idx].attrs!.filter(attr => attr[0] === headerKey)[0][1];
                tokens[i].attrPush([contentKey, parentKey]);
            }
        }
        return self.renderToken(tokens, idx, options);
    };
}

export default dataAttributePlugin;