let cartPrice = 0;
let cart= [];
const cartBtn = document.getElementById('cartBtn');
const cartInfo = document.getElementById('cartInfo');
const cartSpan = document.getElementById('cartLength');
const cartList = document.getElementById('cartList');
const clearBtn = document.getElementById('clearButton');
const totalCartPrice = document.getElementById('totalCartPrice');
const msg = document.getElementById("message");
const checkOutBtn = document.getElementById('checkOutButton');
const checkOutMsg = document.getElementById('checkOutMessage');
const confirmCheckOut = document.getElementById('confirmButton');
const cancelCheckOut = document.getElementById('cancelButton');


let products = 
    [
        //SNOWBOARDS
        //Burton brand
        {name:'Burton Family Tree Grill Master',price:600 , img: '../images/Snowboards/Burton/burtonFamilyTreeGrillMaster.webp'},
        {name:'Burton Mystery HometownHero',price:700 , img:'../images/Snowboards/Burton/burtonMysteryHometownHero.webp'},
        {name:'Burton Throwback SB',price:500, img:'../images/Snowboards/Burton/burtonThrowbackSB.webp'},
        //Capita brand
        {name:'Capita Aeronaut',price:650, img: '../images/Snowboards/Capita/capitaAeronaut.webp'},
        {name:'Capita DOA',price:800, img: '../images/Snowboards/Capita/capitaDOA.webp'},
        {name:'Capita Paradise',price:550, img: '../images/Snowboards/Capita/capitaParadise.webp'},
        //Salomon brand
        {name:'Salomon Assasin',price:750, img: '../images/Snowboards/Salomon/salomonAssasin.webp'},
        {name:'Salomon Assasin Pro',price:800, img: '../images/Snowboards/Salomon/salomonAssasinPro.webp'},
        {name:'Salomon Rumble Fish',price:750, img: '../images/Snowboards/Salomon/salomonRumbleFish.webp'},

        //GOGGLES
        {name:'Anon Helix',price:300,img:'../images/Goggles/anonHelix.webp'},
        {name:'Anon M4',price:350,img:'../images/Goggles/anonM4.webp'},
        {name:'Anon M4s',price:325,img:'../images/Goggles/anonM4s.webp'},
        {name:'Anon Nesa',price:280,img:'../images/Goggles/anonNesa.webp'},
        {name:'Anon Sync',price:350,img:'../images/Goggles/anonSync.webp'},
        {name:'Anon SyncL',price:300,img:'../images/Goggles/anonSyncLow.webp'},

        //BOOTS
        //Burton brand
        {name:'Burton Ion StepOn',price:300, img: '../images/Boots/Burton/burtonIonStepOn.webp'},
        {name:'Burton Photon StepOn',price:350, img: '../images/Boots/Burton/burtonPhotonStepOn.webp'},
        {name:'Burton Swath StepOn',price:290, img: '../images/Boots/Burton/burtonSwathStepOn.webp'},
        //DC brand
        {name:'DC Judge StepOn',price:350, img: '../images/Boots/DC/dcJudgeStepOn.jpg'},
        {name:'DC PhasePro StepOn',price:350, img: '../images/Boots/DC/dcPhaseProStepOn.jpg'},
        {name:'DC Premier Hybrid',price:300, img: '../images/Boots/DC/dcPremierHybrid.jpg'},
        //Salomon brand
        {name:'Salomon Dialogue',price:250, img: '../images/Boots/Salomon/salomonDialogue.webp'},
        {name:'Salomon Dialogue Dual',price:300, img: '../images/Boots/Salomon/salomonDialogueDual.webp'},
        {name:'Salomon Launch',price:350, img: '../images/Boots/Salomon/salomonLaunch.webp'},

        //HELMETS
        {name:'Anon Echo',price:350,img:'../images/Helmets/anonEcho.webp'},
        {name:'Anon Merak',price:370,img:'../images/Helmets/anonMerak.webp'},
        {name:'Anon Merak Wavecel',price:325,img:'../images/Helmets/anonMerakWavecel.webp'},
        {name:'Anon Raider',price:380,img:'../images/Helmets/anonRaider.webp'},
        {name:'Anon Rime',price:300,img:'../images/Helmets/anonRime.webp'},
        {name:'Anon Rodan',price:300,img:'../images/Helmets/anonRodan.webp'},

        //BINDINGS
        //Burton brand
        {name:'Burton MissionRe',price:250, img: '../images/Bindings/Burton/burtonMissionRe.webp'},
        {name:'Burton StepOn Genesis',price:300, img: '../images/Bindings/Burton/burtonStepOnGenesis.webp'},
        {name:'Burton StepOn Re',price:290, img: '../images/Bindings/Burton/burtonStepOnRe.webp'},
        //Clew brand
        {name:'Clew Freedom Black',price:200, img: '../images/Bindings/Clew/clewFreedomBlack.webp'},
        {name:'Clew Freedom White',price:220, img: '../images/Bindings/Clew/clewFreedomWhite.webp'},
        //Salomon brand
        {name:'Salomon District',price:250, img: '../images/Bindings/Salomon/salomonDistrict.webp'},
        {name:'Salomon Mirage',price:300, img: '../images/Bindings/Salomon/salomonMirage.webp'},
        {name:'Salomon Rhythm',price:300, img: '../images/Bindings/Salomon/salomonRhythm.webp'},
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

//shows all the items from the cart on the console --- BORRAR DESPUES DE ENTREGA 3
function updateCartItems(){
    console.clear();
    if(cart.length>0){
        for(const items of cart){
            console.log(items.getName());
        }
    }
    else{
        console.log("Your cart is empty!");
    }
}

// removes a single item from the cart by its index and substract its price from cartPrice.
function removeFromCart(index) {
    let itemToRemove =cart[index];
    cartPrice -= itemToRemove.getPrice();
    showMessage(itemToRemove.getName(),2)
    cart.splice(index, 1);
    // Updates the cart
    updateCart();
}

// Shows the products in the cart display.
function updateCart() {
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

    localStorage.setItem('cart',JSON.stringify(cart));
}

//Displays the cart when cart icon is clicked
cartBtn.addEventListener('click', function () {
    cartInfo.style.display = (cartInfo.style.display === 'none' || cartInfo.style.display === '') ? 'block' : 'none';
    updateCart();
});

//Removes all items from cart and set cartPrice to 0
clearBtn.addEventListener('click',function(){
    //checks if the cart is empty, if its not it removes all and set the cartprice to 0
    cart.length > 0 ? cart.splice(0, cart.length) : '';
    showMessage('',3)
    cartPrice = 0;

    //Updates the cart
    updateCart();
});

//adds an item to cart,if its not already added, and adds the price of the item to cartPrice.
function addToCart(productName){
    let name = products.find(the => the.name == productName).name;
    let price = products.find(the => the.name == productName).price;

    //if the item is already added, it doesnt adds it. otherwhise it does.
    if(cart.find(item=>item.getName() === name) === undefined || cart.length === 0){
        let newProduct = new Item(name,price);        

        cart.push(newProduct);
        cartPrice+= price;
    }
    else{
        showMessage(name,1);
    }
    //update the cart
    updateCart();
}


//Show the massage on a 'p' element when you clicl a certain button
function showMessage(name,type){
    const message = document.createElement('p');
    message.id = 'message';
    message.style.display = 'block'

    switch(type){
        case 1:
            message.textContent = name+' already added to cart!';
            message.style.left = '10px';
            message.style.maxWidth = '40vw'
            break;
        case 2:
            message.textContent = name+' deleted from cart!';
            message.style.left = '400px';
            message.style.maxWidth = '40vw'
            break;
        case 3:
            message.textContent = 'Cart Empty';
            message.style.left = '1000px';
            message.style.maxWidth = '10vw'
            break;
        case 4: 
        message.textContent = 'Your cart is empty!'
            message.style.left = '1400px';
            message.style.maxWidth = '15vw'
            break;
    }
    document.getElementById('messageDiv').append(message);
    setTimeout(()=>{ message.style.bottom = '5vw';},0);
   
    
    setTimeout(()=>{
        message.style.bottom = '-5vw';
    },1500);

    setTimeout(()=> {message.textContent = '';
    message.style.display = 'none';},2000);
       
}

//Event manager for "Buy" button 
document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('btn')) {
        addToCart(event.target.previousElementSibling.parentNode.id);
    }
});

