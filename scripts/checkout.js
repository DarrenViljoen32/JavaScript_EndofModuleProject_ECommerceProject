//make variable bought to store the products in the cart
let bought;

//parse array from local storage or if it fails set it as an empty array
try{
    bought = JSON.parse(localStorage.getItem(`bought`) || []);
}
catch(error){
    //parse the error and log details
    console.error(`There has been an Error in parsing the data from local strage.`, error);
    bought = [];
}

//set the main of the html to table variable
let myTable = document.querySelector(`main`);
//function that displays the items in the table
function displayCheckout() {
    //display spinner if the array is empty
    if(bought.length === 0){
        myTable.innerHTML = `
            <div id="spinner" class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `
    }
    else{
        //display checkout table
        myTable.innerHTML = `
            <table class= 'table'>
                <tr id='tableHead'>
                    <th>Id.</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount Due</th>
                    <th>Edit</th>
                </tr>
                ${bought.map((product, index) => `
                <tr>
                    <td>${index + 1}.</td>
                    <td>${product.name}</td>
                    <td><img src='${product.prodImage}'></td>
                    <td>R${product.price}</td>
                    <td>${product.amount}</td>
                    <td>R${product.price * product.amount}</td>
                    <td>
                        <button class="delete" data-index="${index}">Delete</button>
                    </td>
                </tr>
                `).join('')}
            </table>
            <table class='table'>
                <tr id='totalAmount'>
                    <td>Total Amount: R${calculateTotalAmount()}</td>
                </tr>
            </table>
            <p></p>
            <button id='purchase'>Purchase!</button>
            <button id='clearAll'>Clear All</button>
        `

        try{
            //event listener for delete button
            let deleteButtons = document.querySelectorAll('.delete');
            deleteButtons.forEach(button => {

                button.addEventListener('click', function () {
                    deleteItem(this.dataset.index);
                })

            })

            //event listener for purchase button
            let purchaseButton = document.querySelector(`#purchase`);
            purchaseButton.addEventListener(`click`, function() {
                alert(`Thank You For Your Purchase!`);
                bought = [];
                localStorage.setItem('bought', JSON.stringify(bought));
                displayCheckout();
            })

            //event listener for clear all button
            let clearAllBtn = document.querySelector(`#clearAll`);
            clearAllBtn.addEventListener(`click`, function(){
                bought = [];
                localStorage.setItem('bought', JSON.stringify(bought));
                displayCheckout();
            })
        }
        catch(error){
            //display if error in the event listeners
            console.error(`There has been an Error in the event listener.`, error);
        }
    }
}

//funtion to delete a product from the array then update local storage
function deleteItem(index) {
    bought.splice(index, 1);
    localStorage.setItem('bought', JSON.stringify(bought));
    //refresh the display after deleting product
    displayCheckout(); 
}

//function to calculate the amount due for producs in the array
function calculateTotalAmount(){
    let totalAmount = bought.reduce((sum, product) =>
        sum + product.amount * product.price, 0
    );
    //return total amount with 2 decimal places
    return totalAmount.toFixed(2);
}
//display the checkout table
displayCheckout();