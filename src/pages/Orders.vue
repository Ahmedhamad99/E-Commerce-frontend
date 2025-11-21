<template>
  <div>
    <h2 class="mb-3">Orders</h2>

    <table class="table table-bordered table-hover shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>Order</th>
          <th>Total</th>
          <th>Address</th>
          <th width="100">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="o in orders" :key="o.id">
          <td>{{ o.order_number }}</td>
          <td>${{ o.total }}</td>
          <td>{{ o.address }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="view(o.id)">
              <i class="bi bi-eye"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="selected" class="card shadow-sm p-3 mt-4">
      <h4>Order Details - {{ selected.order_number }}</h4>

      <p><strong>Address:</strong> {{ selected.address }}</p>
      <p><strong>Phone:</strong> {{ selected.phone }}</p>
      <p><strong>Total:</strong> ${{ selected.total }}</p>

      <h5>Items</h5>
      <ul>
        <li v-for="i in selected.items" :key="i.id">
          {{ i.product_name }} (x{{ i.quantity }}) — ${{ i.subtotal }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import api from "../services/api";
import { ref, onMounted } from "vue";

const orders = ref([]);
const selected = ref(null);

async function load() {
  const res = await api.get("/orders");
  orders.value = res.data.data;

}


onMounted(load);

async function view(id) {
  const res = await api.get(`/orders/${id}`);
  selected.value = res.data;
}
</script>
