<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Products</h2>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal" @click="prepareCreate">
        Add Product
      </button>
    </div>

    <table class="table table-striped table-hover shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th width="140">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>{{ p.name }}</td>
          <td>${{ p.price }}</td>
          <td>{{ p.stock }}</td>
          <td>
            <span :class="p.out_of_stock ? 'badge bg-danger' : 'badge bg-success'">
              {{ p.out_of_stock ? 'Out of Stock' : 'In Stock' }}
            </span>
          </td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="prepareEdit(p)" data-bs-toggle="modal" data-bs-target="#productModal">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm" @click="remove(p.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="productModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="save">
            <div class="modal-header">
              <h5 class="modal-title">{{ isEdit ? 'Edit Product' : 'Add Product' }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
              <div class="mb-3">
                <label>Name</label>
                <input v-model="form.name" class="form-control" />
              </div>

              <div class="mb-3">
                <label>Price</label>
                <input v-model="form.price" type="number" class="form-control" />
              </div>

              <div class="mb-3">
                <label>Stock</label>
                <input v-model="form.stock" type="number" class="form-control" />
              </div>

              <div class="mb-3">
                <label>Description</label>
                <textarea v-model="form.description" class="form-control"></textarea>
              </div>
            </div>

            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-primary">
                {{ isEdit ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import api from '../services/api';
import { ref, onMounted } from 'vue';

const products = ref([]);

const isEdit = ref(false);
const editId = ref(null);

const form = ref({
  name: "",
  price: "",
  stock: "",
  description: "",
});

async function load() {
  const res = await api.get("/products");
  products.value = res.data.data ?? res.data;
}
onMounted(load);

function prepareCreate() {
  isEdit.value = false;
  form.value = {};
}

function prepareEdit(p) {
  isEdit.value = true;
  editId.value = p.id;
  form.value = { ...p };
}

async function save() {
  if (isEdit.value) {
    await api.put(`/products/${editId.value}`, form.value);
  } else {
    await api.post("/products", form.value);
  }
  await load();
}

async function remove(id) {
  if (!confirm("Are you sure?")) return;
  await api.delete(`/products/${id}`);
  await load();
}
</script>
