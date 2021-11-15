import { listenerFormData } from "./table.js";

export function createContentModal(
  rowData = {
    id: "",
    name: "",
    iso3: "",
    phone_code: "",
    capital: "",
    currency: "",
  }
) {
  const content = `

     <form class="modal-form">   
<label class="label-form" htmlFor="id">ID</label>
          <input type="text" name="id" placeholder="Edit id" value="${rowData.id}" class="input-form"/>
          
    <label class="label-form" htmlFor="name" >NAME</label>
    <input
      type="text"
      name="name"
      placeholder="country name"
      class="input-form"
      value="${rowData.name}"
    />
    
    <label class="label-form" htmlFor="iso">ISO</label>
    <input type="text" name="iso3" placeholder="Edit iso" value="${rowData.iso3}"  class="input-form"/>
    
    <label class="label-form" htmlFor="capital">CAPITAL</label>
    <input
      type="text"
      name="capital"
      placeholder="Edit capital"
      class="input-form"
      value="${rowData.capital}"
    />
    
    <label class="label-form" htmlFor="currency">CURRENCY</label>
    <input
      type="text"
      name="currency"
      placeholder="Edit currency"
      class="input-form"
      value="${rowData.currency}"
    />
    
    <label class="label-form" htmlFor="phone_code">PHONE_CODE</label>
    <input
      type="text"
      name="phone_code"
      placeholder="Edit phone_code"
      class="input-form"
      value="${rowData.phone_code}"
    />

    <button type="submit" class="btnEditRow">Edit</button>
          </div>
</form>  
`;

  document.querySelector(".modal-content").innerHTML = content;
  listenerFormData();
}
