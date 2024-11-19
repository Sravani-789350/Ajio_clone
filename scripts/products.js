let Mens_Data = JSON.parse(localStorage.getItem('Men_Products'));
let Women_Data = JSON.parse(localStorage.getItem('Women_Products'));
let Kids_Data = JSON.parse(localStorage.getItem('Kids_Products'));
let value = JSON.parse(localStorage.getItem('ProductValue'));
const wishlist_Storage = JSON.parse(localStorage.getItem('WishlistData')) || [];
let get_Data = [];
if (value === 'All'){
    get_Data = Mens_Data.slice(0, 10).concat(Women_Data.slice(0, 10)).concat(Kids_Data.slice(0, 10)).
               concat(Mens_Data.slice(10, 20)).concat(Women_Data.slice(10, 20)).concat(Kids_Data.slice(10, 20)).
               concat(Mens_Data.slice(20, 30)).concat(Women_Data.slice(20, 30)).concat(Kids_Data.slice(20, 30)).
               concat(Mens_Data.slice(30, 40)).concat(Women_Data.slice(30, 40)).concat(Kids_Data.slice(30, 40)).
               concat(Mens_Data.slice(40, 50)).concat(Women_Data.slice(40, 50)).concat(Kids_Data.slice(40, 50)).
               concat(Mens_Data.slice(50, 60)).concat(Women_Data.slice(50, 60)).concat(Kids_Data.slice(50, 60));
}else if (value === 'Men'){
    document.title = 'Ajio | Men';
    get_Data = Mens_Data;
    document.querySelector('.men-category').style.fontWeight = 'bold';
}else if (value === 'Women'){
    document.title = 'Ajio | Women';
    get_Data = Women_Data;
    document.querySelector('.women-category').style.fontWeight = 'bold';
}else if (value === 'Kids'){
    document.title = 'Ajio | Kids';
    get_Data = Kids_Data;
    document.querySelector('.kids-category').style.fontWeight = 'bold';
}
let Data1 = [];
let Data2 = [];
let Data3 = [];
if (value === 'All'){
    Data1 = get_Data.slice(0, 60);
    Data2 = get_Data.slice(60, 120);
    Data3 = get_Data.slice(120, 180);
}else{
    Data1 = get_Data.slice(0, 20);
    Data2 = get_Data.slice(20, 40);
    Data3 = get_Data.slice(40, 60);
}

let Data = [];
let dataValue = localStorage.getItem('DataValue');
if (dataValue === '1'){
    Data = Data1
    document.querySelector('.first').style.backgroundColor = 'black';
    document.querySelector('.first').style.color = '#ffff';
}else if(dataValue === '2'){
    Data = Data2
    document.querySelector('.second').style.backgroundColor = 'black';
    document.querySelector('.second').style.color = '#ffff';
}else if(dataValue === '3'){
    Data = Data3
    document.querySelector('.third').style.backgroundColor = 'black';
    document.querySelector('.third').style.color = '#ffff';
}

