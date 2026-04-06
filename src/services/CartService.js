// ============================================
//  FARMAVIDA — CartService
// ============================================

let items = [];

export const CartService = {
  load() {
    try {
      const saved = localStorage.getItem('farmavida_cart');
      items = saved ? JSON.parse(saved) : [];
    } catch {
      items = [];
    }
  },

  save() {
    localStorage.setItem('farmavida_cart', JSON.stringify(items));
    document.dispatchEvent(new Event('cart:updated'));
  },

  add(productId, qty = 1) {
    const existing = items.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id: productId, qty });
    }
    this.save();
  },

  remove(productId) {
    items = items.filter(i => i.id !== productId);
    this.save();
  },

  updateQty(productId, qty) {
    const item = items.find(i => i.id === productId);
    if (item) { item.qty = qty; this.save(); }
  },

  getItems()  { return [...items]; },
  getCount()  { return items.reduce((sum, i) => sum + i.qty, 0); },
  clear()     { items = []; this.save(); },
};
