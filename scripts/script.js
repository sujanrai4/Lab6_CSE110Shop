/**
 * script.js
 * References: https://www.w3schools.com/jsref/jsref_from.asp
 *             https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String
 *             https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 *              
 */ 

// create a Set of products(objects), shoppingCart, that will update the items in the shopping Cart
var shoppingCart = new Set(); 
window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('itemArr') == null) {
    // first time fetching the JSon data file
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => localStorage.setItem('itemArr', JSON.stringify(data)));
      //loop through the fetched data
      let count = 0;
      let itemArrString = JSON.stringify(localStorage.getItem('itemArr'));
      for(count; count < itemArrString.length; count++) {
        let item = itemArrString[count];
        // create a custome element 'product-item' for each item from the data
        let product = document.createElement('product-item');
        // reference the shadowRoot (the root child of the custome created element)
        let theRoot = product.shadowRoot.children[0]; 

        // set Image tag
        theRoot.children[0].src = item.image;
        theRoot.children[0].alt = item.title;
        // set first p tag (title)
        theRoot.children[1].innerHTML = item.title;
        //set second p tag (price)
        theRoot.children[2].innerHTML = '$' + item.price;
        // assign an id for a button element to check if item needs added or already added in the shoppingCart
        theRoot.children[3].setAttribute('id', item.id);
      }
  } else {
    // load the shoppingCart from localStorage to update the shopping cart
    shoppingCart = new Set(JSON.parse(localStorage.getItem('shoppingCart')));
    // update the cart count
    document.getElementById('cart-count').innerHTML = shoppingCart.size;
    // load product array from the localStorage into new string array
    let stringArray = JSON.parse(localStorage.getItem('itemArr'));
    let count = 0;
    for(count; count < stringArray.length; count++) {
      const item = stringArray[count];
      let product = document.createElement('product-item');
      let theRoot = product.shadowRoot.children[0];
      theRoot.children[0].src = item.image;
      theRoot.children[0].alt = item.title;
      theRoot.children[1].innerHTML = item.title;
      theRoot.children[2].innerHTML = '$' + item.price;
      //assign an id to a button to check if item needs added or already added in the shoppingCart
      theRoot.children[3].setAttribute('id', item.id);
      // check if the item is already in the shopping cart. if it is set button to read removed from cart
      if(shoppingCart.has(String(item.id))) {
        theRoot.children[3].innerHTML = 'Remove from Cart';
      }
      // add each product into the 'product-list' list one at a time
      document.getElementById('product-list').appendChild(product);
    } 
  }


    
});

function updateShoppingCart(event) {
  // check if the shoppingCart contains the same id that of the button clicked
  if(shoppingCart.has(event.id)) {
    // id of shoppingCart == id of button clicked, remove that item from the shoppingCart
    shoppingCart.delete(event.id);
    // update the button text to represent the item is not currently in the shoppingCart
    event.innerHTML = 'Add to Cart';
  } else {
    // id of shoppingCart != button id, add the item to the shoppingCart and update 
    //button text to represent item is already in the shoppingCart
    shoppingCart.add(event.id);
    event.innerHTML = 'Remove from Cart';
  }
  // update the shoppingCart count after each load
  document.getElementById('cart-count').innerHTML = shoppingCart.size;
  // update localStorage. Array.from() will convert iterable shoppingCart into 
  //array object and stringify will convert into JSON strings
  localStorage.setItem('shoppingCart', JSON.stringify(Array.from(shoppingCart)));
}