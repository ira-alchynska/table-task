const checkedAll = (myCheckbox) => {
  const checkboxes = document.querySelectorAll("input[type = 'checkbox']");
  const isChecked = myCheckbox.checked === true;
  console.log(isChecked);
  checkboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });
};
