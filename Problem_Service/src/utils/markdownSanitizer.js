import sanitize from 'sanitize-html';
import {marked} from 'marked';
import TurndownService from 'turndown';

function sanitizeMarkdown(markdownContent) {

    const convertedHtml = marked.parse(markdownContent);


    const sanitizedHtml = sanitize(convertedHtml, {
        allowedTags: sanitize.defaults.allowedTags.concat(['img'])
    });


    const turndownService = new TurndownService();

    const sanitizedMarkdown = turndownService.turndown(sanitizedHtml);

    return sanitizedMarkdown;
}

export default sanitizeMarkdown;