
//declaring a new array for the products selected by user
let bought = JSON.parse(localStorage.getItem(`bought`)) || [];
// declaring a variable to display the array
let mainContent = document.querySelector('main')
//reloading items array to display
let products = JSON.parse(localStorage.getItem('products')) || [];

//check if array was fetched
if(!products || !Array.isArray(products)){
    console.error(`Error loading`);

}else{
    displayProducts(products);

    function add(index){
        let quantityInput = document.querySelector(`#quantity-${index}`);
        let quantity = parseInt(quantityInput.value);

        if(isNaN(quantity) || quantity <= 0){
            alert(`Enter valid quantity`);
            return;
        }

        let selectedProduct = {
            ...products[index],
            amount: quantity,
        };

        bought.push(selectedProduct)
        localStorage.setItem('bought',JSON.stringify(bought))
    }
    mainContent.addEventListener('click',function (){
        if (event.target.hasAttribute('data-add')){
            add(event.target.getAttribute(`data-index`));
        }
    });
}
//displaying the items array
function displayProducts(productArray){
    if (products.length === 0) {
        // Display spinner when array is empty
        mainContent.innerHTML = `
            <div id="spinner" class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `;
    } else {
        // Hide spinner and display content when array is not empty
        mainContent.innerHTML = productArray.map(function displayArray(item, index) {
            return `
                <div class='card col-4'>
                    <img src='${item.prodImage}'>
                    <div class='container'>
                        <h2>${item.name}</h2>
                        <p>${item.description}</p>
                        <p>R${item.price}</p>
                    </div>
                    <button data-index='${index}' data-add>Add To Cart</button>
                    <br>
                    <input id='quantity-${index}' class='quantity' placeholder='Enter Quantity' data-quan>
                    <br>
                </div>
            `;
        }).join('');
    }
}


 //search button
let searchBtn = document.querySelector('#searchBtn')
//search bar value
let searchWord = document.querySelector('#find')
//search button function
searchBtn.addEventListener("click", ()=>{
    let searchResults = products?.filter(item =>
    item.name.includes(searchWord.value));
    if (searchResults.length === 0) {
        // alert('No Products were found')
        mainContent.innerHTML = `Item was not Found`;
    }else{
        mainContent.innerHTML = searchResults.map(function displayArray(item,index){
            return`
                <div class='card col-4'>
                    <img src='${item.prodImage}'>
                    <div class='container'>
                        <h2>${item.name}</h2>
                        <p>${item.description}</p>
                        <p>R${item.price}</p>
                    </div>
                    <button data-index='${index}' data-add>Add To Cart</button>
                    <br>
                    <input id='quantity-${index}' class='quantity' placeholder='Enter Quantity' data-quan>
                    <br>
                </div>
            `}).join('');
        }
});
//sort button
let sortBtn = document.querySelector('#sort')
//sort button function
sortBtn.addEventListener("click", ()=>{
     let sorted = JSON.parse(localStorage.getItem("products"))?.sort((a, b) =>{
      if(a.price < b.price ) return -1;
      if(a.price > b.price ) return 1;
      return 0; // If the price are 0 return eqaul
    });
    // Assign the innerHTML value after sorting the items
    console.log(sorted);
    mainContent.innerHTML = sorted.map(function displayArray(item,index){
        return`
            <div class='card col-4'>
                <img src='${item.prodImage}'>
                <div class='container'>
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                    <p>R${item.price}</p>
                </div>
                <button data-index='${index}' data-add>Add To Cart</button>
                <br>
                <input id='quantity-${index}' class='quantity' placeholder='Enter Quantity' data-quan>
                <br>
            </div>
        `}).join('');
    });

    document.querySelector(`#spinner`).style.display = 'block';

    updateMainContent(sorted);

    updateMainContent(searchResults);