const { openBrowser, goto, textBox, into, write, click, title, closeBrowser, text } = require('taiko');
const assert = require("assert");

step("Must Display Error Message <error_message>", async (error_message) => {
    assert.ok(await text(error_message).exists())
})

step("Verify <success_message> message is shown", async (success_message) => {
    assert.ok(await text(success_message, {selectHiddenElements: true}).exists())
})

step("Verify <page_text> message exists", async (page_text) => {
    assert.ok(await text(page_text, {selectHiddenElements: true}).exists())
})

step("Click Add button", async () => {
    await click("Add", { navigationTimeout: 60000 });
});

step("Go to Admin Section", async () => {
    await click("Admin", { navigationTimeout: 60000 });
});

step("Go to Job Section", async () => {
    await click("Job", {selectHiddenElements: true});
});

step("Click Save Button", async () => {
    await click("Save", {navigationTimeout:60000});
});
