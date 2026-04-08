<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface HealthResponse {
  status: string;
  ts: string;
}

const data = ref<HealthResponse | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    const res = await fetch('http://localhost:3000/health');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data.value = (await res.json()) as HealthResponse;
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Request failed';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="q-pa-lg">
    <div v-if="loading">Loading…</div>

    <div v-else-if="error" class="text-negative">
      Error: {{ error }}
    </div>

    <div v-else-if="data">
      <div><strong>Status:</strong> {{ data.status }}</div>
      <div><strong>Timestamp:</strong> {{ data.ts }}</div>
    </div>
  </div>
</template>
