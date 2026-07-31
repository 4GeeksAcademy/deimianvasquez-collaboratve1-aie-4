const cartItems = [
  {
    id: 1,
    name: "Cannes Linen Blazer",
    reference: "MR-4012",
    size: "M",
    price: 189.0,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Marais Pleated Trousers",
    reference: "MR-2198",
    size: "32",
    price: 124.0,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1506629905607-d405b7a35c6c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Riviera Leather Loafers",
    reference: "MR-8804",
    size: "42",
    price: 210.0,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
];

const taxRate = 0.16;

const mobileContainer = document.getElementById("cart-items-mobile");
const desktopContainer = document.getElementById("cart-items-desktop");
const cartCount = document.getElementById("cart-count");
const subtotalNode = document.getElementById("subtotal");
const taxNode = document.getElementById("tax");
const totalNode = document.getElementById("total");

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function updateQuantity(id, nextQuantity) {
  const item = cartItems.find((entry) => entry.id === id);
  if (!item) {
    return;
  }

  item.quantity = Math.max(1, nextQuantity);
  renderCart();
}

function createQuantityControl(item) {
  return `
    <div class="inline-flex items-center rounded-full border border-slate-200 bg-white">
      <button
        type="button"
        class="h-10 w-10 rounded-full text-lg font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
        onclick="updateQuantity(${item.id}, ${item.quantity - 1})"
        aria-label="Decrease quantity for ${item.name}"
      >
        −
      </button>
      <span class="min-w-10 text-center text-sm font-semibold text-slate-900">${item.quantity}</span>
      <button
        type="button"
        class="h-10 w-10 rounded-full text-lg font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
        onclick="updateQuantity(${item.id}, ${item.quantity + 1})"
        aria-label="Increase quantity for ${item.name}"
      >
        +
      </button>
    </div>
  `;
}

function renderCart() {
  mobileContainer.innerHTML = cartItems
    .map((item) => {
      const lineTotal = item.price * item.quantity;

      return `
        <article class="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50">
          <div class="flex gap-4 p-4">
            <img src="${item.image}" alt="${item.name}" class="h-28 w-24 rounded-[1.25rem] object-cover">
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h4 class="text-base font-bold text-slate-950">${item.name}</h4>
                  <p class="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">${item.reference}</p>
                </div>
                <p class="text-sm font-semibold text-slate-900">${formatCurrency(item.price)}</p>
              </div>
              <p class="mt-3 text-sm text-slate-600">Size ${item.size}</p>
              <div class="mt-4 flex items-center justify-between gap-3">
                ${createQuantityControl(item)}
                <div class="text-right">
                  <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Line total</p>
                  <p class="text-base font-bold text-slate-950">${formatCurrency(lineTotal)}</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  desktopContainer.innerHTML = cartItems
    .map((item) => {
      const lineTotal = item.price * item.quantity;

      return `
        <tr class="overflow-hidden rounded-[1.5rem] bg-slate-50">
          <td class="rounded-l-[1.5rem] px-4 py-4 align-middle">
            <div class="flex items-center gap-4">
              <img src="${item.image}" alt="${item.name}" class="h-24 w-20 rounded-[1.15rem] object-cover">
              <div>
                <h4 class="text-base font-bold text-slate-950">${item.name}</h4>
                <p class="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">${item.reference}</p>
                <p class="mt-3 text-sm text-slate-600">Size ${item.size}</p>
              </div>
            </div>
          </td>
          <td class="px-4 py-4 align-middle text-sm font-semibold text-slate-900">${formatCurrency(item.price)}</td>
          <td class="px-4 py-4 align-middle">${createQuantityControl(item)}</td>
          <td class="rounded-r-[1.5rem] px-4 py-4 text-right align-middle text-sm font-bold text-slate-950">${formatCurrency(lineTotal)}</td>
        </tr>
      `;
    })
    .join("");

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  cartCount.textContent = `${itemCount} item${itemCount === 1 ? "" : "s"}`;
  subtotalNode.textContent = formatCurrency(subtotal);
  taxNode.textContent = formatCurrency(tax);
  totalNode.textContent = formatCurrency(total);
}

renderCart();