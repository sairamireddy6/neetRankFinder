import Cheerio from 'cheerio';
import fs from 'fs';
import fetch from 'node-fetch';


const html = `
<select class="col-sm-7 form-control form-control-sm filterByStatus" id="GetfilterCity"><option value="">--Select City--</option><option value="BAGALKOT">BAGALKOT</option><option value="BALLARI">BALLARI</option><option value="BELAGAVI (BELGAUM)">BELAGAVI (BELGAUM)</option><option value="BENGALURU- RURAL">BENGALURU- RURAL</option><option value="BENGALURU- URBAN">BENGALURU- URBAN</option><option value="BIDAR">BIDAR</option><option value="CHAMARAJNAGAR">CHAMARAJNAGAR</option><option value="CHIKABALLAPUR">CHIKABALLAPUR</option><option value="CHIKMAGALUR">CHIKMAGALUR</option><option value="CHITRADURGA">CHITRADURGA</option><option value="DAVANGERE">DAVANGERE</option><option value="DHARWAD">DHARWAD</option><option value="GADAG">GADAG</option><option value="GULBARGA/KALABURGI">GULBARGA/KALABURGI</option><option value="HASSAN">HASSAN</option><option value="HAVERI">HAVERI</option><option value="HUBLI">HUBLI</option><option value="KARWAR">KARWAR</option><option value="KODAGU">KODAGU</option><option value="KOLAR">KOLAR</option><option value="KOPPAL">KOPPAL</option><option value="MANDYA">MANDYA</option><option value="MANGALURU (MANGALORE)">MANGALURU (MANGALORE)</option><option value="MYSURU (MYSORE)">MYSURU (MYSORE)</option><option value="RAICHUR">RAICHUR</option><option value="RAMANAGARA">RAMANAGARA</option><option value="SHIVAMOGA (SHIMOGA)">SHIVAMOGA (SHIMOGA)</option><option value="TUMAKURU">TUMAKURU</option><option value="TUMKUR">TUMKUR</option><option value="UDUPI/MANIPAL">UDUPI/MANIPAL</option><option value="VIJAYAPURA">VIJAYAPURA</option><option value="YADGIR">YADGIR</option></select>
`;

const $ = Cheerio.load(html);

// Initialize an empty array to store the values
let cities = [];

// Iterate through the options of the select element
$('#GetfilterCity option').each(function() {
    const value = $(this).attr('value');
    if (value) {
        cities.push(value);
    }
});


// Function to fetch and save data for each city
async function fetchDataForCity(city) {
  const url = `https://neet.ntaonline.in/frontend/web/common-scorecard/getdataresult?GetfilterState=KARNATAKA&&%20GetfilterCity=${city}&draw=1&columns%5B0%5D%5Bdata%5D=SrNo&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=true&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=CENT_STATE&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=CENT_CITY&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=CENT_NAME&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=CENTNO&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&_=1721542717740`;

  try {
    const response = await fetch(url);
    const newData = await response.json();

    // Read the existing data from the JSON file
    const data = fs.readFileSync('data.json', 'utf8');
    let jsonData = JSON.parse(data);

    // Ensure the jsonData is in the expected format
    if (!Array.isArray(jsonData.data)) {
      console.error('Invalid data format in the JSON file');
      return;
    }

    // Add the new data to the existing data
    jsonData.data.push(...newData.data);

    // Write the updated data back to the JSON file
    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));
    console.log(`Data successfully appended for ${city}`);
  } catch (err) {
    console.error(`Error fetching or processing data for ${city}`, err);
  }
}

// Loop through each city and fetch data
async function fetchAllCitiesData() {
  for (const city of cities) {
    await fetchDataForCity(city);
  }
}

fetchAllCitiesData();
