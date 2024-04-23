# Web Crawler

## Description

This project implements the core of a web crawler that traverses websites from an initial URL, saves the text of these pages, and allows saving the results to a file in the filesystem.


## Getting Started

1. Clone this repository to your local machine:

```bash
git clone https://github.com/Diego-Morardo/web-crawler.git
```

2. Install project dependencies:

```bash
npm install
```

3. Run the web crawler using the command line. For example:

```bash
node index.js --url [initial URL] --maxdepth [maximum depth]
```

## Project Structure

- **index.js**: Main file that executes the web crawler and saves the results to a file.
- **crawler.js**: Implementation of the crawler that traverses web pages.
- **fileWriter.js**: Function to write the collected data to a file.
- **results/**: Folder where result files are saved.

## Example Usage

```bash
node index.js --url https://foodsubs.com/ --maxdepth 2
```