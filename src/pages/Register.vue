<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light dark-mode-bg">
    <div class="card shadow p-4" style="width: 380px;">
      <h3 class="text-center mb-4">Create Account</h3>

      <form @submit.prevent="submit">

        <div class="mb-3">
          <label class="form-label">Name</label>
          <input 
            v-model="name" 
            type="text" 
            class="form-control" 
            placeholder="John Doe"
            required
          >
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input 
            v-model="email" 
            type="email" 
            class="form-control" 
            placeholder="example@email.com"
            required
          >
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="form-control" 
            placeholder="********"
            required
          >
        </div>

        <div class="mb-3">
          <label class="form-label">Confirm Password</label>
          <input 
            v-model="password_confirmation" 
            type="password" 
            class="form-control" 
            placeholder="********"
            required
          >
        </div>

        <button class="btn btn-primary w-100">
          Register
        </button>

      </form>

      <p class="text-center mt-3">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useUIStore } from "../stores/ui";

const router = useRouter();
const auth = useAuthStore();
const ui = useUIStore();

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");

async function submit() {
  try {
    ui.setLoading(true);

    await auth.register(
      name.value,
      email.value,
      password.value,
      password_confirmation.value
    );

    ui.showToast({
      title: "Success",
      message: "Account created successfully!",
      variant: "success"
    });

    router.push("/");
  } catch (e) {
    ui.showToast({
      title: "Error",
      message: e.response?.data?.message || "Registration failed",
      variant: "danger"
    });
  } finally {
    ui.setLoading(false);
  }
}
</script>

<style scoped>
.dark-mode-bg {
  background-color: var(--bs-body-bg);
}
</style>
