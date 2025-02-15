function addToCart(productId) {
    fetch(`/cart/add/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const toast = new bootstrap.Toast(document.getElementById('cartToast'));
            toast.show();
            updateCartCount();
            updateCartOverlay();
        }
    });
}

function updateCartCount() {
    fetch('/cart')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const count = doc.querySelectorAll('.cart-item').length;
            const cartBadge = document.getElementById('cartBadge');
            cartBadge.textContent = count;
        });
}

function updateCartOverlay() {
    fetch('/cart')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const cartItems = doc.querySelector('.cart-items');
            if (cartItems) {
                document.getElementById('cartItems').innerHTML = cartItems.innerHTML;
            }
        });
}

function toggleCart() {
    const cart = document.querySelector('.cart-overlay');
    cart.classList.toggle('active');
    updateCartOverlay();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateCartOverlay();
});