import { columns } from "./data.js";
import { createCheckbox, addListenerCheckbox } from "./checkbox.js";
import { makeSort } from "./sort.js";
import { createFilterRow, addListenersFilter } from "./filter.js";
//import addListenersHideColumns from "./hide-columns.js";
import { createButton } from "./button.js";
import {
  createDropDownList,
  openDropDown,
  closeDropDown,
} from "./create-dropdown.js";
import hideColumns from "./hide-columns.js";
import { showColumns } from "./show-columns.js";
import { fetchCountries } from "./fetch-countries.js";

export const refs = {
  wrapper: document.querySelector("#wrapper"),
};

let countries = [];
fetchCountries()
  .then((data) => {
    countries = data;
    createTable(columns, countries);
  })
  .catch((error) => console.error(error));

//function which is creating the header of table
function createHeaders(columns) {
  //row of header
  const headersRow = document.createElement("div");
  headersRow.classList.add("header-row");
  //checkbox for header
  const headerCheckbox = createCheckbox();
  headersRow.append(headerCheckbox);
  headerCheckbox.classList.add("selectAll");
  const headerCells = columns.map((column) => createHeaderCell(column));
  //add all cells to header
  headersRow.append(...headerCells);

  return headersRow;
}

export function createHeaderCell(column) {
  const headerBorder = document.createElement("div");
  headerBorder.classList.add("headerBorder");
  if (column.hidden) {
    headerBorder.classList.add("table-column-hidden");
  }
  const headerCell = document.createElement("div");
  headerCell.classList.add("header-column");

  headerCell.setAttribute("data-accessor", column.accessor);
  headerCell.setAttribute("data-sorting", column.sortingType);
  headerCell.setAttribute("data-hidden", column.hidden);
  headerCell.setAttribute("data-toggle", column.toggle);
  headerCell.textContent = column.label;
  headerBorder.append(headerCell);
  //button add

  const arrow = "fas fa-arrow-up";
  const more = "fas fa-ellipsis-v";
  const btnArrow = "btn-arrow";
  const btnMore = "btn-more";
  const iconArrow = createButton(arrow, btnArrow);

  const buttonMore = createButton(more, btnMore, column.accessor);

  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("button-wrapper");
  buttonWrapper.append(iconArrow, buttonMore);
  headerCell.append(buttonWrapper);

  return headerBorder;
}

//the function that creates body of table it takes array of columns and countries
export function createDataRows(columns, countries) {
  // row in body table
  const rows = countries.map((country) => {
    const row = document.createElement("div");
    row.classList.add("table-row");
    // create checkboxes for the bodyRows
    const bodyCheckbox = createCheckbox();
    row.append(bodyCheckbox);
    //created cells in the body table
    const cells = columns.map((column) => createTableCells(country, column));

    row.append(...cells);
    return row;
  });
  return rows;
}

function createTableCells(country, column) {
  const cell = document.createElement("div");
  cell.classList.add("table-column");
  if (column.hidden) {
    cell.classList.add("table-column-hidden");
  }

  cell.textContent = country[column.accessor];

  return cell;
}

// main function for the table
export function createTable(columns, countries) {
  const table = document.createElement("table");
  table.classList.add("table");
  const thead = document.createElement("div");

  const tbody = document.createElement("div");
  tbody.classList.add("tbody");
  const headerRow = createHeaders(columns);

  const filterInput = createFilterRow();

  const rows = createDataRows(columns, countries);

  refs.wrapper.append(table);
  table.append(thead);
  table.append(tbody);
  thead.append(headerRow, filterInput);

  tbody.append(...rows);

  //listeners
  addListenersSort();
  addListenerCheckbox();
  addListenersFilter();
  addEventListenerHideColumns();
  addEventListenerShowColumns();
  addEventListenerOpenDropDown();
  addEventListenerMakeAscSort();
  addEventListenerMakeDescSort();
  createDropDownList();
}

// add event listeners

document.body.addEventListener("click", (e) => {
  console.log(e);
  if (!e.target.matches(".btn-more")) closeDropDown();
});

// arrow sort
function addListenersSort(order) {
  const headerColumn = document.querySelectorAll(".header-column");
  headerColumn.forEach((th) => {
    th.addEventListener("click", (event) => {
      const accessor = event.currentTarget.dataset.accessor;
      const sortingType = event.currentTarget.dataset.sorting;

      if (event.target.closest("button.btn-arrow")) {
        makeSort(accessor, sortingType, order);
      }
    });
  });
}

//asc
function addEventListenerMakeAscSort() {
  const headerColumn = document.querySelectorAll(".header-column");
  headerColumn.forEach((th) => {
    th.addEventListener("click", (event) => {
      const accessor = event.currentTarget.dataset.accessor;
      const sortingType = event.currentTarget.dataset.sorting;
      if (event.target.closest("button .btn-asc")) {
        console.log("sort asc");
        makeSort(accessor, sortingType);
      }
    });
  });
}

//desc
function addEventListenerMakeDescSort() {
  const headerColumn = document.querySelectorAll(".header-column");
  headerColumn.forEach((th) => {
    th.addEventListener("click", (event) => {
      const accessor = event.currentTarget.dataset.accessor;
      const sortingType = event.currentTarget.dataset.sorting;
      if (event.target.closest("button .btn-desc")) {
        console.log("sort desc");
        makeSort(accessor, sortingType);
      }
    });
  });
}

//hide
function addEventListenerHideColumns() {
  const headerColumn = document.querySelectorAll(".header-column");
  headerColumn.forEach((th) => {
    th.addEventListener("click", (event) => {
      const accessor = event.currentTarget.dataset.accessor;
      if (event.target.closest(".btn-hide")) {
        console.log("hide");
        hideColumns(accessor);
      }
    });
  });
}

//show
function addEventListenerShowColumns() {
  const headerColumn = document.querySelectorAll(".header-column");
  headerColumn.forEach((th) => {
    th.addEventListener("click", (event) => {
      const accessor = event.currentTarget.dataset.accessor;
      if (event.target.closest(".btn-show")) {
        console.log("show");
        showColumns(accessor);
      }
    });
  });
}

//drop down
function addEventListenerOpenDropDown() {
  const headerColumn = document.querySelectorAll(".header-column");
  headerColumn.forEach((th) => {
    th.addEventListener("click", (event) => {
      const accessor = event.currentTarget.dataset.accessor;
      if (event.target.closest(".btn-more")) {
        openDropDown(event.target, accessor);
      }
    });
  });
}
