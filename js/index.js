let cartPrice = 0;
let cart= [];
const cartBtn = document.getElementById('cartBtn');
const cartInfo = document.getElementById('cartInfo');
const cartSpan = document.getElementById('cartLength');
const cartList = document.getElementById('cartList');
const clearBtn = document.getElementById('clearButton');
const totalCartPrice = document.getElementById('totalCartPrice');
const buyButtons = document.querySelectorAll('.btn');

let products = 
    [
        //SNOWBOARDS
        //Burton brand
        {name:'Burton Family Tree Grill Master',price:600},
        {name:'Burton Mystery Hometown Hero',price:700},
        {name:'Burton Throwback SB',price:500},
        //Capita brand
        {name:'Capita Aeronaut',price:650},
        {name:'Capita DOA',price:800},
        {name:'Capita Paradise',price:550},
        //Salomon brand
        {name:'Salomon Assasin',price:750},
        {name:'Salomon Assasin Pro',price:800},
        {name:'Salomon Rumble Fish',price:750},

        //GOGGLES
        {name:'Anon Helix',price:300},
        {name:'Anon M4',price:350},
        {name:'Anon M4s',price:325},
        {name:'Anon Nesa',price:280},
        {name:'Anon Sync',price:350},
        {name:'Anon SyncL',price:300},

        //BOOTS
        //Burton brand
        {name:'Burton Ion StepOn',price:300},
        {name:'Burton Photon StepOn',price:350},
        {name:'Burton Swath StepOn',price:290},
        //DC brand
        {name:'DC Judge StepOn',price:350},
        {name:'DC PhasePro StepOn',price:350},
        {name:'DC Premier Hybrid',price:300},
        //Salomon brand
        {name:'Salomon Dialogue',price:250},
        {name:'Salomon Dialogue Dual',price:300},
        {name:'Salomon Launch',price:350},

        //HELMETS
        {name:'Anon Echo',price:350},
        {name:'Anon Merak',price:370},
        {name:'Anon Merak Wavecel',price:325},
        {name:'Anon Raider',price:380},
        {name:'Anon Rime',price:300},
        {name:'Anon Rodan',price:300},

        //BINDINGS
        //Burton brand
        {name:'Burton MissionRe',price:250},
        {name:'Burton StepOn Genesis',price:300},
        {name:'Burton StepOn Re',price:290},
        //Clew brand
        {name:'Clew Freedom Black',price:200},
        {name:'Clew Freedom White',price:220},
        //Salomon brand
        {name:'Salomon District',price:250},
        {name:'Salomon Mirage',price:300},
        {name:'Salomon Rhythm',price:300},
    ]
;

class Item{
    constructor(name,price){
        this.name = name;
        this.price = price;
    }
    getName(){
        return this.name;
    }
    getPrice(){
        return this.price;
    }
}

//shows all the items from the cart on the console
function showCartItems(){
    console.clear();
    if(cart.length>0){
        alert("You have "+cart.length + " item/s in your cart. Check the console for more info");
        console.log("-----ITEMS LIST-----");
        for(const items of cart){
            console.log(items.getName());
        }
        console.log("---ENDS OF ITEMS LIST---");
    }
    else{
        console.log("Your cart is empty!");
    }
}

// removes a single item from the cart by its index and substract its price from cartPrice.
function removeFromCart(index) {
    let itemToRemove =cart[index];
    cartPrice -= itemToRemove.getPrice();
    console.log(itemToRemove.getName()+" removed from cart!");
    cart.splice(index, 1);
    // Updates the cart
    showCart();
}

// Shows the products in the cart display.
function showCart() {
    //updates the price of the cart.
    totalCartPrice.textContent = `$${cartPrice}`;

    //cleans the cartList
    cartList.innerHTML = '';

    //iterates on the cart products and shows them
    cart.forEach(function (product, index) {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${product.getName()} - $${product.getPrice()}`;
        
        //add a button to remove a single product
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'X';
        removeBtn.addEventListener('click', function () {
            removeFromCart(index);
        });
        
        cartItem.appendChild(removeBtn);
        cartList.appendChild(cartItem);
    });
    cartSpan.textContent = cart.length > 0 ? cart.length : "0";
}

//Displays the cart when cart icon is clicked
cartBtn.addEventListener('click', function () {
    cartInfo.style.display = (cartInfo.style.display === 'none' || cartInfo.style.display === '') ? 'block' : 'none';
    showCart();
});

//Removes all items from cart and set cartPrice to 0
clearBtn.addEventListener('click',function(){
    //clears thhe console
    window.console.clear();
    //prints all the items to remove
    cart.forEach(item =>
        console.log(item.getName()+" removed from cart!"));
    //checks if the cart is empty, if its not it removes all and set the cartprice to 0
    cart.length > 0 ? cart.splice(0, cart.length) : alert("Cart empty!");
    cartPrice = 0;
    //Updates the cart
    showCart();
});

//adds an item to cart,if its not already added, and adds the price of the item to cartPrice.
buyButtons.forEach(button => button.addEventListener('click', function(event){
    const buttonId = event.target.parentNode.id;

    let name = products.find(the => the.name == buttonId).name;
    let price = products.find(the => the.name == buttonId).price;

    //if the item is already added, it doesnt adds it. otherwhise it does.
    if(cart.find(item=>item.getName() === name) === undefined || cart.length === 0){
        cart.push(new Item(name,price));
        cartPrice+= price;
        console.log(name+" added to cart.\nYour cart price is: "+cartPrice+" \n-------------------------");
    }
    else{
        alert(name+" already added to cart!");
        console.log(name+" already added to cart!");
    }
    //update the cart
    showCart();
}));



