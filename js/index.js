let cartPrice = 0;
let cart = [];

//adds an item to cart and adds the price of the item to cartPrice
function addToCart(item,itemPrice){
    let checkCartItems;
    cartPrice+= itemPrice;
    console.log("Your cart price is: "+cartPrice)
    cart.push(item);
    console.log(item+" added to cart");
    checkCartItems = prompt("Do you want to see your cart items? YES/NO").toLowerCase();
    if(checkCartItems === "yes")
        showCartItems();
}
//deletes an item from cart and deletes the price of the item from cartPrice -- NOT USED YET
function deleteFromCart(item, itemPrice){
    cartPrice -= itemPrice;
    cart.filter(item);
    console.log(item+" deleted from cart");
}
//shows all the items from the cart
function showCartItems(){
    alert("You have "+cart.length + " item/s in your cart. Check the console for more info");
    console.log("-----ITEMS LIST-----");
    for(let i = 0 ; i<cart.length ; i++){
        console.log(cart[i]);
    }
    console.log("---ENDS OF ITEMS LIST---");
}