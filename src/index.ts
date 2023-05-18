import MarkdownIt, { PluginSimple } from 'markdown-it';
import StateCore from 'markdown-it/lib/rules_core/state_core';
import Token from 'markdown-it/lib/token';

import { nanoid } from "nanoid";

const dataAttributePlugin: PluginSimple = (md: MarkdownIt) => {

    const headerKey = "data-key";
    const contentKey = "data-key-content";

    md.core.ruler.push("data-attributes", (state: StateCore) => {
        const tokens = state.tokens;
        const sections: number[][] = [];
        let currentSection: number[] = [];

        const containsFrontMatter = tokens[0].markup === "---" && tokens[0].tag === "hr";

        for (let i = 0; i < tokens.length; i++) {

            if (tokens[i].type === "heading_open") {
                if (currentSection.length > 0) {
                    sections.push(currentSection);
                }
                currentSection = [i];
            } else if (tokens[i].type.includes("open") && currentSection.length > 0) {
                currentSection.push(i);
            } else if (tokens[i].type.includes("close") && currentSection.length > 0) {
                currentSection.push(i);
            }
        }

        if (currentSection.length > 0) {
            sections.push(currentSection);
        }

        for (let j = sections.length - 1; j >= 0; j--) {
            const [headerIndex, ...contentIndices] = sections[j];
            const id = nanoid(8);
            tokens[headerIndex].attrPush([headerKey, id]);
            const lineNumber = containsFrontMatter ? tokens[headerIndex].map[0] - 1 : tokens[headerIndex].map[0];
            tokens[headerIndex].attrPush(["data-line-number", lineNumber.toString()]);

            contentIndices.forEach((index) => {
                const parentKey = tokens[headerIndex].attrs?.find((attr: [string, string]) => attr[0] === headerKey)?.[1];
                if (!tokens[index].type.includes("_close")) {
                    tokens[index].attrPush([contentKey, parentKey]);
                    const lineNumber = containsFrontMatter ? tokens[index].map[0] - 1 : tokens[index].map[0];
                    tokens[index].attrPush(["data-line-number", lineNumber.toString()]);
                }
            });

            const sectionCloseToken = new Token("section_close", "section", -1);
            const sectionOpenToken = new Token("section_open", "section", 1);
            sectionOpenToken.attrSet("data-id", id);

            const lastContentIndex = contentIndices[contentIndices.length - 1];

            tokens.splice(lastContentIndex + 1, 0, sectionCloseToken);
            tokens.splice(headerIndex, 0, sectionOpenToken);
        }

        return true;
    });
};

export default dataAttributePlugin;