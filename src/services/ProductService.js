// ============================================
//  FARMAVIDA — ProductService
// ============================================

const PRODUCTS = [
  { id: 'p001', name: 'Vitamina C 1000mg', category: 'Vitaminas', price: 29.90, priceOld: 39.90, emoji: '🍊', badge: 'Promo', badgeType: 'promo' },
  { id: 'p002', name: 'Dipirona 500mg 20cp', category: 'Analgésicos', price: 8.50, emoji: '💊' },
  { id: 'p003', name: 'Protetor Solar FPS 70', category: 'Dermocosméticos', price: 54.90, emoji: '🌞', badge: 'Novo', badgeType: 'new' },
  { id: 'p004', name: 'Whey Protein 1kg', category: 'Suplementos', price: 119.90, priceOld: 149.90, emoji: '💪', badge: 'Promo', badgeType: 'promo' },
  { id: 'p005', name: 'Ibuprofeno 600mg', category: 'Anti-inflamatórios', price: 12.00, emoji: '💊' },
  { id: 'p006', name: 'Colágeno Hidrolisado', category: 'Vitaminas', price: 44.90, emoji: '✨', badge: 'Novo', badgeType: 'new' },
  { id: 'p007', name: 'Shampoo Anticaspa', category: 'Higiene', price: 22.50, emoji: '🧴' },
  { id: 'p008', name: 'Termômetro Digital', category: 'Equipamentos', price: 35.00, emoji: '🌡️' },
];

const CATEGORIES = [
  { slug: 'medicamentos',    name: 'Medicamentos',    icon: '💊' },
  { slug: 'vitaminas',       name: 'Vitaminas',       icon: '🍊' },
  { slug: 'dermocosmeticos', name: 'Dermocosméticos', icon: '✨' },
  { slug: 'higiene',         name: 'Higiene',         icon: '🧴' },
  { slug: 'suplementos',     name: 'Suplementos',     icon: '💪' },
  { slug: 'equipamentos',    name: 'Equipamentos',    icon: '🩺' },
  { slug: 'bebe',            name: 'Bebê & Infantil', icon: '🍼' },
  { slug: 'promocoes',       name: 'Promoções',       icon: '🏷️' },
];

export const ProductService = {
  getAll()           { return PRODUCTS; },
  getFeatured()      { return PRODUCTS.slice(0, 8); },
  getById(id)        { return PRODUCTS.find(p => p.id === id) ?? null; },
  getCategories()    { return CATEGORIES; },
  getByCategory(slug){ return PRODUCTS.filter(p => p.category.toLowerCase().includes(slug)); },
  search(query)      {
    const q = query.toLowerCase();
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  },
};
