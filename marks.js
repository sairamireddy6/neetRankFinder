const axios = require('axios');
const pdf = require('pdf-parse');
const fs = require('fs');

// Sample JSON data
const jsonData = {
    "draw": 3,
    "recordsTotal": null,
    "recordsFiltered": null,
    "data":   [
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "ASIFABAD",
        "CENT_NAME": "ASIFABAD MODEL SCHOOL",
        "CENTNO": "421001"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "ADILABAD",
        "CENT_NAME": "CHAVARA ACADEMY",
        "CENTNO": "420901"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "ADILABAD",
        "CENT_NAME": "ARYABHATTA INTERNATIONAL SCHOOL",
        "CENTNO": "420902"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "ADILABAD",
        "CENT_NAME": "ARYABHATTA HIGH SCHOOL",
        "CENTNO": "420903"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "BHUPALAPALLY",
        "CENT_NAME": "MONTESSORI HIGH SCHOOL BHUPALPALLY",
        "CENTNO": "421101"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "GADWAL",
        "CENT_NAME": "SR VIDYANIKETHAN",
        "CENTNO": "421201"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "GADWAL",
        "CENT_NAME": "MONTESSORI HIGH SCHOOL",
        "CENTNO": "421202"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "GADWAL",
        "CENT_NAME": "RAGHAVENDRA HIGH SCHOOL",
        "CENTNO": "421203"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "GADWAL",
        "CENT_NAME": "SARASWATHI HIGH SCHOOL(CBSE)",
        "CENTNO": "421204"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HAYATHNAGAR",
        "CENT_NAME": "CANDOR SHRINE I SCHOOL HAYATH NAGAR RR DIST TL",
        "CENTNO": "420801"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HAYATHNAGAR",
        "CENT_NAME": "ZEE HIGH SCHOOL HAYATHNAGAR",
        "CENTNO": "420802"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HAYATHNAGAR",
        "CENT_NAME": "JHONSON GRAMMAR SCHOOL",
        "CENTNO": "420803"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HAYATHNAGAR",
        "CENT_NAME": "G PULLA REDDY MEM SCHOOL",
        "CENTNO": "420804"
      },
      {
        "SrNo": 5,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HAYATHNAGAR",
        "CENT_NAME": "DEFENCE LAB SCHOOL- RCI",
        "CENTNO": "420805"
      },
      {
        "SrNo": 6,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HAYATHNAGAR",
        "CENT_NAME": "ARKA  INTERNATIONAL SCHOOL",
        "CENTNO": "420806"
      },
      {
        "SrNo": 7,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HAYATHNAGAR",
        "CENT_NAME": "SARITHA VIDYA NIKETHAN",
        "CENTNO": "420807"
      },
      {
        "SrNo": 8,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HAYATHNAGAR",
        "CENT_NAME": "MANCHI SCHOOL, BALAPUR ROAD",
        "CENTNO": "420808"
      },
      {
        "SrNo": 9,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HAYATHNAGAR",
        "CENT_NAME": "UNICENT SCHOOL HAYATHNAGAR(M) HYDERABAD TL",
        "CENTNO": "420809"
      },
      {
        "SrNo": 10,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HAYATHNAGAR",
        "CENT_NAME": "LOTUS LAP PUBLIC SCHOOL, TURKYAMJAL",
        "CENTNO": "420810"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "CMR TECHNICAL CAMPUS",
        "CENTNO": "420101"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "MLR INSTITUTE OF TECHNOLOGY",
        "CENTNO": "420102"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "INSTITUTE OF AERONAUTICAL ENGINEERING",
        "CENTNO": "420103"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "SHREE SWAMINARAYAN GURUKUL VIDYALAYA",
        "CENTNO": "420104"
      },
      {
        "SrNo": 5,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "LORDS INSTITUTE OF ENGINEERING AND TECHNOLOGY",
        "CENTNO": "420105"
      },
      {
        "SrNo": 6,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "D A V PUBLIC SCHOOL",
        "CENTNO": "420106"
      },
      {
        "SrNo": 7,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "CHIREC INTERNATIONAL SCHOOL",
        "CENTNO": "420107"
      },
      {
        "SrNo": 8,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "MERIDIAN SCHOOL MADHAPUR",
        "CENTNO": "420108"
      },
      {
        "SrNo": 9,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "D A V PUBLIC SCHOOL KUKATPALLY HYDERABAD TL",
        "CENTNO": "420109"
      },
      {
        "SrNo": 10,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "ST. MARTINS HIGH SCHOOL",
        "CENTNO": "420110"
      },
      {
        "SrNo": 11,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "KENNEDY HIGH-THE GLOBAL SCHOOL",
        "CENTNO": "420111"
      },
      {
        "SrNo": 12,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "VIGNANA JYOTHI PUB SCH MADHURANAGAR HYDERABAD TL",
        "CENTNO": "420112"
      },
      {
        "SrNo": 13,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "PRINCETON INSTITUTE OF ENGINEERING AND TECHNOLOGY FOR WOMEN",
        "CENTNO": "420113"
      },
      {
        "SrNo": 14,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "AZAAN INTL SCHOOL TOLI CHOWK HYDERABAD TL",
        "CENTNO": "420114"
      },
      {
        "SrNo": 15,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "GITANJALI DEVASHRAY",
        "CENTNO": "420115"
      },
      {
        "SrNo": 16,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "NIZAM COLLEGE BASHEERBAGH (ID: C-25476)",
        "CENTNO": "420116"
      },
      {
        "SrNo": 17,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "SISTER NIVEDITA SCHOOL AMEERPET HYDERABAD TL",
        "CENTNO": "420117"
      },
      {
        "SrNo": 18,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "KENDRIYA VIDYALAYA GACHIBAWLI",
        "CENTNO": "420118"
      },
      {
        "SrNo": 19,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "MERIDIAN SCHOOL KUKATPALLY",
        "CENTNO": "420119"
      },
      {
        "SrNo": 20,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "HINDU PUBLIC SCHOOL",
        "CENTNO": "420120"
      },
      {
        "SrNo": 21,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "CMR INTL SCHOOL",
        "CENTNO": "420121"
      },
      {
        "SrNo": 22,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "P OBUL REDDY PUB SCH JUBILEE HILLS HYDERABAD TL",
        "CENTNO": "420122"
      },
      {
        "SrNo": 23,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "DELHI SCHOOL OF EXCELLENCE BANJARA HILLS HYD TL",
        "CENTNO": "420123"
      },
      {
        "SrNo": 24,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "VISTA SCHOOL",
        "CENTNO": "420124"
      },
      {
        "SrNo": 25,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "TATVA GLOBAL SCHOOL",
        "CENTNO": "420125"
      },
      {
        "SrNo": 26,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "PEARSON SCHOOL KOMPALLY HYDERABAD TELANGANA",
        "CENTNO": "420126"
      },
      {
        "SrNo": 27,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "SREENIDHI INSTITUTE OF SCIENCE AND TECHNOLOGY",
        "CENTNO": "420127"
      },
      {
        "SrNo": 28,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "PANINEEYA MAHAVIDYALAYA PUBLIC SCHOOL",
        "CENTNO": "420128"
      },
      {
        "SrNo": 29,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "SARATHI SCHOOL",
        "CENTNO": "420129"
      },
      {
        "SrNo": 30,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "BHAVANS SRI RAMAKRISHNA VIDYALAYA",
        "CENTNO": "420130"
      },
      {
        "SrNo": 31,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "ST. MICHAEL''S SCHOOL",
        "CENTNO": "420131"
      },
      {
        "SrNo": 32,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "THE HYDERABAD PUBLIC SCHOOL - RAMANTHAPUR",
        "CENTNO": "420132"
      },
      {
        "SrNo": 33,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "CAL PUBLIC SCHOOL",
        "CENTNO": "420133"
      },
      {
        "SrNo": 34,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "KENDRIYA VIDYALAYA NO.II GOLCONDA",
        "CENTNO": "420134"
      },
      {
        "SrNo": 35,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "KENDRIYA VIDYALAYA NO.1 GOLCONDA",
        "CENTNO": "420135"
      },
      {
        "SrNo": 36,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "INDUS UNIVERSAL SCHOOL",
        "CENTNO": "420136"
      },
      {
        "SrNo": 37,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "ST.PETER?S  HIGH SCHOOL",
        "CENTNO": "420137"
      },
      {
        "SrNo": 38,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "NEW SIDDHARTHA DEGREE COLLEGE FOR WOMEN",
        "CENTNO": "420138"
      },
      {
        "SrNo": 39,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "BIRLA OPEN MINDS INTERNATIONAL SCHOOL",
        "CENTNO": "420139"
      },
      {
        "SrNo": 40,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "ST ANDREWS HIGH SCHOOL",
        "CENTNO": "420140"
      },
      {
        "SrNo": 41,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "ARMY PUBLIC SCHOOL GOLCONDA",
        "CENTNO": "420141"
      },
      {
        "SrNo": 42,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "JUBILEE HILLS PUBLIC SCHOOL, HYDERABAD",
        "CENTNO": "420142"
      },
      {
        "SrNo": 43,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "PM SHRI KENDRIYA VIDYALAYA TIRUMALAGIRI",
        "CENTNO": "420143"
      },
      {
        "SrNo": 44,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "DELHI PUBLIC SCHOOL HYDERABAD",
        "CENTNO": "420144"
      },
      {
        "SrNo": 45,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "BHARATIYA VIDYA BHAVAN''S ATMAKURI RAMA RAO SCHOOL",
        "CENTNO": "420145"
      },
      {
        "SrNo": 46,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "VIP''S INTERNATIONAL SCHOOL,CHANDRAYANGUTTA BRANCH",
        "CENTNO": "420146"
      },
      {
        "SrNo": 47,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "KENDRIYA VIDYALAYA NO II UPPAL",
        "CENTNO": "420147"
      },
      {
        "SrNo": 48,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "AZRA PUBLIC SCHOOL",
        "CENTNO": "420148"
      },
      {
        "SrNo": 49,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "KENDRIYA VIDYALAYA CRPF BARKAS HYDERABAD",
        "CENTNO": "420149"
      },
      {
        "SrNo": 50,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "PMSHRI KENDRIYA VIDYALAYA BOWENPALLY",
        "CENTNO": "420150"
      },
      {
        "SrNo": 51,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "HYDERABAD/SECUNDERABAD",
        "CENT_NAME": "KENDRIYA VIDYALAYA BOLARUM",
        "CENTNO": "420151"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "JAGTIAL",
        "CENT_NAME": "KGR PUBLIC SCHOOL",
        "CENTNO": "421301"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "JAGTIAL",
        "CENT_NAME": "SRI CHAITANYA HIGH SCHOOL JABITHAPUR",
        "CENTNO": "421302"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "JANGAON",
        "CENT_NAME": "SAN MARIA HIGH SCHOOL",
        "CENTNO": "421401"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "JANGAON",
        "CENT_NAME": "GITANJALI HIGH SCHOOL",
        "CENTNO": "421402"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "KARIMNAGAR",
        "CENT_NAME": "VIVEKANANDA DEGREE & PG COLLEGE",
        "CENTNO": "420201"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "KARIMNAGAR",
        "CENT_NAME": "SREE CHAITANYA INSTITUTE OF TECHNOLOGICAL SCIENCES",
        "CENTNO": "420202"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "KARIMNAGAR",
        "CENT_NAME": "VAGESHWARI COLLEGE OF ENGINEERING",
        "CENTNO": "420203"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "KARIMNAGAR",
        "CENT_NAME": "GOVERNMENT DEGREE COLLEGE FOR WOMEN KARIMNAGAR",
        "CENTNO": "420204"
      },
      {
        "SrNo": 5,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "KARIMNAGAR",
        "CENT_NAME": "VIVEKANANDA RESIDENTIAL SCHOOL",
        "CENTNO": "420205"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "KHAMMAM",
        "CENT_NAME": "BLOOMING MINDS CENTRAL SCHOOL BALLEPALLI KHAMMAM",
        "CENTNO": "420305"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "KHAMMAM",
        "CENT_NAME": "HARVEST PUBLIC SCHOOL",
        "CENTNO": "420301"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "KHAMMAM",
        "CENT_NAME": "SVM CENTRAL PUBLIC SCHOOL",
        "CENTNO": "420302"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "KHAMMAM",
        "CENT_NAME": "SES-V.V.CENTRAL PUBLIC SCHOOL",
        "CENTNO": "420303"
      },
      {
        "SrNo": 5,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "KHAMMAM",
        "CENT_NAME": "MAX INSTITUTE OF PHARMACEUTICAL SCIENCES",
        "CENTNO": "420304"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "KOTHAGUDEM",
        "CENT_NAME": "NAVA BHARAT PUBLIC SCHOOL",
        "CENTNO": "421501"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "KOTHAGUDEM",
        "CENT_NAME": "SINGARENI COLLIERIES WOMENS DEGREE & PG COLLEGE",
        "CENTNO": "421502"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MAHABUBABAD",
        "CENT_NAME": "EKASHILA ANGELS SCHOOL",
        "CENTNO": "421601"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MAHABUBABAD",
        "CENT_NAME": "MAHARSHI VIDYALAYA",
        "CENTNO": "421602"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MAHBUBNAGAR",
        "CENT_NAME": "FORTUNE BUTTERFLY SCHOOL",
        "CENTNO": "420701"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MAHBUBNAGAR",
        "CENT_NAME": "TAGORE SCHOOL",
        "CENTNO": "420702"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MAHBUBNAGAR",
        "CENT_NAME": "MOUNT BASIL HIGH SCHOOL",
        "CENTNO": "420703"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MAHBUBNAGAR",
        "CENT_NAME": "SHREE SWAMINARAYAN GURUKUL INTERNATIONAL SCHOOL, JADCHERLA",
        "CENTNO": "420704"
      },
      {
        "SrNo": 5,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MAHBUBNAGAR",
        "CENT_NAME": "KOTHAKOTA PUPILS HIGH SCHOOL",
        "CENTNO": "420705"
      },
      {
        "SrNo": 6,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MAHBUBNAGAR",
        "CENT_NAME": "KENDRIYA VIDYALAYA MAHABUBNAGAR",
        "CENTNO": "420706"
      },
      {
        "SrNo": 7,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MAHBUBNAGAR",
        "CENT_NAME": "CHAITANYA CENTRAL SCHOOL",
        "CENTNO": "420707"
      },
      {
        "SrNo": 8,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MAHBUBNAGAR",
        "CENT_NAME": "SHLOKA SCHOOL",
        "CENTNO": "420708"
      },
      {
        "SrNo": 9,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MAHBUBNAGAR",
        "CENT_NAME": "GEETHA SHRI HIGH SCHOOL",
        "CENTNO": "420709"
      },
      {
        "SrNo": 10,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MAHBUBNAGAR",
        "CENT_NAME": "DELHI WORLD SCHOOL",
        "CENTNO": "420710"
      },
      {
        "SrNo": 11,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MAHBUBNAGAR",
        "CENT_NAME": "SAMARTHA SCHOOL",
        "CENTNO": "420711"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MANCHERIAL",
        "CENT_NAME": "TRINITY HIGH SCHOOL",
        "CENTNO": "421701"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MANCHERIAL",
        "CENT_NAME": "CARMEL HIGH SCHOOL",
        "CENTNO": "421702"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MANCHERIAL",
        "CENT_NAME": "SRI USHODAYA HIGH SCHOOL",
        "CENTNO": "421703"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MANCHERIAL",
        "CENT_NAME": "MOUNT CARMEL HIGH SCHOOL",
        "CENTNO": "421704"
      },
      {
        "SrNo": 5,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MANCHERIAL",
        "CENT_NAME": "CARMEL CONVENT HIGH SCHOOL",
        "CENTNO": "421705"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MEDAK",
        "CENT_NAME": "RAINBOW INTERNATIONAL SCHOOL",
        "CENTNO": "421801"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MEDAK",
        "CENT_NAME": "MNR SCHOOL OF EXCELLENCE",
        "CENTNO": "421802"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MEDCHAL",
        "CENT_NAME": "THE CREEK PLANET SCHOOL VENUS",
        "CENTNO": "421901"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MEDCHAL",
        "CENT_NAME": "DELHI WORLD PUBLIC SCHOOL , KOMPALLY",
        "CENTNO": "421902"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MEDCHAL",
        "CENT_NAME": "DRS INTERNATIONAL SCHOOL",
        "CENTNO": "421903"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MEDCHAL",
        "CENT_NAME": "DELHI WORLD SCHOOL",
        "CENTNO": "421904"
      },
      {
        "SrNo": 5,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MEDCHAL",
        "CENT_NAME": "SUCHITRA ACADEMY",
        "CENTNO": "421905"
      },
      {
        "SrNo": 6,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MEDCHAL",
        "CENT_NAME": "THE CREEK PLANET SCHOOL",
        "CENTNO": "421906"
      },
      {
        "SrNo": 7,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MEDCHAL",
        "CENT_NAME": "ACADEMIC HEIGHTS PUBLIC SCHOOL",
        "CENTNO": "421907"
      },
      {
        "SrNo": 8,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MEDCHAL",
        "CENT_NAME": "DHATRAK MODEL SCHOOL",
        "CENTNO": "421908"
      },
      {
        "SrNo": 9,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MEDCHAL",
        "CENT_NAME": "SHIKHARA SCHOOL",
        "CENTNO": "421909"
      },
      {
        "SrNo": 10,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "MEDCHAL",
        "CENT_NAME": "SADHU VASWANI INTERNATIONAL SCHOOL",
        "CENTNO": "421910"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NALGONDA",
        "CENT_NAME": "SPR HIGH SCHOOL",
        "CENTNO": "422001"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NALGONDA",
        "CENT_NAME": "NARAYANA HIGH SCHOOL",
        "CENTNO": "422002"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NALGONDA",
        "CENT_NAME": "THE VIPASYA SCHOOL",
        "CENTNO": "422003"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NALGONDA",
        "CENT_NAME": "THE NALGONDA PUBLIC SCHOOL",
        "CENTNO": "422004"
      },
      {
        "SrNo": 5,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NALGONDA",
        "CENT_NAME": "AUROBINDO PUBLIC SCHOOL",
        "CENTNO": "422005"
      },
      {
        "SrNo": 6,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NALGONDA",
        "CENT_NAME": "MONTFORT SCHOOL - CBSE",
        "CENTNO": "422006"
      },
      {
        "SrNo": 7,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NALGONDA",
        "CENT_NAME": "NEWS SCHOOL",
        "CENTNO": "422007"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NIZAMABAD",
        "CENT_NAME": "KAKATIYA INSTITUTE OF TECHNOLOGY AND SCIENCE FOR WOMEN",
        "CENTNO": "422101"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NIZAMABAD",
        "CENT_NAME": "SSR DEGREE COLLEGE",
        "CENTNO": "422102"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NIZAMABAD",
        "CENT_NAME": "SSR SCHOOL JANNEPALLY VILL. NAVIPET MAN. NIZAMABAD DIST.",
        "CENTNO": "422103"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NIZAMABAD",
        "CENT_NAME": "KSHATRIYA COLLEGE OF ENGINEERING",
        "CENTNO": "422104"
      },
      {
        "SrNo": 5,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NIZAMABAD",
        "CENT_NAME": "PRESIDENCY HIGH SCHOOL",
        "CENTNO": "422105"
      },
      {
        "SrNo": 6,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NIZAMABAD",
        "CENT_NAME": "NAVYABHARATHI GLOBAL SCHOOL",
        "CENTNO": "422106"
      },
      {
        "SrNo": 7,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NIZAMABAD",
        "CENT_NAME": "KNOWLEDGE PARK INTL.SCHOOL",
        "CENTNO": "422107"
      },
      {
        "SrNo": 8,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NIZAMABAD",
        "CENT_NAME": "VIJAYA HIGH SCHOOL",
        "CENTNO": "422108"
      },
      {
        "SrNo": 9,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NIZAMABAD",
        "CENT_NAME": "NIRMALA HRUDAYA HIGH SCHOOL",
        "CENTNO": "422109"
      },
      {
        "SrNo": 10,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "NIZAMABAD",
        "CENT_NAME": "SSR DISCOVERY SCHOOL",
        "CENTNO": "422110"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "RANGA REDDY",
        "CENT_NAME": "NTR MODEL SCHOOL MOINABAD MANDAL R R DIST. TL",
        "CENTNO": "420401"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "RANGA REDDY",
        "CENT_NAME": "GLOBAL INDIAN INTERNATIONAL SCHOOL RR DIST TL",
        "CENTNO": "420402"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "RANGA REDDY",
        "CENT_NAME": "CREEKSIDE INTL. SCHOOL AZIZNAGAR HYDERABAD TL",
        "CENTNO": "420403"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "RANGA REDDY",
        "CENT_NAME": "LEAD INDIA BHARAT RATNAS SCHOOL BANDLAGUDA HYD",
        "CENTNO": "420404"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SANGAREDDY",
        "CENT_NAME": "S V JUNIOR COLLEGE",
        "CENTNO": "420601"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SANGAREDDY",
        "CENT_NAME": "KARUNA HIGH SCHOOL",
        "CENTNO": "420602"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SANGAREDDY",
        "CENT_NAME": "ST.PETER?S SCHOOL",
        "CENTNO": "420603"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SANGAREDDY",
        "CENT_NAME": "ST. ANTHONYS JUNIOR COLLEGE",
        "CENTNO": "420604"
      },
      {
        "SrNo": 5,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SANGAREDDY",
        "CENT_NAME": "ST. ANTHONYS HIGH SCHOOL",
        "CENTNO": "420605"
      },
      {
        "SrNo": 6,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SANGAREDDY",
        "CENT_NAME": "ST.ANTHONY?S DEGREE COLLEGE",
        "CENTNO": "420606"
      },
      {
        "SrNo": 7,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SANGAREDDY",
        "CENT_NAME": "PIONEERS SCHOOL",
        "CENTNO": "420607"
      },
      {
        "SrNo": 8,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SANGAREDDY",
        "CENT_NAME": "ST.ARNOLD''S HIGH SCHOOL",
        "CENTNO": "420608"
      },
      {
        "SrNo": 9,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SANGAREDDY",
        "CENT_NAME": "RISHI HIGH SCHOOL",
        "CENTNO": "420609"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SIDDIPET",
        "CENT_NAME": "VIKAS HIGH SCHOOL",
        "CENTNO": "422201"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SIDDIPET",
        "CENT_NAME": "SIDDHARTHA HIGH SCHOOL",
        "CENTNO": "422202"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SURYAPET",
        "CENT_NAME": "SRI VENKATESWARA ENGINEERING COLLEGE",
        "CENTNO": "422301"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SURYAPET",
        "CENT_NAME": "ANJALI HIGH SCHOOL",
        "CENTNO": "422302"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "SURYAPET",
        "CENT_NAME": "M.S.R. CENTRAL SCHOOL",
        "CENTNO": "422303"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "VIKARABAD",
        "CENT_NAME": "ST.ANTHONY''S HIGH SCHOOL VIKARABAD",
        "CENTNO": "422401"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "VIKARABAD",
        "CENT_NAME": "BHASHYAM HIGH SCHOOL",
        "CENTNO": "422402"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "VIKARABAD",
        "CENT_NAME": "NEW NAGARJUNA HIGH SCHOOL, VIKARABAD",
        "CENTNO": "422403"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "VIKARABAD",
        "CENT_NAME": "BHRUNGY INTERNATIONAL SCHOOL",
        "CENTNO": "422404"
      },
      {
        "SrNo": 1,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "WARANGAL",
        "CENT_NAME": "SVS GROUP OF INSTITUTIONS",
        "CENTNO": "420501"
      },
      {
        "SrNo": 2,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "WARANGAL",
        "CENT_NAME": "CHAITANYA ? DEEMED TO BE UNIVERSITY",
        "CENTNO": "420502"
      },
      {
        "SrNo": 3,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "WARANGAL",
        "CENT_NAME": "SR PRIME SCHOOL",
        "CENTNO": "420503"
      },
      {
        "SrNo": 4,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "WARANGAL",
        "CENT_NAME": "ST. PETERS CENTRAL PUBLIC SCHOOL",
        "CENTNO": "420504"
      },
      {
        "SrNo": 5,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "WARANGAL",
        "CENT_NAME": "MASTERJI DEGREE & P.G COLLEGE",
        "CENTNO": "420505"
      },
      {
        "SrNo": 6,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "WARANGAL",
        "CENT_NAME": "WARANGAL PUBLIC SCHOOL",
        "CENTNO": "420506"
      },
      {
        "SrNo": 7,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "WARANGAL",
        "CENT_NAME": "ALLURI INSTITUTE OF MANAGEMENT SCIENCES",
        "CENTNO": "420507"
      },
      {
        "SrNo": 8,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "WARANGAL",
        "CENT_NAME": "TALLA PADMAVATHI COLLEGE OF PHARMACY",
        "CENTNO": "420508"
      },
      {
        "SrNo": 9,
        "CENT_STATE": "TELANGANA",
        "CENT_CITY": "WARANGAL",
        "CENT_NAME": "GREENWOOD HIGH SCHOOL",
        "CENTNO": "420509"
      }
    ]
  };

