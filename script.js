// ===== Product data for rich.org =====
const products = [
    {
        id: 1,
        name: "RS‑01 Obsidian ANC Earset",
        price: 7999,
        description: "Adaptive ANC • LDAC codec • Wireless charging case.",
        category: "Audio",
        label: "New drop",
        tier: "Signature",
        note: "Ships with rich.org leather carry case.",
        stock: "In stock",
        image: "https://images.pexels.com/photos/7889463/pexels-photo-7889463.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 2,
        name: "Vault‑grade Carbon Power Bank 10K",
        price: 5999,
        description: "Carbon-fiber shell • 30W GaN fast‑charge • Dual USB‑C.",
        category: "Power",
        label: "Limited / 300",
        tier: "Signature",
        note: "0‑50% phone charge in 18 minutes.",
        stock: "Few left",
        image: "https://images.pexels.com/photos/3945662/pexels-photo-3945662.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 3,
        name: "Forged Titanium USB‑C Cable",
        price: 2499,
        description: "1.8m metal‑wrapped • 100W PD • Lifetime bend warranty.",
        category: "Cables",
        label: "Editor’s pick",
        tier: "Signature",
        note: "Tangle‑proof. Airline carry‑safe.",
        stock: "In stock",
        image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 4,
        name: "Rich Essentials 3‑in‑1 Travel Cable",
        price: 1599,
        description: "Type‑C, Lightning, Micro‑USB • 1.2m soft braided.",
        category: "Cables",
        label: "Essentials",
        tier: "Essentials",
        note: "Perfect for your carry‑on.",
        stock: "In stock",
        image: "https://images.pexels.com/photos/7889460/pexels-photo-7889460.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 5,
        name: "SilkTouch Matte Case for iPhone",
        price: 1899,
        description: "Soft‑touch coat • Camera bump guard • Inner microfiber.",
        category: "Cases",
        label: "Bestseller",
        tier: "Essentials",
        note: "Multiple iPhone models available.",
        stock: "In stock",
        image: "https://images.pexels.com/photos/5081393/pexels-photo-5081393.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 6,
        name: "Midnight Wireless Mouse",
        price: 2499,
        description: "2.4GHz lag‑free • Glass‑smooth scroll • Silent clicks.",
        category: "Desk",
        label: "Work setup",
        tier: "Essentials",
        note: "Pairs with any laptop in seconds.",
        stock: "In stock",
        image: "https://images.pexels.com/photos/5082558/pexels-photo-5082558.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 7,
        name: "RichField Portable Speaker",
        price: 4499,
        description: "Deep bass • 12h playback • Splash proof shell.",
        category: "Audio",
        label: "Weekend mode",
        tier: "Essentials",
        note: "Perfect for rooftops & road trips.",
        stock: "In stock",
        image: "https://images.pexels.com/photos/1330310/pexels-photo-1330310.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 8,
        name: "MagFloat Wireless Charging Dock",
        price: 3299,
        description: "MagSafe‑compatible • 15W • Floating stand design.",
        category: "Charging",
        label: "Desk flex",
        tier: "Signature",
        note: "Nightstand safe warm‑glow LED.",
        stock: "Few left",
        image: "https://images.pexels.com/photos/7889462/pexels-photo-7889462.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];

// ===== State =====
let cart = [];
let searchQuery = "";
let sortMode = "default";

// ===== Helpers =====
function formatPrice(value) {
    return value.toLocaleString("en-IN");
}

function saveCart() {
    try {
        localStorage.setItem("rich_cart", JSON.stringify(cart));
    } catch (e) {
        console.warn("Could not save cart", e);
    }
}

function loadCart() {
    try {
        const raw = localStorage.getItem("rich_cart");
        if (raw) cart = JSON.parse(raw);
    } catch (e) {
        cart = [];
    }
}

// ===== Product rendering =====
function filteredSortedProducts() {
    let list = products.filter(p => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
    });

    if (sortMode === "price-asc") {
        list.sort((a, b) => a.price - b.price);
    } else if (sortMode === "price-desc") {
        list.sort((a, b) => b.price - a.price);
    }

    return list;
}

function renderProducts() {
    const container = document.getElementById("product-list");
    if (!container) return;

    container.innerHTML = "";
    const items = filteredSortedProducts();

    if (!items.length) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.innerHTML = `
            <p>No pieces found for "<strong>${searchQuery}</strong>"</p>
            <p style="font-size:0.78rem;margin-top:0.3rem;">Try another keyword or clear the search.</p>
        `;
        container.appendChild(empty);
        return;
    }

    items.forEach(p => {
        const card = document.createElement("article");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-media">
                <span class="product-label">${p.label}</span>
                <span class="product-tier">${p.tier}</span>
                <img src="${p.image}" alt="${p.name}" loading="lazy" />
            </div>
            <div class="product-category">${p.category}</div>
            <div class="product-title">${p.name}</div>
            <div class="product-desc">${p.description}</div>
            <div class="product-meta">
                <div>
                    <div class="product-price">₹${formatPrice(p.price)}</div>
                    <div class="product-note">${p.note}</div>
                </div>
                <div class="product-stock">${p.stock}</div>
            </div>
            <div class="product-actions">
                <button class="add-btn" data-id="${p.id}">
                    <i class="ri-add-line"></i>
                    Add to cart
                </button>
                <div class="perks">Free rich.org dust bag</div>
            </div>
        `;
        container.appendChild(card);
    });

    // Attach add to cart handlers
    container.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            addToCart(id);
        });
    });
}

// ===== Cart logic =====
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1
        });
    }

    saveCart();
    renderCart();
    showToast("Added to cart");
}

function increaseQty(id) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += 1;
    saveCart();
    renderCart();
}

function decreaseQty(id) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    if (item.qty > 1) {
        item.qty -= 1;
    } else {
        cart = cart.filter(i => i.id !== id);
    }
    saveCart();
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
}

function renderCart() {
    const container = document.getElementById("cart-items");
    const countSpan = document.getElementById("cart-count");
    const totalSpan = document.getElementById("cart-total");
    if (!container || !countSpan || !totalSpan) return;

    container.innerHTML = "";

    if (!cart.length) {
        container.innerHTML = `<p style="font-size:0.8rem;color:#9ca3af;">Your cart is empty. Start with a Signature piece.</p>`;
        countSpan.textContent = "0";
        totalSpan.textContent = "0";
        return;
    }

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.qty;
        totalPrice += item.price * item.qty;

        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
            <div class="cart-info">
                <div class="cart-title">${item.name}</div>
                <div class="cart-meta">Qty: ${item.qty} × ₹${formatPrice(item.price)}</div>
            </div>
            <div class="cart-actions">
                <div class="qty">
                    <button aria-label="Decrease quantity">−</button>
                    <span>${item.qty}</span>
                    <button aria-label="Increase quantity">+</button>
                </div>
                <button class="remove">Remove</button>
            </div>
        `;

        const [minusBtn, plusBtn] = row.querySelectorAll(".qty button");
        const removeBtn = row.querySelector(".remove");

        minusBtn.addEventListener("click", () => decreaseQty(item.id));
        plusBtn.addEventListener("click", () => increaseQty(item.id));
        removeBtn.addEventListener("click", () => removeFromCart(item.id));

        container.appendChild(row);
    });

    countSpan.textContent = String(totalItems);
    totalSpan.textContent = formatPrice(totalPrice);
}

