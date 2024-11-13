export const trackEvent = (event, data = {}) => {

    window.fbq('track', event, data);
}