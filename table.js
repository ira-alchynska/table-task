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

const columns = [
  { label: "Id", accessor: "id", order: null, checked: false },
  { label: "Name", accessor: "name", order: null, checked: false },
  { label: "Iso", accessor: "iso3", order: null, checked: false },
  { label: "Capital", accessor: "capital", order: null, checked: false },
  { label: "Currency", accessor: "currency", order: null, checked: false },

  { label: "Phone-code", accessor: "phone_code", order: null, checked: false },
];

const refs = {
  wrapper: document.querySelector("#wrapper"),
  headerRow: document.querySelector("header-row"),
};
//function which is creating the header of table
function createHeaders(columns) {
  //row of headers
  const headersRow = document.createElement("tr");
  headersRow.classList.add("header-row");

  const headerCells = columns.map((el) => {
    const headerCell = document.createElement("th");
    headerCell.classList.add("header-column");
    // add content

    headerCell.textContent = el.label;
//button add

    const arrow = 'fas fa-arrow-up';
    const more = 'fas fa-ellipsis-v';
    const iconArrow = createButton(arrow);
    const iconMore = createButton(more);
    headerCell.append(iconArrow, iconMore);
    return headerCell;
  });
  //add all cells to header

  headersRow.append(...headerCells);

  return headersRow;
}
//the function that creates body of table it takes array of columns and countries
function createCells(columns, countries) {
  // row in body table
  const rows = countries.map((country) => {
    const row = document.createElement("tr");
    row.classList.add("table-row");

    //created cells in the body table
    const cells = columns.map((column) => {
      const cell = document.createElement("td");
      cell.classList.add("table-column");
      // content of table
      //header accessor -the name of the key in the object
      cell.textContent = country[column.accessor];

      return cell;
    });

    row.append(...cells);
    return row;
  });

  return rows;
}
// main function for the table
function createTable(columns, countries) {
  const table = document.createElement("table");
  table.classList.add("table");
  const thead = document.createElement("thead");

  const tbody = document.createElement("tbody");

  const tColumns = createHeaders(columns);
  const rows = createCells(columns, countries);

  refs.wrapper.append(table);
  table.append(thead);
  table.append(tbody);
  thead.append(tColumns);
  tbody.append(...rows);
  console.log(refs.wrapper);
}

createTable(columns, countries);

function createButton(fontAwesomeIcon) {
  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("button-wrapper");
  const button = document.createElement("button");
  button.classList.add("button");
  const icon = document.createElement("i");
  const iconarr = fontAwesomeIcon.split(" ");
  iconarr.map((cl) => {
    icon.classList.add(cl);
  });
  button.appendChild(icon);
  buttonWrapper.appendChild(button);
  return button;
}

// function createCheckboxes() {

//   let input = document.createElement("input");
//   input.classList.add("checkbox");
//   input.type = "checkbox";
//   refs.headerRow.append(input)
// }
