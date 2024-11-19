const cart_DataArray = JSON.parse(localStorage.getItem('Cart_Added_Products')) || [];
const wishlist_Array = JSON.parse(localStorage.getItem('WishlistData')) || [];
const Orders_Data = JSON.parse(localStorage.getItem('APIOrdersData')) || [];
const coupon_Codes = [];
let innerCartHtMl = "";
let total_Price = 0;
let total_Actual_Price = 0;
let bag_Discount_Price = 0;
let coupon_Price = 0;
let bagTotalItems = 0;
const cart_Data = [];
if (cart_DataArray){
    for (let id=cart_DataArray.length-1; id >= 0; id--){
        cart_Data.push(cart_DataArray[id]);
    };
};

console.log(cart_Data[0])

cart_Data.forEach((product,index) => {
    bagTotalItems += parseInt(product.Quantity);
    total_Price += product.Price * product.Quantity;
    total_Actual_Price += product.Actual_Price * product.Quantity;
    bag_Discount_Price += (product.Actual_Price * product.Quantity) - (product.Price * product.Quantity);
    innerCartHtMl +=
    `<div class="cart-product-main-div">
        <img class="product-img" src="${product.Image_Src}">
            <div class="product-names-div">
                <p class="product-name">${product.Brand_Name} - ${product.Name}</p>
                <div class="product-s-q-div">
                    <label for="product-size">Size :</label>`
    if (product.Value === 'Footware'){
        if (product.Category === 'Kids'){
            innerCartHtMl +=
            `<select name="ProductSize" class="product-size product-size${index}" onchange="productQty_SizeChanged(${index}, 'S')" >
            <option value="1Y">1Y</option>
            <option value="2Y">2Y</option>
            <option value="3Y">3Y</option>
            <option value="4Y">4Y</option>
            <option value="5Y">5Y</option>
            <option value="6Y">6Y</option>
            </select>`
        }else{
            innerCartHtMl +=
            `<select name="ProductSize" class="product-size product-size${index}" onchange="productQty_SizeChanged(${index}, 'S')" >
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            </select>`
        }
    }else if(product.Value === 'Fashion'){
        if (product.Category === 'Kids'){
            innerCartHtMl +=
            `<select name="ProductSize" class="product-size product-size${index}" onchange="productQty_SizeChanged(${index}, 'S')" >
            <option value="5-6Y">5-6Y</option>
            <option value="7-8Y">7-8Y</option>
            <option value="9-10Y">9-10Y</option>
            <option value="11-12Y">11-12Y</option>
            </select>`
        }else{
            innerCartHtMl +=
            `<select name="ProductSize" class="product-size product-size${index}" onchange="productQty_SizeChanged(${index}, 'S')" >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            </select>`
        }
    }else{
        innerCartHtMl +=
        `<select name="ProductSize" class="product-size product-size${index}" onchange="productQty_SizeChanged(${index}, 'S')" >
        <option value="OS">OS</option>
        </select>`
    }
    innerCartHtMl += `<label for="product-qty">Qty :</label>
                    <select name="ProductQuantity" class="product-qty product-qty${index}" onchange="productQty_SizeChanged(${index}, 'Q')" >
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
                    </select>
                </div>
            </div>
            <div class="product-prices-div">
                <span class="savings-title">Savings : <span class="product-savings">Rs. ${product.Actual_Price - product.Price}.00</span></span>
                <div>
                <span class="discounted-price">Rs. ${product.Actual_Price}.00</span>
                <span class="discount-percentage"> (${product.Discount}%)</span>
                </div>
                <span class="product-price">Rs. ${product.Price}.00</span>
            </div>
            <span class="delete-product-btn" onclick="deleteCartProduct(${index})">Delete</span>
            <span class="cart-product-wishlist-btn" onclick="addCartProductToWishlist(${index})"><span style="font-size: 30px; font-weight:lighter; margin: 0 3px 3px 0;">&#9825;</span>Move to Wishlist</span>
        </div>`
});
document.querySelector('.cart-products-container').innerHTML = innerCartHtMl;

cart_Data.forEach((product, index)=>{
    const sizeElement = document.querySelector(`.product-size${index}`);
    const qtyElement = document.querySelector(`.product-qty${index}`);
    sizeElement.value = product.Size;
    qtyElement.value = product.Quantity;
});


