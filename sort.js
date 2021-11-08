import { countries, columns } from "./data.js";
import { createDataRows } from "./table.js";

function bubbleSort(countries, accessor, sortingType, order = "asc") {
  const newArr = [...countries];

  for (let i = 0; i < newArr.length - 1; i++) {
    for (let j = 0; j < newArr.length - 1 - i; j++) {
      if (sortingType === "number") {
        if (newArr[j][accessor] > newArr[j + 1][accessor]) {
          [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
        }
      } else if (sortingType === "string") {
        if (newArr[j][accessor].localeCompare(newArr[j + 1][accessor]) > 0) {
          [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
        }
      }
    }
  }

  if (order === "desc") {
    const ascSort = [...newArr].reverse();
    console.log(ascSort);
    return ascSort;
  }
  return newArr;
}

function makeSort(accessor, sortingType) {
  let order = columns.find((c) => c.accessor === accessor).order;

  const sortedData = bubbleSort(countries, accessor, sortingType, order);
  const newOrder = order === "asc" ? "desc" : "asc";

  columns.forEach((column) => {
    if (column.accessor === accessor) {
      column.order = newOrder;
    } else {
      column.order = "asc";
    }
  });
  const tableBody = document.querySelector(".tbody");
  tableBody.innerHTML = "";
  const rows = createDataRows(columns, sortedData);
  tableBody.append(...rows);
}

// function addListenersSort(order) {
//   const headerColumn = document.querySelectorAll(".header-column");
//   headerColumn.forEach((th) => {
//     th.addEventListener("click", (event) => {
//       const accessor = event.currentTarget.dataset.accessor;
//       const sortingType = event.currentTarget.dataset.sorting;

//       if (event.target.closest("button.btn-arrow")) {
//         makeSort(accessor, sortingType, order);
//       }
//     });
//   });
// }

export { makeSort };