//Adds the cards with the product name, image and price to the DOM.
function addCards(initialRange,finalRange,container){
    for(let i = initialRange ; i <= finalRange; i++){
        const card = document.createElement('div');
        card.classList.add("card");
        card.innerHTML = `
                        <img src="${products[i].img}" class="card-img-top" alt="...">
                            <div class="card-body" id="${products[i].name}">
                            <h5 class="card-title">${products[i].name}</h5>
                            <p class="card-text">$${products[i].price}USD</p>
                            <button href="#" class="btn btn-primary" id="buyButton">Buy</button>
                        </div>
        `;
        container.appendChild(card);
        
    }
}

//Adds the cards with the product name, image and price to the carrousel on the DOM.
function addCardsToCarousel(initialRange,finalRange,container){
    let i = initialRange;
    const card = document.createElement('div');
    card.classList.add('carousel-item', 'active');
    card.innerHTML = `
                        <div class="card" >
                            <img src="${products[i].img}" class="card-img-top" alt="...">
                            <div class="card-body" id="${products[i].name}">
                                <h5 class="card-title">${products[i].name}</h5>
                                <p class="card-text" >$${products[i].price}USD</p>
                                <button href="#" class="btn btn-primary" id="buyButton">Buy</button>
                            </div>
                        </div>
    `;
    i++;
    container.appendChild(card);
    for(i ; i<=finalRange;i++){
        const card = document.createElement('div');
        card.classList.add("carousel-item");
        card.innerHTML = `
                            <div class="card" >
                                <img src="${products[i].img}" class="card-img-top" alt="...">
                                <div class="card-body" id="${products[i].name}">
                                    <h5 class="card-title">${products[i].name}</h5>
                                    <p class="card-text" >$${products[i].price}USD</p>
                                    <button href="#" class="btn btn-primary" id="buyButton">Buy</button>
                                </div>
                            </div>
        `;
        container.appendChild(card);
    }
}

