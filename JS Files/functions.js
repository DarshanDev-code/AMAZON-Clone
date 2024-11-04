export function FormatCurrency(Amount)
{
    return (Math.round(Amount)/100).toFixed(2)
}

export function CartQuantity(cart){
    let Cart_Quantity = 0 
    cart.forEach((item)=>{
    Cart_Quantity += item.Quantity;
})
return Cart_Quantity;}