// Get products from files
let products;
$.ajax({
  dataType: "json",
  url: "../data/products.json",
}).done((response) => {
  products = response;
  console.log(products);
  renderProducts(products);
});

// Render products fucntion
function renderProducts(products) {
  const template = `<div class="product"><div class="product__header">{{name}}</div><img src="./images/products/{{pic}}" alt="product" class="product__img" /><div class="product__price">Price: {{price}} coins</div><button class="product__button">Buy it</button></div>`;

  console.log("a");
  for (let product of products) {
    $("#main").append(Mustache.render(template, product));
  }
}