let bag_Total_Price = total_Price - coupon_Price;
const paymentInnerHtml = 
    `<h3>Order Details</h3>
    <div class="bag-total-div">
        <span>Bag total</span>
        <span>₹<span>${total_Actual_Price}</span></span>
    </div>
    <div class="bag-discount-div">
        <span>Bag discount</span>
        <span class="bag-discount-span">-₹<span>${bag_Discount_Price}</span></span>
    </div>
    <div class="Delivery-fee-div">
        <span>Delivery Fee</span>
        <span>₹<span class="del-fee">78</span></span>
    </div>
    <div class="coupon-discount-div">
        <span>Coupon savings</span>
        <span class="coupon-price">-₹<span class="coupon-applied-price">0</span></span>
    </div>
    <div class="order-total-div">
        <h4>Order Total</h4>
        <span class="order-total-price">₹<span class="total-price"></span></span>
    </div>
    <button class="place-order-btn" onclick="placeOrder()">PROCEED TO SHIPPING</button>`
document.querySelector('.payments-inner-div').innerHTML = paymentInnerHtml;


const date = new Date()
const todayDate = date.getDate();
const month = date.getMonth();
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

document.querySelector('.delivery-dates h2').innerHTML = `${todayDate} ${monthNames[month]}`

const deliveryFee = parseInt(document.querySelector('.del-fee').innerHTML);
bag_Total_Price += deliveryFee;
document.querySelector('.total-price').innerHTML = bag_Total_Price;
document.querySelector('.cart-items-cnt').innerHTML = bagTotalItems;

if (total_Price > 799){
    couponOpacity('coupon1')
    coupon_Codes.push('FREEDEL')
}
if (total_Price > 1499){
    couponOpacity('coupon2')   
    coupon_Codes.push('SAVE8')
}
if (total_Price > 1999){
    couponOpacity('coupon3')
    coupon_Codes.push('SPL15')
}
if (total_Price > 2499){
    couponOpacity('coupon4')
    coupon_Codes.push('AJIOSPL')
}
if (total_Price > 3499){
    couponOpacity('coupon5')
    coupon_Codes.push('PREMIYUM')
}

const cartEmptyELement = document.querySelector('.cart-empty-div');
const divElement1 = document.querySelector('.delivery-date-div');
const divElement2 = document.querySelector('.cart-main-caontainer-center');
let emptyCartWishlistCode = "";
const cartLength = cart_Data.length || 0;
let wishlistLength = 0;
if (wishlist_Array){
    wishlistLength = wishlist_Array.length;
}

if (cartLength > 0){
    cartEmptyELement.style.visibility = 'hidden';
    divElement1.style.visibility = 'visible';
    divElement2.style.visibility = 'visible';
}else if(cartLength < 1){
    if (wishlistLength < 1){
        cartEmptyELement.style.top = '30%';
        cartEmptyELement.innerHTML = `<h2>Your Shopping Bag is Empty!!</h2>
        <button class="empty-cart-btn" onclick="location.href='index.html'">CONTINUE SHOPPING</button>`;
    }else{
        cartEmptyELement.style.top = '20%';
        emptyCartWishlistCode+=
        `<h2>Your Shopping Bag is Empty!!</h2>
        <p>You have items in your wishlist waiting to be yours!</p>
        <div class="empty-cart-img-div">`
        wishlist_Array.forEach((product,index)=>{
            if (index < 3){
                emptyCartWishlistCode += `<img src="${product.Image_Src}" width="20%">`
            }
        });

        emptyCartWishlistCode+=
        `</div>
        <button class="empty-cart-btn" onclick="location.href='wishlist.html'">ADD FROM WISHLIST</button>
        <button class="empty-cart-btn2" onclick="location.href='index.html'">CONTINUE SHOPPING</button>`
        cartEmptyELement.innerHTML = emptyCartWishlistCode;
    }
    cartEmptyELement.style.visibility = 'visible';
    divElement1.style.visibility = 'hidden';
    divElement2.style.visibility = 'hidden';
}

function couponOpacity(element){
    document.querySelector(`.${element}`).style.opacity = '1';
    document.querySelector(`.${element} input`).style.pointerEvents = 'all';
}

const discounts = [0.08, 0.15, 0.25, 0.35]
discounts.forEach((element,index) => {
    let value = total_Price * element
    document.querySelector(`.saving-price${index + 2}`).innerHTML = Math.floor(value);
})

function couponCode(element) {
    const codeElement = document.querySelector(`.${element}`);
    const inputElement = document.querySelector('.couponInput');
    inputElement.value = codeElement.innerHTML;
}

