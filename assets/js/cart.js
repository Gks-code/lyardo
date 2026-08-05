document.addEventListener('DOMContentLoaded', () => {

    const cartItemsContainer = document.getElementById('cart-items-container');

    // ─── Render ────────────────────────────────────────────────────────────────
    function renderCart() {
        if (!window.CartStore) return;

        const cart = window.CartStore.getCart();
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align:center;padding:60px 20px;background:var(--c-white);border-radius:20px;border:1px dashed rgba(211,184,232,0.4);">
                    <span class="material-symbols-outlined" style="font-size:48px;color:var(--c-purple-light);display:block;margin-bottom:16px;">shopping_bag</span>
                    <h3 style="font-family:var(--font-serif);font-size:24px;color:var(--c-text-main);margin-bottom:8px;">Sua sacola está vazia</h3>
                    <p style="color:var(--c-text-muted);margin-bottom:24px;">Adicione produtos e aproveite nossas novidades.</p>
                    <a href="index.html" class="btn-primary" style="display:inline-flex;">Voltar à Loja</a>
                </div>
            `;
            updateTotals();
            return;
        }

        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';

            const formattedPrice = `R$ ${item.price.toFixed(2).replace('.', ',')}`;

            itemEl.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-top">
                        <div style="flex: 1;">
                            <h3 class="cart-item-name">${item.name}</h3>
                            <p class="cart-item-variant">Variante: ${item.variant}</p>
                        </div>
                        <span class="cart-item-price">${formattedPrice}</span>
                    </div>
                    <div class="cart-item-bottom">
                        <div class="qty-control">
                            <button class="qty-btn" data-action="decrement" data-id="${item.id}" data-variant="${item.variant}">
                                <span class="material-symbols-outlined" style="font-size:18px;">remove</span>
                            </button>
                            <span class="qty-val">${item.qty}</span>
                            <button class="qty-btn" data-action="increment" data-id="${item.id}" data-variant="${item.variant}">
                                <span class="material-symbols-outlined" style="font-size:18px;">add</span>
                            </button>
                        </div>
                        <button class="remove-btn" data-action="remove" data-id="${item.id}" data-variant="${item.variant}">
                            <span class="material-symbols-outlined" style="font-size:20px;">delete</span>
                            <span class="remove-text">Remover</span>
                        </button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(itemEl);
        });

        updateTotals();
    }

    // ─── Event Delegation (um único listener no container) ─────────────────────
    // Usando delegação de eventos: um listener no pai, sem precisar re-attachar
    cartItemsContainer.addEventListener('click', (e) => {
        // Encontra o botão clicado (pode ser o ícone interno, então sobe para o botão)
        const btn = e.target.closest('[data-action]');
        if (!btn) return;

        const action  = btn.getAttribute('data-action');
        const id      = btn.getAttribute('data-id');
        const variant = btn.getAttribute('data-variant');

        if (action === 'increment') {
            const currentQty = window.CartStore.getCart().find(i => i.id === id && i.variant === variant)?.qty ?? 1;
            window.CartStore.updateQty(id, variant, currentQty + 1);
            renderCart();

        } else if (action === 'decrement') {
            const currentQty = window.CartStore.getCart().find(i => i.id === id && i.variant === variant)?.qty ?? 1;
            if (currentQty > 1) {
                window.CartStore.updateQty(id, variant, currentQty - 1);
                renderCart();
            }

        } else if (action === 'remove') {
            const cartItem = btn.closest('.cart-item');
            if (cartItem) {
                cartItem.style.transition = 'all 0.3s ease';
                cartItem.style.transform = 'translateX(-30px)';
                cartItem.style.opacity = '0';
            }
            setTimeout(() => {
                window.CartStore.removeItem(id, variant);
                renderCart();
                window.CartStore.showToast('Item removido da sacola');
            }, 300);
        }
    });

    // ─── Totals ─────────────────────────────────────────────────────────────────
    function updateTotals() {
        if (!window.CartStore) return;
        const cart = window.CartStore.getCart();

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        const tax      = subtotal * 0.08;
        const total    = subtotal + tax;

        const fmt = val => `R$ ${val.toFixed(2).replace('.', ',')}`;

        const subtotalEl = document.getElementById('subtotal-display');
        const taxEl      = document.getElementById('tax-display');
        const totalEl    = document.getElementById('total-display');

        if (subtotalEl) subtotalEl.textContent = fmt(subtotal);
        if (taxEl)      taxEl.textContent      = fmt(tax);
        if (totalEl)    totalEl.textContent    = fmt(total);

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = cart.length === 0;
        }
    }

    // ─── Checkout ───────────────────────────────────────────────────────────────
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.CartStore.getCart().length === 0) return;

            if (checkoutForm && !checkoutForm.checkValidity()) {
                checkoutForm.reportValidity();
                return;
            }

            const nome = document.getElementById('f-nome').value;
            const cep = document.getElementById('f-cep').value;
            const endereco = document.getElementById('f-endereco').value;
            const complemento = document.getElementById('f-complemento').value;
            const referencia = document.getElementById('f-referencia').value;
            const bairro = document.getElementById('f-bairro').value;
            const cidade = document.getElementById('f-cidade').value;
            const estado = document.getElementById('f-estado').value;

            const cart = window.CartStore.getCart();
            const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
            const tax = subtotal * 0.08;
            const total = subtotal + tax;
            const fmt = val => `R$ ${val.toFixed(2).replace('.', ',')}`;

            let msg = `*Novo Pedido*\n\n`;
            msg += `*Itens:*\n`;
            cart.forEach(item => {
                msg += `- ${item.qty}x ${item.name} (${item.variant}) - ${fmt(item.price * item.qty)}\n`;
            });
            msg += `\n*Subtotal:* ${fmt(subtotal)}`;
            msg += `\n*Frete:* Grátis`;
            msg += `\n*Impostos:* ${fmt(tax)}`;
            msg += `\n*Total:* ${fmt(total)}\n\n`;
            msg += `*Dados de Entrega:*\n`;
            msg += `Nome: ${nome}\n`;
            msg += `CEP: ${cep}\n`;
            msg += `Endereço: ${endereco}`;
            if (complemento) msg += ` - ${complemento}`;
            msg += `\nBairro: ${bairro}\n`;
            msg += `Cidade: ${cidade} - ${estado}\n`;
            if (referencia) msg += `Ref: ${referencia}\n`;

            const encodedMsg = encodeURIComponent(msg);
            const waUrl = `https://wa.me/5545988127886?text=${encodedMsg}`;
            
            window.open(waUrl, '_blank');
        });
    }

    // ─── CEP Autocomplete ───────────────────────────────────────────────────────
    const cepInput = document.getElementById('f-cep');
    if (cepInput) {
        cepInput.addEventListener('blur', async (e) => {
            let cep = e.target.value.replace(/\D/g, '');
            if (cep.length === 8) {
                try {
                    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                    const data = await res.json();
                    if (!data.erro) {
                        document.getElementById('f-endereco').value = data.logradouro || '';
                        document.getElementById('f-bairro').value = data.bairro || '';
                        document.getElementById('f-cidade').value = data.localidade || '';
                        document.getElementById('f-estado').value = data.uf || '';
                        
                        // Focus number or complement
                        document.getElementById('f-endereco').focus();
                    }
                } catch (err) {
                    console.error("Erro ao buscar CEP", err);
                }
            }
        });
    }

    // Render inicial
    renderCart();
});
