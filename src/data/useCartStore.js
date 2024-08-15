import { create } from 'zustand';

// Inicializamos el carrito creando uno.
export const useCartStore = create((set) => ({
  // Se crea el array 'Cart', nuestro carrito
  cart: JSON.parse(typeof window !== "undefined" && localStorage.getItem('cart')) || [],

  //A continuación, los métodos que podremos usar para manipular el carrito:

  // Primer método: añadir items al carrito. Si el producto ya está en carrito, se devuelve con normalidad. Si no existe, se lo añade.
  addToCart: (idProducto) => set((state) => {
    const existingProductIndex = state.cart.findIndex(item => item.id === idProducto);

    if (existingProductIndex >= 0) {
      return state; 
    }

    const updatedCart = [...state.cart, { id: idProducto, cantidad: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),

  // Borrar items del carrito. Aplica a un único item.
  removeFromCart: (idProducto) => set((state) => {
    const updatedCart = state.cart.filter(item => item.id !== idProducto);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),

  // Actualiza la cantidad de unidades de un mismo item, para poder implementar los aumentos o decrementos de unidades.
  updateCartItem: (idProducto, cantidad) => set((state) => {
    const updatedCart = state.cart.map(item => 
      item.id === idProducto ? { ...item, cantidad } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),

  // Limpia totalmente el carrito.
  clearCart: () => set(() => {
    localStorage.removeItem('cart');
    return { cart: [] };
  })
}));
