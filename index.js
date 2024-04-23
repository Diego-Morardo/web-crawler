#!/usr/bin/env node

const yargs = require('yargs');
const { crawl } = require('./crawler');
const { writeToJsonFile } = require('./fileWriter');

const argv = yargs.options({
    'url': { 
        type: 'string', 
        demandOption: true, 
        describe: 'Initial URL to start crawling from' 
    },
    'maxdepth': { 
        type: 'number', 
        demandOption: true, 
        describe: 'Maximum distance from the initial website' 
    }
}).argv;

console.log('Start crawling.');
crawl(argv.url, argv.maxdepth)
    .then((result) => {

        writeToJsonFile(result.crawledPages, argv.url);

        console.log('Crawling completed succesfully.');
        console.log(`Total pages crawled: ${result.crawledPages.length}`);
        console.log(`Total unique links found: ${result.crawledUrls.size}`);
    })
    .catch((error) => {
        console.error('Error crawling pages: ', error);
    });