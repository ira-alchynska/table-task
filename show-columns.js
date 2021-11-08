import { columns } from "./data.js";

export function showColumns(accessor) {
  const index = columns.findIndex((col) => col.accessor === accessor);
  const column = columns.find((col) => col.accessor === accessor);
  column.hidden = false;

  const trs = document.querySelectorAll(".table-row");

  trs.forEach((tr) => {
    tr.querySelectorAll(".table-column").forEach((tc, ind) => {
      if (ind === index) tc.classList.remove("hidden");
    });
  });
}
