const { openBrowser, goto, textBox, into, write, click, title, closeBrowser, text } = require('taiko');
const assert = require("assert");
'use strict';

const fs = require('fs');
let loginJson = fs.readFileSync('data/login.json');
let loginData = JSON.parse(loginJson);

step("Enter valid Username and Password", async () => {
    await write(loginData.valid.username, into(textBox({id:"txtUsername"})));
    await write(loginData.valid.password, into(textBox({id:"txtPassword"})));
});

step("Click <login> button", async (login) => {
    await click(login, { navigationTimeout: 60000 });
});

step("Perform logout", async () => {
    await click("Welcome");
    await click("Logout");
});
step("Enter invalid Username and Password", async () => {
    await write(loginData.invalid.username, into(textBox({id:"txtUsername"})));
    await write(loginData.invalid.password, into(textBox({id:"txtPassword"})));
});



