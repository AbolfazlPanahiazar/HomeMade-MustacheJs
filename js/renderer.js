// Get products from files
let products;
$.ajax({
  dataType: "json",
  url: "../data/products.json",
}).done((response) => {
  products = response;
  renderProducts(products);
});

// Render products fucntion
function renderProducts(products) {
  const template = `<div class="product"><div class="product__header">{{name}}</div><img src="./images/products/{{pic}}" alt="product" class="product__img" /><div class="product__price">Price: {{price}} coins</div><button class="product__button">Buy it</button></div>`;

  for (let product of products) {
    $("#main").append(Mustache.render(template, product));
  }
}

// Some base stuff
let isLoged = false;
let logedUser;

function renderStatus(users) {
  if (isLoged) {
    const template = `<div class="statusbar__member">
    <span class="statusbar__member--name">UserName: {{userName}} //</span>
    <span class="statusbar__member--name">Coins: {{coins}}</span>
  </div>
  <div class="stautsbar__bottons">
    <button class="statusbar__button">Bought Stuff</button>
    <button class="statusbar__button">Log Out</button>
  </div>`;

    for (let user of users) {
      if (user.userName == logedUser) {
        $("#statusbar").append(Mustache.render(template, user));
        break;
      }
    }
  } else {
    const template = $(`<button id="logIn" class="statusbar__button">Log in</button>`);
    $("#statusbar").append(template);
  }
}

// Get users form files
let users;
$.ajax({
  dataType: "json",
  url: "../data/users.json",
}).done((response) => {
  users = response;
  renderStatus(users);
});

// Log in stuff
$("#logIn").click(() => {
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
      console.log(un, pw);
    });
});
