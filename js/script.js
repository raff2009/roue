/* =====================================================================
   RoueStore — script.js
   Toute la logique du site : produits, panier, filtres, recherche,
   modales, dark mode. Lis les commentaires pour savoir quoi modifier !
===================================================================== */

/* =====================================================================
   1) LISTE DES PRODUITS
   -----------------------------------------------------------------
   C'est ICI que tu ajoutes / modifies / supprimes des produits.
   Chaque produit est un objet avec :
     id         : identifiant unique (ne jamais dupliquer)
     name       : nom du produit
     category   : "jantes" | "pneus" | "accessoires" | "entretien"
     price      : prix actuel en euros (nombre, pas de virgule -> point)
     oldPrice   : prix barré (optionnel, mettre null si aucun)
     rating     : note sur 5 (ex: 4.5)
     badge      : texte du badge (ex: "Promo", "Nouveau") ou null
     image      : chemin vers une image (ex: "images/jante1.jpg")
                  Si tu n'as pas encore d'image, laisse "" et un emoji
                  sera affiché à la place (voir "emoji" ci-dessous).
     emoji      : emoji affiché tant qu'il n'y a pas d'image
     description: description affichée dans la vue rapide du produit
===================================================================== */
const PRODUCTS = [
  {
    id: 1,
    name: "Jante Alu Sport 18\"",
    category: "jantes",
    price: 189.90,
    oldPrice: 219.90,
    rating: 4.8,
    badge: "Promo",
    image: "",
    emoji: "🛞",
    description: "Jante en alliage léger 18 pouces, design sportif, compatible avec la majorité des berlines et SUV."
  },
  {
    id: 2,
    name: "Jante Chrome Premium 19\"",
    category: "jantes",
    price: 259.00,
    oldPrice: null,
    rating: 4.6,
    badge: "Nouveau",
    image: "",
    emoji: "🛞",
    description: "Finition chromée haut de gamme pour un rendu élégant et brillant sur toutes les routes."
  },
  {
    id: 3,
    name: "Pneu 4 Saisons 205/55 R16",
    category: "pneus",
    price: 79.90,
    oldPrice: 94.90,
    rating: 4.5,
    badge: "Promo",
    image: "",
    emoji: "🛞",
    description: "Pneu toutes saisons offrant une excellente adhérence sur route sèche, mouillée et enneigée."
  },
  {
    id: 4,
    name: "Pneu Sport Été 225/45 R17",
    category: "pneus",
    price: 109.00,
    oldPrice: null,
    rating: 4.7,
    badge: null,
    image: "",
    emoji: "🏎️",
    description: "Pneu haute performance pensé pour la conduite sportive et une tenue de route optimale."
  },
  {
    id: 5,
    name: "Enjoliveurs Design (x4)",
    category: "accessoires",
    price: 39.90,
    oldPrice: 49.90,
    rating: 4.2,
    badge: "Promo",
    image: "",
    emoji: "⭐",
    description: "Lot de 4 enjoliveurs universels pour un look personnalisé et une pose facile sans outil."
  },
  {
    id: 6,
    name: "Kit Boulons Antivol",
    category: "accessoires",
    price: 24.90,
    oldPrice: null,
    rating: 4.9,
    badge: null,
    image: "",
    emoji: "🔒",
    description: "Sécurisez vos jantes contre le vol avec ce kit de boulons antivol universel."
  },
  {
    id: 7,
    name: "Kit Nettoyage Jantes Pro",
    category: "entretien",
    price: 19.90,
    oldPrice: null,
    rating: 4.4,
    badge: "Nouveau",
    image: "",
    emoji: "🧽",
    description: "Nettoyant spécial jantes qui élimine la poussière de frein sans abîmer la finition."
  },
  {
    id: 8,
    name: "Spray Rénovateur Pneus",
    category: "entretien",
    price: 14.90,
    oldPrice: 17.90,
    rating: 4.3,
    badge: "Promo",
    image: "",
    emoji: "✨",
    description: "Redonnez de l'éclat à vos pneus avec ce spray effet neuf longue durée."
  },
  {
    id: 9,
    name: "Jante Noire Mat 20\"",
    category: "jantes",
    price: 299.00,
    oldPrice: null,
    rating: 4.9,
    badge: "Nouveau",
    image: "",
    emoji: "🛞",
    description: "Grande jante 20 pouces finition noir mat, pour un style racé et moderne."
  },
  {
    id: 10,
    name: "Pneu Hiver 195/65 R15",
    category: "pneus",
    price: 69.90,
    oldPrice: null,
    rating: 4.6,
    badge: null,
    image: "",
    emoji: "❄️",
    description: "Pneu hiver conçu pour une sécurité maximale sur neige et verglas."
  },
  {
    id: 11,
    name: "Housse de Roue de Secours",
    category: "accessoires",
    price: 29.90,
    oldPrice: null,
    rating: 4.1,
    badge: null,
    image: "",
    emoji: "🎒",
    description: "Protège efficacement votre roue de secours des intempéries et UV."
  },
  {
    id: 12,
    name: "Compresseur d'air portable",
    category: "entretien",
    price: 44.90,
    oldPrice: 59.90,
    rating: 4.7,
    badge: "Promo",
    image: "",
    emoji: "🔧",
    description: "Gonflez vos pneus partout grâce à ce compresseur compact et puissant."
  }
];

