import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: JSON.parse(typeof window !== "undefined" && localStorage.getItem('cart')) || [],
  
  //Método para añadir al carrito y manejar los estados globales
  addToCart: (idProducto) => set((state) => {
    const updatedCart = [...state.cart, idProducto];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),

  removeFromCart: (idProducto) => set((state) => {
    const updatedCart = state.cart.filter(id => id !== idProducto);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),

  clearCart: () => set(() => {
    localStorage.removeItem('cart');
    return { cart: [] };
  })
}));
