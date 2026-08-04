document.addEventListener('DOMContentLoaded', () => {
    // Thumbnail Image Swapping
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

    // Shade Selection
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

    // Favorite Buttons
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

    // Add to cart functionality
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const productDataElement = document.getElementById('product-detail-data');
    
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
            addToCartBtn.textContent = "Adicionado!";
            addToCartBtn.style.backgroundColor = "var(--c-text-main)";
            
            setTimeout(() => {
                addToCartBtn.textContent = originalText;
                addToCartBtn.style.backgroundColor = "";
            }, 2000);
        });
    }
});
