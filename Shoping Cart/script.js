document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    const updateCartCount = () => {
        const totalCount = Object.values(cart).reduce((acc, count) => acc + count, 0);
        document.getElementById('cart-count').textContent = totalCount;
    };

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const updateCart = (card, quantity) => {
        card.querySelector('.quantity-number').textContent = quantity;
    };

    const toggleCartControls = (card, show) => {
        card.querySelector('.quantity').style.display = show ? 'flex' : 'none';
        card.querySelector('.add-to-cart').style.display = show ? 'none' : 'inline-block';
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const id = card.dataset.id;
            cart[id] = (cart[id] || 0) + 1;
            updateCart(card, cart[id]);
            updateCartCount();
            saveCart();
            toggleCartControls(card, true);
        });
    });

    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const id = card.dataset.id;
            cart[id]++;
            updateCart(card, cart[id]);
            updateCartCount();
            saveCart();
        });
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const id = card.dataset.id;
            if (cart[id] > 0) {
                cart[id]--;
                updateCart(card, cart[id]);
                updateCartCount();
                saveCart();
                if (cart[id] === 0) {
                    toggleCartControls(card, false);
                }
            }
        });
    });

    // Initialize cart UI from localStorage
    document.querySelectorAll('.card').forEach(card => {
        const id = card.dataset.id;
        if (cart[id] && cart[id] > 0) {
            updateCart(card, cart[id]);
            toggleCartControls(card, true);
        }
    });

    updateCartCount();
});
