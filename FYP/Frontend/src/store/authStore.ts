import { create } from 'zustand';

interface AuthState {
    user: any | null;
    setUser: (user: any) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    user: {
        name: 'Yamin Kazmi',
        email: 'yaminkazmi@gmail.com',
        company: 'Kazmi Developers Inc.'
    },
    setUser: (user) => {
        set({ user })
    },
    logout: () => set({ user: null }),
}));

export default useAuthStore;