// script.js - Capitals Game (all UI text in English)
// Embedded capitals data to avoid CORS when opened via file://

const CAPITALS = [
  {
    "country": "Japan",
    "capital": "Tokyo",
    "lat": 35.687,
    "lng": 139.7495
  },
  {
    "country": "Indonesia",
    "capital": "Jakarta",
    "lat": -6.175,
    "lng": 106.8275
  },
  {
    "country": "Philippines",
    "capital": "Manila",
    "lat": 14.5958,
    "lng": 120.9772
  },
  {
    "country": "Korea, South",
    "capital": "Seoul",
    "lat": 37.5667,
    "lng": 126.9833
  },
  {
    "country": "Mexico",
    "capital": "Mexico City",
    "lat": 19.4333,
    "lng": -99.1333
  },
  {
    "country": "Egypt",
    "capital": "Cairo",
    "lat": 30.0444,
    "lng": 31.2358
  },
  {
    "country": "Bangladesh",
    "capital": "Dhaka",
    "lat": 23.7289,
    "lng": 90.3944
  },
  {
    "country": "China",
    "capital": "Beijing",
    "lat": 39.9067,
    "lng": 116.3975
  },
  {
    "country": "Thailand",
    "capital": "Bangkok",
    "lat": 13.7525,
    "lng": 100.4942
  },
  {
    "country": "Russia",
    "capital": "Moscow",
    "lat": 55.7506,
    "lng": 37.6175
  },
  {
    "country": "Argentina",
    "capital": "Buenos Aires",
    "lat": -34.6036,
    "lng": -58.3814
  },
  {
    "country": "Iran",
    "capital": "Tehran",
    "lat": 35.6889,
    "lng": 51.3897
  },
  {
    "country": "Congo (Kinshasa)",
    "capital": "Kinshasa",
    "lat": -4.3219,
    "lng": 15.3119
  },
  {
    "country": "United Kingdom",
    "capital": "London",
    "lat": 51.5072,
    "lng": -0.1275
  },
  {
    "country": "France",
    "capital": "Paris",
    "lat": 48.8567,
    "lng": 2.3522
  },
  {
    "country": "Peru",
    "capital": "Lima",
    "lat": -12.06,
    "lng": -77.0375
  },
  {
    "country": "Angola",
    "capital": "Luanda",
    "lat": -8.8383,
    "lng": 13.2344
  },
  {
    "country": "Malaysia",
    "capital": "Kuala Lumpur",
    "lat": 3.1686,
    "lng": 101.698
  },
  {
    "country": "Vietnam",
    "capital": "Hanoi",
    "lat": 21.0,
    "lng": 105.85
  },
  {
    "country": "Colombia",
    "capital": "Bogotá",
    "lat": 4.7111,
    "lng": -74.0722
  },
  {
    "country": "Sudan",
    "capital": "Khartoum",
    "lat": 15.6031,
    "lng": 32.5265
  },
  {
    "country": "Hong Kong",
    "capital": "Hong Kong",
    "lat": 22.3,
    "lng": 114.2
  },
  {
    "country": "Saudi Arabia",
    "capital": "Riyadh",
    "lat": 24.65,
    "lng": 46.71
  },
  {
    "country": "Chile",
    "capital": "Santiago",
    "lat": -33.4372,
    "lng": -70.6506
  },
  {
    "country": "Burma",
    "capital": "Rangoon",
    "lat": 16.795,
    "lng": 96.16
  },
  {
    "country": "Spain",
    "capital": "Madrid",
    "lat": 40.4169,
    "lng": -3.7033
  },
  {
    "country": "Iraq",
    "capital": "Baghdad",
    "lat": 33.3153,
    "lng": 44.3661
  },
  {
    "country": "Singapore",
    "capital": "Singapore",
    "lat": 1.3,
    "lng": 103.8
  },
  {
    "country": "Turkey",
    "capital": "Ankara",
    "lat": 39.93,
    "lng": 32.85
  },
  {
    "country": "Ethiopia",
    "capital": "Addis Ababa",
    "lat": 9.03,
    "lng": 38.74
  },
  {
    "country": "Kenya",
    "capital": "Nairobi",
    "lat": -1.2864,
    "lng": 36.8172
  },
  {
    "country": "United States",
    "capital": "Washington",
    "lat": 38.9047,
    "lng": -77.0163
  },
  {
    "country": "Côte d’Ivoire",
    "capital": "Abidjan",
    "lat": 5.3364,
    "lng": -4.0267
  },
  {
    "country": "South Africa",
    "capital": "Cape Town",
    "lat": -33.9253,
    "lng": 18.4239
  },
  {
    "country": "Germany",
    "capital": "Berlin",
    "lat": 52.52,
    "lng": 13.405
  },
  {
    "country": "Afghanistan",
    "capital": "Kabul",
    "lat": 34.5253,
    "lng": 69.1783
  },
  {
    "country": "Mali",
    "capital": "Bamako",
    "lat": 12.6458,
    "lng": -7.9922
  },
  {
    "country": "Jordan",
    "capital": "Amman",
    "lat": 31.9497,
    "lng": 35.9328
  },
  {
    "country": "Nigeria",
    "capital": "Abuja",
    "lat": 9.0667,
    "lng": 7.4833
  },
  {
    "country": "Venezuela",
    "capital": "Caracas",
    "lat": 10.4806,
    "lng": -66.9036
  },
  {
    "country": "Uzbekistan",
    "capital": "Tashkent",
    "lat": 41.3111,
    "lng": 69.2797
  },
  {
    "country": "Burkina Faso",
    "capital": "Ouagadougou",
    "lat": 12.3686,
    "lng": -1.5275
  },
  {
    "country": "Greece",
    "capital": "Athens",
    "lat": 37.9842,
    "lng": 23.7281
  },
  {
    "country": "Guatemala",
    "capital": "Guatemala City",
    "lat": 14.6417,
    "lng": -90.5133
  },
  {
    "country": "Kuwait",
    "capital": "Kuwait City",
    "lat": 29.3697,
    "lng": 47.9783
  },
  {
    "country": "Ukraine",
    "capital": "Kyiv",
    "lat": 50.45,
    "lng": 30.5233
  },
  {
    "country": "Korea, North",
    "capital": "Pyongyang",
    "lat": 39.0167,
    "lng": 125.7475
  },
  {
    "country": "South Africa",
    "capital": "Pretoria",
    "lat": -25.7461,
    "lng": 28.1881
  },
  {
    "country": "Italy",
    "capital": "Rome",
    "lat": 41.8931,
    "lng": 12.4828
  },
  {
    "country": "Syria",
    "capital": "Damascus",
    "lat": 33.502,
    "lng": 36.2981
  },
  {
    "country": "Congo (Brazzaville)",
    "capital": "Brazzaville",
    "lat": -4.2667,
    "lng": 15.2667
  },
  {
    "country": "Yemen",
    "capital": "Sanaa",
    "lat": 15.3483,
    "lng": 44.2064
  },
  {
    "country": "Taiwan",
    "capital": "Taipei",
    "lat": 25.0375,
    "lng": 121.5625
  },
  {
    "country": "Cameroon",
    "capital": "Yaoundé",
    "lat": 3.8667,
    "lng": 11.5167
  },
  {
    "country": "Lebanon",
    "capital": "Beirut",
    "lat": 33.8981,
    "lng": 35.5058
  },
  {
    "country": "Romania",
    "capital": "Bucharest",
    "lat": 44.4325,
    "lng": 26.1039
  },
  {
    "country": "Algeria",
    "capital": "Algiers",
    "lat": 36.7325,
    "lng": 3.0872
  },
  {
    "country": "Azerbaijan",
    "capital": "Baku",
    "lat": 40.3667,
    "lng": 49.8352
  },
  {
    "country": "Austria",
    "capital": "Vienna",
    "lat": 48.2083,
    "lng": 16.3725
  },
  {
    "country": "Cambodia",
    "capital": "Phnom Penh",
    "lat": 11.5696,
    "lng": 104.921
  },
  {
    "country": "Somalia",
    "capital": "Mogadishu",
    "lat": 2.0392,
    "lng": 45.3419
  },
  {
    "country": "Cuba",
    "capital": "Havana",
    "lat": 23.1367,
    "lng": -82.3589
  },
  {
    "country": "Poland",
    "capital": "Warsaw",
    "lat": 52.23,
    "lng": 21.0111
  },
  {
    "country": "Belarus",
    "capital": "Minsk",
    "lat": 53.9006,
    "lng": 27.5586
  },
  {
    "country": "Puerto Rico",
    "capital": "San Juan",
    "lat": 18.3985,
    "lng": -66.061
  },
  {
    "country": "Ecuador",
    "capital": "Quito",
    "lat": -0.22,
    "lng": -78.5125
  },
  {
    "country": "Zambia",
    "capital": "Lusaka",
    "lat": -15.4167,
    "lng": 28.2833
  },
  {
    "country": "Uruguay",
    "capital": "Montevideo",
    "lat": -34.9056,
    "lng": -56.1842
  },
  {
    "country": "Hungary",
    "capital": "Budapest",
    "lat": 47.4983,
    "lng": 19.0408
  },
  {
    "country": "Uganda",
    "capital": "Kampala",
    "lat": 0.3136,
    "lng": 32.5811
  },
  {
    "country": "Guinea",
    "capital": "Conakry",
    "lat": 9.5092,
    "lng": -13.7122
  },
  {
    "country": "Tajikistan",
    "capital": "Dushanbe",
    "lat": 38.5367,
    "lng": 68.78
  },
  {
    "country": "Zimbabwe",
    "capital": "Harare",
    "lat": -17.8292,
    "lng": 31.0522
  },
  {
    "country": "Costa Rica",
    "capital": "San José",
    "lat": 9.9325,
    "lng": -84.08
  },
  {
    "country": "El Salvador",
    "capital": "San Salvador",
    "lat": 13.6989,
    "lng": -89.1914
  },
  {
    "country": "Togo",
    "capital": "Lomé",
    "lat": 6.1308,
    "lng": 1.2153
  },
  {
    "country": "Niger",
    "capital": "Niamey",
    "lat": 13.515,
    "lng": 2.1175
  },
  {
    "country": "United Arab Emirates",
    "capital": "Abu Dhabi",
    "lat": 24.4667,
    "lng": 54.3667
  },
  {
    "country": "Netherlands",
    "capital": "Amsterdam",
    "lat": 52.3728,
    "lng": 4.8936
  },
  {
    "country": "Senegal",
    "capital": "Dakar",
    "lat": 14.6726,
    "lng": -17.432
  },
  {
    "country": "Oman",
    "capital": "Muscat",
    "lat": 23.6139,
    "lng": 58.5922
  },
  {
    "country": "Bulgaria",
    "capital": "Sofia",
    "lat": 42.6979,
    "lng": 23.3217
  },
  {
    "country": "Mongolia",
    "capital": "Ulaanbaatar",
    "lat": 47.9214,
    "lng": 106.9055
  },
  {
    "country": "Czechia",
    "capital": "Prague",
    "lat": 50.0875,
    "lng": 14.4214
  },
  {
    "country": "Denmark",
    "capital": "Copenhagen",
    "lat": 55.6805,
    "lng": 12.5615
  },
  {
    "country": "Finland",
    "capital": "Helsinki",
    "lat": 60.1708,
    "lng": 24.9375
  },
  {
    "country": "Madagascar",
    "capital": "Antananarivo",
    "lat": -18.91,
    "lng": 47.525
  },
  {
    "country": "Belgium",
    "capital": "Brussels",
    "lat": 50.8467,
    "lng": 4.3525
  },
  {
    "country": "Serbia",
    "capital": "Belgrade",
    "lat": 44.8178,
    "lng": 20.4569
  },
  {
    "country": "Qatar",
    "capital": "Doha",
    "lat": 25.2867,
    "lng": 51.5333
  },
  {
    "country": "Libya",
    "capital": "Tripoli",
    "lat": 32.8872,
    "lng": 13.1914
  },
  {
    "country": "Burma",
    "capital": "Nay Pyi Taw",
    "lat": 19.7475,
    "lng": 96.115
  },
  {
    "country": "Honduras",
    "capital": "Tegucigalpa",
    "lat": 14.1057,
    "lng": -87.204
  },
  {
    "country": "Rwanda",
    "capital": "Kigali",
    "lat": -1.9536,
    "lng": 30.0606
  },
  {
    "country": "Kyrgyzstan",
    "capital": "Bishkek",
    "lat": 42.8667,
    "lng": 74.5667
  },
  {
    "country": "Burundi",
    "capital": "Bujumbura",
    "lat": -3.3833,
    "lng": 29.3667
  },
  {
    "country": "Mozambique",
    "capital": "Maputo",
    "lat": -25.9153,
    "lng": 32.5764
  },
  {
    "country": "Dominican Republic",
    "capital": "Santo Domingo",
    "lat": 18.4764,
    "lng": -69.8933
  },
  {
    "country": "Georgia",
    "capital": "Tbilisi",
    "lat": 41.7225,
    "lng": 44.7925
  },
  {
    "country": "Armenia",
    "capital": "Yerevan",
    "lat": 40.1814,
    "lng": 44.5144
  },
  {
    "country": "Kazakhstan",
    "capital": "Astana",
    "lat": 51.1472,
    "lng": 71.4222
  },
  {
    "country": "Mauritania",
    "capital": "Nouakchott",
    "lat": 18.0858,
    "lng": -15.9785
  },
  {
    "country": "Canada",
    "capital": "Ottawa",
    "lat": 45.4247,
    "lng": -75.695
  },
  {
    "country": "Nicaragua",
    "capital": "Managua",
    "lat": 12.1364,
    "lng": -86.2514
  },
  {
    "country": "Turkmenistan",
    "capital": "Ashgabat",
    "lat": 37.9375,
    "lng": 58.38
  },
  {
    "country": "Liberia",
    "capital": "Monrovia",
    "lat": 6.3133,
    "lng": -10.8014
  },
  {
    "country": "Pakistan",
    "capital": "Islamabad",
    "lat": 33.6931,
    "lng": 73.0639
  },
  {
    "country": "Sweden",
    "capital": "Stockholm",
    "lat": 59.3275,
    "lng": 18.0547
  },
  {
    "country": "Malawi",
    "capital": "Lilongwe",
    "lat": -13.9669,
    "lng": 33.7873
  },
  {
    "country": "Haiti",
    "capital": "Port-au-Prince",
    "lat": 18.5425,
    "lng": -72.3386
  },
  {
    "country": "Eritrea",
    "capital": "Asmara",
    "lat": 15.3358,
    "lng": 38.9411
  },
  {
    "country": "Sierra Leone",
    "capital": "Freetown",
    "lat": 8.4833,
    "lng": -13.2331
  },
  {
    "country": "Laos",
    "capital": "Vientiane",
    "lat": 17.98,
    "lng": 102.63
  },
  {
    "country": "Israel",
    "capital": "Jerusalem",
    "lat": 31.7789,
    "lng": 35.2256
  },
  {
    "country": "Central African Republic",
    "capital": "Bangui",
    "lat": 4.3733,
    "lng": 18.5628
  },
  {
    "country": "Panama",
    "capital": "Panama City",
    "lat": 8.9711,
    "lng": -79.5347
  },
  {
    "country": "Nepal",
    "capital": "Kathmandu",
    "lat": 27.71,
    "lng": 85.32
  },
  {
    "country": "Chad",
    "capital": "N’Djamena",
    "lat": 12.1053,
    "lng": 15.0447
  },
  {
    "country": "Gabon",
    "capital": "Libreville",
    "lat": 0.3901,
    "lng": 9.4544
  },
  {
    "country": "Croatia",
    "capital": "Zagreb",
    "lat": 45.8131,
    "lng": 15.9772
  },
  {
    "country": "Tanzania",
    "capital": "Dodoma",
    "lat": -6.1731,
    "lng": 35.7419
  },
  {
    "country": "Sri Lanka",
    "capital": "Colombo",
    "lat": 6.9167,
    "lng": 79.8333
  },
  {
    "country": "Bahrain",
    "capital": "Manama",
    "lat": 26.2233,
    "lng": 50.5875
  },
  {
    "country": "Norway",
    "capital": "Oslo",
    "lat": 59.9133,
    "lng": 10.7389
  },
  {
    "country": "Benin",
    "capital": "Cotonou",
    "lat": 6.3667,
    "lng": 2.4333
  },
  {
    "country": "Moldova",
    "capital": "Chisinau",
    "lat": 47.0228,
    "lng": 28.8353
  },
  {
    "country": "Estonia",
    "capital": "Tallinn",
    "lat": 59.4372,
    "lng": 24.7453
  },
  {
    "country": "Latvia",
    "capital": "Riga",
    "lat": 56.9475,
    "lng": 24.1069
  },
  {
    "country": "Djibouti",
    "capital": "Djibouti",
    "lat": 11.5944,
    "lng": 43.1481
  },
  {
    "country": "Tunisia",
    "capital": "Tunis",
    "lat": 36.8064,
    "lng": 10.1817
  },
  {
    "country": "Ireland",
    "capital": "Dublin",
    "lat": 53.3497,
    "lng": -6.2603
  },
  {
    "country": "Gaza Strip",
    "capital": "Gaza",
    "lat": 31.5069,
    "lng": 34.456
  },
  {
    "country": "Lithuania",
    "capital": "Vilnius",
    "lat": 54.6872,
    "lng": 25.28
  },
  {
    "country": "Jamaica",
    "capital": "Kingston",
    "lat": 17.9714,
    "lng": -76.7931
  },
  {
    "country": "Morocco",
    "capital": "Rabat",
    "lat": 34.0209,
    "lng": -6.8416
  },
  {
    "country": "Portugal",
    "capital": "Lisbon",
    "lat": 38.7122,
    "lng": -9.134
  },
  {
    "country": "Netherlands",
    "capital": "The Hague",
    "lat": 52.08,
    "lng": 4.31
  },
  {
    "country": "Guinea-Bissau",
    "capital": "Bissau",
    "lat": 11.85,
    "lng": -15.5667
  },
  {
    "country": "Ghana",
    "capital": "Accra",
    "lat": 5.5461,
    "lng": -0.2067
  },
  {
    "country": "Malta",
    "capital": "Valletta",
    "lat": 35.8983,
    "lng": 14.5125
  },
  {
    "country": "Paraguay",
    "capital": "Asunción",
    "lat": -25.2945,
    "lng": -57.6435
  },
  {
    "country": "Slovakia",
    "capital": "Bratislava",
    "lat": 48.1447,
    "lng": 17.1128
  },
  {
    "country": "South Sudan",
    "capital": "Juba",
    "lat": 4.83,
    "lng": 31.58
  },
  {
    "country": "Namibia",
    "capital": "Windhoek",
    "lat": -22.57,
    "lng": 17.0836
  },
  {
    "country": "North Macedonia",
    "capital": "Skopje",
    "lat": 41.9961,
    "lng": 21.4317
  },
  {
    "country": "Albania",
    "capital": "Tirana",
    "lat": 41.3272,
    "lng": 19.8186
  },
  {
    "country": "Gambia, The",
    "capital": "Banjul",
    "lat": 13.4581,
    "lng": -16.5786
  },
  {
    "country": "Australia",
    "capital": "Canberra",
    "lat": -35.2931,
    "lng": 149.1269
  },
  {
    "country": "Lesotho",
    "capital": "Maseru",
    "lat": -29.31,
    "lng": 27.48
  },
  {
    "country": "Côte d’Ivoire",
    "capital": "Yamoussoukro",
    "lat": 6.8161,
    "lng": -5.2742
  },
  {
    "country": "Cyprus",
    "capital": "Nicosia",
    "lat": 35.1725,
    "lng": 33.365
  },
  {
    "country": "Bolivia",
    "capital": "La Paz",
    "lat": -16.4958,
    "lng": -68.1333
  },
  {
    "country": "Reunion",
    "capital": "Saint-Denis",
    "lat": -20.8789,
    "lng": 55.4481
  },
  {
    "country": "Papua New Guinea",
    "capital": "Port Moresby",
    "lat": -9.4789,
    "lng": 147.1494
  },
  {
    "country": "Bolivia",
    "capital": "Sucre",
    "lat": -19.0475,
    "lng": -65.26
  },
  {
    "country": "Equatorial Guinea",
    "capital": "Malabo",
    "lat": 3.7456,
    "lng": 8.7744
  },
  {
    "country": "Slovenia",
    "capital": "Ljubljana",
    "lat": 46.0514,
    "lng": 14.5061
  },
  {
    "country": "Bahamas, The",
    "capital": "Nassau",
    "lat": 25.0442,
    "lng": -77.3503
  },
  {
    "country": "South Africa",
    "capital": "Bloemfontein",
    "lat": -29.1167,
    "lng": 26.2167
  },
  {
    "country": "Martinique",
    "capital": "Fort-de-France",
    "lat": 14.6,
    "lng": -61.0667
  },
  {
    "country": "India",
    "capital": "New Delhi",
    "lat": 28.6139,
    "lng": 77.2089
  },
  {
    "country": "Bosnia and Herzegovina",
    "capital": "Sarajevo",
    "lat": 43.8564,
    "lng": 18.4131
  },
  {
    "country": "Suriname",
    "capital": "Paramaribo",
    "lat": 5.8522,
    "lng": -55.2039
  },
  {
    "country": "Botswana",
    "capital": "Gaborone",
    "lat": -24.6569,
    "lng": 25.9086
  },
  {
    "country": "Guyana",
    "capital": "Georgetown",
    "lat": 6.8011,
    "lng": -58.155
  },
  {
    "country": "Timor-Leste",
    "capital": "Dili",
    "lat": -8.5594,
    "lng": 125.5795
  },
  {
    "country": "New Zealand",
    "capital": "Wellington",
    "lat": -41.2889,
    "lng": 174.7772
  },
  {
    "country": "Kosovo",
    "capital": "Pristina",
    "lat": 42.6666,
    "lng": 21.1724
  },
  {
    "country": "New Caledonia",
    "capital": "Nouméa",
    "lat": -22.2625,
    "lng": 166.4443
  },
  {
    "country": "Montenegro",
    "capital": "Podgorica",
    "lat": 42.4414,
    "lng": 19.2628
  },
  {
    "country": "Curaçao",
    "capital": "Willemstad",
    "lat": 12.108,
    "lng": -68.935
  },
  {
    "country": "Mauritius",
    "capital": "Port Louis",
    "lat": -20.1644,
    "lng": 57.5042
  },
  {
    "country": "Brazil",
    "capital": "Brasília",
    "lat": -15.7939,
    "lng": -47.8828
  },
  {
    "country": "Iceland",
    "capital": "Reykjavík",
    "lat": 64.1458,
    "lng": -21.9425
  },
  {
    "country": "Burundi",
    "capital": "Gitega",
    "lat": -3.4283,
    "lng": 29.925
  },
  {
    "country": "Switzerland",
    "capital": "Bern",
    "lat": 46.948,
    "lng": 7.4474
  },
  {
    "country": "Benin",
    "capital": "Porto-Novo",
    "lat": 6.4972,
    "lng": 2.605
  },
  {
    "country": "Maldives",
    "capital": "Male",
    "lat": 4.1753,
    "lng": 73.5089
  },
  {
    "country": "Luxembourg",
    "capital": "Luxembourg",
    "lat": 49.6117,
    "lng": 6.1319
  },
  {
    "country": "French Polynesia",
    "capital": "Papeete",
    "lat": -17.5334,
    "lng": -149.5667
  },
  {
    "country": "Sri Lanka",
    "capital": "Sri Jayewardenepura Kotte",
    "lat": 6.9,
    "lng": 79.9164
  },
  {
    "country": "Bhutan",
    "capital": "Thimphu",
    "lat": 27.4722,
    "lng": 89.6361
  },
  {
    "country": "Barbados",
    "capital": "Bridgetown",
    "lat": 13.0969,
    "lng": -59.6131
  },
  {
    "country": "Fiji",
    "capital": "Suva",
    "lat": -18.1333,
    "lng": 178.4333
  },
  {
    "country": "Solomon Islands",
    "capital": "Honiara",
    "lat": -9.4333,
    "lng": 159.95
  },
  {
    "country": "Trinidad and Tobago",
    "capital": "Port of Spain",
    "lat": 10.6667,
    "lng": -61.5167
  },
  {
    "country": "Sao Tome and Principe",
    "capital": "São Tomé",
    "lat": 0.3361,
    "lng": 6.7306
  },
  {
    "country": "Mayotte",
    "capital": "Mamoudzou",
    "lat": -12.7806,
    "lng": 45.2278
  },
  {
    "country": "Saint Lucia",
    "capital": "Castries",
    "lat": 14.0108,
    "lng": -60.9894
  },
  {
    "country": "Malaysia",
    "capital": "Putrajaya",
    "lat": 2.914,
    "lng": 101.7019
  },
  {
    "country": "Cabo Verde",
    "capital": "Praia",
    "lat": 14.9177,
    "lng": -23.5092
  },
  {
    "country": "French Guiana",
    "capital": "Cayenne",
    "lat": 4.933,
    "lng": -52.33
  },
  {
    "country": "Eswatini",
    "capital": "Mbabane",
    "lat": -26.3167,
    "lng": 31.1333
  },
  {
    "country": "Brunei",
    "capital": "Bandar Seri Begawan",
    "lat": 4.8903,
    "lng": 114.9422
  },
  {
    "country": "Vanuatu",
    "capital": "Port-Vila",
    "lat": -17.7333,
    "lng": 168.3167
  },
  {
    "country": "Monaco",
    "capital": "Monaco",
    "lat": 43.7333,
    "lng": 7.4167
  },
  {
    "country": "Samoa",
    "capital": "Apia",
    "lat": -13.8333,
    "lng": -171.75
  },
  {
    "country": "Gibraltar",
    "capital": "Gibraltar",
    "lat": 36.14,
    "lng": -5.35
  },
  {
    "country": "Grenada",
    "capital": "Saint George’s",
    "lat": 12.05,
    "lng": -61.75
  },
  {
    "country": "Jersey",
    "capital": "Saint Helier",
    "lat": 49.1858,
    "lng": -2.11
  },
  {
    "country": "Marshall Islands",
    "capital": "Majuro",
    "lat": 7.0833,
    "lng": 171.3833
  },
  {
    "country": "Kiribati",
    "capital": "Tarawa",
    "lat": 1.3382,
    "lng": 173.0176
  },
  {
    "country": "Aruba",
    "capital": "Oranjestad",
    "lat": 12.5186,
    "lng": -70.0358
  },
  {
    "country": "Isle of Man",
    "capital": "Douglas",
    "lat": 54.15,
    "lng": -4.4775
  },
  {
    "country": "Cayman Islands",
    "capital": "George Town",
    "lat": 19.295,
    "lng": -81.3811
  },
  {
    "country": "Tonga",
    "capital": "Nuku‘alofa",
    "lat": -21.1333,
    "lng": -175.2
  },
  {
    "country": "Seychelles",
    "capital": "Victoria",
    "lat": -4.6231,
    "lng": 55.4525
  },
  {
    "country": "Andorra",
    "capital": "Andorra la Vella",
    "lat": 42.5,
    "lng": 1.5
  },
  {
    "country": "Antigua and Barbuda",
    "capital": "Saint John’s",
    "lat": 17.1167,
    "lng": -61.85
  },
  {
    "country": "Guernsey",
    "capital": "Saint Peter Port",
    "lat": 49.4555,
    "lng": -2.5368
  },
  {
    "country": "Greenland",
    "capital": "Nuuk",
    "lat": 64.1767,
    "lng": -51.7361
  },
  {
    "country": "Comoros",
    "capital": "Moroni",
    "lat": -11.699,
    "lng": 43.256
  },
  {
    "country": "Dominica",
    "capital": "Roseau",
    "lat": 15.3014,
    "lng": -61.3883
  },
  {
    "country": "Faroe Islands",
    "capital": "Tórshavn",
    "lat": 62.0,
    "lng": -6.7833
  },
  {
    "country": "Saint Kitts and Nevis",
    "capital": "Basseterre",
    "lat": 17.3,
    "lng": -62.7333
  },
  {
    "country": "Saint Vincent and the Grenadines",
    "capital": "Kingstown",
    "lat": 13.1578,
    "lng": -61.225
  },
  {
    "country": "Virgin Islands, British",
    "capital": "Road Town",
    "lat": 18.4167,
    "lng": -64.6167
  },
  {
    "country": "American Samoa",
    "capital": "Pago Pago",
    "lat": -14.274,
    "lng": -170.7046
  },
  {
    "country": "Tuvalu",
    "capital": "Funafuti",
    "lat": -8.5167,
    "lng": 179.2
  },
  {
    "country": "Micronesia, Federated States of",
    "capital": "Palikir",
    "lat": 6.9172,
    "lng": 158.1589
  },
  {
    "country": "Eswatini",
    "capital": "Lobamba",
    "lat": -26.4667,
    "lng": 31.2
  },
  {
    "country": "Saint Martin",
    "capital": "Marigot",
    "lat": 18.0706,
    "lng": -63.0847
  },
  {
    "country": "Liechtenstein",
    "capital": "Vaduz",
    "lat": 47.1406,
    "lng": 9.5222
  },
  {
    "country": "Saint Pierre and Miquelon",
    "capital": "Saint-Pierre",
    "lat": 46.7817,
    "lng": -56.1736
  },
  {
    "country": "San Marino",
    "capital": "San Marino",
    "lat": 43.9346,
    "lng": 12.4473
  },
  {
    "country": "Cook Islands",
    "capital": "Avarua",
    "lat": -21.207,
    "lng": -159.771
  },
  {
    "country": "Belize",
    "capital": "Belmopan",
    "lat": 17.2522,
    "lng": -88.7639
  },
  {
    "country": "Turks and Caicos Islands",
    "capital": "Grand Turk",
    "lat": 21.459,
    "lng": -71.139
  },
  {
    "country": "Anguilla",
    "capital": "The Valley",
    "lat": 18.2208,
    "lng": -63.0517
  },
  {
    "country": "Morocco",
    "capital": "Tifariti",
    "lat": 26.158,
    "lng": -10.567
  },
  {
    "country": "Northern Mariana Islands",
    "capital": "Capitol Hill",
    "lat": 15.2137,
    "lng": 145.7546
  },
  {
    "country": "Saint Barthelemy",
    "capital": "Gustavia",
    "lat": 17.8979,
    "lng": -62.8506
  },
  {
    "country": "Falkland Islands (Islas Malvinas)",
    "capital": "Stanley",
    "lat": -51.7,
    "lng": -57.85
  },
  {
    "country": "Sint Maarten",
    "capital": "Philipsburg",
    "lat": 18.0237,
    "lng": -63.0458
  },
  {
    "country": "Svalbard",
    "capital": "Longyearbyen",
    "lat": 78.2167,
    "lng": 15.6333
  },
  {
    "country": "Christmas Island",
    "capital": "Flying Fish Cove",
    "lat": -10.4261,
    "lng": 105.6728
  },
  {
    "country": "Guam",
    "capital": "Hagåtña",
    "lat": 13.4745,
    "lng": 144.7504
  },
  {
    "country": "Wallis and Futuna",
    "capital": "Mata-Utu",
    "lat": -13.2825,
    "lng": -176.1736
  },
  {
    "country": "Bermuda",
    "capital": "Hamilton",
    "lat": 32.2942,
    "lng": -64.7819
  },
  {
    "country": "Vatican City",
    "capital": "Vatican City",
    "lat": 41.904,
    "lng": 12.453
  },
  {
    "country": "Nauru",
    "capital": "Yaren",
    "lat": -0.5456,
    "lng": 166.925
  },
  {
    "country": "Saint Helena, Ascension, and Tristan da Cunha",
    "capital": "Jamestown",
    "lat": -15.9251,
    "lng": -5.7179
  },
  {
    "country": "Niue",
    "capital": "Alofi",
    "lat": -19.056,
    "lng": -169.921
  },
  {
    "country": "Montserrat",
    "capital": "Brades",
    "lat": 16.7928,
    "lng": -62.2106
  },
  {
    "country": "Norfolk Island",
    "capital": "Kingston",
    "lat": -29.0606,
    "lng": 167.9619
  },
  {
    "country": "Guadeloupe",
    "capital": "Basse-Terre",
    "lat": 16.0104,
    "lng": -61.7055
  },
  {
    "country": "Palau",
    "capital": "Ngerulmud",
    "lat": 7.5006,
    "lng": 134.6242
  },
  {
    "country": "Pitcairn Islands",
    "capital": "Adamstown",
    "lat": -25.0667,
    "lng": -130.0833
  },
  {
    "country": "South Georgia And South Sandwich Islands",
    "capital": "King Edward Point",
    "lat": -54.2833,
    "lng": -36.5
  },
  {
    "country": "Montserrat",
    "capital": "Plymouth",
    "lat": 16.7064,
    "lng": -62.2158
  },
  {
    "country": "U.S. Virgin Islands",
    "capital": "Charlotte Amalie",
    "lat": 18.342,
    "lng": -64.9331
  }
];

