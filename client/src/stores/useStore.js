// stores/useStore.js
import { create } from 'zustand';
import axios from 'axios';
// import { food_list } from '../assets/assets';
import { toast } from 'sonner';

export const useStore = create((set, get) => ({
    url: 'https://foodify-server-b0k3.onrender.com',
    //url: 'https://cookies-implies-use-phenomenon.trycloudflare.com',
    token: '',
    food_list: [],
    cartItems: {},
    userId: '',

    setUserId: (userId) => set({ userId }),

    resetCart: () => set({ cartItems: {} }),

    setToken: (token) => set({ token }),

    setFoodList: (food_list) => set({ food_list }),

    fetchFoodList: async () => {
        try {
            const { url, setFoodList } = get();
            const response = await axios.get(`${url}/api/dish/all`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error('Error fetching food list:', error);
        }
    },

    addToCart: async (itemId) => {
        const { cartItems, token, url } = get();
        const updatedCart = { ...cartItems };

        if (!updatedCart[itemId]) {
            updatedCart[itemId] = 1;
        } else {
            updatedCart[itemId]++;
        }

        set({ cartItems: updatedCart });

        const dish = await axios.get(`${url}/api/dish/${itemId}`, { headers: { token } })
        toast.success(`${dish.data.data[0].name} added to cart`, {
            icon: '🛒',
            duration: 3000,
        });


        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    },

    removeFromCart: async (itemId) => {
        const { cartItems, token, url } = get();
        const updatedCart = { ...cartItems };
        updatedCart[itemId] = updatedCart[itemId] - 1;
        set({ cartItems: updatedCart });

        const dish = await axios.get(`${url}/api/dish/${itemId}`, { headers: { token } })
        toast.error(`${dish.data.data[0].name} removed from cart`, {
            icon: '🛒',
            duration: 3000,
        });

        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        }
    },

    loadCartData: async () => {
        const { url, userId, token } = get();
        try {
            const response = await axios.get(`${url}/api/cart/userid/${userId}`, { headers: { token } });
            set({ cartItems: response.data.cartData });
        } catch (error) {
            console.error('Error loading cart data:', error);
        }
    },

    getTotalCartAmount: () => {
        const { cartItems, food_list } = get();
        let total = 0;

        for (const itemId in cartItems) {
            const item = food_list.find((i) => i._id === itemId);
            if (item && cartItems[itemId] > 0) {
                total += item.price * cartItems[itemId];
            }
        }

        return total;
    },
}));
