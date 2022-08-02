const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");
const thumbnail = document.querySelectorAll("[data-tab-thumbnail]")
const btnMinus = document.querySelector('.decrement')
let quantityValue = document.querySelector('.quantity-value');
const closeBtn = document.querySelector('.close')
const modalBox = document.querySelector('#modal-box')
tabs.forEach((tab) => {
    tab.addEventListener('click', ()=>{
        const target = document.querySelector(tab.dataset.tabTarget);
        // loop through all tab content
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('active')
        })
         tabs.forEach((tab) => {
           tab.classList.remove("active");
         });         
        tab.classList.add("active")
        target.classList.add("active")
    })
});

closeBtn.addEventListener("click", () => {
  modalBox.style.display = "none";
});

tabContents.forEach(tab =>{
  tab.addEventListener("click", () =>{
    modalBox.style.display = 'block'
  })
})


// quantity add / reduce function
const increaseValue = document.querySelector('.increment')
const decreaseValue = document.querySelector('.decrement')
let qty = 0;
let qtyValue = document.querySelector('.quantity-value')
increaseValue.addEventListener('click', ()=>{
  qty += 1
  qtyValue.innerHTML = qty
})
decreaseValue.addEventListener('click', ()=>{
  if(qty <= 1)
  return
  qty -= 1
  qtyValue.innerHTML = qty
})
