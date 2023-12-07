let bought = JSON.parse(localStorage.getItem(`bought`) || []);

let myTable = document.querySelector(`main`);

function displayCheckout() {
    if(bought.length === 0){
        myTable.innerHTML = `
            <div id="spinner" class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `
    }else{
          myTable.innerHTML = `
        <table>
            <tr>
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
        <p>Total Amount: R${calculateTotalAmount()}</p>
        <button id='purchase'>Purchase!</button>
        <button id='clearAll'>Clear All</button>
    `;

    // Add event listener for delete button
    let deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            deleteItem(this.dataset.index);
        });
    });

    //Add event listener for purchase button
    let purchaseButton = document.querySelector(`#purchase`);
    purchaseButton.addEventListener(`click`, function() {
        alert(`Thank You For Your Purchase!`)
    })

    //Add event listener for clear all button
    let clearAllBtn = document.querySelector(`#clearAll`);
    clearAllBtn.addEventListener(`click`, function(){
        bought = [];
        localStorage.setItem('bought', JSON.stringify(bought));
        displayCheckout();
    });  
    }

}

function deleteItem(index) {
    bought.splice(index, 1);
    localStorage.setItem('bought', JSON.stringify(bought));
    displayCheckout(); // Refresh the displayed items after deletion
}

function calculateTotalAmount(){
    let totalAmount = bought.reduce((sum, product) =>
        sum + product.amount * product.price, 0
    );
    return totalAmount.toFixed(2);
}

displayCheckout();