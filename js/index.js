let cartPrice = 0;
let cart= [];

let products = 
    [
        {kind : "snowboards",
        elements :[
            //Burton brand
            {id:'1', name:'Burton Family Tree',price:600},
            {id:'2', name:'Burton Mystery Hometown Hero',price:700},
            {id:'3', name:'Burton Throwback SB',price:500},
            //Capita brand
            {id:'4', name:'Capita Aeronaut',price:650},
            {id:'5', name:'Capita DOA',price:800},
            {id:'6', name:'Capita Paradise',price:550},
            //Salomon brand
            {id:'7', name:'Salomon Assasin',price:750},
            {id:'8', name:'Salomon Assasin Pro',price:800},
            {id:'9', name:'Salomon Rumble Fish',price:750},
        ]},
        {kind : "goggles",
        elements:[
            {id:'1', name:'Anon Helix',price:300},
            {id:'2', name:'Anon M4',price:350},
            {id:'3', name:'Anon M4s',price:325},
            {id:'4', name:'Anon Nesa',price:280},
            {id:'5', name:'Anon Sync',price:350},
            {id:'6', name:'Anon SyncL',price:300}
        ]},
        {kind : "boots",
        elements:[
            //Burton brand
            {id:'1', name:'Burton Ion StepOn',price:300},
            {id:'2', name:'Burton Photon StepOn',price:350},
            {id:'3', name:'Burton Swath StepOn',price:290},
            //DC brand
            {id:'4', name:'DC Judge StepOn',price:350},
            {id:'5', name:'DC PhasePro StepOn',price:350},
            {id:'6', name:'DC Premier Hybrid',price:300},
            //Salomon brand
            {id:'7', name:'Salomon Dialogue',price:250},
            {id:'8', name:'Salomon Dialogue Dual',price:300},
            {id:'9', name:'Salomon Launch',price:350},
        ]},
        {kind : "helmets",
        elements:[
            {id:'1', name:'Anon Echo',price:350},
            {id:'2', name:'Anon Merak',price:370},
            {id:'3', name:'Anon MW',price:325},
            {id:'4', name:'Anon Raider',price:380},
            {id:'5', name:'Anon Rime',price:300},
            {id:'6', name:'Anon Rodan',price:300}
        ]},
        {kind : "bindings",
        elements:[
            //Burton brand
            {id:'1', name:'Burton MissionRe',price:250},
            {id:'2', name:'Burton StepOn Genesis',price:300},
            {id:'3', name:'Burton StepOn Re',price:290},
            //Clew brand
            {id:'4', name:'Clew Freedom Black',price:200},
            {id:'5', name:'Clew Freedom White',price:220},
            //Salomon brand
            {id:'6', name:'Salomon District',price:250},
            {id:'7', name:'Salomon Mirage',price:300},
            {id:'8', name:'Salomon Rhythm',price:300},
        ]}
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
function addToCart(itemName,itemPrice){
    if(cart.find((item)=>item.getName() === itemName) === undefined || cart.length === 0){
        cart.push(new Item(itemName,itemPrice));
        cartPrice+= itemPrice;
        console.log(itemName+" added to cart");
        console.log("Your cart price is: "+cartPrice);
        console.log("-------------------------");
    }
    else{
        alert(itemName+" already added to cart!");
        console.log(itemName+" already added to cart!");
    }
}

//removes an item from the cart, if it exists, and subtracts it value from the cartPrice.
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
    cart.splice(0, cart.length); 
    cartPrice = 0; 
    console.log("Cart is empty!");
    console.log("-------------------------");
}

//When clicks on cart icon shows all the items from the cart on the console
function showCartItems(){
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


