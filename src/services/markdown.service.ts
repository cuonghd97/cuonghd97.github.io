import { remark } from 'remark';
import parser from 'remark-parse';
import gfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

class MarkdownService {
    markdownToHTML = async (markdown: string) => {
        const result = await remark()
            .use(parser)
            .use(gfm)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(rehypeHighlight, { subset: false })
            .use(rehypeStringify)
            .process(markdown);

        return String(result);
    };
}

export default new MarkdownService();
