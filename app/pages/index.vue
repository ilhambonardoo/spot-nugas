<!-- pages/index.vue -->
<template>
  <div class="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <CafeCard
      name="Kopi Nako Bogor"
      address="Jl. Pajajaran Indah V No.7, Bogor Timur"
      image-url="https://images.unsplash.com/photo-1554118811-1e0d58224f24"
      :is-open24h="true"
      :price-range="2"
      :facilities="['WiFi Kencang', 'Banyak Colokan', 'Outdoor']"
      @select-map="handleFocusMap"
    />
  </div>
</template>

<script setup>
const handleFocusMap = () => {
  console.log("Fokuskan peta ke koordinat cafe ini!");
};
</script>