// ===== COD order modal =====
function openOrderModal() {
    const modal = document.getElementById("order-modal");
    const itemsEl = document.getElementById("order-summary-items");
    const totalEl = document.getElementById("order-summary-total");
    if (!modal || !itemsEl || !totalEl) return;

    itemsEl.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const row = document.createElement("div");
        row.className = "order-item";
        row.innerHTML = `
            <span>${item.name} × ${item.qty}</span>
            <span>₹${formatPrice(item.price * item.qty)}</span>
        `;
        itemsEl.appendChild(row);
    });

    totalEl.textContent = formatPrice(total);
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeOrderModal() {
    const modal = document.getElementById("order-modal");
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "";
}

function handleOrderSubmit(e) {
    e.preventDefault();

    if (!cart.length) {
        alert("Your cart is empty.");
        return;
    }

    const name = document.getElementById("cust-name").value.trim();
    const phone = document.getElementById("cust-phone").value.trim();
    const address = document.getElementById("cust-address").value.trim();
    const pincode = document.getElementById("cust-pincode").value.trim();
    const city = document.getElementById("cust-city").value.trim();

    if (!name || !phone || !address || !pincode || !city) {
        alert("Please fill all details.");
        return;
    }

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    const order = {
        id: "RICH" + Date.now(),
        name,
        phone,
        address,
        pincode,
        city,
        total,
        items: cart.map(i => ({
            id: i.id,
            name: i.name,
            qty: i.qty,
            price: i.price
        })),
        paymentMethod: "COD",
        createdAt: new Date().toISOString()
    };

    try {
        const existing = JSON.parse(localStorage.getItem("rich_orders") || "[]");
        existing.push(order);
        localStorage.setItem("rich_orders", JSON.stringify(existing));
    } catch (e) {
        console.warn("Could not save order", e);
    }

    showToast("COD order placed");
    alert(`Thank you, ${name}!\nYour rich.org COD order is placed.\nOrder ID: ${order.id}\nTotal: ₹${formatPrice(total)}`);

    cart = [];
    saveCart();
    renderCart();
    e.target.reset();
    closeOrderModal();
}

