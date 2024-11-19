// Fetch data from localStorage or initialize with default values
const wishlist_Array = JSON.parse(localStorage.getItem('WishlistData')) || [];
const orderId = JSON.parse(localStorage.getItem('OrderID')) || [];
const placedOrderData = JSON.parse(localStorage.getItem('PlacedOrderData')) || [];
const coupon_Data = JSON.parse(localStorage.getItem('CouponPrice')) || [];
const dayMonth1Data = JSON.parse(localStorage.getItem('DayMonth1')) || [];
const dayMonth2Data = JSON.parse(localStorage.getItem('DayMonth2')) || [];
const year_Data = JSON.parse(localStorage.getItem('Year')) || [];
const Hour_Date = JSON.parse(localStorage.getItem('OrderedHour')) || [];
const dataArray = placedOrderData.reverse();
const couponData = coupon_Data.reverse();

// Initialize arrays for reversed data
const couponArray = [];
const orderIdArray = [];
const dayMonthArray1 = [];
const dayMonthArray2 = [];
const yearArray = [];
const HourArray = [];

// Fill arrays with data from localStorage
orderId.forEach(id => orderIdArray.push(id));
couponData.forEach(id => couponArray.push(id));
dayMonth1Data.reverse().forEach(id => dayMonthArray1.push(id));
dayMonth2Data.reverse().forEach(id => dayMonthArray2.push(id));
Hour_Date.reverse().forEach(id => HourArray.push(id));
year_Data.forEach(id => yearArray.push(id));

let orderedInnerHtml = "";

// Generate HTML for orders

orderIdArray.forEach((id, index) => {
    orderedInnerHtml += `<p class="order-id-txt">Order ID : <span class="order-id-no order-id-no${index}">${id}</span></p>`;
    if (index <= dataArray.length - 1) {
        dataArray[index].forEach((product, idx) => {
            orderedInnerHtml +=
                `<div class="orders-main-inner-div">
                    <img class="orders-main-inner-div-img" src="${product.Image_Src}" width="10.5%">
                    <div class="order-details order-details${index}${idx}">
                        <h3 class="order-status order-status${index}${idx}"></h3>
                        <h4 class="cancelled-date${index}${idx}">Estimated Delivery &nbsp;<span class="est-delivery" style="font-weight:bold;">${dayMonthArray2[index]}</span></h4>
                        <div class="rating-div rating-div${index}${idx}">
                            <span class="rating-points rating-points${index}${idx}"></span>
                            <span class="rating-span1">Rate this product</span>
                            <span data-value="false" class="rating1 rating-1" onmouseover="starRating('rating-1',${index},${idx})" onmouseleave="starRatingRemove('rating-1')" onclick="starRated('rating-1',${index},${idx},true)">&starf;</span>
                            <span data-value="false" class="rating2 rating-2" onmouseover="starRating('rating-2',${index},${idx})" onmouseleave="starRatingRemove('rating-2')" onclick="starRated('rating-2',${index},${idx},true)">&starf;</span>
                            <span data-value="false" class="rating3 rating-3" onmouseover="starRating('rating-3',${index},${idx})" onmouseleave="starRatingRemove('rating-3')" onclick="starRated('rating-3',${index},${idx},true)">&starf;</span>
                            <span data-value="false" class="rating4 rating-4" onmouseover="starRating('rating-4',${index},${idx})" onmouseleave="starRatingRemove('rating-4')" onclick="starRated('rating-4',${index},${idx},true)">&starf;</span>
                            <span data-value="false" class="rating5 rating-5" onmouseover="starRating('rating-5',${index},${idx})" onmouseleave="starRatingRemove('rating-5')" onclick="starRated('rating-5',${index},${idx},true)">&starf;</span>
                        </div>
                    </div>
                    <div class="track-Order-detail-div" onclick="trackOrderDetails(${index})">
                        <img class="right-arrow-icon" src="https://icons.veryicon.com/png/256/miscellaneous/k8s/right-277.png">
                    </div>
                </div>`;
        });
    }
});


