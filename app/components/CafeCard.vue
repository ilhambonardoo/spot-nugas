<template>
  <div
    class="w-full max-w-sm rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
  >
    <div class="relative h-48 w-full bg-muted overflow-hidden">
      <img
        :src="imageUrl"
        :alt="name"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
      <span
        class="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full"
      >
        {{ priceRangeText }}
      </span>
      <span
        v-if="isOpen24h"
        class="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
      >
        <Clock class="w-3 h-3" /> 24 Jam
      </span>
    </div>
    <div class="p-4 flex flex-col justify-between flex-1 gap-3">
      <div>
        <h3 class="font-bold text-base line-clamp-1 text-foreground">
          {{ name }}
        </h3>
        <p class="text-xs text-muted-foreground line-clamp-1 mt-0.5">
          {{ address }}
        </p>

        <div class="flex flex-wrap gap-1.5 mt-3">
          <span
            v-for="(facility, index) in facilities"
            :key="index"
            class="inline-flex items-center gap-1 bg-muted text-muted-foreground text-[10px] font-medium px-2 py-0.5 rounded-md"
          >
            {{ facility }}
          </span>
        </div>
      </div>
      <div class="pt-2 border-t flex items-center justify-between mt-1">
        <span class="text-[11px] text-muted-foreground font-medium"
          >Spot Nugas</span
        >

        <button
          @click="$emit('select-map')"
          class="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer group"
        >
          <span>Lihat Peta</span>
          <ArrowRight
            class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ArrowRight, Clock } from "lucide-vue-next";

const props = defineProps({
  name: { type: String, default: "Name Cafe Spot" },
  address: { type: String, default: "Alamat cafe " },
  imageUrl: {
    type: String,
    default: "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
  },
  isOpen24h: {
    type: Boolean,
    default: false,
  },
  priceRange: {
    type: Number,
    default: 2,
  },
  facilities: {
    type: Array,
    default: () => ["Wifi Kencang", "Banyak Colokan"],
  },
});

defineEmits(["Select Map"]);

const priceRangeText = computed(() => {
  if (props.priceRange === 1) {
    return " < 20rb";
  }
  if (props.priceRange === 2) {
    return "20rb - 50rb";
  }
  return "> 50rb";
});
</script>
