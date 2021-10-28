const countries = [
  {
    id: 1,
    name: "Afghanistan",
    iso3: "AFG",
    phone_code: "93",
    capital: "Kabul",
    currency: "AFN",
  },
  {
    id: 2,
    name: "Aland Islands",
    iso3: "ALA",
    phone_code: "+358-18",
    capital: "Mariehamn",
    currency: "EUR",
  },
  {
    id: 3,
    name: "Albania",
    iso3: "ALB",
    phone_code: "355",
    capital: "Tirana",
    currency: "ALL",
  },
  {
    id: 4,
    name: "Algeria",
    iso3: "DZA",
    phone_code: "213",
    capital: "Algiers",
    currency: "DZD",
  },
  {
    id: 5,
    name: "American Samoa",
    iso3: "ASM",
    phone_code: "+1-684",
    capital: "Pago Pago",
    currency: "USD",
  },
  {
    id: 6,
    name: "Andorra",
    iso3: "AND",
    phone_code: "376",
    capital: "Andorra la Vella",
    currency: "EUR",
  },
  {
    id: 7,
    name: "Angola",
    iso3: "AGO",
    phone_code: "244",
    capital: "Luanda",
    currency: "AOA",
  },
  {
    id: 8,
    name: "Anguilla",
    iso3: "AIA",
    phone_code: "+1-264",
    capital: "The Valley",
    currency: "AOA",
  },
  {
    id: 9,
    name: "Antarctica",
    iso3: "ATA",
    phone_code: "672",
    capital: "",
    currency: "AAD",
  },
  {
    id: 10,
    name: "Antigua And Barbuda",
    iso3: "ATG",
    phone_code: "+1-268",
    capital: "St. John's",
    currency: "XCD",
  },
  {
    id: 11,
    name: "Argentina",
    iso3: "ARG",
    phone_code: "54",
    capital: "Buenos Aires",
    currency: "ARS",
  },
  {
    id: 12,
    name: "Armenia",
    iso3: "ARM",
    phone_code: "374",
    capital: "Yerevan",
    currency: "AMD",
  },
  {
    id: 13,
    name: "Aruba",
    iso3: "ABW",
    phone_code: "297",
    capital: "Oranjestad",
    currency: "AWG",
  },
  {
    id: 14,
    name: "Australia",
    iso3: "AUS",
    phone_code: "61",
    capital: "Canberra",
    currency: "AUD",
  },
  {
    id: 15,
    name: "Austria",
    iso3: "AUT",
    phone_code: "43",
    capital: "Vienna",
    currency: "EUR",
  },
  {
    id: 16,
    name: "Azerbaijan",
    iso3: "AZE",
    phone_code: "994",
    capital: "Baku",
    currency: "AZN",
  },
  {
    id: 17,
    name: "Bahamas The",
    iso3: "BHS",
    phone_code: "+1-242",
    capital: "Nassau",
    currency: "BSD",
  },
  {
    id: 18,
    name: "Bahrain",
    iso3: "BHR",
    phone_code: "973",
    capital: "Manama",
    currency: "BHD",
  },
  {
    id: 19,
    name: "Bangladesh",
    iso3: "BGD",
    phone_code: "880",
    capital: "Dhaka",
    currency: "BDT",
  },
  {
    id: 20,
    name: "Barbados",
    iso3: "BRB",
    phone_code: "+1-246",
    capital: "Bridgetown",
    currency: "BBD",
  },
];

const headers = [
  { label: "Id", accessor: "id" },
  { label: "Name", accessor: "name" },
  { label: "Iso", accessor: "iso3" },
  { label: "Phone-code", accessor: "phone_code" },
  { label: "Capital", accessor: "capital" },
  { label: "Currency", accessor: "currency" },
];

let wrapper = document.querySelector("#wrapper");
let table = document.createElement("table");
let headerRow = document.createElement("tr");
headerRow.classList.add("header-row");

const createHeaderTable = (headerRow, headers) => {
  headers.forEach((header) => {
    let headerColumn = document.createElement("th");
    headerColumn.classList.add("header-column");
    let textNode = document.createTextNode(header.label);
    headerColumn.appendChild(textNode);
    headerRow.appendChild(headerColumn);
  });
};

const createBodyTable = (table, countries) => {
  countries.forEach((country) => {
    let tableRow = document.createElement("tr");
    tableRow.classList.add("table-row");

    for (let item in country) {
      let tableColumn = document.createElement("td");
      tableColumn.classList.add("table-column");

      let textNode = document.createTextNode(country[item]);

      tableColumn.appendChild(textNode);
      tableRow.appendChild(tableColumn);
    }

    table.appendChild(tableRow);
  });
};

const createTable = (wrapper, headerRow, headers, table, countries) => {
  createHeader(headerRow, headers);
  table.appendChild(headerRow);
  createBodyTable(table, countries);

  wrapper.appendChild(table);
};

createTable(wrapper, headerRow, headers, table, countries);

