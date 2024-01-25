let cartPrice = 0;
let cart= [];

//adds an item to cart and adds the price of the item to cartPrice
function addToCart(itemName,itemPrice){
    let checkCartItems;
    cartPrice+= itemPrice;
    console.log("Your cart price is: "+cartPrice)
    cart.push(itemName);
    console.log(itemName+" added to cart");
}
//when clicks on cart icon shows all the items from the cart on the console
function showCartItems(){
    alert("You have "+cart.length + " item/s in your cart. Check the console for more info");
    console.log("-----ITEMS LIST-----");
    for(let i = 0 ; i<cart.length ; i++){
        console.log(cart[i]);
    }
    console.log("---ENDS OF ITEMS LIST---");
}