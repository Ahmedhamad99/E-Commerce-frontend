import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('ui', () => {
    const dark = ref(localStorage.getItem('darkMode') === 'true' || false);
    const toasts = ref([]);
    const loading = ref(false);

    function toggleDark() {
        dark.value = !dark.value;
        localStorage.setItem('darkMode', dark.value);
        applyTheme();
    }

    function applyTheme() {
        if (dark.value) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }

    function showToast({ title = '', message = '', variant = 'primary', timeout = 4000 } = {}) {
        const id = Date.now() + Math.random().toString(36).slice(2, 7);
        toasts.value.push({ id, title, message, variant, timeout });
        return id;
    }

    function removeToast(id) {
        toasts.value = toasts.value.filter(t => t.id !== id);
    }

    function setLoading(val = true) {
        loading.value = val;
    }

    if (typeof document !== 'undefined') applyTheme();

    return { dark, toggleDark, applyTheme, toasts, showToast, removeToast, loading, setLoading };
});
