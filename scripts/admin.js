let products = [];

function myObjectConstructor(id, name, description, price, prodImage, amount){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.prodImage = prodImage;
    this.amount = amount;
}

let product01 = new myObjectConstructor(1, `Grand Theft Auto V`, `Grand Theft Auto V is a 2013 action-adventure game set within the fictional state of San Andreas, the single-player story follows three protagonists and their attempts to commit heists while under pressure from a corrupt government agency and powerful criminals.`, 700, `https://i.postimg.cc/nr2VFz60/Grand-Theft-Auto-V.png`, 0);

let product02 = new myObjectConstructor(2, `Red Dead Redemption 2`, `Red Dead Redemption 2 is a western action-adventure game set in an open world environment and played from a third-person perspective, featuring single-player and online multiplayer components. Relive the final years of the Outlaw in America's Wild West era comes to an end.`, 800, `https://i.postimg.cc/NFyR33yJ/reddead2.jpg`, 0);

let product03 = new myObjectConstructor(3, `Fallout 4`, `Bethesda Game Studios, the award-winning creators of Fallout 3 and The Elder Scrolls V: Skyrim, welcome you to the world of Fallout 4 – their most ambitious game ever. You are the Sole Survivor of Vault 111 searching for your missing son after a brazen kidnapping.`, 400, `https://i.postimg.cc/rm3FZmvH/fo4.jpg`, 0);

let product04 = new myObjectConstructor(4, `EA Football 24`, `EA Sports FC 24 is a football-themed simulation video game developed by EA Vancouver and EA Romania and published by EA Sports. It is the inaugural installment in the EA Sports FC series following on from the successful FIFA video game series.`, 1099, `https://i.postimg.cc/ncCFhPbB/fifa.png`, 0);

let product05 = new myObjectConstructor(5, `CoD: Modern Warfare 3`, `Call of Duty: Modern Warfare III is a 2023 first-person shooter video game developed by Sledgehammer Games and published by Activision. It is a sequel to 2022's Modern Warfare II, serving as the third entry in the rebooted Modern Warfare sub-series.`, 1100, `https://i.postimg.cc/YqtRVRCW/codmw3.jpg`, 0);

let product06 = new myObjectConstructor(6, `Assassin's Creed Mirage`, `Assassin's Creed Mirage is a 2023 action-adventure game developed by Ubisoft Bordeaux and published by Ubisoft. The game is the thirteenth major installment in the Assassin's Creed series and the successor to 2020's Assassin's Creed Valhalla.`, 1200, `https://i.postimg.cc/SQn5hy4L/Assassin-s-Creed-Mirage-cover.jpg`, 0);

products.push(product01, product02, product03, product04, product05, product06);

localStorage.setItem(`products`, JSON.stringify(products));

products = JSON.parse(localStorage.getItem(`products`));

let myTable = document.querySelector(`table`);

function display(){
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
                <td><button>Edit</button>
                <br><br>
                <button class = 'delete' value = '${index}'>Delete</button></td>
            </tr>
        `
    })
    myTable.innerHTML = items.join(``);
}
display();

function setArray(){
    localStorage.setItem(`products`, JSON.stringify(products));

    products = JSON.parse(localStorage.getItem(`products`));
}

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

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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
        amount : products.amount
    }

    if(nameValue.trim() !== `` && descValue.trim() !== `` && priceValue.trim() !== `` && imgUrl.trim() !== ``){
        obj.id = idCounter++;
        products.push(obj); 
        document.querySelector(`#prodName`).value = ``;
        document.querySelector(`#prodDesc`).value = ``;
        document.querySelector(`#prodPrice`).value = ``;
        document.querySelector(`#prodURL`).value = ``;
        console.log(products);
        display();
        // localStorage.setItem(`new`, JSON.stringify(products));
    }
    else{
        checkValid.innerHTML = `Please make sure to enter all fields.`;
    }
})
