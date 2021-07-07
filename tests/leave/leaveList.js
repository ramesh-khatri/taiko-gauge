const {textBox, into, write, click, $, checkBox, clear, press, toRightOf, link, toLeftOf} = require('taiko');
const assert = require("assert");
var fs = require("fs");
step("Go to Leave Section", async () => {
    await click('Leave')
});

step("Go to Leave List page", async () => {
    await click('Leave List', {waitForNavigation: 60000})
});

step("Enter data and uncheck the pending approval", async () => {
    await clear(textBox(toRightOf('From')));
    await press('Enter');
    await write('2018-01-02', into(textBox(toRightOf('From'))));
    await checkBox('Pending Approval').uncheck();
});

step("Verify the pagination of leave list table", async () => {
    var tableData = await $('table> tbody> tr> td:nth-child(1)').elements();
    var dataCount = 0
    for (value of tableData) {
        dataCount++
    }
    console.log('First Page total data: '+dataCount)
    if(await link('Next').exists()) {
        var textFromPagination = await $('.desc').text()
        var paginationData = await textFromPagination.split("of")[1]
        var totalPages = await link(toLeftOf(link('Next'))).text()
        totalPageInt = parseInt(totalPages)
        console.log('Total count shown in pagination: '+ totalPageInt)
        var nextCount = 0
        var i;
        for(i = 1; i < totalPageInt; i++ ) {
            await click(link('Next'))
            var nextPageData =  await $('table> tbody> tr> td:nth-child(1)').elements();
            for (value of nextPageData) {
                nextCount++
            }  
            console.log('This is next page count of ['+i+']: ' + nextCount)          
        }
        var totalCountOfTable = dataCount + nextCount
        console.log('This is pagination total count: '+parseInt(paginationData))
        assert.deepStrictEqual(totalCountOfTable, parseInt(paginationData))
    }
    else{
        console.log("Pagination not available to verify")
    }    
});