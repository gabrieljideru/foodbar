// Header

const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 80);
});

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navlist.classList.remove("open");
};

// Shopping Cart

let iconCart = document.querySelector(".bxs-cart");
let closeCart = document.querySelector(".close");
let body = document.querySelector("body");
let listProductHTML = document.querySelector(".menu-content");
let listCartHTML = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".nav-icons span");

let listProducts = [];
let carts = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const addDataToHTML = () => {
  listProductHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("row");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
          <img src="p1.png" alt="Pizza" />
          <h3>${product.name}</h3>
          <p>${product.desc}</p>
          <div class="in-text">
            <div class="price">
              <h6>$${product.price}</h6>
            </div>
            <div class="s-btn">
              <a href="#">Order Now</a>
            </div>
          </div>
          `;
      listProductHTML.appendChild(newProduct);
    });
  }
};

listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.closest(".s-btn")) {
    event.preventDefault();
    let productRow = positionClick.closest(".row");
    let product_id = productRow.dataset.id;
    addToCart(product_id);
  }
});

const addToCart = (product_id) => {
  let indexPosition = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (carts.length <= 0) {
    carts = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (indexPosition < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    carts[indexPosition].quantity = carts[indexPosition].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

const addCartToHTML = () => {
  let totalQuantity = 0;
  listCartHTML.innerHTML = "";
  if (carts.length > 0) {
    carts.forEach((cart) => {
      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cart.product_id;
      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.product_id
      );
      if (positionProduct !== -1) {
        let info = listProducts[positionProduct];
        newCart.innerHTML = `
          <div class="image">
                <img src="p1.png" alt="" />
              </div>
              <div class="name">${info.name}</div>
              <div class="totalPrice">$${info.price * cart.quantity}</div>
              <div class="quantity">
                <span class="minus"><</span>
                <span>${cart.quantity}</span>
                <span class="plus">></span>
              </div>
          `;
        listCartHTML.appendChild(newCart);
        totalQuantity += cart.quantity;
      }
    });
  }
  iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantity(product_id, type);
  }
});

const changeQuantity = (product_id, type) => {
  let positionItemInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    switch (type) {
      case "plus":
        carts[positionItemInCart].quantity =
          carts[positionItemInCart].quantity + 1;
        break;

      default:
        let valueChange = carts[positionItemInCart].quantity - 1;
        if (valueChange > 0) {
          carts[positionItemInCart].quantity = valueChange;
        } else {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
};

const initApp = () => {
  //get data from json
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML();

      //get cart from memory
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};

initApp();

// Scroll Reveal

const sr = ScrollReveal({
  origin: "top",
  distance: "85px",
  duration: 2500,
  reset: true,
});

sr.reveal(".home-text", { delay: 300 });
sr.reveal(".wrapper", { delay: 400 });

sr.reveal(".menu", { delay: 300 });

sr.reveal(".wrapper-about", { delay: 300 });
sr.reveal(".about-text", { delay: 400 });
sr.reveal(".container", { delay: 400 });

sr.reveal(".review", { delay: 300 });

sr.reveal(".contact", { delay: 300 });
