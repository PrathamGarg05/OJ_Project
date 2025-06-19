import sanitize from 'sanitize-html';
import {marked} from 'marked';
import TurndownService from 'turndown';

function sanitizeMarkdown(markdownContent) {
    console.log(markdownContent, '\n\n');

    const convertedHtml = marked.parse(markdownContent);

    console.log(convertedHtml, '\n\n');

    const sanitizedHtml = sanitize(convertedHtml, {
        allowedTags: sanitize.defaults.allowedTags.concat(['img'])
    });

    console.log(sanitizedHtml, '\n\n');

    const turndownService = new TurndownService();

    const sanitizedMarkdown = turndownService.turndown(sanitizedHtml);

    console.log(sanitizedMarkdown, '\n\n');

    return sanitizedMarkdown;
}

export default sanitizeMarkdown;