import { create } from "zustand";
import { persist } from "zustand/middleware";

//Esto queda acá seteado para futuras mejoras y manejo de métodos que requieran usar la autenticación de usuario para ejecutarse
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