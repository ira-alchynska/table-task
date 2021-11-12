export function createModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal", "modal-close");

  const modalForm = `<div class="modal-overlay" data-close = "true">
         <div class="modal-window">
           <div class="modal-header">
             <span class="modal-title">Update Country Data</span>
             <span class="btnCloseModal" data-close = "true">&times;</span>
           </div>
           <div class="modal-content"></div>
         </div>
       </div> `;

  modal.insertAdjacentHTML("afterbegin", modalForm);

  document.body.append(modal);
}