//displays a checking out message.
checkOutBtn.addEventListener('click',()=>{
    //creates the checking out message
    if(cart.length>0){
        disableButtons(true);
        //hacer funcion para desabilitar todos los botones
        document.getElementById('titleContent').textContent = "Do you want to checkOut?"
        
        checkOutMsg.style.top = '25vw';
    }
    else{
        showMessage('',4);
    }
});

//when clicked, deletes localStorage, empty cart and redirects to login.
confirmCheckOut.addEventListener('click',()=>{
    localStorage.clear();
    cart.splice(0,cart.length);
    updateCart();
    window.location.href = '../index.html';
});

//when clicled removes checkout message
cancelCheckOut.addEventListener('click',()=>{
    checkOutMsg.style.top = '-40vw';
    setTimeout(()=>{
        disableButtons(false);
        document.getElementById('titleContent').textContent = '';},1000)
    
});

function disableButtons(bool){
    checkOutBtn.disabled = bool;
    clearBtn.disabled = bool;
    cartBtn.disabled = bool;
    document.getElementById('buyButton').disabled = bool;
}

//Adding the snowboard cards to the snowboards carrousel
const burtonSB = document.getElementById("burtonSnowboards");
addCardsToCarousel(0,2,burtonSB);
const capitaSB = document.getElementById("capitaSnowboards");
addCardsToCarousel(3,5,capitaSB);
const salomonSB = document.getElementById("salomonSnowboards");
addCardsToCarousel(6,8,salomonSB);

//Adding the goggles cards
const goggles = document.getElementById("goggles");
addCards(9,14,goggles);

//Adding the boots cards to the boots carrousel
const burtonB = document.getElementById("burtonBoots");
addCardsToCarousel(15,17,burtonB);
const dcB = document.getElementById("dcBoots");
addCardsToCarousel(18,20,dcB);
const salomonB = document.getElementById("salomonBoots");
addCardsToCarousel(21,23,salomonB);

//Adding the helmets cards.
const helmets = document.getElementById("helmets");
addCards(24,29,helmets);

//Adding the bindings cards to the bindings carrousel
const burtonBi = document.getElementById("burtonBi");
addCardsToCarousel(30,32,burtonBi);
const clewBi = document.getElementById("clewBi");
addCardsToCarousel(33,34,clewBi);
const salomonBi = document.getElementById("salomonBi");
addCardsToCarousel(35,37,salomonBi);

//set messages on hidden display
checkOutMsg.style.top = '-20vw';

