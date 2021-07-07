/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    closeBrowser,
    goto,
    screenshot,
    deleteCookies
} = require('taiko');
const { expect } = require('chai');
const headless = process.env.headless_chrome.toLowerCase() === 'true';

const fs = require('fs');
let loginJson = fs.readFileSync('data/login.json');
let loginData = JSON.parse(loginJson);

beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
});

afterSuite(async () => {
    await closeBrowser();
});

beforeScenario(async () => {
    await deleteCookies()
    //Base URL is read from json file
    await goto(loginData.base_url, { navigationTimeout: 60000 })
    //Base URL is read frfom dev> baseurl.properties
    //To run from env file, uncomment below code and run using 'gauge run --env dev specs\loginPage.spec' to run login test
    //await goto(process.env.test_url, { navigationTimeout: 60000 })
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

gauge.getRandomName = function () {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = 0; i < 5; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return "R"+result.toString();
};



