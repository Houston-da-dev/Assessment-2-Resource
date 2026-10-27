var cart = [];
var itemlist = ["Album 1", "Album 2", "Album 3", "Album 4", "T-Shirt", "Coffee Cup"];
var imglink = ["Images/Album 1.png", "Images/Album 2.png", "Images/Album 3.png", "Images/Album 4.png", "Images/shirt.png", "Images/Cofee.png"];
var prices = [12.99, 14.99, 9.99, 19.99, 19.99, 6.99];

function addCart(id) {
    let x = cart.indexOf(id);

    if (x == -1) {
        cart.push(id);
        CreateShop(id);
        alert("Item has been added.");
    }
    else {
        alert(cart[x] + " is already in cart.");
    }
}


function CreateShop(item) {
    let y = itemlist.indexOf(item);

    if (y == -1) {
        return;
    }

    let shop = document.getElementById("shop");

    let shoprow = document.createElement("div");
    shoprow.classList.add("cart-row");
    shoprow.id = item;
    shop.appendChild(shoprow);

    let shopitem = document.createElement("div");
    shopitem.classList.add("cart-item", "cart-column");
    shoprow.appendChild(shopitem);

    let shopimg = document.createElement("img");
    shopimg.classList.add("cart-item-image");
    shopimg.src = imglink[y];
    shopimg.alt = item;
    shopitem.appendChild(shopimg);

    let itemname = document.createElement("span");
    itemname.classList.add("cart-item-title");
    itemname.textContent = item;
    shopitem.appendChild(itemname);

    let itemprice = document.createElement("span");
    itemprice.classList.add("cart-price", "cart-column");
    itemprice.textContent = "$" + prices[y].toFixed(2);
    shoprow.appendChild(itemprice);

    let quantitydiv = document.createElement("div");
    quantitydiv.classList.add("cart-quantity", "cart-column");
    shoprow.appendChild(quantitydiv);

    let quantityinput = document.createElement("input");
    quantityinput.classList.add("cart-quantity-input");
    quantityinput.type = "number";
    quantityinput.value = 1;
    quantityinput.min = 1;
    quantitydiv.appendChild(quantityinput);

    let removebutton = document.createElement("button");
    removebutton.classList.add("btn", "btn-danger");
    removebutton.type = "button";
    removebutton.textContent = "REMOVE";
    quantitydiv.appendChild(removebutton);

    removebutton.addEventListener("click", function () {
        removeCart(item);
    });

    quantityinput.addEventListener("change", function () {
        if (isNaN(quantityinput.value) || quantityinput.value < 1) {
            quantityinput.value = 1;
        }

        updateTotal();
    });

    updateTotal();
}


function removeCart(item) {
    let x = cart.indexOf(item);

    if (x != -1) {
        cart.splice(x, 1);
    }

    let row = document.getElementById(item);

    if (row) {
        row.remove();
    }

    updateTotal();
}

function clearshop(){
    for(i = 0; i < 20; i++ ){
        cart.splice(0, 1);
    }

    let row = document.getElementsByClassName("cart-row");

    for(i = 0; i < 20; i++)1[
        row[0].remove()
    ]

    updateTotal();

    alert("Your order is being processed.")
}

function updateTotal() {
    let shop = document.getElementById("shop");
    let rows = shop.getElementsByClassName("cart-row");
    let total = 0;

    for (let i = 0; i < rows.length; i++) {
        let title = rows[i].querySelector(".cart-item-title");
        let quantity = rows[i].querySelector(".cart-quantity-input");

        if (title && quantity) {
            let index = itemlist.indexOf(title.textContent);
            let amount = parseInt(quantity.value);

            if (index != -1 && !isNaN(amount) && amount > 0) {
                total += prices[index] * amount;
            }
        }
    }

    document.querySelector(".cart-total-price").textContent = "$" + total.toFixed(2);
}