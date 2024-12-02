// Fetch and display products using the Fake Store API
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('product-list');
        data.slice(0, 6).forEach(product => {
            const productBox = `
                <div class="box">
                    <div class="image">
                        <img src="${product.image}" alt="${product.title}">
                        <div class="icons">
                            <a href="#" class="fas fa-heart"></a>
                            <a href="#" class="cart-btn">Add to Cart</a>
                            <button class="fas fa-share share-btn" 
                                data-url="https://riyaaannn.github.io/finalProjectApi/${product.id}" 
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

                // Share URL for Facebook
                const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

                // Open Facebook share URL in a new tab
                window.open(facebookShareUrl, '_blank');
            });
        });
    });

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
    });

// Handle contact form submission (sending to a mock endpoint)
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(() => alert('Message Sent!'))
        .catch(error => console.error('Error:', error));
});
