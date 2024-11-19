const uSER_NAME = JSON.parse(localStorage.getItem('Username'));
const placed_Order_Data = JSON.parse(localStorage.getItem('PlacedOrderData')) || [];
const trackingData = JSON.parse(localStorage.getItem('TrackDetails'));
const trackingDataId = JSON.parse(localStorage.getItem('TrackDetailsID'));
const couponAmount = JSON.parse(localStorage.getItem('CouponId'));
const Ordered_Date = JSON.parse(localStorage.getItem('OrderedDate'));
const Arriving_Date = JSON.parse(localStorage.getItem('ArrivingDate'));
const OrderedYear = JSON.parse(localStorage.getItem('OrderedYear'));
const Hour = JSON.parse(localStorage.getItem('OrderedTrackingHour'));
const order_ID = JSON.parse(localStorage.getItem('OrderID')) || [];
const TRACKINGID = JSON.parse(localStorage.getItem('TRACKINGID'));
let totalPrice = 0;
let actualPrice = 0;
let savingsPrice = 0;
let cancelledProduct = false;
let cancelledArray = [];



let trackingInnerHtml = "";
trackingData.forEach((product, index)=>{
    totalPrice += product.Price * product.Quantity;
    actualPrice += product.Actual_Price * product.Quantity;
    savingsPrice += (product.Actual_Price * product.Quantity) - (product.Price * product.Quantity);
    cancelledProduct = product.Status;
    if (product.Status.split(' ')[0] === 'Cancelled'){
        cancelledArray.push(index);
    }

    

    trackingInnerHtml+=
    `<div class="ordered-products-div ordered-products-div${index}">
        <div class="ordered-img-div">
            <img class="product-img${index}" src="${product.Image_Src}"">
            <span class="Item-cancelled Item-cancelled${index}">Cancelled</span>
        </div>
        <div class="ordered-product-details ordered-product-details${index}">
            <h6 class="product-name-p"><span class="product-brand-name">${product.Brand_Name}</span> - <span class="product-Name">${product.Name}</span></h6>
            <p class="product-price-p">₹<span class="product-Price">${product.Price}</span></p>
            <p class="product-size-p">Size <span class="product-Size">${product.Size}</span></p>
            <p class="product-qty-p">Quantity <span class="product-Qty">${product.Quantity}</span></p>
            <p class="est-date">Estimated Delivery : <span class="order-tracking-est-date">29 Apr</span></p>
        </div>
        <span class="cancel-item cancel-item${index}" onclick="confirmCancellation(${index})">Cancel Item</span>
    </div>`
})
document.querySelector('.ordered-products-main-div').innerHTML = trackingInnerHtml;


let orderTrackingPaymentInnerHtml = "";
const orderTotalPrice = totalPrice - couponAmount;
orderTrackingPaymentInnerHtml +=
    `<div class="order-payment-details">
        <div class="order-id-details">
            <p class="order-id-p">Order# <span class="Order-Id">${order_ID[TRACKINGID]} (<span class="order-Items">${trackingData.length}</span> items)</span></p>
            <p class="order-placed-day-p">Order placed on <span class="Order-Placed-date">${Ordered_Date} ${OrderedYear}</span></p>
        </div>
        <div class="order-cost-details">
            <h2>Order Payment Details</h2>
            <hr>
            <div class="order-amount-div">
                <span>Order Amount</span>
                <span>₹${actualPrice}</span>
            </div>
            <div class="order-saving-div">
                <span>Order Savings</span>
                <span class="ordered-saving-amt">-₹${savingsPrice}</span>
            </div>
            <div class="coupon-saving-div">
                <span>Coupon Savings</span>
                <span class="ordered-coupon-saving-amt">-₹${couponAmount}</span>
            </div>
            <hr>
            <div class="order-total-div">
                <span>Order Total</span>
                <span>₹${orderTotalPrice}</span>
            </div>
        </div>
    </div>`
document.querySelector('.ordered-price-details-container').innerHTML = orderTrackingPaymentInnerHtml;

cancelledArray.forEach((div, index)=>{
    document.querySelector(`.ordered-product-details${div}`).style.opacity = '0.5';
    document.querySelector(`.Item-cancelled${div}`).style.visibility = 'visible';
    document.querySelector(`.product-img${div}`).style.opacity = '0.5';
    document.querySelector(`.cancel-item${div}`).style.visibility = 'hidden';
});


