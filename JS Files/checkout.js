import {FormatCurrency} from "./functions.js";
import { cart,products,DeliveryOption } from "./products.js";

function RenderProductData(){
let ProductSummaryHTML ='';
cart.forEach((CartItem)=>{
    let ProductId = CartItem.ProductId;
    let MatchingItem;
    products.forEach((product)=>{
        if(product.id === ProductId)
        {
            MatchingItem = product;
        }
    })

    const ProductDeliveryId = CartItem.DeliveryDateId;

    let MatchingId;

    DeliveryOption.forEach((option)=>{
        if(option.id==ProductDeliveryId)
        {
            MatchingId=option;
        }
    })

    let Today = dayjs();
    let CurrentDate = Today.add(MatchingId.DeliveryDays,'days').format('dddd, MMMM D')

    ProductSummaryHTML +=`<div class="product-box" data-product-box="${MatchingItem.id}">
                <div class="delivery-order-date">Delivery Date: <span class="js-delivery-date date">${CurrentDate}</span></div>
                <div class="product-details">
                    <div class="product-det">
                    <div class="img-box"><img src="../Images/${MatchingItem.image}" alt=""></div>
                    <div class="product-name"><div>${MatchingItem.name}</div>
                    <div>$${FormatCurrency(MatchingItem.priceCents)}</div>
                    <div>Quantity: <span class="Product-Quantity">${CartItem.Quantity}</span>
                    <span class="js-quantity"></span><span class="qty update">Update</span>
                <span class="qty del" data-product-del="${MatchingItem.id}">Delete</span></div>
                    </div>
                </div>
                <div>
                    <div class="delivery-option">
                        <div>Choose delivery option:</div>
                        ${DeliveryDate(MatchingItem,CartItem)}
                    </div>
                </div>
                </div>
            </div>`;
});

let Total_count=0;
let Amount = 0;
let position = 0;
let MainContent = document.querySelector('.product-summary');
MainContent.innerHTML = `${ProductSummaryHTML}`;
let ProductBox = document.querySelectorAll('.product-box');
let Del_Product = document.querySelectorAll('.del').forEach((del,index)=>{
    del.addEventListener('click',()=>{
       
            let ProductDelete = del.dataset.productDel;
    
        function DeleteProduct()
        {
            cart.forEach((cartitem,i)=>{
                if(cartitem.ProductId == ProductDelete)
                    {
                        position = i;
                    }
                    
                })
                cart.splice(`${position}`,1)
                localStorage.setItem('cart',JSON.stringify(cart));
                TotalItem();
                RenderPaymentData()
            }
            DeleteProduct();
            ProductBox[index].remove();
        }
       
        )
})
TotalItem();
let QtyNum = 0;
let UpdateQtyNum = document.querySelectorAll('.js-quantity');
let ProductQuantity = document.querySelectorAll('.Product-Quantity');
let InputQty = '<input class="InputQuantity" type="number">';
let InputQtyNum;
let UpdateQauntity = document.querySelectorAll('.update');

UpdateQauntity.forEach((Update,index)=>{
    Update.addEventListener('click',()=>{
        if(Update.innerHTML == 'Update')
        {
            UpdateQtyNum[index].innerHTML = `${InputQty}`;
            Update.innerHTML = 'Save';
        }
        else if(Update.innerHTML == 'Save')
        {
            InputQtyNum = document.querySelector('.InputQuantity');
            QtyNum = Number(InputQtyNum.value);
            if(QtyNum > 0)
            {
                cart[index].Quantity = Number(`${QtyNum}`);
                UpdateQtyNum[index].innerHTML = '';
                ProductQuantity[index].innerHTML = `${QtyNum}`;
                localStorage.setItem('cart',JSON.stringify(cart));
                Update.innerHTML = 'Update';
            }
            else{
                alert('Qauntity cannot be 0 or less than Zero');
            }   
        }
        TotalItem();
        RenderPaymentData()
    })
})

function TotalItem()
        {
            Total_count=0
            cart.forEach((qty)=>{
                Total_count += qty.Quantity
            })
            document.querySelector('.item-count').innerHTML =  `${Total_count} items`;
            document.querySelector('.items').innerHTML = Total_count;
        }

function DeliveryDate(MatchingItem,CartItem)
            {
                let html = '';
                 DeliveryOption.forEach((Delivery) => {
                    let Today = dayjs();
                    let CurrentDate = Today.add(`${Delivery.DeliveryDays}`,'days').format('dddd, MMMM D')
                    let PriceString = Delivery.priceCents === 0? 'Free':`$${Delivery.priceCents/100} -`;
                    let IsChecked = Delivery.id===CartItem.DeliveryDateId?'checked':'';

                    html+=`<div class="Shipping-Date">
                            <input type="radio" ${IsChecked} name="delivery-date-${MatchingItem.id}" class="js-checked" data-product-id="${MatchingItem.id}" data-delivery-option-id="${Delivery.id}">
                            <span class="js-current-date date">${CurrentDate}</span><div>${PriceString} Shipping</div>
                        </div>`
                 })
                 return html;
            }

function UpdateDeliveryOption(productId,deliveryOptionId)
{
    let MatchingItemId;
    cart.forEach((cartitem)=>{
        if(productId === cartitem.ProductId)
        {
            MatchingItemId = cartitem;
        }
    })
    MatchingItemId.DeliveryDateId = deliveryOptionId
    localStorage.setItem('cart',JSON.stringify(cart))
}

document.querySelectorAll('.js-checked').forEach((element)=>{
    element.addEventListener('click',()=>{
        const{productId,deliveryOptionId}=element.dataset;
        
    UpdateDeliveryOption(productId,deliveryOptionId);
    RenderProductData();
    })
})

function RenderPaymentData()
{
    let matchingItem = 0
    let matchingid = 0;
    let BeforeTax = 0;
    let AfterTax = 0;
    let Total = 0;

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

    document.querySelector('.TotalAmt').innerHTML = `$${FormatCurrency(matchingItem)}`;
    document.querySelector('.js-shiping').innerHTML =`$${FormatCurrency(matchingid)}`;
    document.querySelector('.js-before-tax').innerHTML=`$${BeforeTax}`;
    document.querySelector('.js-after-tax').innerHTML=`$${AfterTax}`;
    document.querySelector('.Total').innerHTML=`$${Total}`;
}

RenderPaymentData()
}
RenderProductData();

