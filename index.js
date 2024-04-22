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

        writeToJsonFile(result, argv.url);

        console.log('Crawling completed succesfully.');
    })
    .catch((error) => {
        console.error('Error crawling pages: ', error);
    });