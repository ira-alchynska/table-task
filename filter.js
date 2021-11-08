import { createDataRows } from "./table.js";
import { countries, columns } from "./data.js";

function createFilterRow() {
  const filterRow = document.createElement("div");
  filterRow.classList.add("filter-row");
  const labelName = document.createElement("label");
  labelName.classList.add("filter-label");
  labelName.innerHTML = "Country name";
  const filterInput = document.createElement("input");
  filterInput.type = "text";
  filterInput.placeholder = "Enter country name";
  filterInput.classList.add("filter-input");
  labelName.append(filterInput);
  filterRow.append(labelName);
  return filterRow;
}

function filterTableByName(event, columns) {
  const tableRow = document.querySelector(".tbody");
  tableRow.innerHTML = "";
  const name = columns.find((c) => c.accessor === "name");
  if (!name) {
    return;
  }
  const filteredItems = countries.filter((country) =>
    country.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
  const filter = createDataRows(columns, filteredItems);
  tableRow.append(...filter);
}

function addListenersFilter() {
  const input = document.querySelector(".filter-input");
  input.addEventListener("input", (event) => {
    filterTableByName(event, columns);
  });
}

export { createFilterRow, filterTableByName, addListenersFilter };