// ===== Toast =====
let toastTimer = null;

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerHTML = `<i class="ri-check-line"></i><span>${message}</span>`;
    toast.classList.remove("hidden");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.add("hidden");
    }, 2200);
}

// ===== Theme toggle (light/dark hint) =====
let darkMode = true;
function toggleTheme() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    darkMode = !darkMode;
    if (darkMode) {
        document.documentElement.style.filter = "none";
        btn.innerHTML = '<i class="ri-moon-line"></i>';
    } else {
        // Just a subtle brightening effect (no full theme change for now)
        document.documentElement.style.filter = "brightness(1.04)";
        btn.innerHTML = '<i class="ri-sun-line"></i>';
    }
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
    // Year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Load cart
    loadCart();

    // Render
    renderProducts();
    renderCart();

    // Search
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", e => {
            searchQuery = e.target.value.trim();
            renderProducts();
        });
    }

    // Sort
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
        sortSelect.addEventListener("change", e => {
            sortMode = e.target.value;
            renderProducts();
        });
    }

    // Cart drawer
    const cartDrawer = document.getElementById("cart-drawer");
    const cartToggle = document.getElementById("cart-toggle");
    const cartClose = document.getElementById("cart-close");

    if (cartToggle && cartDrawer) {
        cartToggle.addEventListener("click", () => {
            cartDrawer.classList.add("open");
        });
    }
    if (cartClose && cartDrawer) {
        cartClose.addEventListener("click", () => {
            cartDrawer.classList.remove("open");
        });
    }

    // Checkout
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (!cart.length) {
                alert("Your cart is empty.");
                return;
            }
            openOrderModal();
        });
    }

    // Modal close buttons
    const closeModalBtn = document.getElementById("close-modal");
    const cancelOrderBtn = document.getElementById("cancel-order");
    const modal = document.getElementById("order-modal");

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeOrderModal);
    if (cancelOrderBtn) cancelOrderBtn.addEventListener("click", closeOrderModal);

    if (modal) {
        modal.addEventListener("click", e => {
            if (e.target === modal) closeOrderModal();
        });
    }

    // Order form
    const orderForm = document.getElementById("order-form");
    if (orderForm) {
        orderForm.addEventListener("submit", handleOrderSubmit);
    }

    // Theme toggle
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", toggleTheme);
    }
});
