<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card shadow p-5" style="width: 350px;">
      <h3 class="text-center mb-4">Login</h3>

      <form @submit.prevent="submit">
        <input v-model="email" type="email" class="form-control mb-3" placeholder="Email">
        <input v-model="password" type="password" class="form-control mb-3" placeholder="Password">

        <button class="btn btn-primary w-100">Login</button>
      </form>

      <p class="text-center mt-3">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");

const auth = useAuthStore();
const router = useRouter();

async function submit() {
  try {
    await auth.login(email.value, password.value);
    router.push("/");
  } catch {
    alert("Invalid credentials");
  }
}
</script>
