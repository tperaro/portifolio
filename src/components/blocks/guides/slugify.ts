/**
 * Mirrors markdown-to-jsx's default heading slugifier so the table of contents
 * links land on the ids the renderer actually emits.
 */
export function slugify(value: string) {
    return value
        .replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, 'a')
        .replace(/[çÇ]/g, 'c')
        .replace(/[ðÐ]/g, 'd')
        .replace(/[ÈÉÊËéèêë]/g, 'e')
        .replace(/[ÏïÎîÍíÌì]/g, 'i')
        .replace(/[Ññ]/g, 'n')
        .replace(/[øØœŒÕõÔôÓóÒò]/g, 'o')
        .replace(/[ÜüÛûÚúÙù]/g, 'u')
        .replace(/[ŸÿÝý]/g, 'y')
        .replace(/[^a-z0-9- ]/gi, '')
        .replace(/ /gi, '-')
        .toLowerCase();
}

export type Heading = { text: string; slug: string };

/** Collects the `##` headings of a markdown body, ignoring fenced code. */
export function collectHeadings(markdown?: string): Heading[] {
    if (!markdown) return [];
    const headings: Heading[] = [];
    let inFence = false;
    markdown.split('\n').forEach((line) => {
        if (/^\s*(```|~~~)/.test(line)) {
            inFence = !inFence;
            return;
        }
        if (inFence) return;
        const match = /^##\s+(.+?)\s*#*\s*$/.exec(line);
        if (match) {
            const text = match[1].replace(/\*\*/g, '').replace(/`/g, '').trim();
            headings.push({ text, slug: slugify(text) });
        }
    });
    return headings;
}
