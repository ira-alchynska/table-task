import { columns } from "./data.js";
import { createCheckbox, addListenerCheckbox } from "./checkbox.js";
import { makeSort } from "./sort.js";
import { createFilterRow, addListenersFilter } from "./filter.js";

import { createButton } from "./button.js";
import {
  createDropDownList,
  openDropDown,
  closeDropDown,
} from "./create-dropdown.js";
import hideColumns from "./hide-columns.js";
import { showColumns } from "./show-columns.js";
import { fetchCountries, patchRequest } from "./fetch-countries.js";

import { createModal } from "./modal.js";
import { createContentModal } from "./createContentModal.js";

export const refs = {
  wrapper: document.querySelector("#wrapper"),
};

export let countries = [];
let limit = 5;
let page = 1;

fetchCountries()
  .then((data) => {
    countries = data;
    page += 1;
    createTable(columns, countries);
  })
  .catch((error) => console.error(error));

function createTableHeader(columns) {
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

//the function that creates body of table
export function createTableRows(columns, countries) {
  // row in body table
  const rows = countries.map((country) => {
    const row = document.createElement("div");
    row.classList.add("table-row");
    row.setAttribute("data-id", country.id);
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
  const headerRow = createTableHeader(columns);

  const filterInput = createFilterRow();

  const rows = createTableRows(columns, countries);

  refs.wrapper.append(table);
  table.append(thead);
  table.append(tbody);
  thead.append(headerRow, filterInput);

  tbody.append(...rows);

  //listeners
  createModal();

  addListenersSort();
  addListenerCheckbox();
  addListenersFilter();
  addListenerHideColumns();
  addListenerShowColumns();
  addListenerOpenDropDown();
  addListenerMakeAscSort();
  addListenerMakeDescSort();
  createDropDownList();
  addListenerOnOpenModal();
  addListenerOnCloseModal();
  //addEventListenerOnOverlayClose();
}

// add event listeners

document.body.addEventListener("click", (e) => {
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
function addListenerMakeAscSort() {
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
function addListenerMakeDescSort() {
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
function addListenerHideColumns() {
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
function addListenerShowColumns() {
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
function addListenerOpenDropDown() {
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

function onOpenModal() {
  const modalRef = document.querySelector(".modal");
  modalRef.classList.remove("modal-close");
}

function onCloseModal() {
  const modalRef = document.querySelector(".modal");
  modalRef.classList.add("modal-close");
}

function addListenerOnOpenModal() {
  const tbody = document.querySelector(".tbody");
  tbody.addEventListener("click", (e) => {
    let target = e.target;
    let closest = target.closest(".table-row");

    if (closest) {
      let id = closest.dataset.id * 1;
      let data = countries.find((i) => i.id === id);
      createContentModal(data);
      onOpenModal();
    }
  });
}

function addListenerOnCloseModal() {
  const closeModal = document.querySelector(".btnCloseModal");
  closeModal.addEventListener("click", (e) => onCloseModal());
}

export function addListenerFormData() {
  const formRef = document.querySelector(".modal-form");
  formRef.addEventListener("submit", (e) => {
    e.preventDefault();
    const formRef = e.target;
    const formData = new FormData(formRef);
    const submittedData = {};
    formData.forEach((value, key) => {
      submittedData[key] = value;
    });
    patchRequest(submittedData).then(() => {
      fetchCountries(limit, page).then((data) => {
        countries = data;
        const tableBody = document.querySelector(".tbody");
        tableBody.innerHTML = "";
        const rows = createTableRows(columns, countries);
        tableBody.append(...rows);
      });
    });
  });
}

function createLoadMoreBtn() {
  const primaryBtn = `<button type='button' class="btn-primary" 
  data-action="load-more">Load more...</button>`;
  refs.wrapper.insertAdjacentHTML("afterend", primaryBtn);
}
createLoadMoreBtn();

const loadMoreBtn = document.querySelector('[data-action="load-more"]');
loadMoreBtn.addEventListener("click", () => {
  fetchCountries(limit, page).then((data) => {
    countries = data;
    page += 1;
    console.log(countries);
    const tableBody = document.querySelector(".tbody");
    const rows = createTableRows(columns, countries);
    tableBody.append(...rows);
  });
});