const orderDivElement = document.querySelector('.orders-main-div');
const wishlistLength = wishlist_Array.length;

// Display orders or message if no orders
if (orderIdArray.length > 0) {
    orderDivElement.innerHTML = orderedInnerHtml;
} else {
    let emptyCartWishlistCode = `<h2 style="font-family: 'Times New Roman';">No Orders Placed!!</h2>`;
    if (wishlistLength < 1) {
        emptyCartWishlistCode += `<button class="empty-cart-btn" onclick="location.href='index.html'">CONTINUE SHOPPING</button>`;
    } else {
        emptyCartWishlistCode += `
            <p>You have items in your wishlist waiting to be yours!</p>
            <div class="empty-cart-img-div">`;
        wishlist_Array.slice(0, 3).forEach(product => {
            emptyCartWishlistCode += `<img src="${product.Image_Src}" width="20%">`;
        });
        emptyCartWishlistCode += `
            </div>
            <button class="empty-cart-btn" onclick="location.href='wishlist.html'">ADD FROM WISHLIST</button>
            <button class="empty-cart-btn2" onclick="location.href='index.html'">CONTINUE SHOPPING</button>`;
        orderDivElement.style.display = 'flex';
        orderDivElement.style.flexDirection = 'column';
        orderDivElement.style.alignItems = 'center';
        orderDivElement.style.justifyContent = 'center';
        orderDivElement.style.padding = '20px 0 30px 0';
    }
    orderDivElement.innerHTML = emptyCartWishlistCode;
}

// Handle star rating
const starRatingData = JSON.parse(localStorage.getItem('StarRated')) || [];
let doneStatus = 'False';
if (doneStatus === 'False'){
    starRatingData.forEach(element => {
    let starData = element.split(' ');
    starRated(starData[0], starData[1], starData[2]);
    });
    doneStatus = 'True';
}



function starRating(element, id, idx) {
    const starElements = document.querySelectorAll(`.rating-div${id}${idx} .${element}`);
    const emojiElement = document.querySelector(`.rating-div${id}${idx} .rating-points${id}${idx}`);
    starElements.forEach(tag => tag.style.color = '#f6c343');
    const ratingEmojis = {
        'rating-1': 'Poor <img class="rating-emoji" src="https://www.viewpointfeedback.com/wp-content/uploads/2021/07/Fun_Smiley_VeryPoor.gif" width="30px">',
        'rating-2': 'Average <img class="rating-emoji" src="https://www.viewpointfeedback.com/wp-content/uploads/2021/07/Fun_Smiley_Poor.gif" width="30px">',
        'rating-3': 'Good <img class="rating-emoji" src="https://www.viewpointfeedback.com/wp-content/uploads/2021/07/Fun_Smiley_OK.gif" width="30px">',
        'rating-4': 'Very Good <img class="rating-emoji" src="https://www.viewpointfeedback.com/wp-content/uploads/2021/07/Fun_Smiley_Good.gif" width="30px">',
        'rating-5': 'Excellent <img class="rating-emoji" src="https://www.viewpointfeedback.com/wp-content/uploads/2021/07/Fun_Smiley_VeryGood.gif" width="30px">'
    };
    emojiElement.innerHTML = ratingEmojis[element];
}

function starRatingRemove(element) {
    const starElements = document.querySelectorAll(`.${element}`);
    starElements.forEach(tag => {
        if (tag.getAttribute('data-value') === 'false') {
            tag.style.color = '#ffff';
        }
    });
}

function starRated(element, idx, id, add=false) {
    const starElements = document.querySelectorAll(`.rating-div${idx}${id} .${element}`);
    const spanElement = document.querySelector(`.rating-div${idx}${id} .rating-span1`);
    starElements.forEach(tag => {
        tag.style.color = '#f6c343';
        tag.setAttribute('data-value', 'true');
    });
    if (spanElement) {
        spanElement.style.margin = '0 20px 0 0';
        spanElement.innerHTML = 'You Rated';
        spanElement.style.fontWeight = 'lighter';
    };
    if (add === true){
        let previousRatings = JSON.parse(localStorage.getItem('StarRated')) || [];
        let newRatedData = `${element} ${idx} ${id}`;
        previousRatings.push(newRatedData);
        localStorage.setItem('StarRated', JSON.stringify(previousRatings));
    };
}

