<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
</script>

<template>
  <div class="h-screen DefaultLayout">
    <Navbar />
    <main>
      <slot />
    </main>
  </div>
</template>
