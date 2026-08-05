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
        { id: "p1", name: "Lunar Glow Iluminador", price: 189.00, category: "Rosto", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0tsgst4AT_MyfxAxxVa6RK9OweGylTypFQBjyA1VvygTU917ghd-sHfvxR9ZgN5DVmOMoGmtxhY28lImnJ_S89yDGrMZ_byl4fWbt_XWdLeva4jb-m7vasBmN6Jh9La6CXKc31fwE56AsS0A-x1LgbfEAUanLl9bdv2eVrzZGsBUuglEamrFPjwRKbMG9ihGyCYOurrB6-1bf6D9RdZoHekQyCVEkTcUDuK8iJkDAgNXhriJD3dc", desc: "Desperte a luminosidade etérea da sua pele. O Lunar Glow é um pó iluminador ultrafino que se funde perfeitamente, proporcionando um brilho multidimensional de aspecto natural. Sua textura macia e amanteigada reflete a luz com uma elegância suave, ideal para realçar seus traços com um acabamento radiante." },
        { id: "p2", name: "Base Líquida Silk", price: 245.00, category: "Rosto", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5Z5BpRGdySHnOQaP8VS2f0lZS2I7jliRbS4zHpnO_BbMyUqja8exnxEb1_maMDLipjs3kDk0ZLYSCOInf9zSV2AsLQbG3Y2mSmwcwcEhes8hnc9B_i80Kx0q-_GwIyUTO16ub_r5KnftP8DthkplcKx4yuZkRk8azC1e6-wZGlIGZB9MKZBsQ7TvYc5v6DqoCo7bkj-HDXES6y2qqDwG4toehgekKiQbz93QBCBo4-1Ks_uweJkM", desc: "Acabamento sedoso que se funde com sua pele, proporcionando cobertura média a alta. Fórmula leve e de longa duração com proteção SPF 15 para um visual impecável durante todo o dia." },
        { id: "p3", name: "Lip Balm Amanteigado", price: 95.00, category: "Lábios", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsW4QUTq4LA8-22a5jETl4QGDMunBdUBOcyS4kKRdSsBHEUd2P8_17VgkogXZ3aXq7jEMMTckd6-X9awpGL15phVt4W1f9uaVP-lWQS_6TPUQEN7kCmteGAjc_WIqsW19pjBGHGlPFlvocehwY2RUeRChT_5L8hD9ai09iP6f5lJXC2XG_rSyz10WjnoMXSFF3CGk_C6h6ZH8JULCxiCMvtx6zufkNX2DQMNa0186LMqBdlAqsVTM", desc: "Hidratação intensa com manteiga de karité e vitamina E. Textura amanteigada que derrete nos lábios deixando-os macios, nutridos e com um brilho sutil e natural." },
        { id: "sk1", name: "Sérum Vitamina C Radiante", price: 220.00, category: "Sérum", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7etgCQ2AB4nFOzNrn2U8tuJMt9_GcWusBLOCMsMz4Pe9-8xKAIBDAITh-ycL5DOfe-2wRrjCoknJgfHtdtgaQZAtzBncgvMZXMkG52F8vg40AnykJ443OqFc9GZ0e6TPAMCGcoK_gtPPL0a7Skcy4vd10CrVL_FA1FzX_U4oTWtRk4qb2BhhB7vMJaVCJRnjDTjN3Y7hGMdWiBGtbONf-XwkF3sYwECGmtwXx4hVQNu4zduN-1ZM", desc: "Ilumina, hidrata e combate radicais livres para um rosto revigorado. Fórmula potente com 15% de Vitamina C estabilizada e ácido hialurônico para uma pele visivelmente mais radiante." },
        { id: "sk2", name: "Hidratante Facial Glow", price: 175.00, category: "Hidratante", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiAHgxS82ohnk2LGmzGffb3WIB0YmdMQ2ti8kt6YgRhQ4_vAPUGPs_53FeE72elBhTNr90f8LjO8UzK7upzUVnR8fpPpiwLf3Fq7fqkognrBR4jc6th2Z-qIFj9aWZpKI2f9FXMFhiIc5tIRLUfp9k78rShaCjOcAOR4dL1DH8iPjAcnO8pvm30DGn8HfC2hupZsmEIBwKGpSe9gCMaVXI1Je4j25GkMWD3fiz1l2-1plO7HZ5qOc", desc: "Hidratação profunda sem pesar. Perfeito para preparar a pele antes da maquiagem. Enriquecido com ácido hialurônico e extrato de aloe vera para um efeito glow instantâneo." },
        { id: "sk3", name: "Protetor Solar Velvet FPS 60", price: 148.00, category: "Protetor Solar", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTkv9h5kUcodv0IYFzxuyhqi8CYRVYX_7gVFaBClgTWi4AopuMtUWA1ep_qUK7Gj-HJTo1-8JOzsZ5zwM6Q-1UqFBh4333h9B_kwBM3SSK7qZ7UReWJQ4-cDKUUaK97rci1KVWivoWJN7hxg-NSIYOAgdRrU7OJYvFxzrwk7CEDPFFEL-pzHjVxKNeK2pVRi7akBt-LCm67IqjiMn5kT0_C5x4g3iDKHoWVgIQH3aExYa6LQYzTI", desc: "Proteção solar de amplo espectro com acabamento aveludado e toque seco. Ideal para uso diário sob a maquiagem, sem deixar a pele oleosa ou com resíduo branco." },
        { id: "sk4", name: "Óleo de Rosa Mosqueta", price: 195.00, category: "Óleo Facial", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9_Ht4IKr-4Dn5xL1zhRoc5mcPFsp25SnS3RZktTTb9taeX_LEX8Sn8RwGbA70slzSqfv4pUhl2FKcd_Vbll2d6iTlBfdBTXLV2qPP9Nx3qntVSM4U8Qs6xMcay3tZMTK_i_u8MCs7DgPn3Rk5HJcESory3_vjmDJ32E4j8zR-L8AEVNE8pnRaQxDV7EVW6Lm-SrkKQwBWbfujY9X9Ca50hHSaX9hYSTGpIFwf-0K-Bp9voW3z8yI", desc: "Óleo 100% puro e prensado a frio. Rico em vitamina A e ácidos graxos essenciais, regenera e nutre profundamente a pele, reduzindo cicatrizes e manchas." },
        { id: "kit1", name: "Kit Glow Completo", price: 379.00, category: "Kit", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0tsgst4AT_MyfxAxxVa6RK9OweGylTypFQBjyA1VvygTU917ghd-sHfvxR9ZgN5DVmOMoGmtxhY28lImnJ_S89yDGrMZ_byl4fWbt_XWdLeva4jb-m7vasBmN6Jh9La6CXKc31fwE56AsS0A-x1LgbfEAUanLl9bdv2eVrzZGsBUuglEamrFPjwRKbMG9ihGyCYOurrB6-1bf6D9RdZoHekQyCVEkTcUDuK8iJkDAgNXhriJD3dc", desc: "O essencial para um brilho máximo em uma rotina completa. Inclui iluminador, primer e bruma fixadora em uma embalagem premium." },
        { id: "kit2", name: "Kit Skincare Básico", price: 310.00, category: "Kit", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7etgCQ2AB4nFOzNrn2U8tuJMt9_GcWusBLOCMsMz4Pe9-8xKAIBDAITh-ycL5DOfe-2wRrjCoknJgfHtdtgaQZAtzBncgvMZXMkG52F8vg40AnykJ443OqFc9GZ0e6TPAMCGcoK_gtPPL0a7Skcy4vd10CrVL_FA1FzX_U4oTWtRk4qb2BhhB7vMJaVCJRnjDTjN3Y7hGMdWiBGtbONf-XwkF3sYwECGmtwXx4hVQNu4zduN-1ZM", desc: "Os três passos fundamentais para uma pele limpa, tonificada e hidratada. Perfeito para quem está começando sua jornada de skincare." },
        { id: "kit3", name: "Kit Presente Luxo", price: 490.00, category: "Kit", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiAHgxS82ohnk2LGmzGffb3WIB0YmdMQ2ti8kt6YgRhQ4_vAPUGPs_53FeE72elBhTNr90f8LjO8UzK7upzUVnR8fpPpiwLf3Fq7fqkognrBR4jc6th2Z-qIFj9aWZpKI2f9FXMFhiIc5tIRLUfp9k78rShaCjOcAOR4dL1DH8iPjAcnO8pvm30DGn8HfC2hupZsmEIBwKGpSe9gCMaVXI1Je4j25GkMWD3fiz1l2-1plO7HZ5qOc", desc: "Presenteie com luxo e sofisticação. Uma seleção exclusiva dos nossos melhores produtos em embalagem para presente." },
        { id: "kit4", name: "Kit Maquiagem Completa", price: 425.00, category: "Kit", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5Z5BpRGdySHnOQaP8VS2f0lZS2I7jliRbS4zHpnO_BbMyUqja8exnxEb1_maMDLipjs3kDk0ZLYSCOInf9zSV2AsLQbG3Y2mSmwcwcEhes8hnc9B_i80Kx0q-_GwIyUTO16ub_r5KnftP8DthkplcKx4yuZkRk8azC1e6-wZGlIGZB9MKZBsQ7TvYc5v6DqoCo7bkj-HDXES6y2qqDwG4toehgekKiQbz93QBCBo4-1Ks_uweJkM", desc: "Todas as ferramentas necessárias para uma make perfeita. Inclui base, corretivo, pó e pincéis profissionais." }
    ];
    if (window.CartStore) window.CartStore.CATALOG = CATALOG;

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

    // Dynamic links
    const productCards = document.querySelectorAll('[data-id]');
    productCards.forEach(card => {
        const id = card.getAttribute('data-id');
        const viewBtn = card.querySelector('.view-btn');
        if (viewBtn) {
            viewBtn.href = `product.html?id=${id}`;
        }
        const titleLinks = card.querySelectorAll('a:not(.view-btn)');
        titleLinks.forEach(a => {
            a.href = `product.html?id=${id}`;
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
