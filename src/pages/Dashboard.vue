<template>
  <div>
    <h2 class="mb-4">Dashboard</h2>

    <div class="row">
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Total Products</h5>
            <h3>{{ stats.products }}</h3>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Total Orders</h5>
            <h3>{{ stats.orders }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '../services/api';
import { ref, onMounted } from 'vue';

const stats = ref({ products: 0, orders: 0 });


function extractCount(response) {
  const data = response.data;

  if (typeof data.total === "number") return data.total;
  if (Array.isArray(data.data)) return data.data.length;
  if (Array.isArray(data)) return data.length;

  return 0;
}

onMounted(async () => {
  const p = await api.get('/products');
  const o = await api.get('/orders');

  stats.value.products = extractCount(p);
  stats.value.orders = extractCount(o);
  stats.value.orders = o.data.meta.total;

});

</script>
