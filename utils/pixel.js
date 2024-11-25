export const trackEvent = (event, data = {}) => {
    window.fbq('track', event, data);
}

// Evento de búsqueda de productos
export function trackSearch(searchQuery) {
    // fbq('track', 'Search', { search_string: searchQuery });
    console.log('Evento Search registrado:', { search_string: searchQuery });
  }
  
  // Evento de visualización de página
export function trackPageView() {
    // fbq('track', 'PageView');
    console.log('Evento PageView registrado');
  }
  
  // Evento de contenido visto
export function trackViewContent(contentId, contentType) {
    // fbq('track', 'ViewContent', { content_ids: [contentId], content_type: contentType });
    console.log('Evento ViewContent registrado:', { content_ids: [contentId], content_type: contentType });
  }
  
  // Evento de agregado al carrito
export  function trackAddToCart(contentId, value, currency) {
    // fbq('track', 'AddToCart', { content_ids: [contentId], value: value, currency: currency });
    console.log('Evento AddToCart registrado:', { content_ids: [contentId], value: value, currency: currency });
  }
  
  // Evento de inicio de pago
export function trackInitiateCheckout(value, currency) {
    // fbq('track', 'InitiateCheckout', { value: value, currency: currency });
    console.log('Evento InitiateCheckout registrado:', { value: value, currency: currency });
  }
  
  // Evento de compra completada
export function trackPurchase(value, currency, transactionId) {
    // fbq('track', 'Purchase', { value: value, currency: currency, transaction_id: transactionId });
    console.log('Evento Purchase registrado:', { value: value, currency: currency, transaction_id: transactionId });
  }
  