// Function to fetch PDF content
async function fetchPdfContent(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return response.data;
}

// Function to parse PDF content and count marks
async function countMarksInPdf(pdfBuffer, targetMarks) {
  const data = await pdf(pdfBuffer);
  const text = data.text;
  const regex = /(\d+)\s+(-?\d+)/g;
  let match;
  let count = 0;

  while ((match = regex.exec(text)) !== null) {
    const marks = parseInt(match[2]);
    if (marks > targetMarks) {
      count++;
    }
  }

  return count;
}

// Main function to process the JSON data
async function processJsonData(jsonData) {
  const targetMarks = 591;
  let totalCount = 0;
  let results = [];

  for (const record of jsonData.data) {
    const centNo = record.CENTNO;
    const pdfUrl = `https://neetfs.ntaonline.in/NEET_2024_Result/${centNo}.pdf`;
    try {
      const pdfContent = await fetchPdfContent(pdfUrl);
      const count = await countMarksInPdf(pdfContent, targetMarks);
      totalCount += count;
      results.push({ CENTNO: centNo, Count: count });
      console.log(`CENTNO: ${centNo} -> Count: ${count}`);
    } catch (error) {
      console.error(`Failed to process CENTNO: ${centNo}`, error);
      results.push({ CENTNO: centNo, Count: null });  // Indicate that the count could not be determined
    }
  }

  results.push({ Total: totalCount });
  console.log(`Total members with marks ${targetMarks}: ${totalCount}`);

  // Write the results to a file
  fs.writeFileSync('results.json', JSON.stringify(results, null, 2));
}

processJsonData(jsonData);
