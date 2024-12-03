// Fetch and display products using the Fake Store API
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('product-list');
        const jsonDisplay = document.getElementById('json-display');
        data.slice(0, 6).forEach(product => {
            const productBox = `
                <div class="box">
                    <div class="image">
                        <img src="${product.image}" alt="${product.title}">
                        <div class="icons">
                            <a href="#" class="fas fa-heart"></a>
                            <a href="#" class="cart-btn">Add to Cart</a>
                            <button class="fas fa-share share-btn" 
                                data-url="products.html?id=${product.id}"
                                data-title="${product.title}">
                                Share
                            </button>
                        </div>
                    </div>
                    <div class="content">
                        <h3>${product.title}</h3>
                        <div class="price">$${product.price}</div>
                    </div>
                </div>`;
            productList.innerHTML += productBox;
        });

        // Attach click event to share buttons
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const url = this.dataset.url; // Product URL

                if (url) {
                    // Share URL for Facebook
                    // const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    const facebookShareUrl = `${url}`;

                    // Open Facebook share URL in a new tab
                    // window.open(facebookShareUrl, '_blank');
                    window.open(facebookShareUrl, '_blank', 'width=600,height=400,scrollbars=yes');
                } else {
                    alert('Invalid share URL.');
                }
            });
        });
    })
    .catch(error => console.error('Error fetching products:', error));

// Fetch and display reviews using a placeholder API
fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(data => {
        const reviewList = document.getElementById('review-list');
        data.slice(0, 5).forEach(review => {
            const reviewItem = `
                <div class="item">
                    <div class="stars">
                        ${'★'.repeat(5)}
                    </div>
                    <p>${review.body}</p>
                    <div class="user-info">
                        <h3>${review.name}</h3>
                        <span>${review.email}</span>
                    </div>
                </div>`;
            reviewList.innerHTML += reviewItem;
        });
    })
    .catch(error => console.error('Error fetching reviews:', error));

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                const productInfo = document.getElementById('product-info');
                productInfo.innerHTML = `
                    <h1>Product: ${product.title}</h1>
                    <img src="${product.image}" alt="${product.title}" style="max-width: 300px; border-radius: 10px;">
                    <p>Description: ${product.description}</p>
                    <div class="price" style="font-size: 1.5em; color: #e67e22;">Price: $${product.price}</div>
                `;

                const shareBtn = document.getElementById('share-btn');
                const productUrl = `https://riyaaannn.github.io/finalProjectApi/products.html?id=${product.id}`;
                shareBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
                shareBtn.target = "_blank";
            })
            .catch(error => console.error('Error fetching product details:', error));
    } else {
        document.getElementById('product-info').innerText = 'Product ID is missing in the URL.';
    }

// Handle contact form submission (sending to a mock endpoint)
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (response.ok) {
                alert('Message Sent!');
            } else {
                throw new Error('Failed to send message.');
            }
        })
        .catch(error => console.error('Error:', error));
});
