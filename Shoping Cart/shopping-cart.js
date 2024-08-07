/*document.addEventListener('DOMContentLoaded', () => {
    const productData = {
        1: { name: 'Product 1', image: 'https://www.shutterstock.com/shutterstock/photos/2041886246/display_1500/stock-photo-blue-jeans-front-and-back-side-with-label-isolated-on-white-background-2041886246.jpg', price:  349 },
        2: { name: 'Product 2', image: 'https://www.shutterstock.com/shutterstock/photos/733920580/display_1500/stock-photo-casual-jeans-set-733920580.jpg', price: 299 },
        3: { name: 'Product 3', image: 'https://media.istockphoto.com/id/1393263127/vector/navy-blue-factory-uniform-pants-template-on-white-background-vector-file.jpg?s=1024x1024&w=is&k=20&c=rbabrBU8PkG-lR5Jb736K6t9P4Y59OGwN09xyXgyy4Q=', price: 499 },
        4: { name: 'Product 4', image: 'https://media.istockphoto.com/id/1324882960/vector/navy-blue-tracksuit-pants-template-vector-on-white-background.jpg?s=2048x2048&w=is&k=20&c=aY9Nrw23m1Cb9q8F9cLl9XZUbnNnUkbY1ah_ryFmRtg=', price: 199 },
        5: { name: 'Product 5', image: 'https://media.istockphoto.com/id/1429958682/vector/dark-blue-pant-long-and-short-fashion-collection-set-illustration-vector.jpg?s=1024x1024&w=is&k=20&c=BwKteSJ8ujfxEc87odWjDtqU_awcWfwNqBupR0ZX8xc=', price: 699 },
        6: { name: 'Product 6', image: 'https://media.istockphoto.com/id/532278616/photo/perfect-match.jpg?s=1024x1024&w=is&k=20&c=tJ6tBGzfg0ulOZo9sWnPFb49UWrcRU-aK2BgkKKc50c=', price: 999 },
        7: { name: 'Product 1', image: 'https://media.istockphoto.com/id/1320937870/photo/style-in-browns-and-grays.jpg?s=1024x1024&w=is&k=20&c=FvAWiiU13gfQltMZuroixKam_7A52JCAyI-ZPRR8gn4=', price: 449 },
        8: { name: 'Product 2', image: 'https://media.istockphoto.com/id/1150051518/photo/sale-assortment-denim-collection-stand-boutique-shop.jpg?s=1024x1024&w=is&k=20&c=hFkHxGtDLFWuuU8rtsHn2tO0sPiwhzcvloe9Kh5RnGk=', price: 259 },
        9: { name: 'Product 3', image: 'https://media.istockphoto.com/id/915923400/photo/blue-mens-jeans-denim-pants-on-orange-background-contrast-saturated-color-fashion-clothing.jpg?s=1024x1024&w=is&k=20&c=_dpmyWYUnq2TkBz7rRngTujWGie3JoUG96sVwH-fTuQ=', price: 389 },
        10: { name: 'Product 4', image: 'https://media.istockphoto.com/id/1215749874/photo/detail-of-a-printed-flare-pants.jpg?s=1024x1024&w=is&k=20&c=Pn--wQaSIiOZjkkuBufOPfXrsEAd29ARW9jKrWfNP48=', price: 499 },
        11: { name: 'Product 5', image: 'https://media.istockphoto.com/id/1224545469/photo/close-up-green-sport-pants-sweatpants-jogging-for-men-isolated-on-white-background.jpg?s=1024x1024&w=is&k=20&c=pIBNwe8r3aeRDL5mcgGojtGRqYCYh9xzFeMvV9jaB3I=', price: 699 },
        12: { name: 'Product 6', image: 'https://media.istockphoto.com/id/1250958527/vector/woman-and-man-fashion-clothes.jpg?s=2048x2048&w=is&k=20&c=UvQ5Xvyg9HaIUAj5gk03TzydOuRVQwr-Naz3HOUmIQk=', price: 1099 },
    };

    function displayCartItems() {
        const cartContainer = document.getElementById('cart-container');
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        
        if (!cartContainer) {
            console.error('Cart container not found');
            return;
        }

        cartContainer.innerHTML = '';  

        let totalAmount = 0;

        Object.entries(cart).forEach(([id, quantity]) => {
            if (quantity > 0) {
                const product = productData[id];
                if (product) {
                    cartContainer.appendChild(createCartItemElement(product, id, quantity));
                    totalAmount += product.price * quantity;
                } else {
                    console.warn(`Product with id="${id}" not found.`);
                }
            }
        });

        const cartTotalElement = createCartTotalElement(totalAmount);
        cartContainer.appendChild(cartTotalElement);
    }

    function createCartItemElement(product, id, quantity) {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.setAttribute('data-id', id);

        cartItemElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 100px;">
            <div class="cart-item-details">
                <p>${product.name}</p>
                <p class="price">$${product.price}</p>
                <div class="quantity">
                    <button class="decrease">-</button>
                    <span class="quantity-number">${quantity}</span>
                    <button class="increase">+</button>
                </div>
            </div>
            <button class="delete-item">Delete</button>
        `;
        return cartItemElement;
    }

    function createCartTotalElement(totalAmount) {
        const cartTotalElement = document.createElement('div');
        cartTotalElement.className = 'cart-total';
        cartTotalElement.textContent = `Total: $${totalAmount}`;
        return cartTotalElement;
    }

    function setupEventListeners() {
        document.getElementById('cart-container').addEventListener('click', (event) => {
            const target = event.target;
            const cartItem = target.closest('.cart-item');
            const id = cartItem?.dataset.id;

            if (target.classList.contains('delete-item')) {
                deleteItemFromCart(id, cartItem);
            } else if (target.classList.contains('increase')) {
                updateItemQuantity(id, 1, cartItem);
            } else if (target.classList.contains('decrease')) {
                updateItemQuantity(id, -1, cartItem);
            }
        });

        document.getElementById('checkout-btn').addEventListener('click', handleCheckout);

        document.getElementById('close-cart')?.addEventListener('click', () => {
            document.getElementById('cart-popup').style.display = 'none';
        });

        document.getElementById('cart-count')?.addEventListener('click', () => {
            document.getElementById('cart-popup').style.display = 'block';
        });
    }

    function deleteItemFromCart(id, cartItem) {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        delete cart[id];
        saveCart(cart);
        cartItem.remove();
        updateCartCount();
        updateTotalAmount();
    }

    function updateItemQuantity(id, change, cartItem) {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        cart[id] = (cart[id] || 0) + change;

        if (cart[id] <= 0) {
            delete cart[id];
            cartItem.remove();
        } else {
            cartItem.querySelector('.quantity-number').textContent = cart[id];
        }

        saveCart(cart);
        updateCartCount();
        updateTotalAmount();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        const totalCount = Object.values(cart).reduce((acc, count) => acc + count, 0);
        document.getElementById('cart-count').textContent = totalCount;
    }

    function updateTotalAmount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        const totalAmount = Object.entries(cart).reduce((sum, [id, quantity]) => {
            const product = productData[id];
            return sum + (product ? product.price * quantity : 0);
        }, 0);

        const cartTotal = document.querySelector('.cart-total');
        if (cartTotal) {
            cartTotal.textContent = `Total: $${totalAmount}`;
        }
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function handleCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (Object.keys(cart).length === 0) {
            alert('Your cart is empty. Add some products to proceed.');
            return;
        }

        const totalAmount = Object.entries(cart).reduce((total, [id, quantity]) => {
            const product = productData[id];
            return total + (product.price * quantity);
        }, 0);

        alert(`Thank you for your purchase! Total amount: $${totalAmount}`);

        // Clear cart
        localStorage.removeItem('cart');
        document.querySelectorAll('.cart-item').forEach(item => item.remove());
        updateCartCount();
        updateTotalAmount();
    }

    function handleCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (Object.keys(cart).length === 0) {
            alert('Your cart is empty. Add some products to proceed.');
            return;
        }
    
        let totalAmount = 0;
    
        for (const [id, quantity] of Object.entries(cart)) {
            const product = productData[id];
            if (product) {
                totalAmount += product.price * quantity;
            } else {
                console.warn(`Product with id="${id}" not found in productData.`);
            }
        }
    
        if (totalAmount > 0) {
            alert(`Thank you for your purchase! Total amount: $${totalAmount}`);
    
            // Clear cart
            localStorage.removeItem('cart');
            document.querySelectorAll('.cart-item').forEach(item => item.remove());
            updateCartCount();
            updateTotalAmount();
        } else {
            alert('There was an issue with the products in your cart. Please try again.');
        }
    }
    

    // Initialize UI
    displayCartItems();
    setupEventListeners();
});*/

