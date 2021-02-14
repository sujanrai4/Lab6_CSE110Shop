// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();
    // attach a shadow root to a custome element
    let shadowRoot = this.attachShadow({mode: 'open'});
    // create product items as LI tags
    let liElement = document.createElement('li');
    liElement.setAttribute('class', 'product');

    // create img element
    let imgElement = document.createElement('img');
    imgElement.setAttribute('width', '200');
    imgElement.src = this.getAttribute('src');
    imgElement.alt = this.getAttribute('alt');
    liElement.appendChild(imgElement);

    // create two p elements as children of liElement
    let p1Element = document.createElement('p');
    p1Element.setAttribute('class', 'title');
    liElement.appendChild(p1Element);
    
    let p2Element = document.createElement('p');
    p2Element.setAttribute('class', 'price');
    liElement.appendChild(p2Element);

    // create a button element
    let buttonElement = document.createElement('button');
    buttonElement.textContent = 'Add to Cart';
    // make onclick event to respond the function updateCart
    buttonElement.setAttribute('onclick', 'updateShoppingCart(this)');
    liElement.appendChild(buttonElement);

    // make liElement as a child of shadowRoot
    shadowRoot.appendChild(liElement);

    // create style element
    let shadowStyle = document.createElement('style');
    shadowStyle.textContent = `
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }`;
  // apply shadowStyle to shadowRoot
  shadowRoot.appendChild(shadowStyle);
  }

}

customElements.define('product-item', ProductItem);