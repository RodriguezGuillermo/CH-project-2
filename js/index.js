let cartPrice = 0;
let cart= [];

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

//adds an item to car,if its not already added, and adds the price of the item to cartPrice.
function addToCart(elem){
    let prodId = elem.parentNode.id;
    let name = products.find(the => the.name == prodId).name;
    let price = products.find(the => the.name == prodId).price;

    if(cart.find(item=>item.getName() === name) === undefined || cart.length === 0){
        cart.push(new Item(name,price));
        cartPrice+= price;
        console.log(name+" added to cart");
        console.log("Your cart price is: "+cartPrice);
        console.log("-------------------------");
    }
    else{
        alert(name+" already added to cart!");
        console.log(name+" already added to cart!");
    }
}

//removes an item from the cart, if it exists, and subtracts it value from the cartPrice.--NOT USED YET
function removeFromCart(itemName){
    const itemToRemove = cart.find((item)=>item.getName() === itemName);
    if(itemToRemove != undefined){
        cart.splice(cart.indexOf(itemToRemove),1);
        cartPrice -= itemToRemove.getPrice();
        console.log(itemName+" removed from cart and cartprice is: "+cartPrice); 
        console.log("-------------------------");
    }
}

//Removes all items from cart --- NOT USED YET
function removeAll() {
    console.clear();
    cart.splice(0, cart.length); 
    cartPrice = 0; 
    console.log("Cart is empty!");
    console.log("-------------------------");
}

//When clicks on cart icon shows all the items from the cart on the console
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

//Shows the cart when the cart icon is clicked
document.addEventListener('DOMContentLoaded', function () {
    const cartBtn = document.getElementById('cartBtn');
    const cartInfo = document.getElementById('cartInfo');

    cartBtn.addEventListener('click', function () {
        // Toggle (alternar) la visibilidad del carrito
        if (cartInfo.style.display === 'none' || cartInfo.style.display === '') {
            cartInfo.style.display = 'block';
        } else {
            cartInfo.style.display = 'none';
        }
    });
});
