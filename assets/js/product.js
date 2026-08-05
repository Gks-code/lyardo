document.addEventListener('DOMContentLoaded', () => {

    // ─── CATALOG (same data as script.js) ────────────────────────────────────
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

    // ─── Dynamic Product Page ────────────────────────────────────────────────
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const productDataElement = document.getElementById('product-detail-data');

    if (productId) {
        const product = CATALOG.find(p => p.id === productId);
        if (product) {
            // Update data attributes on the section
            productDataElement.setAttribute('data-id', product.id);
            productDataElement.setAttribute('data-name', product.name);
            productDataElement.setAttribute('data-price', product.price.toFixed(2));
            productDataElement.setAttribute('data-img', product.img);

            // Update visible elements
            const mainImage = document.getElementById('main-product-image');
            if (mainImage) {
                mainImage.src = product.img;
                mainImage.alt = product.name;
            }

            const titleEl = document.querySelector('.product-title');
            if (titleEl) titleEl.textContent = product.name;

            const categoryEl = document.querySelector('.category-tag');
            if (categoryEl) categoryEl.textContent = product.category || '';

            const priceEl = document.querySelector('.product-details .product-price');
            if (priceEl) priceEl.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;

            const descEl = document.querySelector('.product-desc');
            if (descEl) descEl.textContent = product.desc;

            // Update page title
            document.title = `${product.name} - Lyardo Cosmetics`;

            // Update thumbnails to use the product image
            const thumbnails = document.querySelectorAll('.thumb-btn img');
            thumbnails.forEach(img => {
                img.src = product.img;
                img.alt = product.name;
            });
        }
    }

    // ─── Thumbnail Image Swapping ────────────────────────────────────────────
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumb-btn');
    
    thumbnails.forEach(thumbBtn => {
        thumbBtn.addEventListener('click', function() {
            thumbnails.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const thumbImg = this.querySelector('img');
            
            // Fade effect
            mainImage.style.opacity = 0;
            setTimeout(() => {
                const tempSrc = mainImage.src;
                const tempAlt = mainImage.alt;
                
                mainImage.src = thumbImg.src;
                mainImage.alt = thumbImg.alt;
                
                thumbImg.src = tempSrc;
                thumbImg.alt = tempAlt;
                
                mainImage.style.opacity = 1;
            }, 300);
        });
    });

    // ─── Shade Selection ─────────────────────────────────────────────────────
    const shadeBtns = document.querySelectorAll('.shade-btn');
    const shadeNameLabel = document.getElementById('current-shade-name');
    
    shadeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            shadeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (shadeNameLabel) {
                shadeNameLabel.textContent = this.getAttribute('aria-label');
            }
        });
    });

    // ─── Favorite Buttons ────────────────────────────────────────────────────
    const favButtons = document.querySelectorAll('.fav-btn, .btn-fav');
    favButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const icon = btn.querySelector('.material-symbols-outlined');
            if (icon.style.fontVariationSettings.includes("'FILL' 1")) {
                icon.style.fontVariationSettings = "'FILL' 0";
                icon.style.color = "";
            } else {
                icon.style.fontVariationSettings = "'FILL' 1";
                icon.style.color = "var(--c-pink-dark)";
            }
        });
    });

    // ─── Add to Cart ─────────────────────────────────────────────────────────
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    
    if(addToCartBtn && productDataElement && window.CartStore) {
        addToCartBtn.addEventListener('click', () => {
            const shadeName = shadeNameLabel ? shadeNameLabel.textContent : 'Padrão';
            
            const product = {
                id: productDataElement.getAttribute('data-id'),
                name: productDataElement.getAttribute('data-name'),
                price: parseFloat(productDataElement.getAttribute('data-price')),
                img: productDataElement.getAttribute('data-img'),
                variant: shadeName,
                qty: 1
            };
            
            window.CartStore.addItem(product);
            
            // Show feedback on button
            const originalText = addToCartBtn.textContent;
            addToCartBtn.textContent = "Adicionado! ✓";
            addToCartBtn.style.backgroundColor = "var(--c-text-main)";
            
            setTimeout(() => {
                addToCartBtn.textContent = originalText;
                addToCartBtn.style.backgroundColor = "";
            }, 2000);
        });
    }
});
