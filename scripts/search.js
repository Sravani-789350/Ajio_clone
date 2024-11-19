let Women_Data = JSON.parse(localStorage.getItem('Women_Products'));
let Kids_Data = JSON.parse(localStorage.getItem('Kids_Products'));
let Mens_Data = JSON.parse(localStorage.getItem('Men_Products'));
const wishlistStoragedata = JSON.parse(localStorage.getItem('WishlistData'));
const searchItem = JSON.parse(localStorage.getItem('SearchedItem')) || "";
let Data = Mens_Data.concat(Kids_Data, Women_Data);
let searchedDataArray = [];

Data.forEach((product, index) => {
    if (product.Name.toLowerCase().includes(searchItem.substring(0,3).toLowerCase())){
        searchedDataArray.push(product);
    }
});

document.querySelector('.header-search').value = searchItem;
document.title = `AJIO | ${searchItem}`;

let searchInnerHtmlCode = "";
let searchEmptyInnerHtml = "";
searchedDataArray.forEach((product,index)=>{
    if (product.Stars < 3) {
        ratingColor = '#9a3d39';
    } else {
        ratingColor = '#3a8334';
    }
    searchInnerHtmlCode +=
    `<div class="product-main-div">
    <button class="product-wishlist-btn product-wishlist-btn${index}" onclick="addToWishlist(${index})">&#9825;</button>
        <div class="img-div">
            <img src="${product.Image_Src}" alt="Product Image">
        </div>
        <div class="info-div">
            <p class="brand-name">${product.Brand_Name}</p>
            <p class="info">${product.Name}</p>
            <div class="rating-box" style="background-color: ${ratingColor};"><span><span class="rating">${product.Stars}</span> &starf; | <span class="rating-count">${product.Rating}</span></span></div>
            <p><span class="price">₹${product.Price}</span><span class="actual-price"> ₹${product.Actual_Price}</span><span class="discount">(${product.Discount}% off)</span></p>
        </div>
        <div class="size-div size-div${index}" data-value="">
            <button onclick="selectProductSize(${index}, 'S')">S</button>
            <button onclick="selectProductSize(${index}, 'M')">M</button>
            <button onclick="selectProductSize(${index}, 'L')">L</button>
            <button onclick="selectProductSize(${index}, 'XL')">XL</button>
            <button onclick="selectProductSize(${index}, 'XXL')">XXL</button>
        </div>
        <button class="add-to-bag add-to-bag-${index}" onclick="addToCart(${index})"><img class="cart-img-${index}" src="images/Cart-logo.png"> ADD TO BAG</button>
    </div>`;
})
if (searchedDataArray.length > 0){
    document.querySelector('.search-products-main-div').innerHTML = searchInnerHtmlCode;
    document.querySelector('.empty-search-div').style.height = '0';
    document.querySelector('.empty-search-div').style.visibility = 'hidden';
}else{
    searchEmptyInnerHtml +=
    `<h1 class="search-couldnt-find">Sorry! We couldn't find any matching items for</h1>
    <h1 class="search-item-name">${searchItem}</h1>
    <div></div>
    <p>Don't give up - check the spelling, or try less specific search terms</p>`
    document.querySelector('.empty-search-div').innerHTML = searchEmptyInnerHtml;
}

if (!navigator.onLine){
    window.location.href = 'index.html';
}

searchedDataArray.forEach((product, index)=>{
    wishlistStoragedata.forEach((element,idx)=>{
        if (product.Name === element.Name){
            document.querySelector(`.product-wishlist-btn${index}`).innerHTML = '<img src="images/wishlist-icon.png" style="width: 28px;">';
        }
    })
});

function addToCart(id) {
    const btnELement = document.querySelector(`.size-div${id}`)
    if (btnELement.getAttribute('data-value').length > 0){
    document.querySelector(`.add-to-bag-${id}`).innerHTML = 'ADDED';
    setTimeout(()=>{
        document.querySelector(`.add-to-bag-${id}`).innerHTML = '<img class="cart-img-${index}" src="images/Cart-logo.png"> ADD TO BAG';
    },3000)
    searchedDataArray[id].Size = btnELement.getAttribute('data-value');
    const previousCartStorage = JSON.parse(localStorage.getItem('Cart_Added_Products')) || [];
    const newData = searchedDataArray[id];
    let productExists = true;
    let existingCartProductIndex = -1;
    previousCartStorage.forEach((product, index)=>{
        if (product.Name === newData.Name && product.Size == newData.Size){
            productExists = false;
            existingCartProductIndex = index;
        };
    });
    if (productExists === true){
        newData.Quantity = 1
        newData.Status = 'uncancelled';
        previousCartStorage.push(newData);
        localStorage.setItem('Cart_Added_Products', JSON.stringify(previousCartStorage));
    }else{
        console.log(productExists)
        previousCartStorage[existingCartProductIndex].Quantity += 1;
        localStorage.setItem('Cart_Added_Products', JSON.stringify(previousCartStorage));
    }
    };
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

function addToWishlist(id){
    let array = [];
    let name = "";
    let productExist = false;
    let productExistIndex = 0;
    if (searchedDataArray[id].Category === 'Men'){
        array = Mens_Data;
        name = 'Men_Products'
    }else if (searchedDataArray[id].Category === 'Women'){
        array = Women_Data;
        name = 'Women_Products'
    }else if (searchedDataArray[id].Category === 'Kids'){
        array = Kids_Data;
        name = 'Kids_Products'
    }
    wishlistStoragedata.forEach((product, index)=>{
        if (product.Name === searchedDataArray[id].Name){
            productExist = true;
            productExistIndex = index;
        }
    })
    if (productExist === false){
        const wishlist_Storagedata = JSON.parse(localStorage.getItem('WishlistData')) || [];
        const new_Data = searchedDataArray[id];
        wishlist_Storagedata.push(new_Data);
        console.log(JSON.parse(localStorage.getItem(`${name}`)));
        localStorage.setItem(`${name}`, JSON.stringify(array));
        localStorage.setItem('WishlistData', JSON.stringify(wishlist_Storagedata));
    }else{
        wishlistStoragedata.splice(productExistIndex, 1)
        localStorage.setItem('WishlistData', JSON.stringify(wishlistStoragedata));
    }
    location.reload();
};