let bought = [];

let mainContent = document.querySelector(`main`);

let products = JSON.parse(localStorage.getItem(`products`));

mainContent.innerHTML = products.map(function(product, index){
    return `
    <div>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>R${product.price}</p>
        <button value = '${index}' data-add>Add To Cart</button>
    </div>
    `
}).join(``)

function add(index){
    bought.push(products[index]);
    localStorage.setItem(`bought`, JSON.stringify(bought));
}

mainContent.addEventListener(`click`, function(){
    if(event.target.hasAttribute(`data-add`)){
        add(event.target.value);
    }
})

//search-bar
// let a = items.filter(item =>{
//     return item.name == `Nike Shoe`
// })