// ---- Game logic ----

let map, miniMapControl, target;
let score=0, lives=5, remaining=60, timerId=null, gameActive=false;
const timeEl = ()=>document.getElementById('time');
const scoreEl = ()=>document.getElementById('score');
const livesEl = ()=>document.getElementById('lives');
const countryNameEl = ()=>document.getElementById('countryName');
const capitalNameEl = ()=>document.getElementById('capitalName');
const flagEl = ()=>document.getElementById('flagEmoji');
const logEl = ()=>document.getElementById('log');
const roundResultEl = ()=>document.getElementById('roundResult');

// small flag lookup for common names
const FLAG_MAP = {
  "Turkey":"🇹🇷","United States":"🇺🇸","United Kingdom":"🇬🇧","France":"🇫🇷","Germany":"🇩🇪","Italy":"🇮🇹",
  "Spain":"🇪🇸","Russia":"🇷🇺","China":"🇨🇳","Japan":"🇯🇵","Korea, South":"🇰🇷","Mexico":"🇲🇽","Brazil":"🇧🇷",
  "Canada":"🇨🇦","Australia":"🇦🇺","India":"🇮🇳","Egypt":"🇪🇬","Nigeria":"🇳🇬","South Africa":"🇿🇦","Argentina":"🇦🇷",
  "Netherlands":"🇳🇱","Sweden":"🇸🇪","Norway":"🇳🇴","Denmark":"🇩🇰","Poland":"🇵🇱","Greece":"🇬🇷","Portugal":"🇵🇹",
  "Belgium":"🇧🇪","Switzerland":"🇨🇭","Austria":"🇦🇹","Ireland":"🇮🇪","Israel":"🇮🇱","Saudi Arabia":"🇸🇦","United Arab Emirates":"🇦🇪",
  "Iran":"🇮🇷","Iraq":"🇮🇶","Syria":"🇸🇾","Lebanon":"🇱🇧","Ukraine":"🇺🇦","Kazakhstan":"🇰🇿","Vietnam":"🇻🇳",
  "Thailand":"🇹🇭","Philippines":"🇵🇭","Indonesia":"🇮🇩","Malaysia":"🇲🇾","Singapore":"🇸🇬","New Zealand":"🇳🇿"
};

