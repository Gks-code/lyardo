document.addEventListener('DOMContentLoaded', () => {

    // Checkbox logic
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            // Can add filtering logic here in the future
        });
    });

    // Favorite buttons
    const favButtons = document.querySelectorAll('.fav-btn');
    favButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = btn.querySelector('.material-symbols-outlined');
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                icon.style.fontVariationSettings = "'FILL' 0";
                icon.style.color = "";
            } else {
                btn.classList.add('active');
                icon.style.fontVariationSettings = "'FILL' 1";
                icon.style.color = "var(--c-pink-dark)";
            }
        });
    });

    // Add to cart logic - suporta .add-to-cart-quick em cards de produto e kits
    const addBtns = document.querySelectorAll('.add-to-cart-quick');
    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            // Tenta pegar dados do card pai (.product-card ou .kit-card)
            const card = btn.closest('[data-id]') || btn.closest('.product-card') || btn.closest('.kit-card');

            // Se o botão em si tem os dados (kit-capilar), usa o botão; senão usa o card pai
            const source = (btn.getAttribute('data-id')) ? btn : card;

            if (source && window.CartStore) {
                const product = {
                    id: source.getAttribute('data-id'),
                    name: source.getAttribute('data-name'),
                    price: parseFloat(source.getAttribute('data-price')),
                    img: source.getAttribute('data-img'),
                    variant: 'Padrão'
                };
                window.CartStore.addItem(product);
            }
        });
    });

    // ─── SEARCH LOGIC ─────────────────────────────────────────────────────────
    const CATALOG = [
        { name: "Lunar Glow Iluminador", price: 189.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0tsgst4AT_MyfxAxxVa6RK9OweGylTypFQBjyA1VvygTU917ghd-sHfvxR9ZgN5DVmOMoGmtxhY28lImnJ_S89yDGrMZ_byl4fWbt_XWdLeva4jb-m7vasBmN6Jh9La6CXKc31fwE56AsS0A-x1LgbfEAUanLl9bdv2eVrzZGsBUuglEamrFPjwRKbMG9ihGyCYOurrB6-1bf6D9RdZoHekQyCVEkTcUDuK8iJkDAgNXhriJD3dc" },
        { name: "Base Líquida Silk", price: 245.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5Z5BpRGdySHnOQaP8VS2f0lZS2I7jliRbS4zHpnO_BbMyUqja8exnxEb1_maMDLipjs3kDk0ZLYSCOInf9zSV2AsLQbG3Y2mSmwcwcEhes8hnc9B_i80Kx0q-_GwIyUTO16ub_r5KnftP8DthkplcKx4yuZkRk8azC1e6-wZGlIGZB9MKZBsQ7TvYc5v6DqoCo7bkj-HDXES6y2qqDwG4toehgekKiQbz93QBCBo4-1Ks_uweJkM" },
        { name: "Sérum Vitamina C Radiante", price: 220.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7etgCQ2AB4nFOzNrn2U8tuJMt9_GcWusBLOCMsMz4Pe9-8xKAIBDAITh-ycL5DOfe-2wRrjCoknJgfHtdtgaQZAtzBncgvMZXMkG52F8vg40AnykJ443OqFc9GZ0e6TPAMCGcoK_gtPPL0a7Skcy4vd10CrVL_FA1FzX_U4oTWtRk4qb2BhhB7vMJaVCJRnjDTjN3Y7hGMdWiBGtbONf-XwkF3sYwECGmtwXx4hVQNu4zduN-1ZM" },
        { name: "Hidratante Facial Glow", price: 175.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiAHgxS82ohnk2LGmzGffb3WIB0YmdMQ2ti8kt6YgRhQ4_vAPUGPs_53FeE72elBhTNr90f8LjO8UzK7upzUVnR8fpPpiwLf3Fq7fqkognrBR4jc6th2Z-qIFj9aWZpKI2f9FXMFhiIc5tIRLUfp9k78rShaCjOcAOR4dL1DH8iPjAcnO8pvm30DGn8HfC2hupZsmEIBwKGpSe9gCMaVXI1Je4j25GkMWD3fiz1l2-1plO7HZ5qOc" },
        { name: "Kit Glow Completo", price: 379.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0tsgst4AT_MyfxAxxVa6RK9OweGylTypFQBjyA1VvygTU917ghd-sHfvxR9ZgN5DVmOMoGmtxhY28lImnJ_S89yDGrMZ_byl4fWbt_XWdLeva4jb-m7vasBmN6Jh9La6CXKc31fwE56AsS0A-x1LgbfEAUanLl9bdv2eVrzZGsBUuglEamrFPjwRKbMG9ihGyCYOurrB6-1bf6D9RdZoHekQyCVEkTcUDuK8iJkDAgNXhriJD3dc" },
        { name: "Kit Skincare Básico", price: 310.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7etgCQ2AB4nFOzNrn2U8tuJMt9_GcWusBLOCMsMz4Pe9-8xKAIBDAITh-ycL5DOfe-2wRrjCoknJgfHtdtgaQZAtzBncgvMZXMkG52F8vg40AnykJ443OqFc9GZ0e6TPAMCGcoK_gtPPL0a7Skcy4vd10CrVL_FA1FzX_U4oTWtRk4qb2BhhB7vMJaVCJRnjDTjN3Y7hGMdWiBGtbONf-XwkF3sYwECGmtwXx4hVQNu4zduN-1ZM" },
        { name: "Kit Presente Luxo", price: 490.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiAHgxS82ohnk2LGmzGffb3WIB0YmdMQ2ti8kt6YgRhQ4_vAPUGPs_53FeE72elBhTNr90f8LjO8UzK7upzUVnR8fpPpiwLf3Fq7fqkognrBR4jc6th2Z-qIFj9aWZpKI2f9FXMFhiIc5tIRLUfp9k78rShaCjOcAOR4dL1DH8iPjAcnO8pvm30DGn8HfC2hupZsmEIBwKGpSe9gCMaVXI1Je4j25GkMWD3fiz1l2-1plO7HZ5qOc" },
        { name: "Kit Maquiagem Completa", price: 425.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5Z5BpRGdySHnOQaP8VS2f0lZS2I7jliRbS4zHpnO_BbMyUqja8exnxEb1_maMDLipjs3kDk0ZLYSCOInf9zSV2AsLQbG3Y2mSmwcwcEhes8hnc9B_i80Kx0q-_GwIyUTO16ub_r5KnftP8DthkplcKx4yuZkRk8azC1e6-wZGlIGZB9MKZBsQ7TvYc5v6DqoCo7bkj-HDXES6y2qqDwG4toehgekKiQbz93QBCBo4-1Ks_uweJkM" }
    ];

    // Create Modal HTML
    const searchHTML = `
        <div class="search-overlay" id="search-overlay">
            <button class="search-close" id="search-close"><span class="material-symbols-outlined">close</span></button>
            <div class="search-container">
                <span class="material-symbols-outlined search-icon-inside">search</span>
                <input type="text" class="search-input" id="search-input" placeholder="O que você está procurando?">
                <div class="search-results" id="search-results"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', searchHTML);

    const overlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    
    // Find all search buttons in header
    const searchButtons = document.querySelectorAll('.header-actions .icon-btn');
    searchButtons.forEach(btn => {
        // Find the one with search icon
        if (btn.querySelector('.material-symbols-outlined') && btn.querySelector('.material-symbols-outlined').textContent === 'search') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                overlay.classList.add('active');
                setTimeout(() => searchInput.focus(), 100);
            });
        }
    });

    document.getElementById('search-close').addEventListener('click', () => {
        overlay.classList.remove('active');
        searchInput.value = '';
        resultsContainer.innerHTML = '';
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        resultsContainer.innerHTML = '';
        
        if (query.length < 2) return;

        const results = CATALOG.filter(item => item.name.toLowerCase().includes(query));
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p style="text-align:center; color: var(--c-text-muted); font-size: 18px; margin-top:20px;">Nenhum produto encontrado.</p>';
            return;
        }

        results.forEach(item => {
            const el = document.createElement('a');
            el.className = 'search-result-item';
            el.href = 'product.html'; // All point to product.html for now
            el.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="search-result-info">
                    <h4>${item.name}</h4>
                    <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                </div>
            `;
            resultsContainer.appendChild(el);
        });
    });

    // ─── MOBILE MENU LOGIC ────────────────────────────────────────────────────
    const headerActions = document.querySelector('.header-actions');
    const navLinks = document.querySelector('.nav-links');
    
    if (headerActions && navLinks) {
        // Create the hamburger button
        const menuBtn = document.createElement('button');
        menuBtn.className = 'icon-btn mobile-menu-btn';
        menuBtn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
        
        // Insert it as the first item in header-actions (left of search)
        headerActions.insertBefore(menuBtn, headerActions.firstChild);
        
        // Toggle menu on click
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('.material-symbols-outlined');
            if (navLinks.classList.contains('active')) {
                icon.textContent = 'close';
            } else {
                icon.textContent = 'menu';
            }
        });

        // Close menu when clicking a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
            });
        });
    }

});
