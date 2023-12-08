//parse the product data from local storage
//make it an empty array if theres no data
let products;
try{
    products = JSON.parse(localStorage.getItem('products')) ||[];
}
catch (error){
    console.error(`There has been an Error in parsing JSON from local storage.`);
    products = [];
} 

//when there is no products in the array create a constructor function for objects and store it in the products array
if(!products.length){

    //constructor function to make objects
    function MyObjectConstructor(id, name, description, price, prodImage, amount){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.prodImage = prodImage;
        this.amount = amount;
    }

    //objects with id, name, description, price, url, and amount
    let product01 = new MyObjectConstructor(1, `Grand Theft Auto V`, `Grand Theft Auto V is a 2013 action-adventure game set within the fictional state of San Andreas, the single-player story follows three protagonists and their attempts to commit heists while under pressure from a corrupt government agency and powerful criminals.`, 700, `https://i.postimg.cc/nr2VFz60/Grand-Theft-Auto-V.png`, 0);

    let product02 = new MyObjectConstructor(2, `Red Dead Redemption 2`, `Red Dead Redemption 2 is a western action-adventure game set in an open world environment and played from a third-person perspective, featuring single-player and online multiplayer components. Relive the final years of the Outlaw in America's Wild West era comes to an end.`, 800, `https://i.postimg.cc/NFyR33yJ/reddead2.jpg`, 0);

    let product03 = new MyObjectConstructor(3, `Fallout 4`, `Bethesda Game Studios, the award-winning creators of Fallout 3 and The Elder Scrolls V: Skyrim, welcome you to the world of Fallout 4 – their most ambitious game ever. You are the Sole Survivor of Vault 111 searching for your missing son after a brazen kidnapping.`, 400, `https://i.postimg.cc/rm3FZmvH/fo4.jpg`, 0);

    let product04 = new MyObjectConstructor(4, `EA Football 24`, `EA Sports FC 24 is a football-themed simulation video game developed by EA Vancouver and EA Romania and published by EA Sports. It is the inaugural installment in the EA Sports FC series following on from the successful FIFA video game series.`, 1099, `https://i.postimg.cc/ncCFhPbB/fifa.png`, 0);

    let product05 = new MyObjectConstructor(5, `CoD: Modern Warfare 3`, `Call of Duty: Modern Warfare III is a 2023 first-person shooter video game developed by Sledgehammer Games and published by Activision. It is a sequel to 2022's Modern Warfare II, serving as the third entry in the rebooted Modern Warfare sub-series.`, 1100, `https://i.postimg.cc/YqtRVRCW/codmw3.jpg`, 0);

    let product06 = new MyObjectConstructor(6, `Assassin's Creed Mirage`, `Assassin's Creed Mirage is a 2023 action-adventure game developed by Ubisoft Bordeaux and published by Ubisoft. The game is the thirteenth major installment in the Assassin's Creed series and the successor to 2020's Assassin's Creed Valhalla.`, 1200, `https://i.postimg.cc/SQn5hy4L/Assassin-s-Creed-Mirage-cover.jpg`, 0);

    //push the objects into the array
    products.push(product01, product02, product03, product04, product05, product06);

    //save the array to the local storage
    localStorage.setItem(`products`, JSON.stringify(products));
}

//fetch the array from local storage
products = JSON.parse(localStorage.getItem(`products`));

//set a variable for the html table
let myTable = document.querySelector(`table`);

//function to create products in the html table
function display(){
    if(products.length === 0){
        //spinner if theres no products
        myTable.innerHTML = `
            <div id="spinner" class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `
    }
    else{
        //make html for every product then update the table
        let items = products.map(function(product, index){
            let imageElement;
            try{
                imageElement = `<img src="${product.prodImage}">`;
            }
            catch (error){
                console.error(`There has been an Error loading the Image: `, error);
                imageElement = `Image is not Available.`
            }

            return `
                <tr id='tableHead'>
                    <th>Id.</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th></th>
                </tr>
                <tr class='table-active'>
                    <td>${product.id}:</td>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>R${product.price}</td>
                    <td>${imageElement}</td>
                    <td><button class='editBtn' value= '${index}'>Edit</button>
                    <br><br>
                    <button class = 'delete' value = '${index}'>Delete</button></td>
                </tr>
            `
        })
        myTable.innerHTML = items.join(``);
    }
}

//initialize the array and display the products
setArray();
display();

//function to set the array and then update local storage
function setArray(){
    localStorage.setItem(`products`, JSON.stringify(products));
    products = JSON.parse(localStorage.getItem(`products`));
}

//sort button
let sortBtn = document.querySelector('#adminSort');
let j = false;
sortBtn.addEventListener("click", ()=>{
    //sort products in descending order
    if(!j){
        products.sort((a, b) => b.price - a.price);
        sortBtn.textContent = "Sorted in Descending Order";
        j = true;
    }
    //sort products in ascending order
    else{
        products.sort((a, b) => a.price - b.price);
        sortBtn.textContent = "Sorted by Ascending Order";
        j = false;
    }
    display(products);
})

