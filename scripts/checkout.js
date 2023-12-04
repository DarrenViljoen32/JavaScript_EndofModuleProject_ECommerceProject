let bought = JSON.parse(localStorage.getItem(`bought`));

let myTable = document.querySelector(`main`);
myTable.innerHTML = bought.map((product, index) =>{
    return `
        <tr>
            <td>${index+1}: </td>
            <td>${product.name}.</td>
            <td>${product.description}</td>
            <td>R${product.price}</td>
        </tr>
    `
})