import MarkdownIt, { PluginSimple } from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';

import { nanoid } from "nanoid";

/**
* This plugin assigns a random data-key attribute to all headings.
* This plugin also adds data-key-content to all sibling elements belonging to the same heading.
*/
const dataAttributePlugin: PluginSimple = (md: MarkdownIt) => {

    const HEADER_KEY = "data-key";
    const CONTENT_KEY = "data-key-content";

    md.renderer.rules.heading_open = (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: Renderer) => {
        tokens[idx].attrPush([HEADER_KEY, nanoid(8)]);

        let nextHeaderIdx = idx + 1;
        while (nextHeaderIdx < tokens.length && tokens[nextHeaderIdx].type !== 'heading_open') {
            nextHeaderIdx++;
        }

        for (let i = idx + 1; i < nextHeaderIdx; i++) {
            if (!tokens[i].type.includes("_close")) {
                const parentKey = tokens[idx].attrs!.filter(attr => attr[0] === HEADER_KEY)[0][1];
                tokens[i].attrPush([CONTENT_KEY, parentKey]);
            }
        }
        return self.renderToken(tokens, idx, options);
    };
}

export default dataAttributePlugin;

const md = new MarkdownIt();

md.use(dataAttributePlugin);