//edit button and model
let editProductButton = document.querySelector(`.editBtn`);
let editModal = document.querySelector(`#editModal`);
let editBtn = document.querySelector(`#editConfirmBtn`);

//element that closes the modal
let editSpan = document.getElementsByClassName("editClose")[0];
editSpan.onclick = function(){
    editModal.style.display = "none";
}

//addEventListener for edit button
myTable.addEventListener(`click`, function(){
    try{
        if(event.target.classList.contains(`editBtn`)){
            openEditModal(event.target.value);
        }
    }
    catch(error){
        console.error(`There has been an Error in the handling click event: `, error);
    }
})

//function to open modal when edit button is clicked
function openEditModal(index){
    let changeProduct = products[index];
    document.querySelector(`#editName`).value = changeProduct.name;
    document.querySelector(`#editDesc`).value = changeProduct.description;
    document.querySelector(`#editPrice`).value = changeProduct.price;
    document.querySelector(`#editURL`).value = changeProduct.prodImage;

    //when confirm button is clicked call the editProduct function
    editBtn.onclick = function(){
        editProduct(index);
        // editModal.style.display = "none";
    };
    editModal.style.display = "block";
}

//function to edit product values
function editProduct(index){
    let editNameValue = document.querySelector(`#editName`).value;
    let editDescValue = document.querySelector(`#editDesc`).value;
    let editPriceValue = document.querySelector(`#editPrice`).value;
    let editImgURL = document.querySelector(`#editURL`).value;
    let editValid = document.querySelector(`#editValidation`);
    editValid.innerHTML = '';
    
    //check if values are empty
    if(editNameValue.trim() !== '' && editDescValue.trim() !== '' && editPriceValue.trim() !== '' && editImgURL.trim() !== ''){
        //update product info
        products[index].name = editNameValue;
        products[index].description = editDescValue;
        products[index].price = editPriceValue;
        products[index].prodImage = editImgURL;

        setArray();
        display();
    }
    else{
        editValid.innerHTML = 'Please make sure to enter values in every field.';
    }
}

//delete button
let deleteBtn = document.querySelector(`.delete`);

function remove(place){
    products.splice(place, 1);
    setArray();
    display();
}

//event listener for the delete button
myTable.addEventListener(`click`, function(){
    if(event.target.classList.contains(`delete`)){
        remove(event.target.value);
    }
})

//modal
let modal = document.getElementById("myModal");

//button that will open the modal
let btn = document.getElementById("myBtn");

//element that will close the modal
let span = document.getElementsByClassName("close")[0];

//when button is clicked it will open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

//when the user clicks on X it will close the modal
span.onclick = function() {
  modal.style.display = "none";
}

//when the user clicks anywhere outside of the modal it will close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//counter for making unique Ids for new products
let idCounter = products.length > 0 ? Math.max(...products.map(item => item.id)) + 1 : 0;

//set variable for confirm button
let confirmButton = document.querySelector(`#confirmBtn`);

//event listener for the confirm button
confirmButton.addEventListener(`click`, function(){
    try{
        //get the values from the input fields
        let nameValue = document.querySelector(`#prodName`).value;
        let descValue = document.querySelector(`#prodDesc`).value;
        let priceValue = document.querySelector(`#prodPrice`).value;
        let imgUrl = document.querySelector(`#prodURL`).value;
        
        //set variable to the validation element
        let checkValid = document.querySelector(`#validation`);
        checkValid.innerHTML = ``;

        //make an object for the new product
        let obj = {
            id : products.id,
            //id: obj.id,
            name : nameValue,
            description : descValue,
            price : priceValue,
            prodImage : imgUrl,
            amount : products.amount,
            //amount: obj.amount,
        }

        //check if the input fields are filled
        if(nameValue.trim() !== `` && descValue.trim() !== `` && priceValue.trim() !== `` && imgUrl.trim() !== ``){
            //make a unique Id and assign it to the new product
            obj.id = idCounter++;

            //add the new product to the array
            products.push(obj); 

            //save the updated array to local storage
            localStorage.setItem(`products`, JSON.stringify(products));
            display();
            
            //clear all input fields after adding the product
            document.querySelector(`#prodName`).value = ``;
            document.querySelector(`#prodDesc`).value = ``;
            document.querySelector(`#prodPrice`).value = ``;
            document.querySelector(`#prodURL`).value = ``;

            console.log(products);
        }
        else{
            //display validation error if fields are empty
            checkValid.innerHTML = `Please make sure to enter all fields.`;
        }
    }
    catch(error){
        console.error(`There has been an Error validating or creating the Product: `, error);
    }
})
