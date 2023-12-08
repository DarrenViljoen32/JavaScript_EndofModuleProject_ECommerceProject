//declaring a new array for the products and fetch it from the locsl storsge or if its empty initialize
let bought = JSON.parse(localStorage.getItem(`bought`)) || [];

//declaring a variable to display the array in the main in the html
let mainContent = document.querySelector('main');

//fetch the array from local storage or initialize if its empty
let products = JSON.parse(localStorage.getItem('products')) || [];

//check if array was fetched
if(!products || !Array.isArray(products)){
    console.error(`Error loading`);

}
else{
    //display products and if the array is available set up event listeners
    displayProducts(products);

    //function to add a selected product to the array
    function add(index){
        try{
            //fetch the quantity input for the selected product
            let quantityInput = document.querySelector(`#quantity-${index}`);
            let quantity = parseInt(quantityInput.value);

            //validating the quantity input
            if(isNaN(quantity) || quantity <= 0){
                throw new Error(`A value that is Invalid has been Entered.`);
            }

            //create an object for the selected product with the specified quantity
            let selectedProduct = {
                ...products[index],
                amount: quantity,
            };

            //adding the selected product to the array then update the local storage
            bought.push(selectedProduct);
            localStorage.setItem('bought',JSON.stringify(bought));
        }
        catch(error){
            console.error(`There has been an Error in handling quantity input: `, error);               
            alert(`Please Enter a Valid Quantity.`);
        }
    }

    //event listener for main content clicks
    mainContent.addEventListener('click',function (){
        if (event.target.hasAttribute('data-add')){
            //call the add function if the clicked element has a data-add attribute
            add(event.target.getAttribute(`data-index`));
        }
    })
}

//displaying the products in the main html element
function displayProducts(productArray){
    try{
        //check if the array sempty
        if (products.length === 0) {
            //display spinner when array is empty
            mainContent.innerHTML = `
                <div id="spinner" class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            `
        } 
        else {
            //hide spinner and display content when array is not empty
            mainContent.innerHTML = productArray.map(function displayArray(item, index) {
                return `
                    <div class='card col-4'>
                        <img src='${item.prodImage}'>
                        <div class='container'>
                            <h2>${item.name}</h2>
                            <p>${item.description}</p>
                            <p>R${item.price}</p>
                        </div>
                        <button id='cartBtn' data-index='${index}' data-add>Add To Cart</button>
                        <br>
                        <input id='quantity-${index}' class='quantity' placeholder='Enter Quantity' data-quan>
                        <br>
                    </div>
                `;
            }).join('');
        }
    }
    catch(error){
        console.error(`There has been an Error Displaying the Products: `, error);
        mainContent.innerHTML = `There has been an Error in Displaying the Products.`;
    }
}

 //search button
let searchBtn = document.querySelector('#searchBtn');
//search bar value
let searchWord = document.querySelector('#find');

//search button event listener
searchBtn.addEventListener("click", ()=>{
    try{
        //search products based on the search word
        let searchResults = products?.filter(item =>
        item.name.includes(searchWord.value));

        if (searchResults.length === 0) {
            //display a message if no products are found
            // alert('No Products were found');
            mainContent.innerHTML = `Item was not Found`;
        }
        else{
            //display the search result
            mainContent.innerHTML = searchResults.map(function displayArray(item,index){
                return`
                    <div class='card col-4'>
                        <img src='${item.prodImage}'>
                        <div class='container'>
                            <h2>${item.name}</h2>
                            <p>${item.description}</p>
                            <p>R${item.price}</p>
                        </div>
                        <button id='cartBtn' data-index='${index}' data-add>Add To Cart</button>
                        <br>
                        <input id='quantity-${index}' class='quantity' placeholder='Enter Quantity' data-quan>
                        <br>
                    </div>
                `}).join('');
            }
    }
    catch (error){
        console.error(`There has been an Error handling the Search Results: `, error);
        mainContent.innerHTML = `There has been an Error performing the Search.`;
    }
});

//sort button
let sortBtn = document.querySelector('#sort');
let j = false;
sortBtn.addEventListener("click", ()=>{
    if(!j){
        //sort by descending order
        products.sort((a, b) => b.price - a.price);
        sortBtn.textContent = "Sorted by Descending Order";
        j = true;
    }
    else{
        //sort by ascending order
        products.sort((a, b) => a.price - b.price);
        sortBtn.textContent = "Sorted by Ascending Order";
        j = false;
    }
    //display sorted products
    displayProducts(products);
});

//display spinner
document.querySelector(`#spinner`).style.display = 'block';
