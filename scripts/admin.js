let products = JSON.parse(localStorage.getItem('products')) ||[];

if(!products.length){

    function MyObjectConstructor(id, name, description, price, prodImage, amount){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.prodImage = prodImage;
        this.amount = amount;
    }

    let product01 = new MyObjectConstructor(1, `Grand Theft Auto V`, `Grand Theft Auto V is a 2013 action-adventure game set within the fictional state of San Andreas, the single-player story follows three protagonists and their attempts to commit heists while under pressure from a corrupt government agency and powerful criminals.`, 700, `https://i.postimg.cc/nr2VFz60/Grand-Theft-Auto-V.png`, 0);

    let product02 = new MyObjectConstructor(2, `Red Dead Redemption 2`, `Red Dead Redemption 2 is a western action-adventure game set in an open world environment and played from a third-person perspective, featuring single-player and online multiplayer components. Relive the final years of the Outlaw in America's Wild West era comes to an end.`, 800, `https://i.postimg.cc/NFyR33yJ/reddead2.jpg`, 0);

    let product03 = new MyObjectConstructor(3, `Fallout 4`, `Bethesda Game Studios, the award-winning creators of Fallout 3 and The Elder Scrolls V: Skyrim, welcome you to the world of Fallout 4 – their most ambitious game ever. You are the Sole Survivor of Vault 111 searching for your missing son after a brazen kidnapping.`, 400, `https://i.postimg.cc/rm3FZmvH/fo4.jpg`, 0);

    let product04 = new MyObjectConstructor(4, `EA Football 24`, `EA Sports FC 24 is a football-themed simulation video game developed by EA Vancouver and EA Romania and published by EA Sports. It is the inaugural installment in the EA Sports FC series following on from the successful FIFA video game series.`, 1099, `https://i.postimg.cc/ncCFhPbB/fifa.png`, 0);

    let product05 = new MyObjectConstructor(5, `CoD: Modern Warfare 3`, `Call of Duty: Modern Warfare III is a 2023 first-person shooter video game developed by Sledgehammer Games and published by Activision. It is a sequel to 2022's Modern Warfare II, serving as the third entry in the rebooted Modern Warfare sub-series.`, 1100, `https://i.postimg.cc/YqtRVRCW/codmw3.jpg`, 0);

    let product06 = new MyObjectConstructor(6, `Assassin's Creed Mirage`, `Assassin's Creed Mirage is a 2023 action-adventure game developed by Ubisoft Bordeaux and published by Ubisoft. The game is the thirteenth major installment in the Assassin's Creed series and the successor to 2020's Assassin's Creed Valhalla.`, 1200, `https://i.postimg.cc/SQn5hy4L/Assassin-s-Creed-Mirage-cover.jpg`, 0);

    products.push(product01, product02, product03, product04, product05, product06);

    localStorage.setItem(`products`, JSON.stringify(products));
}

products = JSON.parse(localStorage.getItem(`products`));

let myTable = document.querySelector(`table`);

function display(){
    if(products.length === 0){
        myTable.innerHTML = `
        <div id="spinner" class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        `
    }else{
        let items = products.map(function(product, index){
            return `
                <tr>
                    <th>Id.</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                </tr>
                <tr>
                    <td>${product.id}:</td>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>R${product.price}</td>
                    <td><img src="${product.prodImage}"></td>
                    <td><button class='editBtn' value= '${index}'>Edit</button>
                    <br><br>
                    <button class = 'delete' value = '${index}'>Delete</button></td>
                </tr>
            `
        })
        myTable.innerHTML = items.join(``);
    }
}


setArray();

display();

function setArray(){
    localStorage.setItem(`products`, JSON.stringify(products));

    products = JSON.parse(localStorage.getItem(`products`));
}

//sort button
let sortBtn = document.querySelector('#adminSort');
let j = false;
sortBtn.addEventListener("click", ()=>{
    if(!j){
        products.sort((a, b) => b.price - a.price);
        sortBtn.textContent = "Sorted by highest price";
        j = true;
    }else{
        products.sort((a, b) => a.price - b.price);
        sortBtn.textContent = "Sorted by lowest price";
        j = false;
    }
    display(products);
});


let editProductButton = document.querySelector(`.editBtn`);
let editModal = document.querySelector(`#editModal`);
let editBtn = document.querySelector(`#editConfirmBtn`);

// Element that closes the modal
let editSpan = document.getElementsByClassName("editClose")[0];
editSpan.onclick = function(){
    editModal.style.display = "none";
}

//addEventListener for edit button
myTable.addEventListener(`click`, function(){
    if(event.target.classList.contains(`editBtn`)){
        openEditModal(event.target.value);
    }
});

//Alternate event listener
// editProductButton.onclick = function(){
//     editModal.style.display = "block";
//     openEditModal(event.target.value);
// }

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
    
    if(editNameValue.trim() !== '' && editDescValue.trim() !== '' && editPriceValue.trim() !== '' && editImgURL.trim() !== ''){
        //update product info
        products[index].name = editNameValue;
        products[index].description = editDescValue;
        products[index].price = editPriceValue;
        products[index].prodImage = editImgURL;

        setArray();
        display();
    }else{
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

myTable.addEventListener(`click`, function(){
    if(event.target.classList.contains(`delete`)){
        remove(event.target.value);
    }
})

// Modal
let modal = document.getElementById("myModal");
// Button that opens the modal
let btn = document.getElementById("myBtn");
// Element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When button is clicked it will open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on X it will close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal it will close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//confirm button
let idCounter = products.length > 0 ? Math.max(...products.map(item => item.id)) + 1 : 0;

let confirmButton = document.querySelector(`#confirmBtn`)
confirmButton.addEventListener(`click`, function(){
    let nameValue = document.querySelector(`#prodName`).value;
    let descValue = document.querySelector(`#prodDesc`).value;
    let priceValue = document.querySelector(`#prodPrice`).value;
    let imgUrl = document.querySelector(`#prodURL`).value;
    let checkValid = document.querySelector(`#validation`);
    checkValid.innerHTML = ``;

    let obj = {
        id : products.id,
        name : nameValue,
        description : descValue,
        price : priceValue,
        prodImage : imgUrl,
        amount : products.amount,
    }

    if(nameValue.trim() !== `` && descValue.trim() !== `` && priceValue.trim() !== `` && imgUrl.trim() !== ``){
        obj.id = idCounter++;
        products.push(obj); 
        localStorage.setItem(`products`, JSON.stringify(products));
        display();
        

        document.querySelector(`#prodName`).value = ``;
        document.querySelector(`#prodDesc`).value = ``;
        document.querySelector(`#prodPrice`).value = ``;
        document.querySelector(`#prodURL`).value = ``;
        console.log(products);
    }
    else{
        checkValid.innerHTML = `Please make sure to enter all fields.`;
    }
})

// //edit button
// let editBtn = document.querySelector(`#editBtn`);
// //edit modal
// let editModal = document.querySelector(`#editModal`);
// //close modal
// let editSpan = document.getElementsByClassName("editClose")[0];
// //when button is clicked open the modal
// editBtn.onclick = function(){
//     editModal.style.display = "block";
// }
// // When the user clicks on X it will close the modal
// editSpan.onclick = function() {
//     editModal.style.display = "none";
//   }

// //display product values in input fields
// document.querySelector(`#editName`);
// document.querySelector(`#editDesc`);
// document.querySelector(`#editPrice`);
// document.querySelector(`#editURL`);

// let editConfirmButton = document.querySelector(`#editConfirmBtn`);
// editConfirmButton.addEventListener(`click`, function(){

// })