function couponCodeApply(element=null) {
    const inputElement = document.querySelector('.couponInput');
    const invalidElement = document.querySelector('.invalid-coupon');
    const divElement = document.querySelector('.applied-coupon-div');
    const inputDivElement = document.querySelector('.coupon-input-inner-div');
    const couponElement = document.querySelector('.applied-code');
    const deliveryElement = document.querySelector('.del-fee');
    const couponSavingELement = document.querySelector('.coupon-applied-price');
    const totalElement = document.querySelector('.total-price');
    const invalidCouponELement = document.querySelector('.invalid-coupon');
    const savedCouponElement = document.querySelector('.coupon-saved');
    const priceElement = document.querySelector('.total-price');
    if (element === null){
        if (coupon_Codes.includes(inputElement.value.toUpperCase())){
            invalidElement.style.visibility = 'hidden';
            inputElement.style.backgroundColor = '#ffff';
            inputElement.style.color = 'black';
            divElement.style.visibility = 'visible';
            inputDivElement.style.visibility = 'hidden';
            inputElement.style.outlineColor = '#866528';
            couponElement.innerHTML = inputElement.value.toUpperCase();
            if (parseInt(totalElement.innerHTML) > 798){
                deliveryElement.innerHTML = 0;
                if (inputElement.value.toUpperCase() === 'FREEDEL'){
                    coupon_Price = document.querySelector('.saving-price1').innerHTML;
                }else if (inputElement.value.toUpperCase() === 'SAVE8'){
                    coupon_Price = document.querySelector('.saving-price2').innerHTML;
                }else if (inputElement.value.toUpperCase() === 'SPL15'){
                    coupon_Price = document.querySelector('.saving-price3').innerHTML;
                }else if (inputElement.value.toUpperCase() === 'AJIOSPL'){
                    coupon_Price = document.querySelector('.saving-price4').innerHTML;
                }else if (inputElement.value.toUpperCase() === 'PREMIYUM'){
                    coupon_Price = document.querySelector('.saving-price5').innerHTML;
                }
                couponSavingELement.innerHTML = coupon_Price;
                savedCouponElement.innerHTML = coupon_Price;
                priceElement.innerHTML = total_Price - parseInt(coupon_Price);
            }
        }else{
            if (inputElement.value.toUpperCase() === 'FREEDEL'){
                invalidCouponELement.innerHTML = 'Voucher is valid only on or above ₹799.'
            }else if (inputElement.value.toUpperCase() === 'SAVE8'){
                invalidCouponELement.innerHTML = 'Voucher is valid only on or above ₹1499.'
            }else if (inputElement.value.toUpperCase() === 'SPL15'){
                invalidCouponELement.innerHTML = 'Voucher is valid only on or above ₹1999.'
            }else if (inputElement.value.toUpperCase() === 'AJIOSPL'){
                invalidCouponELement.innerHTML = 'Voucher is valid only on or above ₹2499.'
            }else if (inputElement.value.toUpperCase() === 'PREMIYUM'){
                invalidCouponELement.innerHTML = 'Voucher is valid only on or above ₹3499.'
            }
            invalidElement.style.visibility = 'visible';
            inputElement.style.backgroundColor = '#ffd3d3';
            inputElement.style.outlineColor = 'red';
        }
    }else if(element === 'remove'){
        divElement.style.visibility = 'hidden';
        inputDivElement.style.visibility = 'visible';
        deliveryElement.innerHTML = 78;
        couponSavingELement.innerHTML = 0;
        priceElement.innerHTML = total_Price;
    }
}

function handleKey(event){
    if (event.key === 'Enter'){
        couponCodeApply()
    }
};

function deleteCartProduct(id){
    cart_Data.forEach((product,index)=>{
        if (product === (cart_Data[id])){
            cart_Data.splice(index, 1);
            localStorage.setItem('Cart_Added_Products', JSON.stringify(cart_Data));
            location.reload();
        }
    })
};

