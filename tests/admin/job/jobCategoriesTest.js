const { textBox, into, write, click, below, tableCell, link, clear } = require('taiko');
const assert = require("assert");
'use strict';
const fs = require('fs');
let categoryJson = fs.readFileSync('data/admin/jobCategories.json');
let data = JSON.parse(categoryJson);
step("Go to Job Categories page", async () => {
    await click("Job Categories");
});

step("Enter job category name", async () => {
    await write(data.valid.name.concat(gauge.getRandomName()), into(textBox({id:"jobCategory_name"})));
});

step("Click on first data to edit", async () => {
    const firstTitle = await tableCell({row:1, col:2}).text()
    await click(link(firstTitle, below("Job Title")));
})

step("Click Edit button", async () => {
    await click("Edit", {navigationTimeout: 60000})
})

step("Clear and fill the job category name", async () => {
    await clear(textBox({id:"jobCategory_name"}));
    await write(data.valid.name.concat(gauge.getRandomName()), into(textBox({id:"jobCategory_name"})));
});