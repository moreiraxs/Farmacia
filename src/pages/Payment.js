// ============================================
//  FARMAVIDA — Payment Page
// ============================================

import { CartService } from '../services/CartService.js';
import { ProductService } from '../services/ProductService.js';

export function renderPaymentPage(container) {
  // Calcular total do carrinho
  const items = CartService.getItems();
  const total = items.reduce((sum, item) => {
    const product = ProductService.getById(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);

  container.innerHTML = `
    <section class="section" style="padding: 40px 0;">
      <div class="container">
        <div class="payment-header">
          <h1 class="payment-title">Pagamento</h1>
          <p class="payment-subtitle">Finalize sua compra de forma segura</p>
        </div>

        <div class="payment-layout">
          <div class="payment-form-section">
            <div class="payment-info">
              <h3>Resumo da Compra</h3>
              <div class="payment-summary">
                <div class="summary-line">
                  <span>Subtotal (${items.length} item${items.length !== 1 ? 's' : ''})</span>
                  <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="summary-line">
                  <span>Frete</span>
                  <span>A calcular</span>
                </div>
                <div class="summary-total">
                  <span>Total</span>
                  <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>

            <form id="payment-form" class="payment-form">
              <div class="form-group">
                <label for="amount">Valor a Pagar (R$)</label>
                <input type="number" id="amount" step="0.01" value="${total.toFixed(2)}" min="0.01" required>
              </div>
              <button type="submit" class="btn btn-primary btn-lg">Gerar QR Code de Pagamento</button>
            </form>
          </div>

          <div class="payment-qr-section" id="qr-code-section" style="display: none;">
            <div class="qr-box">
              <h3>Escaneie para Pagar</h3>
              <img id="qr-code" alt="QR Code de Pagamento" class="qr-image">
              <p class="qr-text">Use seu celular para escanear o código acima.</p>
              <a id="payment-link" href="#" target="_blank" class="qr-link">Ou clique aqui para pagar pelo navegador</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const form = container.querySelector('#payment-form');
  const qrSection = container.querySelector('#qr-code-section');
  const qrImg = container.querySelector('#qr-code');
  const link = container.querySelector('#payment-link');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = parseFloat(container.querySelector('#amount').value);
    if (isNaN(amount) || amount <= 0) {
      alert('Valor inválido');
      return;
    }

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();
      if (response.ok) {
        qrImg.src = data.qrCode;
        link.href = data.url;
        qrSection.style.display = 'block';
        form.style.display = 'none';
      } else {
        alert('Erro: ' + data.message);
      }
    } catch (err) {
      alert('Erro ao processar pagamento');
      console.error(err);
    }
  });
}