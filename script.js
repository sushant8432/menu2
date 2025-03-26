let cart = [];

// Search functionality
function searchMenu() {
    let searchInput = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll(".menu-item");

    items.forEach(item => {
        let itemName = item.querySelector("h2").textContent.toLowerCase();
        if (itemName.includes(searchInput)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// Add item to cart with quantity update
function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    updateCart();
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const cartCount = document.getElementById("cart-count"); // For displaying total items in the cart

    cartItems.innerHTML = "";
    let total = 0;
    let totalQuantity = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        totalQuantity += item.quantity;
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price.toFixed(2)} x 
            <button onclick="changeQuantity(${index}, -1)">➖</button> 
            ${item.quantity} 
            <button onclick="changeQuantity(${index}, 1)">➕</button>
        `;
        cartItems.appendChild(li);
    });

    totalPrice.textContent = total.toFixed(2);
    cartCount.textContent = totalQuantity; // Update cart quantity display
}

// Change quantity of items in cart
function changeQuantity(index, amount) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

// Place order
function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    alert("Order placed successfully!");
    cart = [];
    updateCart();
}




