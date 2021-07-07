const { textBox, text, into, write, click, attach, fileField, link, dropDown, below, clear, press, button, waitFor, $, toRightOf, radioButton, checkBox} = require('taiko');
const assert = require("assert");
'use strict';
const fs = require('fs');
const csv = require('csvtojson')

//to read from json
let employeeJson = fs.readFileSync('data/pim/addEmployee.json');
let data = JSON.parse(employeeJson);

//to read from csv file
let csvFilePath = 'data/pim/employee.csv'
let csvPersonalDetail = 'data/pim/employee_personal_details.csv' 

step("Go to PIM section", async () => {
    await click("PIM", { navigationTimeout: 60000 });
});

step("Go to Add Employee section", async () => {
    await click("Add Employee", { navigationTimeout: 60000 });
});

// Data is read from CSV file
step("Enter the employee details in form", async () => {
    let empCSV = await csv().fromFile(csvFilePath);
    await write(empCSV[0].first_name, into(textBox({id:"firstName"})));
    await write(empCSV[0].last_name, into(textBox({id:"lastName"})));
    await attach('data/file/sampleProfilePic.png', into(fileField({id:"photofile"})));
});

// Data is read from data>json file

// step("Enter the employee details in form", async () => {
//     await write(data.employee.first_name, into(textBox({id:"firstName"})));
//     await write(data.employee.last_name, into(textBox({id:"lastName"})));
//     await attach('data\\file\\sampleProfilePic.png', into(fileField({id:"photofile"})));
// })
step("Go to Job Section of employee", async () => {
    await click(link('Job'));
})

step("Enter the details of employee job information", async () => {
    await dropDown("Job Title").select(data.job.job_title);
    await dropDown("Employment Status").select(data.job.employment_status);
    await dropDown("Job Category").select(data.job.job_category);
    await clear(textBox('Joined Date'));
    await write(data.job.joined_date, into(textBox('Joined Date')))
    await press('Enter'); 
    await dropDown("Sub Unit").select(data.job.sub_unit);
    await dropDown("Location").select(data.job.location);
    await clear(textBox('Start Date'));
    await write(data.job.start_date, into(textBox('Start Date')))
    await press('Enter');
    await clear(textBox('End Date'));
    await write(data.job.end_date, into(textBox('End Date')))
    await press('Enter');
    await attach('data/file/sample_pdf.pdf', into(fileField('Contract Details')));
})

step("Go to Employee List page", async () => {
    await click(link("Employee List"))
})

step("Verify the employee list table contain the value", async () => {
    let empCSV = await csv().fromFile(csvFilePath);
    const column_value = await $('table>tbody>tr>td:nth-child(3)').elements()
    const allValues = []
    for (value of column_value) {
        allValues.push(await value.text())
    }
    assert.ok(allValues.includes(empCSV[0].first_name))
})

step("Enter employee name in search field", async () => {
    let empCSV = await csv().fromFile(csvFilePath);
    await write(empCSV[0].first_name, into(textBox(below('Employee Name'))))
})

step("Enter employee personal details", async () => {
    let personalDetailCSV = await csv().fromFile(csvPersonalDetail);
    await clear(textBox(below('First Name')))
    await write(personalDetailCSV[0].first_name, into(textBox(below('First Name'))))
    await clear(textBox(below('Last Name')))
    await write(personalDetailCSV[0].last_name, into(textBox(below('Last Name'))))
    await write(personalDetailCSV[0].driver_license_no, into(textBox(toRightOf("Driver's License Number"))))
    await write(personalDetailCSV[0].ssn_no, into(textBox(toRightOf('SSN Number'))))
    await write(personalDetailCSV[0].other_id, into(textBox(toRightOf('Other Id'))))
    await clear(textBox(toRightOf('License Expiry Date')))
    await write(personalDetailCSV[0].license_exp_date, into(textBox(toRightOf('License Expiry Date'))))
    await press('Enter')
    await write(personalDetailCSV[0].sin_number, into(textBox(toRightOf('SIN Number'))))
    await radioButton(personalDetailCSV[0].gender).select()
    await dropDown('Nationality').select(personalDetailCSV[0].nationality)
    await dropDown('Marital Status').select(personalDetailCSV[0].marital_status)
    await clear(textBox(toRightOf('Date of Birth')))
    await write(personalDetailCSV[0].dob, into(textBox(toRightOf('Date of Birth'))))
    await press('Enter')
    await write(personalDetailCSV[0].nick_name, into(textBox(toRightOf('Nick Name'))))
    await write(personalDetailCSV[0].military_service, into(textBox(toRightOf('Military Service'))))
    if (personalDetailCSV[0].smoker == 'yes') {
        await checkBox('Smoker').check()
    }

})