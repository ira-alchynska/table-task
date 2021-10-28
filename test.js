let table = document.createElement('table');
const createTable = () => {
  let wrapper = document.querySelector('#wrapper');

  createHeaderTable();
  createBodyTable();
  wrapper.appendChild(table);
};
createTable();

function createHeaderTable() {
  let headerRow = document.createElement('tr');
  headerRow.classList.add('header-row');
  headers.forEach(header => {
    let headerColumn = document.createElement('th');
    headerColumn.classList.add('header-column');

    let textNode = document.createTextNode(header.label);
    headerColumn.appendChild(textNode);
    headerRow.appendChild(headerColumn);
  });
  table.appendChild(headerRow);
}

window.onload = () => {
  createBodyTable(countries);
};

function createBodyTable(countries) {
    countries.forEach(country => {
      let tableRow = document.createElement('tr');
      tableRow.classList.add('table-row');
    //   Object.values(country).forEach(text => {
    //     let tableColumn = document.createElement('td');
    //     tableColumn.classList.add('table-column');
    //     let textNode = document.createTextNode(text);
    for ( country in countries) {
            let tableColumn = document.createElement('td');
        
            tableColumn.insertAdjacentHTML = countries[country];
            tableColumn.classList.add('table-column');

        tableColumn.appendChild(textNode);
        tableRow.appendChild(tableColumn);
        table.appendChild(tableRow);
  };
  });
}
//   let headerRow = document.querySelectorAll('header-row');
//   let tableRow = document.createElement('tr');
//   for (let country in countries) {
//     let tableColumn = document.createElement('td');

//     tableColumn.insertAdjacentHTML = countries[country];
//     tableColumn.classList.add('table-column');

//     tableRow.appendChild(tableColumn);
//     headerRow.appendChild(tableColumn);
