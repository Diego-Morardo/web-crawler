const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const logErrorToFile = (error) => {
    const errorMessage = `${new Date().toISOString()}: ${error.stack}\n`;
    fs.appendFileSync('error.log', errorMessage);
};

const printProgress = (message) => {
    process.stdout.write(`${message}...\r`);
};

const crawlPage = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const title = $('title').text();
        const text = $('body').text();
        const links = $('a').map((_, element) => $(element).attr('href')).get();
        return { title, text, links }
    } catch (error) {
        logErrorToFile(error);
        throw error;
    }
};

const crawl = async (initialUrl, maxDepth) => {
    const crawledUrls = new Set();
    const pagesToCrawl = [{ url: initialUrl, depth: 0 }];
    const crawledPages = [];

    while (pagesToCrawl.length > 0) {
        const { url, depth } = pagesToCrawl.shift();
        if (depth > maxDepth) continue;
        if (crawledUrls.has(url)) continue;

        try {
            const pageData = await crawlPage(url);
            crawledPages.push({ url, ...pageData });
            crawledUrls.add(url);
            const newLinks = pageData.links.filter(link => !crawledUrls.has(link));
            newLinks.forEach(link => pagesToCrawl.push({ url: link, depth: depth + 1 }));
        } catch (error) {   
            logErrorToFile(error);
        }

        printProgress(`Crawled ${crawledPages.length} pages`);
    }

    return {crawledPages: crawledPages, crawledUrls: crawledUrls};
};

module.exports = { crawl };