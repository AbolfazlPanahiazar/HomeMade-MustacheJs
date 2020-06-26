// Get products from files
let products;
$.ajax({
  dataType: "json",
  url: "../data/products.json",
}).done((response) => {
  products = response;
  renderProducts();
});

// Render products fucntion
function renderProducts() {
  const template = `<div class="product"><div class="product__header">{{name}}</div><img src="./images/products/{{pic}}" alt="product" class="product__img" /><div class="product__price">Price: {{price}} coins</div><button  class="product__button">Buy it</button></div>`;

  for (let product of products) {
    $("#main").append(Mustache.render(template, product));
  }

  $(".product__button").click(buyButton);
}

// Some base stuff
let isLoged = false;
let logedUser;
function renderStatus() {
  $("#statusbar").html("");
  if (isLoged) {
    const template = `<div class="statusbar__member">
    <span class="statusbar__member--name">UserName: {{userName}} //</span>
    <span class="statusbar__member--name">Coins: {{coins}}</span>
  </div>
  <div class="stautsbar__bottons">
    <button id='logOut' class="statusbar__button">Log Out</button>
  </div>`;

    for (let user of users) {
      if (user.userName == logedUser) {
        $("#statusbar").append(Mustache.render(template, user));
        $("#logOut").click(logOutButton);
        break;
      }
    }
  } else {
    const template = $(`<button id="logIn" class="statusbar__button">Log in</button>`);
    $("#statusbar").append(template);
    $("#logIn").click(loginButton);
  }
}

// Get users form files
let users;
$.ajax({
  dataType: "json",
  url: "../data/users.json",
}).done((response) => {
  users = response;
  renderStatus();
});

// Log in stuff
$("#logIn").click(loginButton);

function loginButton() {
  Swal.mixin({
    confirmButtonText: "Next &rarr;",
    showCancelButton: true,
    progressSteps: ["UN", "PW"],
    customClass: "swal-wide",
  })
    .queue([
      {
        input: "text",
        title: "UserName",
        text: "Enter your username:",
      },
      {
        input: "password",
        title: "PassWord",
        text: "Enter your password:",
      },
    ])
    .then((result) => {
      let un = result["value"][0];
      let pw = result["value"][1];
      for (let user of users) {
        if (user.userName == un && user.passWord == pw) {
          isLoged = true;
          logedUser = user.userName;
          renderStatus();
          return;
        }
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid username or password!",
        customClass: "swal-wide",
      });
    });
}

// log out button
function logOutButton() {
  isLoged = false;
  logedUser = null;
  renderStatus();
}

// but button
function buyButton() {
  if (isLoged) {
    // get user
    let customer;
    for (let user of users) {
      if (user.userName == logedUser) {
        customer = user;
        break;
      }
    }
    // Get product
    let productName = $($(this).parent()[0]).children()[0].innerText;
    let product;
    for (let p of products) {
      if (productName == p.name) {
        product = p;
        break;
      }
    }
    // check for having enought money
    if (+customer.coins < +product.price) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You don't have enogh coins!",
        customClass: "swal-wide",
      });
    } else {
      customer.coins = String(+customer.coins - +product.price);
      renderStatus();
      Swal.fire({
        icon: "success",
        title: "congrag...",
        text: `You bought a ${product.name}`,
        customClass: "swal-wide",
      });
      console.log(`${customer.userName} bought a ${product.name}`);
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You should log in first!",
      customClass: "swal-wide",
    });
  }
}
