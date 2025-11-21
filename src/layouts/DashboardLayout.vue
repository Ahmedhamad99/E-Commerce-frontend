<template>
  <div class="d-flex" id="wrapper">
    <div class="border-end bg-white" id="sidebar-wrapper">
      <div class="sidebar-heading border-bottom py-4 fw-bold text-center">
        Admin Dashboard
      </div>
      <div class="list-group list-group-flush">
        <router-link class="list-group-item list-group-item-action p-3" to="/">
          <i class="bi bi-speedometer2 me-2"></i> Dashboard
        </router-link>
        <router-link class="list-group-item list-group-item-action p-3" to="/products">
          <i class="bi bi-box-seam me-2"></i> Products
        </router-link>
        <router-link class="list-group-item list-group-item-action p-3" to="/orders">
          <i class="bi bi-receipt me-2"></i> Orders
        </router-link>
      </div>
    </div>

    <div id="page-content-wrapper" class="w-100">
      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom px-4">
        <button class="btn btn-primary" @click="toggleSidebar">
          <i class="bi bi-list"></i>
        </button>

        <div class="ms-auto">
          <button @click="logout" class="btn btn-outline-danger">
            Logout
          </button>
        </div>
      </nav>

      <div class="container-fluid py-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuthStore();

function logout() {
  auth.logout();
  router.push('/login');
}

function toggleSidebar() {
  document.getElementById("wrapper").classList.toggle("toggled");
}
</script>

<style scoped>
#wrapper {
  display: flex;
  width: 100%;
}
#sidebar-wrapper {
  width: 250px;
}
#wrapper.toggled #sidebar-wrapper {
  margin-left: -250px;
}
</style>
