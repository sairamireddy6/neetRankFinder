const axios = require('axios');
const pdf = require('pdf-parse');
const fs = require('fs');

// URL of the PDF
const url = 'https://neetfs.ntaonline.in/NEET_2024_Result/420102.pdf';

// Function to fetch the PDF from the URL
async function fetchPDF(url) {
    try {
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer'
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching the PDF:', error);
        throw error;
    }
}

// Function to extract marks from the PDF data
async function extractMarksFromPDF(pdfData) {
    try {
        const data = await pdf(pdfData);
        const text = data.text;
        console.log("text",text);

        // Define a regular expression to match the marks data
        // The pattern looks for lines with "Srlno." followed by a number and then "Marks" followed by a number, including negative numbers
        const marksPattern = /(\d+)\s+(-?\d+)/g;
        let matches;
        const marks = [];

        // Use the pattern to find all matches in the text
        while ((matches = marksPattern.exec(text)) !== null) {
            marks.push(parseInt(matches[2])); // matches[2] contains the marks value, converted to an integer
        }
        return marks;
    } catch (error) {
        console.error('Error parsing the PDF:', error);
        throw error;
    }
}

// Main function to fetch the PDF and extract marks
async function main() {
    try {
        const pdfData = await fetchPDF(url);
        const marks = await extractMarksFromPDF(pdfData);
        console.log("totalMem",JSON.stringify(marks));
        let totalMem = marks.filter((ele) => ele > 579);
        console.log('Extracted Marks:', totalMem.length);
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

// Run the main function
main();
