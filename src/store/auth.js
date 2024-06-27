import { create } from "zustand";
import { persist } from "zustand/middleware";
const handler = (set)=>({
    isAuthenticated:false,
    user:null,
    token:null,
    login: (data) => set({
        isAuthenticated: true, user: data.user, token: data.token
    }),
    logout:() => set({
        isAuthenticated:false, user: null, token: null
    })
});

export const useAuthStore = create(persist(
    handler,
  {
    name:"auth-storage",
    getStorage: () => localStorage
  }
));
export const useAuthStoreLogged = create(set => ({
  isLogged: !!localStorage.getItem('token'),
  login: () => set({ isLogged: true }),
  logout: () => set({ isLogged: false }),
}));