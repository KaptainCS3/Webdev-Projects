const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");
const thumbnail = document.querySelectorAll("[data-tab-thumbnail]")
const btnMinus = document.querySelector('.decrement')
let quantityValue = document.querySelector('.quantity-value');
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


const lightBox = document.createElement('div');
lightBox.id = 'lightbox';
document.body.appendChild(lightBox);

const preview = document.querySelectorAll('.preview-content');
preview.forEach(tab =>{
  tab.addEventListener('click', () =>{
    lightBox.classList.add('active')
  })
})