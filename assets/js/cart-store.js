window.CartStore = {
    getCart() {
        const cart = localStorage.getItem('lyardo_cart');
        return cart ? JSON.parse(cart) : [];
    },
    
    saveCart(cart) {
        localStorage.setItem('lyardo_cart', JSON.stringify(cart));
        this.notifyChange();
    },

    addItem(product) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id && item.variant === product.variant);
        
        if (existingItem) {
            existingItem.qty += (product.qty || 1);
        } else {
            cart.push({ ...product, qty: product.qty || 1 });
        }
        
        this.saveCart(cart);
        this.showToast(`Adicionado: ${product.name}`);
    },

    updateQty(id, variant, newQty) {
        const cart = this.getCart();
        const item = cart.find(i => i.id === id && i.variant === variant);
        if (item) {
            item.qty = Math.max(1, newQty);
            this.saveCart(cart);
        }
    },

    removeItem(id, variant) {
        let cart = this.getCart();
        cart = cart.filter(i => !(i.id === id && i.variant === variant));
        this.saveCart(cart);
    },

    getTotalItems() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.qty, 0);
    },

    notifyChange() {
        window.dispatchEvent(new Event('cartUpdated'));
    },
    
    showToast(message) {
        const container = document.getElementById('toast-container');
        if(!container) return;
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span class="material-symbols-outlined toast-icon">check_circle</span>
            <span class="toast-text">${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Trigger reflow for animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400); // Wait for transition
        }, 3000);
    }
};

function updateCartBadges() {
    const total = window.CartStore.getTotalItems();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        badge.textContent = total;
        badge.style.display = total > 0 ? 'flex' : 'none';
        
        // Pop animation
        if(total > 0) {
            badge.classList.remove('pop');
            void badge.offsetWidth; // trigger reflow
            badge.classList.add('pop');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateCartBadges);
window.addEventListener('cartUpdated', updateCartBadges);
