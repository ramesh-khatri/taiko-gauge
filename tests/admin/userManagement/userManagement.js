const {textBox, into, write, click, text, $, tableCell, toLeftOf, checkBox, listItem, dropDown, below} = require('taiko');
const assert = require("assert");
const { table } = require('console');
var fs = require("fs");
step("Get the first username and search using same name and verify that searched name is shown in result table", async () => {
    const firstUsername = await tableCell({row:1, col:2}).text();
    console.log(firstUsername)
    await write(firstUsername, into(textBox({id:"searchSystemUser_userName"})));
    await click("Search");
    const afterSearchUsername = await tableCell({row:1, col:2}).text();
    console.log(afterSearchUsername)
    assert.strictEqual(firstUsername, afterSearchUsername)
});

step("Select the second value", async() => {
    const secondValue = await tableCell({row:2, col:2}).text();
    await click(checkBox(toLeftOf(secondValue)));
})

step("Click on Delete Button", async() => {
    await click("DELETE");
})

step("Click on Ok of delete confirmation", async() => {
    await click("Ok");
})

step("Search in the username using random value", async() => {
    await write(gauge.getRandomName(), into(textBox({id:"searchSystemUser_userName"})));
    await click("Search");
})

step("Select the User Role <user_role>", async(user_role) => {
    await click(listItem("User Role"));
    await dropDown("User Role").select(user_role);
})

step("Click Search Button", async() => {
    await click("Search", {waitForNavigation: 10000})
})

step("Verify the table data contain <value>", async(value) => {
    const column_value = await tableCell({row:1, col:3}).text();
    console.log(column_value)
    assert.strictEqual(column_value, value)
})

step("Verify the sorting of the username", async() => {
    const beforeSort = await $('table> tbody> tr> td:nth-child(2)').elements();
    const beforeResult = []
    for (value of beforeSort) {
        beforeResult.push(await value.text())
    }
    await click($(':nth-child(2) > .null'));
    await click($('.ASC'));
    const afterSort = await $('table> tbody> tr> td:nth-child(2)').elements();
    const afterResult = []
    for (value of afterSort) {
        afterResult.unshift(await value.text())
    }
    assert.deepStrictEqual(beforeResult, afterResult);
})