let ratingColor = '';
let innerHtmlCode = "";
Data.forEach((product, index) => {
    console.log(product.Wishlist);
    if (product.Stars < 3) {
        ratingColor = '#9a3d39';
    } else {
        ratingColor = '#3a8334';
    }
    innerHtmlCode +=
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
        </div>`
    if (product.Value === 'Fashion'){
        if (value === 'Kids'){
            innerHtmlCode +=
                `<div class="size-div size-div${index} kids-${product.Value}" data-value="">
                    <button onclick="selectProductSize(${index}, '5-6Y')">5-6Y</button>
                    <button onclick="selectProductSize(${index}, '7-8Y')">7-8Y</button>
                    <button onclick="selectProductSize(${index}, '9-10Y')">9-10Y</button>
                    <button onclick="selectProductSize(${index}, '11-12Y')">11-12Y</button>
                </div>`
        }else{
            innerHtmlCode +=
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
            innerHtmlCode +=
            `<div class="size-div size-div${index} ${product.Value}" data-value="" >
                    <button onclick="selectProductSize(${index}, '1Y')">1Y</button>
                    <button onclick="selectProductSize(${index}, '2Y')">2Y</button>
                    <button onclick="selectProductSize(${index}, '3Y')">3Y</button>
                    <button onclick="selectProductSize(${index}, '4Y')">4Y</button>
                    <button onclick="selectProductSize(${index}, '5Y')">5Y</button>
                    <button onclick="selectProductSize(${index}, '6Y')">6Y</button>
                </div>`;
        }else{
            innerHtmlCode +=
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
        innerHtmlCode +=
            `<div class="size-div size-div${index} ${product.Value}" data-value="">
                <button onclick="selectProductSize(${index}, 'OS')">OS</button>
            </div>`;
    }
    innerHtmlCode +=
    `<button class="add-to-bag add-to-bag-${index}" onclick="addToCart(${index})"><img class="cart-img-${index}" src="images/Cart-logo.png"> ADD TO BAG</button>
    </div>`;
});
document.querySelector('.products-main-div').innerHTML = innerHtmlCode;

if (!navigator.onLine){
    window.location.href = 'index.html';
}

Data.forEach((product, index)=>{
    wishlist_Storage.forEach((element,idx)=>{
        if (product.Name === element.Name){
            document.querySelector(`.product-wishlist-btn${index}`).innerHTML = '<img src="images/wishlist-icon.png" style="width: 28px;">';
        }
    })
});

function pagination(element){
    const data_Value = localStorage.getItem('DataValue');
    if (element === '<'){
        if (data_Value === '3'){
            localStorage.setItem('DataValue','2');
        }else if (data_Value === '2'){
            localStorage.setItem('DataValue','1');
        }
    }else if (element === '1'){
        localStorage.setItem('DataValue',element);
    }else if (element === '2'){
        localStorage.setItem('DataValue',element);
    }else if (element === '3'){
        localStorage.setItem('DataValue',element);
    }else if (element === '>'){
        if (data_Value === '1'){
            localStorage.setItem('DataValue','2');
        }else if (data_Value === '2'){
            localStorage.setItem('DataValue','3');
        }
    }
    window.scrollTo({top : 0});
    setTimeout(()=>{
        window.location.reload();
    }, 1000)
};

const data_value = localStorage.getItem('DataValue');
if (data_value === '3'){
    document.querySelector('.next').style.pointerEvents = 'none';
    document.querySelector('.next').disabled = true;

}else if (data_value === '1'){
    document.querySelector('.previous').style.pointerEvents = 'none';
    document.querySelector('.previous').disabled = true;
}

function addToCart(id) {
    const btnELement = document.querySelector(`.size-div${id}`)
    if (btnELement.getAttribute('data-value').length > 0){
    document.querySelector(`.add-to-bag-${id}`).innerHTML = 'ADDED';
    setTimeout(()=>{
        document.querySelector(`.add-to-bag-${id}`).innerHTML = '<img class="cart-img-${index}" src="images/Cart-logo.png"> ADD TO BAG';
    },3000)
    Data[id].Size = btnELement.getAttribute('data-value');
    const previousCartStorage = JSON.parse(localStorage.getItem('Cart_Added_Products')) || [];
    const newData = Data[id];
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
        if (previousCartStorage[existingCartProductIndex].Quantity !== 10 && previousCartStorage[existingCartProductIndex].Quantity < 11){
            const newQty = parseInt(previousCartStorage[existingCartProductIndex].Quantity) + 1;
            previousCartStorage[existingCartProductIndex].Quantity = newQty;
            localStorage.setItem('Cart_Added_Products', JSON.stringify(previousCartStorage));
        };
    }
    }else{
        document.querySelector('.size-alert-span').style.visibility = 'visible';
        setTimeout(()=>{
            document.querySelector('.size-alert-span').style.visibility = 'hidden';
        }, 5000)
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

const bottomImgElement = document.querySelector('.bottom-logo');
bottomImgElement.addEventListener('click', function(){
    window.scrollTo({top : 0});
})

const cartbtnElement = document.querySelector('.cart-btn');
cartbtnElement.addEventListener('click', function(){
    window.location.href = 'cart.html'
})

function addToWishlist(id){
    let array = [];
    let name = "";
    let productExist = false;
    let productExistIndex = 0;
    if (Data[id].Category === 'Men'){
        array = Mens_Data;
        name = 'Men_Products'
    }else if (Data[id].Category === 'Women'){
        array = Women_Data;
        name = 'Women_Products'
    }else if (Data[id].Category === 'Kids'){
        array = Kids_Data;
        name = 'Kids_Products'
    }
    wishlist_Storage.forEach((product, index)=>{
        if (product.Name === Data[id].Name){
            productExist = true;
            productExistIndex = index;
        }
    })
    if (productExist === false){
        const wishlistStorage = JSON.parse(localStorage.getItem('WishlistData')) || [];
        const new_Data = Data[id];
        wishlistStorage.push(new_Data);
        localStorage.setItem('WishlistData', JSON.stringify(wishlistStorage));
    }else{
        wishlist_Storage.splice(productExistIndex, 1)
        localStorage.setItem('WishlistData', JSON.stringify(wishlist_Storage));
    }
    location.reload();
};

// localStorage.clear();