<template>
  <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 2000;">
    <transition-group name="toast" tag="div">
      <div v-for="t in ui.toasts" :key="t.id" class="toast show mb-2" role="alert" aria-live="assertive" aria-atomic="true">
        <div :class="['toast-header', 'text-white', bgClass(t.variant)]">
          <strong class="me-auto">{{ t.title || capitalize(t.variant) }}</strong>
          <button type="button" class="btn-close btn-close-white ms-2 mb-1" @click="ui.removeToast(t.id)"></button>
        </div>
        <div class="toast-body">
          <div v-html="t.message"></div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useUIStore } from '../stores/ui';
import { onMounted } from 'vue';
const ui = useUIStore();

function bgClass(variant) {
  const map = {
    success: 'bg-success',
    danger: 'bg-danger',
    warning: 'bg-warning text-dark',
    info: 'bg-info text-dark',
    primary: 'bg-primary'
  };
  return map[variant] || 'bg-primary';
}

function capitalize(s){ return (s||'').charAt(0).toUpperCase() + (s||'').slice(1); }

onMounted(() => {
  ui.toasts; 
});
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all .25s ease; }
.toast-enter-from { transform: translateX(100%); opacity: 0; }
.toast-enter-to { transform: translateX(0); opacity: 1; }
.toast-leave-from { transform: translateX(0); opacity: 1; }
.toast-leave-to { transform: translateX(100%); opacity: 0; }
.toast { min-width: 260px; }
</style>