/* =====================================================================
   2) ÉTAT DE L'APPLICATION (panier, filtres...)
===================================================================== */
let cart = JSON.parse(localStorage.getItem("roue_cart")) || [];
let currentFilter = "all";
let currentSearch = "";
let currentSort = "default";

/* =====================================================================
   3) OUTILS
===================================================================== */
function formatPrice(value) {
  return value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

function saveCart() {
  localStorage.setItem("roue_cart", JSON.stringify(cart));
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function starsHTML(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full) + ` (${rating})`;
}

function productVisual(product) {
  if (product.image) {
    return `<img src="${product.image}" alt="${product.name}">`;
  }
  return product.emoji;
}

/* =====================================================================
   4) AFFICHAGE DES PRODUITS
===================================================================== */
function getFilteredProducts() {
  let list = PRODUCTS.filter(p => {
    const matchesFilter = currentFilter === "all" || p.category === currentFilter;
    const matchesSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (currentSort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (currentSort === "price-desc") list.sort((a, b) => b.price - a.price);
  if (currentSort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));

  return list;
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const noResults = document.getElementById("noResults");
  const list = getFilteredProducts();

  grid.innerHTML = "";

  if (list.length === 0) {
    noResults.hidden = false;
  } else {
    noResults.hidden = true;
  }

  list.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${index * 0.04}s`;

    card.innerHTML = `
      <div class="product-img">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        ${productVisual(product)}
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <span class="product-name" data-id="${product.id}">${product.name}</span>
        <span class="product-rating">${starsHTML(product.rating)}</span>
        <div class="product-price-row">
          <div>
            ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ""}
            <span class="product-price">${formatPrice(product.price)}</span>
          </div>
          <button class="add-cart-btn" data-id="${product.id}">Ajouter</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Ouvrir la vue rapide au clic sur le nom du produit
  grid.querySelectorAll(".product-name").forEach(el => {
    el.addEventListener("click", () => openProductModal(Number(el.dataset.id)));
  });

  // Ajouter au panier
  grid.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });
}