// Create SVG marker icons (data URIs)
const blueSVG = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34"><circle cx="17" cy="12" r="9" fill="#1a73e8"/><rect x="15" y="21" width="4" height="12" rx="2" fill="#1a73e8"/></svg>');
const redSVG = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34"><circle cx="17" cy="12" r="9" fill="#ff4b4b"/><rect x="15" y="21" width="4" height="12" rx="2" fill="#ff4b4b"/></svg>');
const blueIcon = L.icon({ iconUrl: 'data:image/svg+xml;utf8,'+blueSVG, iconSize:[34,34], className:'pulse' });
const redIcon = L.icon({ iconUrl: 'data:image/svg+xml;utf8,'+redSVG, iconSize:[34,34], className:'pulse' });

function haversine(lat1,lon1,lat2,lon2){
  const toRad = a => a*Math.PI/180;
  const R = 6371;
  const dLat = toRad(lat2-lat1);
  const dLon = toRad(lon2-lon1);
  const a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)*Math.sin(dLon/2);
  const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function initMap(){
  const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom:19, attribution:'Esri' });
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19, attribution:'OpenStreetMap' });
  map = L.map('map', { layers:[esriSat], zoomControl:true }).setView([20,0],2);
  const baseMaps = { 'Satellite': esriSat, 'Map': osm };
  L.control.layers(baseMaps,null,{collapsed:true, position:'topleft'}).addTo(map);
  const miniLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19});
  miniMapControl = new L.Control.MiniMap(miniLayer, { toggleDisplay: true, minimized:false, position:'bottomright' }).addTo(map);

  // clicking map places guess
  map.on('click', function(e){
    if(!gameActive) return;
    try{
      const {lat,lng} = e.latlng;
      if(window._guess) map.removeLayer(window._guess);
      if(window._actual) map.removeLayer(window._actual);
      if(window._line) map.removeLayer(window._line);

      window._guess = L.marker([lat,lng], {icon: blueIcon}).addTo(map);
      window._actual = L.marker([target.lat,target.lng], {icon: redIcon}).addTo(map);

      // ripple effect (creative) placed in map container
      const p = map.latLngToContainerPoint([target.lat,target.lng]);
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = (p.x) + 'px';
      ripple.style.top = (p.y) + 'px';
      document.getElementById('map').appendChild(ripple);
      setTimeout(()=>ripple.remove(),900);

      window._line = L.polyline([[lat,lng],[target.lat,target.lng]], {color:'#fff', weight:1.2, opacity:0.6}).addTo(map);

      const dist = haversine(lat,lng,target.lat,target.lng);
      let pts=0;
      if(dist<=50) pts=100;
      else if(dist<=200) pts=50;
      else if(dist<=500) pts=20;
      else pts=0;

      if(pts>0){
        score+=pts; scoreEl().textContent = score;
        roundResultEl().textContent = `Correct! Distance: ${dist.toFixed(1)} km — +${pts} pts`;
        const li=document.createElement('li'); li.textContent = `${target.capital}, ${target.country}: ${dist.toFixed(1)} km — +${pts}`; logEl().prepend(li);
      } else {
        lives-=1; livesEl().textContent = lives;
        roundResultEl().textContent = `Too far: ${dist.toFixed(1)} km — 0 pts. Life -1`;
        const li=document.createElement('li'); li.textContent = `${target.capital}, ${target.country}: ${dist.toFixed(1)} km — wrong`; logEl().prepend(li);
        if(lives<=0){ endGame('All lives lost.'); return; }
      }

      map.flyTo([target.lat,target.lng],6,{duration:1.2});
      setTimeout(()=>{ pickTarget(); map.setView([20,0],2); },1000);

    }catch(err){
      console.error(err);
    }
  });

}

