// ============================================
//  FARMAVIDA — ProductService
//  Agora busca os dados do banco via API
// ============================================

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

  // Busca TODOS os produtos do banco
  async getAll() {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Erro ao buscar produtos');
    return res.json();
  },

  // Busca os primeiros 8 produtos para a home
  async getFeatured() {
    const products = await this.getAll();
    return products.slice(0, 8);
  },

  // Busca UM produto pelo productId (ex: 'p001')
  async getById(id) {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) return null;
    return res.json();
  },

  // Categorias continuam locais (raramente mudam)
  getCategories() {
    return CATEGORIES;
  },

  // Filtra por categoria
  async getByCategory(slug) {
    const products = await this.getAll();
    return products.filter(p => (p.category || '').toLowerCase().includes(slug));
  },

  // Busca por nome
  async search(query) {
    const q = query.toLowerCase();
    const products = await this.getAll();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q)
    );
  },
};
