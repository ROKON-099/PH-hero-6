// Example plant data
const plants = [
    { id: 1, name: "Mango", category: "Fruit Tree", price: 120, img: "mango.png" },
    { id: 2, name: "Rose", category: "Flowering Tree", price: 80, img: "rose.png" },
    { id: 3, name: "Neem", category: "Medicinal Tree", price: 100, img: "neem.png" },
    { id: 4, name: "Bamboo", category: "Bamboo", price: 60, img: "bamboo.png" },
    { id: 5, name: "Oak", category: "Shade Tree", price: 150, img: "oak.png" },
    { id: 6, name: "Pine", category: "Evergreen Tree", price: 130, img: "pine.png" }
];

let cart = [];

function renderPlants(category = "All trees") {
    const container = document.getElementById("plants-container");
    container.innerHTML = "";
    const filtered = category === "All trees"
        ? plants
        : plants.filter(p => p.category === category);
    filtered.forEach(plant => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-xl shadow-md p-4 flex flex-col items-center";
        card.innerHTML = `
            <img src="${plant.img}" alt="${plant.name}" class="h-20 w-20 object-cover mb-2 rounded-full" />
            <h3 class="font-bold text-green-700 mb-1">${plant.name}</h3>
            <p class="text-xs text-gray-500 mb-2">${plant.category}</p>
            <p class="font-semibold mb-2">৳${plant.price}</p>
            <button class="bg-[#FACC15] text-[#15803d] px-3 py-1 rounded-2xl hover:bg-gray-300 transition add-to-cart" data-id="${plant.id}">
                Add to Cart
            </button>
        `;
        container.appendChild(card);
    });
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const li = document.createElement("li");
        li.className = "flex justify-between items-center";
        li.innerHTML = `
            <span>${item.name} x${item.qty}</span>
            <button class="text-red-500 remove-item" data-id="${item.id}">Remove</button>
        `;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = `Total: ৳${total}`;
}

document.addEventListener("DOMContentLoaded", () => {
    renderPlants();

    // Category filter
    document.querySelectorAll("[data-category]").forEach(btn => {
        btn.addEventListener("click", () => {
            renderPlants(btn.getAttribute("data-category"));
        });
    });

    // Add to cart
    document.getElementById("plants-container").addEventListener("click", e => {
        if (e.target.classList.contains("add-to-cart")) {
            const id = Number(e.target.getAttribute("data-id"));
            const plant = plants.find(p => p.id === id);
            const cartItem = cart.find(item => item.id === id);
            if (cartItem) {
                cartItem.qty += 1;
            } else {
                cart.push({ ...plant, qty: 1 });
            }
            updateCart();
        }
    });

    // Remove from cart
    document.getElementById("cart-items").addEventListener("click", e => {
        if (e.target.classList.contains("remove-item")) {
            const id = Number(e.target.getAttribute("data-id"));
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }
    });

    // Donate form
    document.querySelector("form").addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Thank you for your donation!");
    });
});