import { FormatCurrency } from "./functions.js";
import {cart,products,DeliveryOption} from "./products.js"
import 'https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js';

let Today = dayjs().format('dddd D');


let matchingItem = 0
    let matchingid = 0;
    let BeforeTax = 0;
    let AfterTax = 0;
    let Total = 0;
    let CartItem = 0;
    let HTMLEle = '';
    cart.forEach((cartitem)=>{
        products.forEach((Product)=>{
            if(cartitem.ProductId===Product.id)
                {
                    matchingItem += Number((Product.priceCents)*cartitem.Quantity)
                }
                
            })
        DeliveryOption.forEach((Delivery)=>{
            if(cartitem.DeliveryDateId==Delivery.id){
                matchingid+=Number(Delivery.priceCents)
            }
        })

    })
    BeforeTax = FormatCurrency(matchingItem+matchingid)
    AfterTax = FormatCurrency(BeforeTax*10)
    Total = (Number(BeforeTax)+Number(AfterTax)).toFixed(2);

    cart.forEach((item)=>{
        CartItem+=Number(item.Quantity)
    })
document.querySelector('.js-cart-quantity').innerHTML = CartItem;

function AddProducts(){
    let addEle ='';
    cart.forEach(element => {
        let ArrivingDate;
        DeliveryOption.forEach(date => {
            if(element.DeliveryDateId == date.id){
                ArrivingDate = dayjs().add(`${date.DeliveryDays}`, 'days').format('dddd, MMMM  D')
            }
        });
        products.forEach(item => {
            if(element.ProductId == item.id){
                addEle+=`<div class="content-body">
    <div class="product-img">
        <img width="100" height="100" src="../Images/${item.image}" alt="">
        </div>
        <div class="product-details">
        <div class="product-name">
            ${item.name}
            </div>
            <div class="product-delivery">
            Arriving on: ${ArrivingDate}
        </div>
        <div class="qty">Quantity: ${element.Quantity}</div>
        <div class="buy-again">
        <button>Buy it again</button>
        </div>
    </div>
    <div class="track-order">
    <a href="../HTML Files/trackorder.html">
    <button class="btn">Track Order</button>
    </a>
    </div>
    </div>`
            }
        });
    });
    return addEle
}
    HTMLEle+=`
        <div class="container">
        <div class="content-header">
        <div class="content-header-left">
        <div class="order-date">
        <div>Order Placed:</div>
        <div>${Today}</div>
        </div>
        <div class="order-total">
        <div>Total:</div>
        <div>$${Total}</div>
                        </div>
                    </div>
                    <div class="content-header-right">
                        <div>Order ID:</div>
                        <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
                    </div>
                </div>
                ${AddProducts()}
                </div>`;


document.querySelector('.content').innerHTML = HTMLEle;