const { evaluate, $, textBox, into, write, click, within, text, attach, below, tableCell, link, clear, dropDown, press, waitFor, button, near, listItem } = require('taiko');
const assert = require("assert");
'use strict';
const fs = require('fs');
let shiftJson = fs.readFileSync('data/admin/workShift.json');
let data = JSON.parse(shiftJson);

step("Go to Work Shift page", async () => {
    await click("Work Shifts");
});

step("Fill the work shift detail", async () => {
    await write(data.valid.shift_name.concat(gauge.getRandomName()), into(textBox({id:"workShift_name"})));
    await write(data.valid.from, into(dropDown({id:"workShift_workHours_from"})));
    await write(data.valid.to, into(dropDown({id:"workShift_workHours_to"})));
});

step("Assign employee", async () => {
    await click($("//option[@value='26']"))
    await click(link("Add >>"))
});

step("Remove employee", async () => {
    await click($("//option[@value='26']"))
    await click(link("Remove <<"))
});


