let products = [];

function myObjectConstructor(id, name, description, price, prodImage){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.prodImage = prodImage;
}

let product01 = new myObjectConstructor(1, `Grand Theft Auto V`, `Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games.Set within the fictional state of San Andreas, the single-player story follows three protagonists—retired bank robber Michael De Santa, street gangster Franklin Clinton, and drug dealer and gunrunner Trevor Philips—and their attempts to commit heists while under pressure from a corrupt government agency and powerful criminals.`, 700, `https://i.postimg.cc/nr2VFz60/Grand-Theft-Auto-V.png`);

let product02 = new myObjectConstructor(2, `Red Dead Redemption 2`, `Red Dead Redemption 2 is a western action-adventure game set in an open world environment and played from a third-person perspective, featuring single-player and online multiplayer components.`, 800, `https://i.postimg.cc/NFyR33yJ/reddead2.jpg`);

let product03 = new myObjectConstructor(3, `Fallout 4`, `Bethesda Game Studios, the award-winning creators of Fallout 3 and The Elder Scrolls V: Skyrim, welcome you to the world of Fallout 4 – their most ambitious game ever, and the next generation of open-world gaming.`, 400, `https://i.postimg.cc/rm3FZmvH/fo4.jpg`);

products.push(product01, product02, product03);

localStorage.setItem(`products`, JSON.stringify(products));

products = JSON.parse(localStorage.getItem(`products`));

let myTable = document.querySelector(`table`);

function display(){
    let items = products.map(function(product, index){
        return `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>R${product.price}</td>
                <td><img src="${product.prodImage}"></td>
                <td><button>Edit</button></td>
                <td><button class = 'delete' value = '${index}'>Delete</button></td>
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
