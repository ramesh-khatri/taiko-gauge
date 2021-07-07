const {textBox, client, link, into, write, click, below,  attach, toRightOf, dropDown, button, fileField, $, press, waitFor, goto} = require('taiko');
const assert = require("assert");
const { expect } = require('chai')
path = require('path')
var fs = require("fs");
var PDFParser = require("pdf2json");
let pdfParser = new PDFParser(this,1);
step("Go to Recruitment Section", async () => {
    await click('Recruitment')
});

step("Enter the candidate detail", async () => {
    await write(process.env.first_name, into(textBox(below('First Name'))))
    await write(process.env.last_name, into(textBox(below('Last Name'))))
    await write(process.env.email, into(textBox(toRightOf('Email'))))
    await write(process.env.contact_no, into(textBox(toRightOf('Contact No'))))
    await dropDown('Job Vacancy').select(process.env.job_vacancy)
    await attach('data/file/john_resume.pdf', into(fileField(toRightOf('Resume'))));
    await write(process.env.keywords, into(textBox(toRightOf('Keywords'))))
    await write(process.env.comment, into($('#addCandidate_comment')))
});

step("Search the Candidate from the list", async () => {
    goto("https://opensource-demo.orangehrmlive.com/index.php/recruitment/viewCandidates")
    await write(process.env.first_name, into(textBox(below('Candidate Name'))))
    await press('Space')
    await await write(process.env.last_name, into(textBox(below('Candidate Name'))))
    await press('Enter')
})

step("Click Back Button", async () => {
    await click(button('Back'), {navigationTimeout:60000})
});

step("Click download, store downloaded file and verify that file contains applicant valid detail", async () => {
    var downloadPath = path.resolve(__dirname, '../../data/file/downloaded');
    await client().send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath,
    });
    await click(link('Download'))
    await waitFor(() => fs.existsSync('data/file/downloaded/john_resume.pdf'))
    pdfParser.loadPDF('data/file/downloaded/john_resume.pdf');
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", async() => {
        let pdfContent = pdfParser.getRawTextContent()
        fs.writeFileSync("data/file/downloaded/john_resume.txt", pdfContent)
        var data = fs.readFileSync('data/file/downloaded/john_resume.txt','utf8');
        expect(data).to.have.string('John Doe')           
    });     
});

