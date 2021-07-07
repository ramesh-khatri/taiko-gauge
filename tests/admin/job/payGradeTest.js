const { openBrowser, textBox, into, write, click, fileField, text, attach, below, tableCell, link, clear, dropDown, press, waitFor, button } = require('taiko');
const assert = require("assert");
'use strict';
const fs = require('fs');
const { table } = require('console');
let payJson = fs.readFileSync('data/admin/payGrade.json');
let data = JSON.parse(payJson);

step("Click Pay Grades", async () => {
    await click("Pay Grades");
});

step("Add Pay Grade name", async () => {
    await write(data.valid.name.concat(gauge.getRandomName()), into(textBox({id:"payGrade_name"})));
});

step("Enter Currency detail", async () => {
    await click(button({id: "btnAddCurrency"}), {selectHiddenElements: true});
    await write(data.valid.currency, into(textBox({id:"payGradeCurrency_currencyName"})));
    await press("Enter");
    await write(data.valid.min_salary, into(textBox({id:"payGradeCurrency_minSalary"})));
    await write(data.valid.max_salary, into(textBox({id:"payGradeCurrency_maxSalary"})));
});

step("Edit Pay Grade name", async () => {
    const firstPayGrade = await tableCell({row:2, col:2}).text()
    await click(link(firstPayGrade), {selectHiddenElements: true});
    await click("Edit", {selectHiddenElements: true});
    await clear(textBox({id:"payGrade_name"}));
    await write(data.valid.name.concat(gauge.getRandomName()), into(textBox({id:"payGrade_name"})));
});

step("Edit Currency data", async () => {
    const firstCurrency = await tableCell({row:1, col:2}).text()
    await click(link(firstCurrency), { navigationTimeout: 60000 });
    await clear(textBox({id:"payGradeCurrency_currencyName"}));
    await write(data.valid.currency, into(textBox({id:"payGradeCurrency_currencyName"})));
    await press("Enter");
    await clear(textBox({id:"payGradeCurrency_minSalary"}))
    await write(data.valid.min_salary, into(textBox({id:"payGradeCurrency_minSalary"})));
    await clear(textBox({id:"payGradeCurrency_maxSalary"}))
    await write(data.valid.max_salary, into(textBox({id:"payGradeCurrency_maxSalary"})));
});

step("Add duplicate pay grade name", async () => {
    const firstPayGrade = await tableCell({row:2, col:2}).text()
    await click("Add");
    await write(firstPayGrade, into(textBox({id:"payGrade_name"})));
});

step("Enter negative salary in Curreny", async () => {
    await write(data.valid.currency, into(textBox({id:"payGradeCurrency_currencyName"})));
    await press("Enter");
    await write(data.invalid.neg_min_salary, into(textBox({id:"payGradeCurrency_minSalary"})));
    await write(data.valid.max_salary, into(textBox({id:"payGradeCurrency_maxSalary"})));
});
step("Enter min salary greater than max salary", async () => {
    await write(data.valid.currency, into(textBox({id:"payGradeCurrency_currencyName"})));
    await press("Enter");
    await write(data.valid.max_salary, into(textBox({id:"payGradeCurrency_minSalary"})));
    await write(data.valid.min_salary, into(textBox({id:"payGradeCurrency_maxSalary"})));
});

step("Click Cancel Button", async () => {
    await click("Cancel")
});

step("Click Add Currency button", async () => {
    await click(button({id: "btnAddCurrency"}), {selectHiddenElements: true});
});

step("Click Cancel of Currency form", async () => {
    await click(button({id: "cancelButton"}), {selectHiddenElements: true});
})

