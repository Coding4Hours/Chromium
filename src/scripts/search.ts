

function search(input: string, template: string) {
    if (!input || typeof input !== 'string') {
        throw new Error('Invalid search input');
    }

    try {
        const directUrl = new URL(input);
        return directUrl.toString();
    } catch {}

    try {
        const httpsUrl = new URL(`https://${input}`);
        if (httpsUrl.hostname.includes('.')) {
            return httpsUrl.toString();
        }
    } catch {}

    return template.replace('%s', encodeURIComponent(input));
}





export { search };
