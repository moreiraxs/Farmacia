# 💊 FarmaVida — Site de Farmácia

Site institucional e e-commerce de farmácia construído com HTML, CSS e JavaScript puro, seguindo os princípios de **Arquitetura Limpa** (Clean Architecture).

---

## 🎨 Identidade Visual

| Token           | Valor     |
|-----------------|-----------|
| Cor primária    | `#333F41` |
| Cor de fundo    | `#FFFFFF` |
| Off-white       | `#F5F7F7` |
| Borda           | `#E2E8E9` |
| Acento          | `#5B8A8E` |
| Fonte display   | Playfair Display |
| Fonte corpo     | DM Sans          |

---

## 📁 Estrutura de Pastas

```
farmacia/
├── public/                   # Ponto de entrada público
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── global.css     # Variáveis, reset, utilitários
│   │   │   └── components.css # Estilos dos componentes
│   │   ├── js/
│   │   │   └── main.js        # Bootstrap da aplicação
│   │   ├── images/            # Imagens e ícones
│   │   └── fonts/             # Fontes locais (se necessário)
│   ├── components/            # UI reutilizável
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── ProductCard.js
│   ├── pages/                 # Páginas da aplicação
│   │   ├── Home.js
│   │   ├── Products.js
│   │   └── Contact.js
│   ├── services/              # Regras de negócio / acesso a dados
│   │   ├── CartService.js
│   │   └── ProductService.js
│   └── utils/                 # Utilitários transversais
│       └── Router.js
├── tests/                     # Testes unitários e de integração
├── docs/                      # Documentação técnica
└── README.md
```

---

## 🏗️ Arquitetura

O projeto segue o padrão **Clean Architecture** adaptado para front-end:

```
┌─────────────────────────────────┐
│   Pages (UI / Presentation)     │
├─────────────────────────────────┤
│   Components (UI reutilizável)  │
├─────────────────────────────────┤
│   Services (Casos de uso)       │
├─────────────────────────────────┤
│   Utils (Infraestrutura)        │
└─────────────────────────────────┘
```

- **Pages**: renderizam páginas completas, orquestram componentes
- **Components**: blocos visuais reutilizáveis, sem lógica de negócio
- **Services**: lógica de negócio (carrinho, produtos, autenticação)
- **Utils**: roteador, helpers, formatadores

---

## 🚀 Como rodar

```bash
# Opção 1 — VS Code Live Server
# Abra index.html com a extensão Live Server

# Opção 2 — Python
cd farmacia
python3 -m http.server 8080
# Acesse: http://localhost:8080/public/

# Opção 3 — Node.js
npx serve .
```

---

## 📦 Páginas disponíveis

| Rota            | Página         |
|-----------------|----------------|
| `#/`            | Home           |
| `#/produtos`    | Produtos       |
| `#/categorias`  | Categorias     |
| `#/promocoes`   | Promoções      |
| `#/contato`     | Contato        |

---

## ✅ Próximos passos sugeridos

- [ ] Integrar API de pagamento (Stripe / MercadoPago)
- [ ] Adicionar autenticação de usuário
- [ ] Implementar busca com filtros avançados
- [ ] Adicionar página de produto individual
- [ ] Integrar CMS para gestão de produtos