document.addEventListener('DOMContentLoaded', () => {
    const productData = {
        1: { name: 'Blue Jeans', image: 'https://www.shutterstock.com/shutterstock/photos/2041886246/display_1500/stock-photo-blue-jeans-front-and-back-side-with-label-isolated-on-white-background-2041886246.jpg', price: 349 },
        2: { name: 'Casual Jeans', image: 'https://www.shutterstock.com/shutterstock/photos/733920580/display_1500/stock-photo-casual-jeans-set-733920580.jpg', price: 299 },
        3: { name: 'Factory Uniform Pants', image: 'https://media.istockphoto.com/id/1393263127/vector/navy-blue-factory-uniform-pants-template-on-white-background-vector-file.jpg?s=1024x1024&w=is&k=20&c=rbabrBU8PkG-lR5Jb736K6t9P4Y59OGwN09xyXgyy4Q=', price: 499 },
        4: { name: 'Tracksuit Pants', image: 'https://media.istockphoto.com/id/1324882960/vector/navy-blue-tracksuit-pants-template-vector-on-white-background.jpg?s=2048x2048&w=is&k=20&c=aY9Nrw23m1Cb9q8F9cLl9XZUbnNnUkbY1ah_ryFmRtg=', price: 199 },
        // Add other products similarly
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    const cartContainer = document.getElementById('cart-container');
    const cartTotal = document.querySelector('.cart-total');

    const updateCartUI = () => {
        cartContainer.innerHTML = '';
        let totalAmount = 0;

        Object.keys(cart).forEach(id => {
            const item = productData[id];
            const quantity = cart[id];
            const itemTotal = item.price * quantity;
            totalAmount += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                    <div class="quantity">
                        <button class="decrease" data-id="${id}">-</button>
                        <span class="quantity-number">${quantity}</span>
                        <button class="increase" data-id="${id}">+</button>
                    </div>
                    <p>Total: $${itemTotal}</p>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        cartTotal.textContent = `Total: $${totalAmount}`;
    };

    cartContainer.addEventListener('click', (event) => {
        const button = event.target;
        if (button.classList.contains('increase') || button.classList.contains('decrease')) {
            const id = button.dataset.id;
            if (button.classList.contains('increase')) {
                cart[id]++;
            } else if (button.classList.contains('decrease')) {
                if (cart[id] > 1) {
                    cart[id]--;
                } else {
                    delete cart[id];
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
    });

    updateCartUI();
});
