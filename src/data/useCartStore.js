import { create } from 'zustand';

// Inicializamos el carrito creando uno.
export const useCartStore = create((set) => ({
  // Se crea el array 'Cart', nuestro carrito
  cart: JSON.parse(typeof window !== "undefined" && localStorage.getItem('cart')) || [],

  //A continuación, los métodos que podremos usar para manipular el carrito:

  // Primer método: añadir items al carrito. Si el producto existe, se devuelve con normalidad. 
  addToCart: (idProducto) => set((state) => {
    const existingProductIndex = state.cart.findIndex(item => item.id === idProducto);

    if (existingProductIndex >= 0) {
      return state; 
    }

    const updatedCart = [...state.cart, { id: idProducto, cantidad: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),

  removeFromCart: (idProducto) => set((state) => {
    const updatedCart = state.cart.filter(item => item.id !== idProducto);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),

  updateCartItem: (idProducto, cantidad) => set((state) => {
    const updatedCart = state.cart.map(item => 
      item.id === idProducto ? { ...item, cantidad } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),

  clearCart: () => set(() => {
    localStorage.removeItem('cart');
    return { cart: [] };
  })
}));
