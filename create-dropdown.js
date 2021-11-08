import { columns } from "./data.js";

export function createDropDownList() {
  const buttonsMore = document.querySelectorAll(".btn-more");
  buttonsMore.forEach((button) => {
    const select = `
    <ul class='select hidden'>
          <li class="list asc"><button class= "button-list btn-asc">Sort by ASC</button></li>
          <li class="list desc"><button class="button-list btn-desc">Sort by DESC</button></li>
          <li class="list hide-column"><button class="button-list btn-hide">HIDE</button></li>
          <li class="list desc"><button class="button-list btn-show">SHOW ALL</button></li>
    </ul>`;

    return (button.innerHTML += select);
  });
}

export function openDropDown(target, accessor) {
  const toggleMenu = target.querySelector(".select");
  if (toggleMenu) {
    const column = columns.find((col) => col.accessor === accessor);
    column.toggle = false;
    toggleMenu.classList.remove("hidden");
  }
}

export function closeDropDown() {
  const toggleMenu = document.querySelectorAll(".select");
  columns.forEach((col) => (col.toggle = true));
  toggleMenu.forEach((ul) => ul.classList.add("hidden"));
}
