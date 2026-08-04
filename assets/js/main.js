/**
 * Tirzena Pharma - Pure Vanilla JavaScript & Checkout Order Drawer ("Meu pedido")
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. STATE & LOCALSTORAGE
    // -------------------------------------------------------------------------
    let cart = JSON.parse(localStorage.getItem('tirzena_cart')) || [];
    let appliedCoupon = JSON.parse(localStorage.getItem('tirzena_coupon')) || null;
    let clientData = JSON.parse(localStorage.getItem('tirzena_client_data')) || {};

    const coupons = {
        'TIRZENA10': { type: 'percent', value: 10, label: '10% de desconto' },
        'PRIMEIRACOMPRA': { type: 'percent', value: 15, label: '15% de desconto' },
        'FRETEGRATIS': { type: 'fixed', value: 0, label: 'Frete Grátis' }
    };

    const FREE_SHIPPING_THRESHOLD = 500;

    // DOM Elements
    const header = document.querySelector('.site-header');
    const cartToggleBtn = document.getElementById('cartToggleBtn');
    const cartBackdrop = document.getElementById('cartBackdrop');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const cartBadge = document.getElementById('cartBadge');
    const cartDrawerCount = document.getElementById('cartDrawerCount');
    const cartItemsContainer = document.getElementById('cartItemsContainer');

    // Summary Elements
    const cartSubtotalEl = document.getElementById('cartSubtotal');
    const cartShippingPriceEl = document.getElementById('cartShippingPrice');
    const cartDiscountEl = document.getElementById('cartDiscount');
    const discountRow = document.getElementById('discountRow');
    const cartInsurancePriceEl = document.getElementById('cartInsurancePrice');
    const iceSummaryRow = document.getElementById('iceSummaryRow');
    const insuranceSummaryRow = document.getElementById('insuranceSummaryRow');
    const cartTotalEl = document.getElementById('cartTotal');
    const whatsappCheckoutBtn = document.getElementById('whatsappCheckoutBtn');

    // Coupon Elements
    const couponInput = document.getElementById('couponInput');
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    const couponMessage = document.getElementById('couponMessage');

    // Form Inputs
    const clientNameInput = document.getElementById('clientName');
    const clientCpfInput = document.getElementById('clientCpf');
    const clientCepInput = document.getElementById('clientCep');
    const clientAddressInput = document.getElementById('clientAddress');
    const clientComplementInput = document.getElementById('clientComplement');
    const clientReferenceInput = document.getElementById('clientReference');
    const clientNeighborhoodInput = document.getElementById('clientNeighborhood');
    const clientCityInput = document.getElementById('clientCity');
    const clientStateInput = document.getElementById('clientState');

    // Options (Shipping & Addons)
    const shippingOptions = document.getElementsByName('shippingOption');
    const iceAddonInput = document.getElementById('iceAddon');
    const insuranceAddonInput = document.getElementById('insuranceAddon');
    const iceOptionCard = document.getElementById('iceOptionCard');
    const insuranceOptionCard = document.getElementById('insuranceOptionCard');

    // Load saved client data into form
    if (clientNameInput && clientData.name) clientNameInput.value = clientData.name;
    if (clientCpfInput && clientData.cpf) clientCpfInput.value = clientData.cpf;
    if (clientCepInput && clientData.cep) clientCepInput.value = clientData.cep;
    if (clientAddressInput && clientData.address) clientAddressInput.value = clientData.address;
    if (clientComplementInput && clientData.complement) clientComplementInput.value = clientData.complement;
    if (clientReferenceInput && clientData.reference) clientReferenceInput.value = clientData.reference;
    if (clientNeighborhoodInput && clientData.neighborhood) clientNeighborhoodInput.value = clientData.neighborhood;
    if (clientCityInput && clientData.city) clientCityInput.value = clientData.city;
    if (clientStateInput && clientData.state) clientStateInput.value = clientData.state;

    // -------------------------------------------------------------------------
    // 2. HEADER SEARCH BAR LOGIC
    // -------------------------------------------------------------------------
    const headerSearchInput = document.getElementById('headerSearchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');
    const searchResultsDropdown = document.getElementById('searchResultsDropdown');

    // Collect products from page
    function getPageProducts() {
        const productBtns = document.querySelectorAll('[data-add-cart]');
        const items = [];
        const seenIds = new Set();

        productBtns.forEach(btn => {
            const id = btn.getAttribute('data-id');
            if (!id || seenIds.has(id)) return;
            seenIds.add(id);

            items.push({
                id,
                name: btn.getAttribute('data-name') || '',
                price: parseFloat(btn.getAttribute('data-price')) || 0,
                subtitle: btn.getAttribute('data-subtitle') || '',
                img: btn.getAttribute('data-img') || '',
                element: btn.closest('.product-card, .peptide-card, .hero-section')
            });
        });
        return items;
    }

    if (headerSearchInput && searchResultsDropdown) {
        headerSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();

            if (query.length > 0) {
                if (searchClearBtn) searchClearBtn.classList.add('active');
            } else {
                if (searchClearBtn) searchClearBtn.classList.remove('active');
                searchResultsDropdown.classList.remove('active');
                return;
            }

            const products = getPageProducts();
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.subtitle.toLowerCase().includes(query)
            );

            if (filtered.length === 0) {
                searchResultsDropdown.innerHTML = `<div class="search-no-results">Nenhum produto encontrado para "${e.target.value}"</div>`;
            } else {
                searchResultsDropdown.innerHTML = filtered.map(p => `
                    <div class="search-result-item" data-id="${p.id}">
                        <img class="search-result-img" src="${p.img}" alt="${p.name}"/>
                        <div class="search-result-info">
                            <span class="search-result-name">${p.name}</span>
                            <span class="search-result-meta">${p.subtitle}</span>
                        </div>
                        <span class="search-result-price">${p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                `).join('');

                // Click result listener
                document.querySelectorAll('.search-result-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const targetId = item.getAttribute('data-id');
                        const targetProduct = products.find(p => p.id === targetId);
                        
                        searchResultsDropdown.classList.remove('active');
                        headerSearchInput.value = '';
                        if (searchClearBtn) searchClearBtn.classList.remove('active');

                        if (targetProduct && targetProduct.element) {
                            targetProduct.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            targetProduct.element.style.outline = '2px solid #3FCBB8';
                            setTimeout(() => {
                                targetProduct.element.style.outline = 'none';
                            }, 2500);
                        }
                    });
                });
            }

            searchResultsDropdown.classList.add('active');
        });

        if (searchClearBtn) {
            searchClearBtn.addEventListener('click', () => {
                headerSearchInput.value = '';
                searchClearBtn.classList.remove('active');
                searchResultsDropdown.classList.remove('active');
                headerSearchInput.focus();
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header-search-wrapper')) {
                searchResultsDropdown.classList.remove('active');
            }
        });
    }

    // -------------------------------------------------------------------------
    // 3. HEADER SCROLL SHADOW
    // -------------------------------------------------------------------------
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // -------------------------------------------------------------------------
    // 3. DRAWER CONTROLS
    // -------------------------------------------------------------------------
    function openCart() {
        if (cartDrawer && cartBackdrop) {
            cartDrawer.classList.add('active');
            cartBackdrop.classList.add('active');
            document.body.classList.add('cart-open');
        }
    }

    function closeCart() {
        if (cartDrawer && cartBackdrop) {
            cartDrawer.classList.remove('active');
            cartBackdrop.classList.remove('active');
            document.body.classList.remove('cart-open');
        }
    }

    if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCart();
    });

    // -------------------------------------------------------------------------
    // 4. ADD TO CART LOGIC
    // -------------------------------------------------------------------------
    const addButtons = document.querySelectorAll('[data-add-cart]');
    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const img = button.getAttribute('data-img');
            const subtitle = button.getAttribute('data-subtitle') || '';

            if (!id || !name || isNaN(price)) return;

            addToCart({ id, name, price, img, subtitle });

            // Visual feedback
            const originalHTML = button.innerHTML;
            button.classList.add('added');
            button.innerHTML = '<span class="material-symbols-outlined">check</span><span class="btn-text"> Adicionado</span>';

            if (cartBadge) {
                cartBadge.classList.add('bump');
                setTimeout(() => cartBadge.classList.remove('bump'), 300);
            }

            setTimeout(() => {
                button.classList.remove('added');
                button.innerHTML = originalHTML;
            }, 1800);

            openCart();
        });
    });

    function addToCart(item) {
        const existingItemIndex = cart.findIndex(i => i.id === item.id);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        saveCartAndUpdateUI();
    }

    function changeQuantity(id, delta) {
        const itemIndex = cart.findIndex(i => i.id === id);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += delta;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            saveCartAndUpdateUI();
        }
    }

    function removeItem(id) {
        cart = cart.filter(i => i.id !== id);
        saveCartAndUpdateUI();
    }

    // -------------------------------------------------------------------------
    // 5. MASKS & VIA-CEP AUTOFILL
    // -------------------------------------------------------------------------
    if (clientCpfInput) {
        clientCpfInput.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 11) v = v.substring(0, 11);
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = v;
            saveClientData();
        });
    }

    if (clientCepInput) {
        clientCepInput.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 8) v = v.substring(0, 8);
            v = v.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = v;

            // Trigger ViaCEP API when 8 digits entered
            const rawCep = v.replace(/\D/g, '');
            if (rawCep.length === 8) {
                fetch(`https://viacep.com.br/ws/${rawCep}/json/`)
                    .then(res => res.json())
                    .then(data => {
                        if (!data.erro) {
                            if (clientAddressInput && !clientAddressInput.value) clientAddressInput.value = data.logradouro;
                            if (clientNeighborhoodInput) clientNeighborhoodInput.value = data.bairro;
                            if (clientCityInput) clientCityInput.value = data.localidade;
                            if (clientStateInput) clientStateInput.value = data.uf;
                            saveClientData();
                        }
                    })
                    .catch(() => {});
            }
            saveClientData();
        });
    }

    // Save inputs on change
    [clientNameInput, clientAddressInput, clientComplementInput, clientReferenceInput, clientNeighborhoodInput, clientCityInput, clientStateInput].forEach(input => {
        if (input) input.addEventListener('input', saveClientData);
    });

    function saveClientData() {
        const data = {
            name: clientNameInput ? clientNameInput.value : '',
            cpf: clientCpfInput ? clientCpfInput.value : '',
            cep: clientCepInput ? clientCepInput.value : '',
            address: clientAddressInput ? clientAddressInput.value : '',
            complement: clientComplementInput ? clientComplementInput.value : '',
            reference: clientReferenceInput ? clientReferenceInput.value : '',
            neighborhood: clientNeighborhoodInput ? clientNeighborhoodInput.value : '',
            city: clientCityInput ? clientCityInput.value : '',
            state: clientStateInput ? clientStateInput.value : ''
        };
        localStorage.setItem('tirzena_client_data', JSON.stringify(data));
    }

    // Option cards toggle styling
    if (iceAddonInput && iceOptionCard) {
        iceAddonInput.addEventListener('change', () => {
            if (iceAddonInput.checked) iceOptionCard.classList.add('selected');
            else iceOptionCard.classList.remove('selected');
            updateCartUI();
        });
    }

    if (insuranceAddonInput && insuranceOptionCard) {
        insuranceAddonInput.addEventListener('change', () => {
            if (insuranceAddonInput.checked) insuranceOptionCard.classList.add('selected');
            else insuranceOptionCard.classList.remove('selected');
            updateCartUI();
        });
    }

    if (shippingOptions) {
        shippingOptions.forEach(opt => opt.addEventListener('change', updateCartUI));
    }

    // -------------------------------------------------------------------------
    // 6. COUPON SYSTEM
    // -------------------------------------------------------------------------
    if (applyCouponBtn && couponInput) {
        applyCouponBtn.addEventListener('click', handleApplyCoupon);
        couponInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleApplyCoupon();
        });
    }

    function handleApplyCoupon() {
        const code = couponInput.value.trim().toUpperCase();
        if (!code) return;

        if (coupons[code]) {
            appliedCoupon = { code, ...coupons[code] };
            localStorage.setItem('tirzena_coupon', JSON.stringify(appliedCoupon));
            showCouponMessage(`Cupom "${code}" aplicado!`, 'success');
        } else {
            showCouponMessage('Cupom inválido.', 'error');
        }
        updateCartUI();
    }

    function showCouponMessage(msg, type) {
        if (!couponMessage) return;
        couponMessage.textContent = msg;
        couponMessage.className = `coupon-message ${type}`;
        setTimeout(() => {
            couponMessage.textContent = '';
            couponMessage.className = 'coupon-message';
        }, 3000);
    }

    // -------------------------------------------------------------------------
    // 7. RENDER & UPDATE UI
    // -------------------------------------------------------------------------
    function saveCartAndUpdateUI() {
        localStorage.setItem('tirzena_cart', JSON.stringify(cart));
        updateCartUI();
    }

    function formatCurrency(val) {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function updateCartUI() {
        const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (cartBadge) cartBadge.textContent = totalItemsCount;
        if (cartDrawerCount) cartDrawerCount.textContent = totalItemsCount;

        // Render Cart Items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty-box">
                    <span class="material-symbols-outlined">inventory_2</span>
                    <p>Seu pedido está vazio.</p>
                </div>
            `;
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-accent"></div>
                    <div class="cart-item-body">
                        <div class="cart-item-img-box">
                            <img class="cart-item-img" src="${item.img}" alt="${item.name}"/>
                        </div>
                        <div class="cart-item-info">
                            <h4 class="cart-item-title">${item.name}</h4>
                            ${item.subtitle ? `<span class="cart-item-subtitle">${item.subtitle}</span>` : ''}
                            <div class="cart-item-price">${formatCurrency(item.price * item.quantity)}</div>
                        </div>
                    </div>
                    <div class="cart-item-bottom">
                        <div class="qty-control">
                            <button class="qty-btn btn-qty-minus" data-id="${item.id}">−</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn btn-qty-plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="btn-item-remove" data-id="${item.id}" title="Remover item">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.btn-qty-minus').forEach(btn => {
                btn.addEventListener('click', () => changeQuantity(btn.getAttribute('data-id'), -1));
            });
            document.querySelectorAll('.btn-qty-plus').forEach(btn => {
                btn.addEventListener('click', () => changeQuantity(btn.getAttribute('data-id'), 1));
            });
            document.querySelectorAll('.btn-item-remove').forEach(btn => {
                btn.addEventListener('click', () => removeItem(btn.getAttribute('data-id')));
            });
        }

        // Calculate Shipping Fee
        let selectedShipping = 'sedex';
        shippingOptions.forEach(opt => {
            if (opt.checked) selectedShipping = opt.value;
        });

        let shippingCost = 0;
        if (selectedShipping === 'transportadora') {
            shippingCost = 29.90;
        } else {
            // SEDEX
            shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 25.00;
        }

        const sedexPriceEl = document.getElementById('shippingSedexPrice');
        if (sedexPriceEl) {
            sedexPriceEl.textContent = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 'Grátis' : 'R$ 25,00';
        }

        // Calculate Addons
        let iceCost = (iceAddonInput && iceAddonInput.checked && cart.length > 0) ? 20.00 : 0;
        let insuranceCost = (insuranceAddonInput && insuranceAddonInput.checked && cart.length > 0) ? (subtotal * 0.10) : 0;

        if (iceSummaryRow) iceSummaryRow.style.display = iceCost > 0 ? 'flex' : 'none';
        if (insuranceSummaryRow) insuranceSummaryRow.style.display = insuranceCost > 0 ? 'flex' : 'none';
        if (cartInsurancePriceEl) cartInsurancePriceEl.textContent = formatCurrency(insuranceCost);

        // Calculate Discount
        let discount = 0;
        if (appliedCoupon && appliedCoupon.type === 'percent') {
            discount = (subtotal * appliedCoupon.value) / 100;
        }

        const total = Math.max(0, subtotal + shippingCost + iceCost + insuranceCost - discount);

        if (cartSubtotalEl) cartSubtotalEl.textContent = formatCurrency(subtotal);
        if (cartShippingPriceEl) cartShippingPriceEl.textContent = shippingCost === 0 ? (subtotal > 0 ? 'Grátis' : '—') : formatCurrency(shippingCost);

        if (discount > 0 && cartDiscountEl && discountRow) {
            discountRow.style.display = 'flex';
            cartDiscountEl.textContent = `-${formatCurrency(discount)}`;
        } else if (discountRow) {
            discountRow.style.display = 'none';
        }

        if (cartTotalEl) cartTotalEl.textContent = formatCurrency(total);
    }

    // -------------------------------------------------------------------------
    // 8. WHATSAPP ORDER SUBMISSION
    // -------------------------------------------------------------------------
    if (whatsappCheckoutBtn) {
        whatsappCheckoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Seu pedido está vazio!');
                return;
            }

            const name = clientNameInput ? clientNameInput.value.trim() : '';
            const cpf = clientCpfInput ? clientCpfInput.value.trim() : '';
            const cep = clientCepInput ? clientCepInput.value.trim() : '';
            const address = clientAddressInput ? clientAddressInput.value.trim() : '';
            const complement = clientComplementInput ? clientComplementInput.value.trim() : '';
            const reference = clientReferenceInput ? clientReferenceInput.value.trim() : '';
            const neighborhood = clientNeighborhoodInput ? clientNeighborhoodInput.value.trim() : '';
            const city = clientCityInput ? clientCityInput.value.trim() : '';
            const state = clientStateInput ? clientStateInput.value.trim() : '';

            if (!name) {
                alert('Por favor, informe seu Nome e Sobrenome antes de finalizar.');
                clientNameInput.focus();
                return;
            }

            const phone = "5511999999999";
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            let selectedShipping = 'sedex';
            shippingOptions.forEach(opt => {
                if (opt.checked) selectedShipping = opt.value;
            });

            let shippingCost = selectedShipping === 'transportadora' ? 29.90 : (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 25.00);
            let shippingLabel = selectedShipping === 'transportadora' ? 'Transportadora (R$ 29,90)' : (subtotal >= FREE_SHIPPING_THRESHOLD ? 'SEDEX (Grátis)' : 'SEDEX (R$ 25,00)');

            let iceCost = (iceAddonInput && iceAddonInput.checked) ? 20.00 : 0;
            let insuranceCost = (insuranceAddonInput && insuranceAddonInput.checked) ? (subtotal * 0.10) : 0;

            let discount = 0;
            if (appliedCoupon && appliedCoupon.type === 'percent') {
                discount = (subtotal * appliedCoupon.value) / 100;
            }

            const total = Math.max(0, subtotal + shippingCost + iceCost + insuranceCost - discount);

            let text = `📦 *NOVO PEDIDO - TIRZENA PHARMA*\n\n`;
            text += `👤 *DADOS DO CLIENTE:*\n`;
            text += `• *Nome:* ${name}\n`;
            if (cpf) text += `• *CPF:* ${cpf}\n`;
            if (cep) text += `• *CEP:* ${cep}\n`;
            if (address) text += `• *Endereço:* ${address}${complement ? ` (${complement})` : ''}\n`;
            if (neighborhood) text += `• *Bairro:* ${neighborhood}\n`;
            if (city || state) text += `• *Cidade/UF:* ${city} / ${state}\n`;
            if (reference) text += `• *Ponto de Ref:* ${reference}\n`;

            text += `\n🛒 *ITENS DO PEDIDO:*\n`;
            cart.forEach(item => {
                text += `• ${item.quantity}x *${item.name}* - ${formatCurrency(item.price * item.quantity)}\n`;
            });

            text += `\n🚚 *FRETE & OPÇÕES:*\n`;
            text += `• *Envio:* ${shippingLabel}\n`;
            if (iceCost > 0) text += `• *Isopor com gelo:* Sim (+ R$ 20,00)\n`;
            if (insuranceCost > 0) text += `• *Seguro do frete:* Sim (+ ${formatCurrency(insuranceCost)})\n`;

            text += `\n💰 *RESUMO DO PEDIDO:*\n`;
            text += `• *Subtotal:* ${formatCurrency(subtotal)}\n`;
            if (discount > 0) text += `• *Desconto (${appliedCoupon.code}):* -${formatCurrency(discount)}\n`;
            text += `💵 *TOTAL:* ${formatCurrency(total)}\n\n`;
            text += `Aguardando confirmação e chave PIX para pagamento!`;

            const encodedText = encodeURIComponent(text);
            window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`, '_blank');
        });
    }

    // Initial render
    updateCartUI();

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
