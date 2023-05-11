import MarkdownIt from 'markdown-it';
/**
* This plugin assigns a random data-key attribute to all headings.
* This plugin also adds data-key-content to all sibling elements belonging to the same heading.
*/
declare const dataAttributePlugin: (md: MarkdownIt) => void;
export default dataAttributePlugin;
