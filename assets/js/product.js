document.addEventListener('DOMContentLoaded', () => {

    // ─── CATALOG (all products across all pages) ─────────────────────────────
    const CATALOG = [
        // Maquiagem
        { id: "p1",  name: "Lunar Glow Iluminador", price: 12, category: "Rosto", img: "assets/images/lunarglow capa.webp", variants: [{name: "Cor 1", img: "assets/images/lunarglow 01.webp"}, {name: "Cor 2", img: "assets/images/lunarglow 02.webp"}, {name: "Cor 3", img: "assets/images/lunarglow 03.webp"}, {name: "Cor 4", img: "assets/images/lunarglow 04.webp"}], desc: "Desperte a luminosidade etérea da sua pele. O Lunar Glow é um pó iluminador ultrafino que se funde perfeitamente, proporcionando um brilho multidimensional de aspecto natural." },
        { id: "p2",  name: "Pó Compacto Vegano Febella", price: 12, category: "Rosto", img: "assets/images/pocompactovegano capa.webp", variants: [{name: "Cor 1", img: "assets/images/pocompactovegano 01.webp"}, {name: "Cor 2", img: "assets/images/pocompactovegano 02.jpg"}, {name: "Cor 3", img: "assets/images/pocompactovegano 03.webp"}, {name: "Cor 4", img: "assets/images/pocompactovegano 04.webp"}], desc: "Pó compacto vegano com fórmula suave e cobertura natural. Ideal para todos os tipos de pele." },
        { id: "p3",  name: "Pó Banana Yoyomaquiamor", price: 12, category: "Pó", img: "assets/images/pobanana.webp", variants: [], desc: "Pó banana iluminado que suaviza imperfeições e deixa a pele com aquele acabamento perfeito de fotografia." },
        { id: "p4",  name: "Melu Corretivo Líquido", price: 13, category: "Corretivo", img: "assets/images/melucoretivo.webp", variants: [{name: "Baunilha", img: "assets/images/melucoretivo baunilhas.webp"}, {name: "Amendoim", img: "assets/images/melucoretivo amendoim.webp"}, {name: "Bege", img: "assets/images/melucoretivo bege.webp"}, {name: "Cappuccino", img: "assets/images/melucoretivo cappucino.webp"}, {name: "Chocolate", img: "assets/images/melucoretivo chocolate.webp"}, {name: "Café", img: "assets/images/melucoretivo cafe.webp"}], desc: "Corretivo líquido de alta cobertura com fórmula leve e durável." },
        { id: "p5",  name: "Blush Compacto Sarah Beauty", price: 11, category: "Bochechas", img: "assets/images/blussarahbeauty capa.webp", variants: ["Cor 1","Cor 2","Cor3","Cor 4"], desc: "Blush compacto com pigmentação intensa e longa duração para dar cor às suas bochechas." },
        { id: "p6",  name: "Base Líquida Sarah Beauty", price: 13, category: "Rosto", img: "https://placehold.co/400x400/f9e8f5/9c5fb5?text=Base+Sarah", variants: ["Cor 1","Cor 2","Cor3","Cor 4","Cor 5","Cor 6"], desc: "Base líquida de alta cobertura com acabamento natural." },
        { id: "p7",  name: "Base Stick Ruby Rose", price: 14, category: "Rosto", img: "assets/images/Base Stick Ruby Rose capa.jpg", variants: [{name: "Cor 1", img: "assets/images/Base Stick Ruby Rose cor 1.webp"}, {name: "Cor 2", img: "assets/images/Base Stick Ruby Rose cor 2.webp"}, {name: "Cor 3", img: "assets/images/Base Stick Ruby Rose cor 3.webp"}, {name: "Cor 4", img: "assets/images/Base Stick Ruby Rose cor 4.webp"}], desc: "Base em bastão prática e fácil de aplicar, com cobertura média a alta." },
        { id: "p8",  name: "Pó Compacto Controle de Brilho Pink 21", price: 13, category: "Pó", img: "assets/images/Po Compacto Pink 21.webp", variants: [], desc: "Controla o brilho e matifica a pele ao longo do dia." },
        { id: "p9",  name: "Paleta Sombra Básica Pink 21", price: 13, category: "Olhos", img: "assets/images/Paleta Sombra Pink 21 capa.webp", variants: [], desc: "Paleta com tons neutros essenciais para qualquer make do dia a dia ou noite." },
        { id: "p10", name: "Gloss Francini de Mel", price: 11, category: "Lábios", img: "assets/images/gloss francini.jpg", variants: ["Mel Natural"], desc: "Gloss labial hidratante com sabor de mel. Deixa os lábios macios e com brilho delicado." },
        { id: "p11", name: "Iluminador Líquido Labranche", price: 15, category: "Rosto", img: "https://placehold.co/400x400/fffde7/f57f17?text=Iluminador+Liq", variants: [], desc: "Iluminador líquido versátil para rosto e corpo, com brilho intenso e duradouro." },
        { id: "p12", name: "Lenço Demaquilante Morango Yoyomaqui", price: 13, category: "Demaquilante", img: "https://placehold.co/400x400/fce8e8/e74c3c?text=Len%C3%A7o+Morango", variants: [], desc: "Remove a maquiagem com suavidade e deixa a pele limpa e hidratada." },
        { id: "p13", name: "Sérum Facial Melancia Melu", price: 15, category: "Skincare", img: "assets/images/Serum Facial Melancia Melu.webp", variants: [], desc: "Sérum refrescante com extrato de melancia para hidratar e iluminar a pele." },
        { id: "p14", name: "Máscara de Cílios Pink 21", price: 12, category: "Olhos", img: "assets/images/Mascara de Cilios Pink 21.webp", variants: [], desc: "Máscara de cílios com fórmula volumizadora e allongadora para olhos impactantes." },
        { id: "p15", name: "Caneta Delineador Yoyomaqui", price: 10, category: "Olhos", img: "https://placehold.co/400x400/263238/eceff1?text=Delineador", variants: ["Preto","Marrom"], desc: "Delineador líquido de ponta fina para traços precisos e duradouros." },
        { id: "p16", name: "Hidra Gloss Vivai", price: 12, category: "Lábios", img: "assets/images/Hidra Gloss Vivai capa.webp", variants: [{name: "Cor 1", img: "assets/images/Hidra Gloss Vivai cor 1.webp"}, {name: "Cor 2", img: "assets/images/Hidra Gloss Vivai cor 2.webp"}, {name: "Cor 3", img: "assets/images/Hidra Gloss Vivai cor 3.webp"}, {name: "Cor 4", img: "assets/images/Hidra Gloss Vivai cor 4.webp"}, {name: "Cor 5", img: "assets/images/Hidra Gloss Vivai cor 5.webp"}, {name: "Cor 6", img: "assets/images/Hidra Gloss Vivai cor 6.webp"}], desc: "Gloss hidratante com brilho intenso e acabamento glossy irresistível." },
        { id: "p17", name: "Acne Patch Coração Rosa", price: 6, category: "Skincare", img: "assets/images/Acne Patch Coracao Rosa.webp", variants: [], desc: "Adesivos em formato de coração para tratar cravos e espinhas com cuidado e estilo." },
        { id: "p18", name: "Lápis Preto com Apontador Vivai", price: 5, category: "Olhos", img: "assets/images/Lapis Preto com Apontador Vivai.webp", variants: [], desc: "Lápis olho com apontador incluso para um traço prático e definido." },
        { id: "p19", name: "Pincel de Sobrancelha Pink 21", price: 8, category: "Acessórios", img: "https://placehold.co/400x400/f9e8f5/9c5fb5?text=Pincel+Sobrancelha", variants: [], desc: "Pincel duplo para modelar e definir as sobrancelhas com precisão." },
        { id: "p20", name: "Gloss Labial Bebelo", price: 10, category: "Lábios", img: "assets/images/Gloss Labial Bebelo.webp", variants: [{name: "Morango", img: "assets/images/Gloss Labial Bebelo morango.webp"}, {name: "Menta", img: "assets/images/Gloss Labial Bebelomenta.webp"}, {name: "Uva", img: "assets/images/Gloss Labial Bebelo uva.webp"}, {name: "Tuti Fruti", img: "assets/images/Gloss Labial Bebelo tutifruti.webp"}, {name: "Banana", img: "assets/images/Gloss Labial Bebelo banana.webp"}], desc: "Gloss labial frutado disponível em 5 sabores incríveis. Hidrata e dá brilho com aroma irresistível." },
        { id: "p21", name: "Lenço Umedecido Beautyloo 8un", price: 5, category: "Higiene", img: "https://placehold.co/400x400/e8f5e9/388e3c?text=Len%C3%A7o+Beautyloo", variants: ["Morango","Melancia","Uva","Tuti Fruti",], desc: "Lenço umedecido prático, pacote com 8 unidades. Ideal para higiene e remoção rápida de maquiagem." },
        // Cosméticos
        { id: "sk1", name: "Óleo de Cabelo Bebelo", price: 19, category: "Cabelo", img: "https://placehold.co/400x400/e8f5e9/2e7d32?text=%C3%93leo+Bebelo", variants: ["Uva","Melancia","Tuti Fruti","Banana"], desc: "Óleo capilar nutritivo com sabores frutados para um cabelo hidratado e cheiroso." },
        { id: "sk2", name: "Esfoliante Bio Instinto", price: 14, category: "Corpo", img: "https://placehold.co/400x400/fce8e8/c0392b?text=Esfoliante", variants: ["Framboesa","Morango","Maracujá","Cereja"], desc: "Esfoliante corporal com partículas suaves que removem células mortas e deixam a pele macia e perfumada." },
        { id: "sk3", name: "Gel Creme Facial Kiwi Melu", price: 13, category: "Skincare", img: "https://placehold.co/400x400/e8f5e9/388e3c?text=Gel+Kiwi+Melu", variants: [], desc: "Gel creme facial refrescante com extrato de kiwi para pele hidratada e com brilho natural." },
        { id: "sk4", name: "Gelatina Capilar Bio Instinto", price: 14, category: "Cabelo", img: "https://placehold.co/400x400/f9e8f5/9c5fb5?text=Gelatina+Capilar", variants: ["Rosa Mosqueta","Cereja","Framboesa"], desc: "Gelatina capilar de fixação leve a média para definir cachos e ondas com nutrição intensa." },
        { id: "sk5", name: "Anti Acne Nativa Brasil", price: 6, category: "Skincare", img: "https://placehold.co/400x400/e8f5e9/1b5e20?text=Anti+Acne", variants: [], desc: "Tratamento anti-acne com ativos naturais brasileiros para uma pele mais limpa e equilibrada." },
        { id: "sk6", name: "Creme Hidratante Nativa Brasil Rosa Mosqueta", price: 6, category: "Skincare", img: "https://placehold.co/400x400/fde8f0/c2185b?text=Creme+Nativa", variants: [], desc: "Creme hidratante com óleo de rosa mosqueta para nutrir, regenerar e iluminar a pele." },
        { id: "sk7", name: "Hidratante Corporal Bio Instinto", price: 15, category: "Corpo", img: "https://placehold.co/400x400/e3f2fd/1565c0?text=Hidrat.+Bio", variants: ["Milk","Maracujá","Morango","Orquídea","Vanilla"], desc: "Hidratante corporal com ação desodorante de longa duração disponível em deliciosos aromas." },
        { id: "sk8", name: "Creme Corporal Mix Glow", price: 12, category: "Corpo", img: "https://placehold.co/400x400/fff5cc/b8860b?text=Creme+Mix", variants: ["Tuti Fruti","Melancia","Morango"], desc: "Creme corporal com efeito glow disponível em diversas versões e aromas irresistíveis." },
        // Kit Capilar
        { id: "kt1", name: "Kit Capilar Bebelo", price: 26, category: "Kit Capilar", img: "https://placehold.co/400x400/e8f5e9/2e7d32?text=Kit+Bebelo", variants: ["Tuti Fruti","Melancia","Banana","Uva"], desc: "Kit completo de tratamento capilar Bebelo. Disponível em 4 sabores frutados para um cabelo sempre cheiroso e nutrido." },
        { id: "kt2", name: "Kit Capilar Bem Corpus", price: 24, category: "Kit Capilar", img: "https://placehold.co/400x400/f9e8f5/9c5fb5?text=Kit+Bem+Corpus", variants: ["Leite Pós Progressiva","Óleo de Coco"], desc: "Kit completo Bem Corpus com leite pós progressiva e óleo de coco para um cabelo liso, macio e nutrido." },
        { id: "kt3", name: "Kit Capilar Bio Instinto", price: 25, category: "Kit Capilar", img: "https://placehold.co/400x400/fff5cc/b8860b?text=Kit+Bio+Instinto", variants: ["Caché Amos","Descansa Cabelo","Óleo de Argan","Liso com Força","Mamona e Babosa"], desc: "Kit capilar Bio Instinto disponível em 5 linhas especializadas para diferentes tipos e necessidades do cabelo." },
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
    const shadeSection = document.querySelector('.shade-selection');
    const shadeOptionsContainer = document.querySelector('.shade-options');
    const shadeNameLabel = document.getElementById('current-shade-name');
    const shadeTitle = document.querySelector('.shade-title');
    
    // Clear and build variants if dynamic data exists
    if (productId) {
        const product = CATALOG.find(p => p.id === productId);
        if (product && shadeSection && shadeOptionsContainer) {
            shadeOptionsContainer.innerHTML = ''; // Clear hardcoded shades
            
            if (product.variants && product.variants.length > 0) {
                shadeSection.style.display = 'block';
                
                // Update title to be generic if it's not makeup
                if (shadeTitle) {
                    const firstVariantName = typeof product.variants[0] === 'object' ? product.variants[0].name : product.variants[0];
                    shadeTitle.innerHTML = `Opção Selecionada: <span class="shade-name" id="current-shade-name">${firstVariantName}</span>`;
                }

                product.variants.forEach((variant, index) => {
                    const variantName = typeof variant === 'object' ? variant.name : variant;
                    const variantImg = typeof variant === 'object' ? variant.img : null;
                    
                    const btn = document.createElement('button');
                    btn.className = `variant-btn ${index === 0 ? 'active' : ''}`;
                    btn.setAttribute('aria-label', variantName);
                    btn.textContent = variantName;
                    
                    btn.addEventListener('click', function() {
                        // Remove active from all
                        document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
                        // Add active to this
                        this.classList.add('active');
                        // Update label
                        const currentLabel = document.getElementById('current-shade-name');
                        if (currentLabel) currentLabel.textContent = variantName;
                        
                        // If variant has an image, update main product image
                        if (variantImg) {
                            const mainImage = document.getElementById('main-product-image');
                            if (mainImage) {
                                mainImage.style.opacity = 0;
                                setTimeout(() => {
                                    mainImage.src = variantImg;
                                    mainImage.alt = variantName;
                                    mainImage.style.opacity = 1;
                                }, 300);
                            }
                        }
                    });
                    
                    shadeOptionsContainer.appendChild(btn);
                });
            } else {
                shadeSection.style.display = 'none'; // Hide if no variants
            }
        }
    } else {
        // Fallback for static html without parameters
        const shadeBtns = document.querySelectorAll('.variant-btn');
        shadeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                shadeBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                if (shadeNameLabel) {
                    shadeNameLabel.textContent = this.getAttribute('aria-label') || this.textContent;
                }
            });
        });
    }

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