let ShippingDate = Ordered_Date.split(' ');
const ShippingDay = parseInt(ShippingDate[0]) + 1;
let OrderedTrackingNamesInnerHtml = "";
    OrderedTrackingNamesInnerHtml +=
    `<span>Confirmed<br>${Ordered_Date}</span>
    <span class="packed-name">Packed<br>${Ordered_Date}</span>
    <span class="shipped-name">Shipped<br>${ShippingDay} ${ShippingDate[1]}</span>
    <span>Arriving<br>${Arriving_Date}</span>`;
document.querySelector('.delivery-shipping-tracking-names').innerHTML = OrderedTrackingNamesInnerHtml;

const nameElement = document.querySelector('.delivery-status-title');
const imgElement = document.querySelector('.delivery-status-logo');
const progressBar = document.querySelector('.progress-bar-btn');

const today = new Date();
const year = today.getFullYear();
let monthIndex = today.getMonth();
let day1 = today.getDate();
let day2 = today.getDate() + 1;
let day3 = today.getDate() + 2;
const hours = today.getHours();
const minutes = today.getMinutes();

const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
if (day1 > daysInMonth){
    day1 -= daysInMonth;
    monthIndex++;
}
if (day2 > daysInMonth){
    day2 -= daysInMonth;
    monthIndex++;
}
if (day3 > daysInMonth){
    day3 -= daysInMonth;
    monthIndex++;
}
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const monthName = monthNames[monthIndex];
const O_Date = `${day1} ${monthName}`;
const S_Date = `${ShippingDay} ${ShippingDate[1]}`;
const Shiping_Day = `${day1} ${monthName}`;
const cancelElement = document.querySelectorAll('.cancel-item');

const isAllProductCancelled = trackingData.every(data => data.Status.split(' ')[0] === 'Cancelled');

if (!isAllProductCancelled){

    if (Ordered_Date === O_Date){
        if (hours > Hour){
            nameElement.setAttribute('value', 'Packed');
        }else{
            nameElement.setAttribute('value', 'Confirmed');
        }
    }else if(Shiping_Day === S_Date){
        nameElement.setAttribute('value', 'Shipped');
    }else if(Arriving_Date === O_Date){
        if (hours < 12){
            nameElement.setAttribute('value', 'Out for Delivery');
        }else{
            nameElement.setAttribute('value', 'Delivered');
        }
    }else{
        nameElement.setAttribute('value', 'Delivered');
    };
}else{
    nameElement.setAttribute('value', 'Cancelled');
};

