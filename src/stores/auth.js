import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({ user: null, token: localStorage.getItem('token') || null }),
    actions: {
        async login(email, password) {
            const res = await api.post('/auth/login', { email, password });
            this.token = res.data.token;
            localStorage.setItem('token', this.token);
            this.user = res.data.user;
        },
        async register(name, email, password, password_confirmation) {
            const res = await api.post('/auth/register', { name, email, password, password_confirmation });
            this.token = res.data.token;
            localStorage.setItem('token', this.token);
            this.user = res.data.user;
        },
        async fetchMe() {
            const res = await api.get('/auth/me');
            this.user = res.data;
        },
        logout() {
            localStorage.removeItem('token');
            this.token = null;
            this.user = null;
        }
    }
});
