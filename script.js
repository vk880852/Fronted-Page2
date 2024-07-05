document.addEventListener("DOMContentLoaded", function () {
    var tabs = document.querySelectorAll(".tab-button");
    console.log(tabs);
    const productList = document.querySelector(".product-list");

    async function fetchProducts() {
        try {
            const response = await fetch(`https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.categories;
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        }
    }

    function renderProducts(products) {
        console.log(products);
        productList.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            console.log(typeof(product.price));
            const result=Math.round(((parseInt(product.compare_at_price)-parseInt(product.price))/(product.compare_at_price))*100);
            console.log(result);
            productCard.className = "product-card";
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                  <div class="product-title">
                    <h3>${product.title}</h3>
                    <ul ><li>${product.vendor}</li></ul>
                  </div>
                  <div class="product-price">
                    <p class="price">${product.price}</p>
                     <span class="old-price">${product.compare_at_price}</span>
                     <span class="result">${result}% Off</span>
                  </div>
                </div>
                <div class="add-to-cart">Add to Cart</div>
            `;
            productList.appendChild(productCard);
        });
    }

    async function handleTabClick(e) {
        const category = e.target.getAttribute("data-category");
        tabs.forEach(tab => tab.classList.remove("active"));
        e.target.classList.add("active");
        const products = await fetchProducts();
        if(category==="men")
        renderProducts(products[0].category_products);
        else if(category==="women")
        {
            renderProducts(products[1].category_products);
        }
        else renderProducts(products[2].category_products);
    }
    tabs.forEach(tab => {
        tab.addEventListener("click", handleTabClick);
    });

    (async function() {
        const initialCategory = 'men';
        const products = await fetchProducts();
        renderProducts(products[0].category_products);
        document.querySelector(`.tab-button[data-category='${initialCategory}']`).classList.add("active");
    })();
});