if (nameElement.getAttribute('value') === 'Cancelled'){
    const btnElement1 = document.querySelector('.progress-btn1');
    const btnElement2 = document.querySelector('.progress-btn2');
    const btnElement3 = document.querySelector('.progress-btn3');
    const btnElement4 = document.querySelector('.progress-btn4');
    const progressBarWidth = JSON.parse(localStorage.getItem('ProgressBarWidth'))
    imgElement.setAttribute('src','https://cdn4.iconfinder.com/data/icons/approved-and-rejected-12/64/Order_Declined-512.png')
    nameElement.innerHTML = 'Cancelled';
    nameElement.style.color = '#d53939';
    progressBar.style.width = `${progressBarWidth}`;
    progressBar.style.backgroundColor = '#d53939'
    if (progressBarWidth === '20%'){
        btnElement1.style.backgroundColor = '#d53939';
    }else if (progressBarWidth === '34%'){
        btnElement1.style.backgroundColor = '#d53939';
        btnElement2.style.backgroundColor = '#d53939';
    }else if (progressBarWidth === '67%'){
        btnElement1.style.backgroundColor = '#d53939';
        btnElement2.style.backgroundColor = '#d53939';
        btnElement3.style.backgroundColor = '#d53939'; 
    }else if (progressBarWidth === '99%'){
        btnElement1.style.backgroundColor = '#d53939';
        btnElement2.style.backgroundColor = '#d53939';
        btnElement3.style.backgroundColor = '#d53939';
        btnElement4.style.backgroundColor = '#d53939';
    }
}else if (nameElement.getAttribute('value') === 'Confirmed'){
    progressBar.style.width = '20%';
    imgElement.setAttribute('src','https://cdn-icons-png.flaticon.com/512/1008/1008010.png')
    nameElement.innerHTML = 'Confirmed';

}else if (nameElement.getAttribute('value') === 'Packed'){
    imgElement.setAttribute('src','https://cdn-icons-png.flaticon.com/512/2928/2928550.png')
    imgElement.style.width = '7%';
    imgElement.style.marginTop = '-10px';
    progressBar.style.width = '34%';
    setTimeout(()=>{
        document.querySelector('.progress-btn2').style.backgroundColor = '#39b54a';
    }, 2350);
    nameElement.innerHTML = 'Ready for Shipping';

}else if(nameElement.getAttribute('value') === 'Shipped'){
    imgElement.setAttribute('src','images/shipped-icon.png')
    imgElement.style.marginTop = '-10px';
    progressBar.style.width = '67%';
    nameElement.innerHTML = `Arriving by<span class="ordered-delivery-date">${Arriving_Date}</span>`
    setTimeout(()=>{
        document.querySelector('.progress-btn2').style.backgroundColor = '#39b54a';
    }, 900);
    setTimeout(()=>{
        document.querySelector('.progress-btn3').style.backgroundColor = '#39b54a';
    }, 2500);

}else if(nameElement.getAttribute('value') === 'Out for Delivery'){
    setTimeout(()=>{
        document.querySelector('.progress-btn2').style.backgroundColor = '#39b54a';
    }, 600);
    setTimeout(()=>{
        document.querySelector('.progress-btn3').style.backgroundColor = '#39b54a';
    }, 1200);
    progressBar.style.width = '99%';
    imgElement.style.width = '5%';
    imgElement.style.marginTop = '-10px';
    imgElement.setAttribute('src','https://cdn1.iconfinder.com/data/icons/fulfillment-and-shipping-delivery-service-1/64/motorcycle-bike-delivery-massenger-express-512.png');
    if (hours < 9){
    nameElement.innerHTML = 'Arriving Today';
    }else if (hours >= 9 && hours < 12){
        nameElement.innerHTML = 'Out for Delivery';
    }else if(hours >= 12){
        nameElement.innerHTML = 'Delivered';
    }
    cancelElement.forEach(ele=>{
        ele.style.visibility = 'hidden';
    })
}
else if(nameElement.getAttribute('value') === 'Delivered'){
    progressBar.style.width = '100%';
    setTimeout(()=>{
        document.querySelector('.progress-btn2').style.backgroundColor = '#39b54a';
    }, 600);
    setTimeout(()=>{
        document.querySelector('.progress-btn3').style.backgroundColor = '#39b54a';
    }, 1200);
    setTimeout(()=>{
        document.querySelector('.progress-btn4').style.backgroundColor = '#39b54a';
    }, 2500);
    imgElement.setAttribute('src','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSDfnYhmwM6gjA8LSb0EC_nMbi7VfB8s6oCABi_8R19GtELJIag');
    nameElement.innerHTML = `Delivered on<span class="ordered-delivery-date">${Arriving_Date}</span>`;
    cancelElement.forEach(ele=>{
        ele.style.visibility = 'hidden';
    })
}


function confirmCancellation(id){
    const divElement = document.querySelector('.confirm-cancel-item');
    const btnElement1 = document.querySelector('.cancel-item-btn1');
    const btnElement2 = document.querySelector('.cancel-item-btn2');
    divElement.style.visibility = 'visible';
    btnElement2.addEventListener('click', function(){
        divElement.style.visibility = 'hidden';
        cancelItem(id);
    })
    btnElement1.addEventListener('click', function(){
        divElement.style.visibility = 'hidden';
    })
};

function cancelItem(id){
        const btnWidthElement = document.querySelector('.progress-bar-btn').style.width;
        const placedOrderData = placed_Order_Data.map((_, index, arr) => arr[arr.length - 1 - index]);
        placedOrderData[trackingDataId].forEach((product, index)=>{
            if (trackingData[id].Name === product.Name){
                console.log(trackingData[index]);
                product.Status = `Cancelled ${day1} ${monthName}`;
                trackingData[index].Status = `Cancelled ${day1} ${monthName}`;
                localStorage.setItem('TrackDetails',JSON.stringify(trackingData));
                localStorage.setItem('ProgressBarWidth', JSON.stringify(btnWidthElement));
                const newPlacedOrderData = placedOrderData.map((_, index, arr) => arr[arr.length - 1 - index]);
                localStorage.setItem('PlacedOrderData',JSON.stringify(newPlacedOrderData));
                location.reload();
            }
        });
};