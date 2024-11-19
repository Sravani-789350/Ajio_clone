const wishlisted_Data = JSON.parse(localStorage.getItem('WishlistData')) || [];
let value = JSON.parse(localStorage.getItem('ProductValue'));
const wishlistArray = [];
for (let id=wishlisted_Data.length-1; id>=0; id--){
    wishlistArray.push(wishlisted_Data[id]);
}

let wishlistInnerHtml = "";
wishlistArray.forEach((product, index) => {

    if (product.Stars < 3) {
        ratingColor = '#9a3d39';
    } else {
        ratingColor = '#3a8334';
    }
    wishlistInnerHtml +=
    `<div class="product-main-div">
        <div class="img-div">
            <img src="${product.Image_Src}" alt="Product Image">
            <button class="remove-Wishlist-icon" onclick="removeWishlistProduct(${index})"><img src="https://www.pinclipart.com/picdir/big/141-1413228_png-file-svg-trash-can-vector-free-black.png" style="width:15px;"></button>
        </div>
        <div class="info-div">
            <p class="brand-name">${product.Brand_Name}</p>
            <p class="info">${product.Name}</p>
            <div class="rating-box" style="background-color: ${ratingColor};"><span><span class="rating">${product.Stars}</span> &starf; | <span class="rating-count">${product.Rating}</span></span></div>
            <p><span class="price">₹${product.Price}</span><span class="actual-price"> ₹${product.Actual_Price}</span><span class="discount">(${product.Discount}% off)</span></p>
        </div>`
    if (product.Value === 'Fashion'){
        if (value === 'Kids'){
            wishlistInnerHtml +=
                `<div class="size-div size-div${index} kids-${product.Value}" data-value="">
                    <button onclick="selectProductSize(${index}, '5-6Y')">5-6Y</button>
                    <button onclick="selectProductSize(${index}, '7-8Y')">7-8Y</button>
                    <button onclick="selectProductSize(${index}, '9-10Y')">9-10Y</button>
                    <button onclick="selectProductSize(${index}, '11-12Y')">11-12Y</button>
                </div>`
        }else{
            wishlistInnerHtml +=
            `<div class="size-div size-div${index}" data-value="">
                    <button onclick="selectProductSize(${index}, 'S')">S</button>
                    <button onclick="selectProductSize(${index}, 'M')">M</button>
                    <button onclick="selectProductSize(${index}, 'L')">L</button>
                    <button onclick="selectProductSize(${index}, 'XL')">XL</button>
                    <button onclick="selectProductSize(${index}, 'XXL')">XXL</button>
                </div>`;
        }
    }else if (product.Value === 'Footware'){
        if (value === 'Kids'){
            wishlistInnerHtml +=
            `<div class="size-div size-div${index} ${product.Value}" data-value="" >
                    <button onclick="selectProductSize(${index}, '1Y')">1Y</button>
                    <button onclick="selectProductSize(${index}, '2Y')">2Y</button>
                    <button onclick="selectProductSize(${index}, '3Y')">3Y</button>
                    <button onclick="selectProductSize(${index}, '4Y')">4Y</button>
                    <button onclick="selectProductSize(${index}, '5Y')">5Y</button>
                    <button onclick="selectProductSize(${index}, '6Y')">6Y</button>
                </div>`;
        }else{
            wishlistInnerHtml +=
            `<div class="size-div size-div${index} ${product.Value}" data-value="" >
                <button onclick="selectProductSize(${index}, '7')">7</button>
                <button onclick="selectProductSize(${index}, '8')">8</button>
                <button onclick="selectProductSize(${index}, '9')">9</button>
                <button onclick="selectProductSize(${index}, '10')">10</button>
                <button onclick="selectProductSize(${index}, '11')">11</button>
                <button onclick="selectProductSize(${index}, '12')">12</button>
            </div>`;
        }
    }else{
        wishlistInnerHtml +=
            `<div class="size-div size-div${index} ${product.Value}" data-value="">
                <button onclick="selectProductSize(${index}, 'OS')">OS</button>
            </div>`;
    }
    wishlistInnerHtml +=
    `<button class="add-to-bag add-to-bag-${index}" onclick="addToCart(${index})"><img class="cart-img-${index}" src="images/Cart-logo.png"> ADD TO BAG</button>
    </div>`;
});

if (wishlistArray.length < 1){
    document.querySelector('.wishlist-main-container').innerHTML =
    `<div class="empty-wishlist-div" style="width: 100%; margin-bottom: 20%;">
        <p>Your Wishlist is empty!!</p>
        <h4>ADD A FEW PRODUCTS AND THEN EXPLORE THE COOLEST WAY TO SHOP CLOTHES ONLINE!</h4>
        <button onclick="location.href='index.html'">CONTINUE SHOPPING</button>
    </div>`;

}else{
    document.querySelector('.products-main-div').innerHTML = wishlistInnerHtml;
}

function removeWishlistProduct(id){
    wishlisted_Data.forEach((product,index)=>{
        if (product.Name === wishlistArray[id].Name){
            wishlisted_Data.splice(index,1);
            localStorage.setItem('WishlistData', JSON.stringify(wishlisted_Data));
        }
    });
    location.reload();
}

function addToCart(id) {
    const btnELement = document.querySelector(`.size-div${id}`)
    if (btnELement.getAttribute('data-value').length > 0){
    document.querySelector(`.add-to-bag-${id}`).innerHTML = 'ADDED';
    setTimeout(()=>{
        document.querySelector(`.add-to-bag-${id}`).innerHTML = '<img class="cart-img-${index}" src="images/Cart-logo.png"> ADD TO BAG';
    },3000)
    wishlistArray[id].Size = btnELement.getAttribute('data-value');
    const previousCartStorage = JSON.parse(localStorage.getItem('Cart_Added_Products')) || [];
    const newData = wishlistArray[id];
    let productExists = true;
    let existingCartProductIndex = -1;
    previousCartStorage.forEach((product, index)=>{
        if (product.Name === newData.Name && product.Size == newData.Size){
            productExists = false;
            existingCartProductIndex = index;
        }
    })
    if (productExists === true){
        newData.Quantity = 1
        newData.Status = 'uncancelled';
        previousCartStorage.push(newData);
        localStorage.setItem('Cart_Added_Products', JSON.stringify(previousCartStorage));
    }else{
        previousCartStorage[existingCartProductIndex].Quantity += 1;
        localStorage.setItem('Cart_Added_Products', JSON.stringify(previousCartStorage));
    }
    }else{
        document.querySelector('.size-alert-span').style.visibility = 'visible';
        setTimeout(()=>{
            document.querySelector('.size-alert-span').style.visibility = 'hidden';
        }, 5000)
    };;
}

function selectProductSize(id, value){
    const btnELement = document.querySelector(`.size-div${id}`);
    btnELement.setAttribute('data-value', value);
}

const buttons = document.querySelectorAll('.size-div button');
buttons.forEach((button) => {
    button.addEventListener('click', function() {
        buttons.forEach((btn) => {
            btn.style.backgroundColor = '#ffff';
            btn.style.color = 'black';
        });
        this.style.backgroundColor = '#2c4152';
        this.style.color = '#ffff';
    });
});