/* =====================================================================
   5) PANIER
===================================================================== */
function addToCart(id, qty = 1) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart();
  renderCart();
  showToast(`${product.name} ajouté au panier ✅`);
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
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

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const emptyMsg = document.getElementById("cartEmpty");
  const totalEl = document.getElementById("cartTotal");
  const countEl = document.getElementById("cartCount");

  container.innerHTML = "";

  if (cart.length === 0) {
    container.appendChild(emptyMsg);
    emptyMsg.style.display = "block";
  } else {
    cart.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return;
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div class="cart-item-img">${productVisual(product)}</div>
        <div class="cart-item-info">
          <h5>${product.name}</h5>
          <span>${formatPrice(product.price)}</span>
          <div class="qty-controls">
            <button data-action="minus" data-id="${item.id}">−</button>
            <span>${item.qty}</span>
            <button data-action="plus" data-id="${item.id}">+</button>
          </div>
          <div class="remove-item" data-id="${item.id}">Supprimer</div>
        </div>
      `;
      container.appendChild(row);
    });
  }

  totalEl.textContent = formatPrice(getCartTotal());
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  countEl.textContent = totalItems;

  container.querySelectorAll('[data-action="plus"]').forEach(btn =>
    btn.addEventListener("click", () => updateQty(Number(btn.dataset.id), 1))
  );
  container.querySelectorAll('[data-action="minus"]').forEach(btn =>
    btn.addEventListener("click", () => updateQty(Number(btn.dataset.id), -1))
  );
  container.querySelectorAll(".remove-item").forEach(el =>
    el.addEventListener("click", () => removeFromCart(Number(el.dataset.id)))
  );
}

/* =====================================================================
   6) MODALE "VUE RAPIDE" DU PRODUIT
===================================================================== */
function openProductModal(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const modal = document.getElementById("productModal");
  const content = document.getElementById("productModalContent");

  content.innerHTML = `
    <button class="modal-close" id="closeProductModal">✕</button>
    <div class="quick-view">
      <div class="quick-view-img">${productVisual(product)}</div>
      <div class="quick-view-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <span class="product-rating">${starsHTML(product.rating)}</span>
        <span class="product-price">${formatPrice(product.price)}</span>
        <p>${product.description}</p>
        <button class="btn btn-primary btn-block" id="modalAddCart">Ajouter au panier</button>
      </div>
    </div>
  `;

  modal.classList.add("active");

  document.getElementById("closeProductModal").addEventListener("click", () => modal.classList.remove("active"));
  document.getElementById("modalAddCart").addEventListener("click", () => {
    addToCart(product.id);
    modal.classList.remove("active");
  });
}

/* =====================================================================
   7) INITIALISATION / ÉVÉNEMENTS
===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  renderProducts();
  renderCart();

  // --- Recherche ---
  document.getElementById("searchInput").addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderProducts();
  });

  // --- Tri ---
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderProducts();
  });

  // --- Filtres catégories ---
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  // --- Panier : ouverture / fermeture ---
  const cartDrawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("overlay");

  function openCart() {
    cartDrawer.classList.add("active");
    overlay.classList.add("active");
  }
  function closeCart() {
    cartDrawer.classList.remove("active");
    overlay.classList.remove("active");
  }

  document.getElementById("cartToggle").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
  overlay.addEventListener("click", () => {
    closeCart();
    document.getElementById("productModal").classList.remove("active");
    document.getElementById("checkoutModal").classList.remove("active");
  });

  // --- Menu mobile ---
  document.getElementById("burgerToggle").addEventListener("click", () => {
    document.getElementById("mainNav").classList.toggle("active");
  });

  // --- Mode sombre ---
  const darkToggle = document.getElementById("darkModeToggle");
  const savedTheme = localStorage.getItem("roue_theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    darkToggle.textContent = "☀️";
  }
  darkToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("roue_theme", "light");
      darkToggle.textContent = "🌙";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("roue_theme", "dark");
      darkToggle.textContent = "☀️";
    }
  });

  // --- Newsletter (démo, pas d'envoi réel) ---
  document.getElementById("newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Merci pour votre inscription ! 🎉");
    e.target.reset();
  });

  // --- Commande (checkout) ---
  const checkoutModal = document.getElementById("checkoutModal");

  document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Votre panier est vide !");
      return;
    }
    document.getElementById("checkoutSummary").innerHTML =
      `Total à payer : <strong>${formatPrice(getCartTotal())}</strong> (${cart.reduce((s, i) => s + i.qty, 0)} article(s))`;
    checkoutModal.classList.add("active");
    closeCart();
  });

  document.getElementById("closeCheckout").addEventListener("click", () => {
    checkoutModal.classList.remove("active");
  });

  document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    checkoutModal.classList.remove("active");
    showToast("Commande confirmée, merci ! 🎉 (démo)");
    cart = [];
    saveCart();
    renderCart();
    e.target.reset();
  });

  // Fermer les modales avec la touche Echap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      document.getElementById("productModal").classList.remove("active");
      checkoutModal.classList.remove("active");
    }
  });
});
