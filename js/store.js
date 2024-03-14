let cartPrice = 0;
let cart = [];
const cartBtn = document.getElementById("cartBtn");
const cartInfo = document.getElementById("cartInfo");
const cartSpan = document.getElementById("cartLength");
const cartList = document.getElementById("cartList");
const clearBtn = document.getElementById("clearButton");
const totalCartPrice = document.getElementById("totalCartPrice");
const msg = document.getElementById("message");
const checkOutBtn = document.getElementById("checkOutButton");
const checkOutMsg = document.getElementById("checkOutMessage");
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const productsUrl = "../json/products.json";

let products = [];

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  getName() {
    return this.name;
  }
  getPrice() {
    return this.price;
  }
}

async function loadProducts() {
  try {
    const response = await fetch(productsUrl);
    const productsJSON = await response.json();
    for (const item of productsJSON) {
      products.push({
        name: item.name,
        price: item.price,
        img: item.img,
      });
    }
    loadCards();
  } catch (error) {
    console.log(error);
  }
}

//FUNCTIONS
// removes a single item from the cart by its index and substract its price from cartPrice.
function removeFromCart(index) {
  let itemToRemove = cart[index];
  cartPrice -= itemToRemove.getPrice();
  cart.splice(index, 1);
  Toast.fire({
    icon: "warning",
    title: itemToRemove.name + " deleted from Cart!",
  });
  // Updates the cart
  updateCart();
}

//adds an item to cart,if its not already added, and adds the price of the item to cartPrice.
function addToCart(productName) {
  let name = products.find((the) => the.name == productName).name;
  let price = products.find((the) => the.name == productName).price;

  //if the item is already added, it doesnt adds it. otherwhise it does.
  if (
    cart.find((item) => item.getName() === name) === undefined ||
    cart.length === 0
  ) {
    let newProduct = new Item(name, price);
    cart.push(newProduct);
    cartPrice += price;
    Toast.fire({
      icon: "success",
      title: name + "Added to Cart!",
    });
  } else {
    Toast.fire({
      icon: "warning",
      title: name + " already in the Cart!",
    });
  }
  //update the cart
  updateCart();
}

// Shows the products in the cart display.
function updateCart() {
  //updates the price of the cart.
  totalCartPrice.textContent = `$${cartPrice}`;

  //cleans the cartList
  cartList.innerHTML = "";

  //iterates on the cart products and shows them
  cart.forEach(function (product, index) {
    const cartItem = document.createElement("li");
    cartItem.textContent = `${product.getName()} - $${product.getPrice()}`;

    //add a button to remove a single product
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      removeFromCart(index);
    });
    cartItem.appendChild(removeBtn);
    cartList.appendChild(cartItem);
  });
  cartSpan.textContent = cart.length > 0 ? cart.length : "0";
  cart.length > 0
    ? (checkOutBtn.style.display = "block")
    : (checkOutBtn.style.display = "none");
  localStorage.setItem("cart", JSON.stringify(cart));
}

//Adds the cards with the product name, image and price to the DOM.
function addCards(initialRange, finalRange, container) {
  for (let i = initialRange; i <= finalRange; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.src = products[i].img;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card-body");
    cardDiv.id = products[i].name;

    const cardDivTitle = document.createElement("h5");
    cardDivTitle.classList.add("card-title");
    cardDivTitle.textContent = products[i].name;
    cardDiv.appendChild(cardDivTitle);

    const cardDivP = document.createElement("p");
    cardDivP.classList.add("card-text");
    cardDivP.textContent = `$${products[i].price}USD`;
    cardDiv.appendChild(cardDivP);

    const cardDivButton = document.createElement("button");
    cardDivButton.classList.add("btn", "btn-primary");
    cardDivButton.id = "buyButton";
    cardDivButton.textContent = "Buy";
    cardDiv.appendChild(cardDivButton);

    card.appendChild(cardImage);
    card.appendChild(cardDiv);
    container.appendChild(card);
  }
}

//Adds the cards with the product name, image and price to the carrousel on the DOM.
function addCardsToCarousel(initialRange, finalRange, container) {
  let i = initialRange;
  const card = document.createElement("div");
  card.classList.add("carousel-item", "active");
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
  for (i; i <= finalRange; i++) {
    const card = document.createElement("div");
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

//clears the storage and the cart, then locates the window to the login.
function checkOut() {
  localStorage.clear();
  cart.splice(0, cart.length);
  updateCart();
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2000);
}
//EVENTS

//Removes all items from cart and set cartPrice to 0
clearBtn.addEventListener("click", function () {
  //checks if the cart is empty, if its not it removes all and set the cartprice to 0
  cart.length > 0 ? cart.splice(0, cart.length) : "";
  cartPrice = 0;
  Toast.fire({
    icon: "warning",
    title: "Cart cleared!",
  });
  //Updates the cart
  updateCart();
});

//Displays the cart when cart icon is clicked
cartBtn.addEventListener("click", function () {
  cartInfo.style.display =
    cartInfo.style.display === "none" || cartInfo.style.display === ""
      ? "block"
      : "none";
  updateCart();
});

//Event manager for "Buy" button
document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("btn")) {
    addToCart(event.target.previousElementSibling.parentNode.id);
  }
});

//displays a checking out message.
checkOutBtn.addEventListener("click", () => {
  //creates the checking out message
  if (cart.length > 0) {
    cartInfo.style.display = "none";
    Swal.fire({
      title: "You have " + cart.length + " items!",
      icon: "warning",
      text: "Do you want to checkout?",
      confirmButtonText: "yup",
      showCancelButton: true,
      cancelButtonText: "nope",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Thanks for your purchase!",
          showConfirmButton: false,
          timer: 1000,
        });
        checkOut();
      } else {
      }
    });
  } else {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "warning",
      title: "Cart Empty!",
    });
  }
});

//Starting DOM cards and carousels
function loadCards() {
  //Adding the snowboard cards to the snowboards carrousel
  const burtonSB = document.getElementById("burtonSnowboards");
  addCardsToCarousel(0, 2, burtonSB);
  const capitaSB = document.getElementById("capitaSnowboards");
  addCardsToCarousel(3, 5, capitaSB);
  const salomonSB = document.getElementById("salomonSnowboards");
  addCardsToCarousel(6, 8, salomonSB);

  //Adding the goggles cards
  const goggles = document.getElementById("goggles");
  addCards(9, 14, goggles);

  //Adding the boots cards to the boots carrousel
  const burtonB = document.getElementById("burtonBoots");
  addCardsToCarousel(15, 17, burtonB);
  const dcB = document.getElementById("dcBoots");
  addCardsToCarousel(18, 20, dcB);
  const salomonB = document.getElementById("salomonBoots");
  addCardsToCarousel(21, 23, salomonB);

  //Adding the helmets cards.
  const helmets = document.getElementById("helmets");
  addCards(24, 29, helmets);

  //Adding the bindings cards to the bindings carrousel
  const burtonBi = document.getElementById("burtonBi");
  addCardsToCarousel(30, 32, burtonBi);
  const clewBi = document.getElementById("clewBi");
  addCardsToCarousel(33, 34, clewBi);
  const salomonBi = document.getElementById("salomonBi");
  addCardsToCarousel(35, 37, salomonBi);
}

loadProducts();