function pickTarget(){
  const idx = Math.floor(Math.random()*CAPITALS.length);
  target = CAPITALS[idx];
  countryNameEl().textContent = target.country;
  capitalNameEl().textContent = target.capital;
  const f = FLAG_MAP[target.country] || '🌐';
  flagEl().textContent = f;
}

function startGame(){
  score=0; lives=5; remaining=60; gameActive=true;
  scoreEl().textContent = score;
  livesEl().textContent = lives;
  timeEl().textContent = remaining;
  document.getElementById('startBtn').textContent = 'Cancel';
  document.getElementById('log').innerHTML = '';
  timerId = setInterval(()=>{ remaining--; timeEl().textContent = remaining; if(remaining<=0) endGame('Time is up.'); },1000);
}

function cancelGame(){
  clearInterval(timerId); gameActive=false; document.getElementById('startBtn').textContent='Start'; roundResultEl().textContent='Game cancelled.';
}

function endGame(msg){
  gameActive=false; clearInterval(timerId); roundResultEl().textContent = msg + ' Score: '+score;
  document.getElementById('startBtn').textContent='Restart';
}

// UI wiring
window.addEventListener('load', ()=>{
  document.getElementById('beginBtn').addEventListener('click', ()=>{
    document.getElementById('intro').style.transition='opacity 600ms';
    document.getElementById('intro').style.opacity='0';
    setTimeout(()=>document.getElementById('intro').remove(),650);
    initMap();
    pickTarget();
  });

  document.getElementById('startBtn').addEventListener('click', ()=>{ if(gameActive) cancelGame(); else startGame(); });
  document.getElementById('skipBtn').addEventListener('click', ()=>{ if(!gameActive) return; pickTarget(); roundResultEl().textContent='New target selected.'; });
  document.getElementById('themeSel').addEventListener('change',(e)=>{ applyTheme(e.target.value); });

  applyTheme('dark');
});

function applyTheme(t){
  document.body.classList.remove('theme-neon','theme-pastel','theme-retro');
  if(t==='neon') document.body.classList.add('theme-neon');
  if(t==='pastel') document.body.classList.add('theme-pastel');
  if(t==='retro') document.body.classList.add('theme-retro');
}
