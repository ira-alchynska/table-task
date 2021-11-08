import { countries, columns } from "./data.js";
import { createTable } from "./table.js";
import { refs } from "./table.js";

// function addListenersHideColumns() {
//   const headerColumnsToHide = document.querySelectorAll(".header-column");
//   headerColumnsToHide.forEach((th) => {
//     th.addEventListener("click", (event) => {
//       if (event.target.closest("button.btn-more")) {
//         const accessor = event.currentTarget.dataset.accessor;
//         hideColumns(accessor);
//       }
//     });
//   });
// }

function hideColumns(accessor) {
  refs.wrapper = document.getElementById("wrapper");
  const index = columns.findIndex((col) => col.accessor === accessor);
  const column = columns.find((col) => col.accessor === accessor);
  column.hidden = true;

  //columns.splice(index, 1, column);

  // wrapper.innerHTML = "";
  //createTable(columns, countries);

  const trs = document.querySelectorAll(".table-row");

  trs.forEach((tr) => {
    tr.querySelectorAll(".table-column").forEach((tc, ind) => {
      if (ind === index) tc.classList.add("hidden");
    });
  });
}

// function addListenersHideColumns() {
//   const headerColumnsToHide = document.querySelectorAll(".header-column");
//   headerColumnsToHide.forEach((th) => {
//     th.addEventListener("click", (event) => {
//       if (event.target.closest("button.btn-more")) {
//       const accessor = event.currentTarget.dataset.accessor;
//       hideColumns(accessor)
//       }
//     });
//   });
// }

// function hideColumns(accessor) {
//   const index = columns.findIndex((col) => col.accessor === accessor);
//   const column = columns.find((col) => col.accessor === accessor);
//   columns[index].hidden = true;

//   columns.forEach((column) => {
//     if (column.accessor === accessor) {
//       column.hidden = true;
//     }
//   });

//   refs.wrapper.innerHTML = "";
//   createTable(columns, countries);
// }
export default hideColumns;
