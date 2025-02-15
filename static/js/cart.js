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
        }
    });
}

function updateCartCount() {
    const cartBadge = document.getElementById('cartBadge');
    fetch('/cart')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const count = doc.querySelectorAll('.cart-item').length;
            cartBadge.textContent = count;
        });
}

function toggleCart() {
    const cart = document.querySelector('.cart-overlay');
    cart.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