function productQty_SizeChanged(id, element){
    const sizeElement = document.querySelector(`.product-size${id}`);
    const qtyElement = document.querySelector(`.product-qty${id}`);
    console.log(cart_Data);
    if (element === 'S'){
        cart_Data.forEach((product,index)=>{
            if (product === (cart_Data[id])){
                cart_Data[id].Size = sizeElement.value;
                console.log(cart_Data, 'Matched');
                localStorage.setItem('Cart_Added_Products', JSON.stringify(cart_Data.reverse()));
            }else{
                console.log(cart_Data, 'didntMatched');
            }
        });
    }else if (element === 'Q'){
        cart_Data.forEach((product,index)=>{
            if (product === (cart_Data[id])){
                cart_Data[id].Quantity = qtyElement.value;
                localStorage.setItem('Cart_Added_Products', JSON.stringify(cart_Data.reverse()));
            }
        });
    };
    location.reload();
};

function placeOrder() {
        const id = bag_Total_Price * 8
        const orderId = `AKGMS${bag_Total_Price}${id}`;
        let randomNumber = Math.floor(Math.random() * 9) + 1;
        const previousId = JSON.parse(localStorage.getItem('OrderID')) || []
        const newId = orderId;
        let idExists = false;
        const today = new Date();
        const year = today.getFullYear();
        let monthIndex = today.getMonth();
        let day1 = today.getDate();
        let day2 = today.getDate() + 2;
        const hours = today.getHours();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        if (day1 > daysInMonth) {
            day1 -= daysInMonth;
            monthIndex++;
        }
        if (day2 > daysInMonth) {
            day2 -= daysInMonth;
            monthIndex++;
        }
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthNames[monthIndex];

        Orders_Data.forEach((product,index)=>{
            if (product.Order_Id === orderId){
                idExists = true;
            }
        })
        cart_Data.forEach((product,index)=>{
            if (idExists === true){
                let modyfiedID = newId + randomNumber.toString();
                product.Order_Id = modyfiedID;
            }else{
                product.Order_Id = newId;
            }
        });

        previousId.forEach(id=>{
            if (id === orderId){
                idExists = true;
            }
        })
        if (idExists === true){
            let modyfiedID = newId + randomNumber.toString();
            previousId.push(modyfiedID);
        }else{
            previousId.push(newId);
        }
        localStorage.setItem('OrderID', JSON.stringify(previousId));

        const previousOrderedData = JSON.parse(localStorage.getItem('PlacedOrderData')) || [];
        const newData = cart_Data;
        previousOrderedData.push(newData);
        localStorage.setItem('PlacedOrderData', JSON.stringify(previousOrderedData));

        const couponELement = document.querySelector('.coupon-applied-price').innerHTML;
        const previousCoupons = JSON.parse(localStorage.getItem('CouponPrice')) || [];
        previousCoupons.push(parseInt(couponELement));
        localStorage.setItem('CouponPrice', JSON.stringify(previousCoupons));

        const previousDayMonth1 = JSON.parse(localStorage.getItem('DayMonth1')) || [];
        const previousDayMonth2 = JSON.parse(localStorage.getItem('DayMonth2')) || [];
        const previousYear = JSON.parse(localStorage.getItem('Year')) || [];
        const previousHour = JSON.parse(localStorage.getItem('OrderedHour')) || [];
        let newdateMonth1 = `${day1} ${monthName}`;
        let newdateMonth2 = `${day2} ${monthName}`;
        let newYear = `${year}`;
        let newHour = hours;
        previousDayMonth1.push(newdateMonth1);
        previousDayMonth2.push(newdateMonth2);
        previousYear.push(newYear);
        previousHour.push(newHour);
        localStorage.setItem('DayMonth1',JSON.stringify(previousDayMonth1));
        localStorage.setItem('DayMonth2',JSON.stringify(previousDayMonth2));
        localStorage.setItem('Year',JSON.stringify(previousYear));
        localStorage.setItem('OrderedHour', JSON.stringify(previousHour));

        localStorage.setItem('Cart_Added_Products', JSON.stringify([]));
        location.href = 'orders.html';
};


function addCartProductToWishlist(id){
    let dataExist = false;
    wishlist_Array.forEach((element,idx)=>{
        if (cart_Data[id].Name === element.Name){
            dataExist = true;
        }
    });
    cart_DataArray.forEach((product,index)=>{
        if (product.Name === cart_Data[id].Name){
            if(dataExist === true){
                cart_DataArray.splice(index,1);
            }else{
                wishlist_Array.push(cart_Data[id]);
                cart_DataArray.splice(index,1);
            };
        };
    });
    localStorage.setItem('WishlistData', JSON.stringify(wishlist_Array));
    localStorage.setItem('Cart_Added_Products', JSON.stringify(cart_DataArray));
    location.reload();
}
