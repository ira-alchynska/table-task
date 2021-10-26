const checkboxes = document.querySelectorAll("input[type = 'checkbox']");
console.log(checkboxes);

const checkedAll = (myCheckbox) => {
    if(myCheckbox.checked === true){
        checkboxes.forEach((checkbox) =>{
            checkbox.checked = true;
        })
    } else {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        })
    }
}