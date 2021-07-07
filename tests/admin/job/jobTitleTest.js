const { waitFor, textBox, into, write, $, click, fileField, text, attach, below, tableCell, link, clear } = require('taiko');
const assert = require("assert");
'use strict';
const fs = require('fs');
let jobJson = fs.readFileSync('data/admin/jobTitle.json');
let data = JSON.parse(jobJson);

step("Go to Job titles page", async () => {
    await click("Job Titles");
});

step("Fill the details in form Job title, Job Description, Note", async () => {
    await write(data.valid.jobtitle.concat(gauge.getRandomName()), into(textBox({id:"jobTitle_jobTitle"})));
    await write(data.valid.jobdescription, into(textBox({id:"jobTitle_jobDescription"})));
    await attach('data/file/sample_pdf.pdf', into(fileField({id:"jobTitle_jobSpec"})));
    await write(data.valid.note, into(textBox({id:"jobTitle_note"})));
});


// step("Verify Saved <saved_message> message is shown", async (saved_message) => {
//     const msg = await ($('.ASC')).text({selectHiddenElements: true})
//     console.log(msg)
//     assert.strictEqual(msg, saved_message)
// })


step("Click on first job title to edit", async () => {
    const firstTitle = await tableCell({row:1, col:2}).text()
    await click(link(firstTitle, below("Job Title")))
})

step("Clear and fill the details in form Job title: <job_title>, Job Description: <job_description>, Note: <note>", async (job_title, job_description, note) => {
    await click("Edit");
    await clear(textBox({id:"jobTitle_jobTitle"}));
    await write(job_title.concat(gauge.getRandomName()), into(textBox({id:"jobTitle_jobTitle"})));
    await clear(textBox({id:"jobTitle_jobDescription"}));
    await write(job_description, into(textBox({id:"jobTitle_jobDescription"})));
   //await attach('file\\sample_pdf.pdf', into(fileField({id:"jobTitle_jobSpec"})));
    await clear(textBox({id:"jobTitle_note"})); 
    await write(note, into(textBox({id:"jobTitle_note"})));
});