function trackOrderDetails(id) {
    localStorage.setItem('TrackDetails', JSON.stringify(placedOrderData[id]));
    localStorage.setItem('TrackDetailsID',JSON.stringify(id));
    localStorage.setItem('CouponId', JSON.stringify(couponArray[id]));
    const order_Id = document.querySelector(`.order-id-no${id}`).innerHTML;
    localStorage.setItem('Order-ID', order_Id);
    localStorage.setItem('OrderedDate',JSON.stringify(dayMonth1Data[id]));
    localStorage.setItem('OrderedYear',JSON.stringify(year_Data[id]));
    localStorage.setItem('TRACK-Date1', JSON.stringify(dayMonthArray1[id]));
    localStorage.setItem('TRACK-Date2', JSON.stringify(dayMonthArray2[id]));
    localStorage.setItem('TRACK-Year', JSON.stringify(yearArray[id]));
    localStorage.setItem('TRACK-Hour', JSON.stringify(HourArray[id]));
    // console.log(id)
    location.href = "order-tracking.html";
}


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


orderIdArray.forEach((ele, id)=>{
    dataArray[id].forEach((element,idx)=>{
    const Hour = HourArray[id];
    const Ordered_Date = dayMonthArray1[id];
    let ShippingDate = Ordered_Date.split(' ');
    const ShippingDay = parseInt(ShippingDate[0]) + 1;
    const monthName = monthNames[monthIndex];
    const O_Date = `${day1} ${monthName}`;
    const S_Date = `${ShippingDay} ${ShippingDate[1]}`;
    const Shiping_Day = `${day1} ${monthName}`;

    const divElement = document.querySelector(`.rating-div${id}${idx}`);
    const name_Element = document.querySelector(`.order-status${id}${idx}`);
    const dateElement = document.querySelector(`.cancelled-date${id}${idx}`);

    if (element.Status === 'uncancelled'){

        if (Ordered_Date === O_Date){
            if (hours > Hour){
                name_Element.innerHTML = 'Ready for Shipping';
            }else{
                name_Element.innerHTML = 'Confirmed';
            }
        }else if(Shiping_Day === S_Date){
            name_Element.innerHTML = `Arriving by ${dayMonthArray2[id]}`;
            document.querySelector(`.order-details${id}${idx} h4`).innerHTML = `Order Placed on ${Ordered_Date}`;
            document.querySelector(`.order-details${id}${idx} h4`).style.marginTop = '25px'
        }else if(dayMonthArray2[id] === O_Date){
            if (hours < 9){
                name_Element.innerHTML = 'Arriving Today';
            }else if (hours >= 9 && hours < 12){
                name_Element.innerHTML = 'Out for Delivery';
            }else{
                name_Element.innerHTML = 'Delivered';
                document.querySelector(`.cancelled-date${id}${idx}`).innerHTML = `Delivered on ${dayMonthArray2[id]}`;
            }
        }else{
            name_Element.innerHTML = 'Delivered';
            document.querySelector(`.cancelled-date${id}${idx}`).innerHTML = `Delivered on${dayMonthArray2[id]}`;
        };
        if (name_Element.innerHTML === 'Delivered'){
            divElement.style.visibility = 'visible';
        }else{
            divElement.style.visibility = 'hidden';
        };
    }else{
        divElement.style.visibility = 'hidden';
        name_Element.innerHTML = 'Cancelled';
        name_Element.style.color = '#d53939';
        dateElement.innerHTML = `Cancelled on ${element.Status.split(' ')[1]} ${element.Status.split(' ')[2]}`
    }
});
});

// localStorage.clear();