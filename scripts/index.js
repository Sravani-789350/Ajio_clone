let postersInnerHtml = "";
    postersInnerHtml =
    `<img class="" src="https://www.bing.com/th/id/OGC.c0b66846c97a6da477fd3560bf6d0d95?pid=1.7&rurl=https%3a%2f%2fsellerrocket.in%2fimg%2fgif_ajio.gif&ehk=E%2b%2f0MJFcEXbUX%2be5XrlT%2bUCZlXy3ogBx%2foJ2N8YpnEQ%3d"width="100%" height="400px">
    <img class="poster" src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-01022024-FREEDEL-above799.jpg" width="99%">
    <img class="all-poster tohome" src="https://d2q7lj72xliqot.cloudfront.net/uploads/home-banner/2023-08-01/2492/2492_3.jpg" width="98%">
    <img class="poster" src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-18042024-TB-header.jpg" width="98%">
    <img class="poster" src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-18042024-bestofbrands-header.jpg" width="98%">
    <img class="poster" src="https://assets.ajio.com/cms/AJIO/WEB/M-1.0-UHP-18042024-DailyBanner-header.jpg" width="98%">
    <img class="kids-poster tohome" src="https://i.pinimg.com/originals/3b/ca/d2/3bcad2ba3906a95957af363767313ef0.jpg" width="98%">
    <img class="men-poster tohome" src="https://cdn.shopify.com/s/files/1/0475/4571/2798/files/Breakbounce_Banner_Revised_m_900x@2x.progressive.png.jpg?v=1622093964" width="98%">
    <img class="women-poster tohome" src="https://media.fashionnetwork.com/m/c9c2/7559/7a69/c76e/c5eb/a2ef/7570/73d4/8873/329a/329a.jpeg" width="98%">`

    if (document.querySelector('.home-page-posters')){
        document.querySelector('.home-page-posters').innerHTML = postersInnerHtml;
    };

    const logoElement = document.querySelector('.header-Ajio-logo');
    logoElement.addEventListener('click', function(){
        window.location.href = 'index.html';
    });

    const bottomimgElement = document.querySelector('.bottom-logo');
    bottomimgElement.addEventListener('click', function(){
        window.scrollTo({top : 0});
    });

    const cartElement = document.querySelector('.cart-btn');
    cartElement.addEventListener('click', function(){
        window.location.href = 'cart.html';
    });

    function searchedProduct(event) {
        const searchElement =  document.querySelector('.header-search');
        if (event.key === 'Enter' || event === 'Click'){
            localStorage.setItem('SearchedItem', JSON.stringify(searchElement.value));
            window.location.href = 'search.html';
        };
    };

    const homeElement = document.querySelectorAll('.tohome');
    let productValue = "";
    homeElement.forEach((element, index) => {
        element.addEventListener('click', function(){
            if (index === 0){
                productValue = 'All'
            }else if (index === 1){
                productValue = 'Kids'
            }else if (index === 2){
                productValue = 'Men'
            }else{
                productValue = 'Women'
            }
            localStorage.setItem('DataValue', '1');
            localStorage.setItem('ProductValue', JSON.stringify(productValue));
            window.location.href = 'home.html';
        });
    });

    const categoryElement = document.querySelectorAll('.category');
    let elementValue = "";
    categoryElement.forEach((element, index) => {
        element.addEventListener('click', function(){
            if (index === 0){
                elementValue = 'Men';
            }
            else if (index === 1){
                elementValue = 'Women';
            }
            else if (index === 2){
                elementValue = 'Kids';
            } 
            localStorage.setItem('DataValue', '1');
            localStorage.setItem('ProductValue', JSON.stringify(elementValue));
            window.location.href = 'home.html';
        })
    });