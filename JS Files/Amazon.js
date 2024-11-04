import { products,cart,DeliveryOption } from "./products.js";
import {CartQuantity} from "./functions.js";

let ProductHTML = '';
products.forEach((product)=>{
    ProductHTML+=`<div class="content">
    <div class="product-img"><img src="../Images/${product.image}" alt=""></div>
    <div class="product-name">${product.name}</div>
    <div>
        <div class="product-price">$${(product.priceCents/100).toFixed(2)}</div>
        <select class="product-quantity">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        </select></div>
    <div class="product-added"></div>
    <div class="product-add js-add-to-cart" data-product-id="${product.id}"><button>Add to cart</button></div>
</div>`;
})

let PageContent = document.querySelector('.main');
PageContent.innerHTML = `${ProductHTML}`;
const Added = document.querySelectorAll('.product-added');
let cartqty = document.querySelector('.js-cart-quantity');

document.querySelectorAll('.js-add-to-cart').forEach((button,index) => {
    button.addEventListener('click',()=>{
        Added[index].innerHTML = `<button class="checkmark">&check;</button> <span>Added</span>`;
        setTimeout(() => {
            Added[index].innerHTML = '';
        }, 2000);

        let ProductId = button.dataset.productId;
        let qty =document.querySelectorAll('.product-quantity');
        let items_count = qty[index].options[qty[index].selectedIndex].value;
        let MatchingItem;

            cart.forEach((name)=>{
            if(name.ProductId == ProductId){
                MatchingItem = name;
            }
            
        })
        if(MatchingItem){
            MatchingItem.Quantity += Number(items_count);
            
        }
        else{
            
            cart.push({
                ProductId: ProductId,
                Quantity: Number(items_count),
                DeliveryDateId: '1'
            });
        }
        localStorage.setItem('cart',JSON.stringify(cart));
        
        
        cartqty.innerHTML = Number(`${CartQuantity(cart)}`);
    })
});
cartqty.innerHTML = Number(`${CartQuantity(cart)}`);

const Hamburger_icon = document.querySelector('.Toggle_btn')
let Flag = true
Hamburger_icon.addEventListener('click',()=>{
    if (Flag){

        document.querySelector('.Dropdown').style.display = 'block'
        Flag=false
    }

    else{

        document.querySelector('.Dropdown').style.display = 'none'
        Flag=true
    }
})

