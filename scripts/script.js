/**
 * script.js
 * References: https://www.w3schools.com/jsref/jsref_from.asp
 *             https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String
 *             https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 *              
 *  */ Script.js

// create a Set of products(objects), cart, that will update the items in the shopping Cart
var cart = new Set(); 
window.addEventListener('DOMContentLoaded', () => {
  console.log('Hello');
  // create a Set of products(objects), cart, that will update the items in the shopping Cart
  if(localStorage.getItem('itemArr') == null) {
    // first time fetching the JSon data file
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => localStorage.setItem('itemArr', JSON.stringify(data)));
      //loop through the data and add each item as children of shadowRoot
      let count = 0;
      let itemArrString = JSON.stringify(localStorage.getItem('itemArr'));
      for(count; count < itemArrString.length; count++) {
        let item = itemArrString[count];
        let product = document.createElement('product-item');
        product.shadowRoot.children[0].children[0].src = item.image;
        product.shadowRoot.children[0].children[0].alt = item.title;
        product.shadowRoot.children[0].children[1].innerHTML = item.title;
        product.shadowRoot.children[0].children[2].innerHTML = '$' + item.price;

        // assign an id to check if the item is in the cart later on
        product.shadowRoot.children[0].children[3].setAttribute('id', item.id);
      }
  } else {
    // load the cart from localStorage to update the shopping cart
    cart = new Set(JSON.parse(localStorage.getItem('cart')));
    // update the cart count
    document.getElementById('cart-count').innerHTML = cart.size;
    // load product array from the localStorage into new string array
    let stringArray = JSON.parse(localStorage.getItem('itemArr'));
    let count = 0;
    console.log('Hello');
    for(count; count < stringArray.length; count++) {
      const item = stringArray[count];
      let product = document.createElement('product-item');
      console.log('Hello');
      product.shadowRoot.children[0].children[0].src = item.image;
      product.shadowRoot.children[0].children[0].alt = item.title;
      product.shadowRoot.children[0].children[1].innerHTML = item.title;
      product.shadowRoot.children[0].children[2].innerHTML = '$' + item.price;

      // assign an id to check if the item is in the cart later on
      product.shadowRoot.children[0].children[3].setAttribute('id', item.id);
      // check if the item is already in the shopping cart. if it is set button to read removed from cart
      if(cart.has(String(item.id))) {
        product.shadowRoot.children[0].children[3].innerHTML = 'Remove from Cart';
      }
      document.getElementById('product-list').appendChild(product);
    } 
  }


    
});
function updateCart(event) {
  if(cart.has(event.id)) {
    cart.delete(event.id);
    event.innerHTML = 'Add to Cart';
  } else {
    cart.add(event.id);
    event.innerHTML = 'Remove from Cart';
  }
  // update the cart count after each load
  document.getElementById('cart-count').innerHTML = cart.size;
  // update localStorage. Array.from() will convert iterable cart into 
  //array object and stringify will convert into JSON strings
  localStorage.setItem('cart', JSON.stringify(Array.from(cart)));
}