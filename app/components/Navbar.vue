<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
  >
    <div class="container flex h-16 items-center justify-between gap-4 px-4">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 font-bold text-xl text-primary"
      >
        <Icon name="ph:coffee-bold" class="w-7 h-7" />
        <span>Nugas <span class="text-foreground">Spot</span></span>
      </NuxtLink>

      <div class="flex-1 max-w-md hidden md:block">
        <div class="relative">
          <Icon
            name="ph:magnifying-glass"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
          />
          <input
            type="text"
            placeholder="Cari nama cafe atau area (misal: Babakan Madang)..."
            class="w-full pl-9 pr-4 py-2 text-sm rounded-full border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <button class="md:hidden p-2 rounded-lg border">
          <Icon name="ph:magnifying-glass" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div
      class="flex justify-center items-center border-t py-2 px-4 relative gap-5"
    >
      <div class="flex items-center justify-center gap-2">
        <NuxtLink
          v-for="page in choosePages"
          :key="page.key"
          :to="page.path"
          class="border py-1 px-4 rounded-3xl text-xs font-medium transition-colors hover:bg-muted"
          active-class="bg-primary text-primary-foreground border-primary"
        >
          <span>{{ page.label }}</span>
        </NuxtLink>
      </div>
      <div class="relative inline-block text-left" ref="dropdownRef">
        <button
          type="button"
          @click="toggleDropdown"
          :aria-expanded="isDropdownOpen"
          aria-haspopup="menu"
          :class="[
            'flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-medium transition-colors cursor-pointer',
            activeFilterCount > 0
              ? 'bg-primary/10 text-primary border-primary'
              : 'bg-background hover:bg-muted border-input',
          ]"
        >
          <SlidersHorizontal class="w-3.5 h-3.5" />
          <span>Fasilitas</span>

          <span
            v-if="activeFilterCount > 0"
            class="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold"
          >
            {{ activeFilterCount }}
          </span>

          <Icon
            name="ph:caret-down-bold"
            class="w-3 h-3 transition-transform"
            :class="{ 'rotate-180': isDropdownOpen }"
          />
        </button>

        <div
          v-if="isDropdownOpen"
          role="menu"
          aria-label="Filter cepat"
          class="absolute left-0 mt-2 w-56 rounded-xl border bg-popover p-2 text-popover-foreground shadow-md z-50 animate-in fade-in-80 zoom-in-95"
        >
          <div
            class="text-xs font-semibold px-2 py-1.5 text-muted-foreground border-b mb-1"
          >
            Pilih Kriteria Spot
          </div>

          <button
            v-for="filter in quickFilters"
            :key="filter.key"
            @click="toggleFilter(filter.key)"
            :class="[
              'w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left',
              isActive(filter.key)
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-muted text-foreground',
            ]"
          >
            <div class="flex items-center gap-2">
              <Icon :name="filter.icon" class="w-4 h-4" />
              <component :is="filter.icon" />
              <span>{{ filter.label }}</span>
            </div>

            <Check v-if="isActive(filter.key)" class="w-4 h-4 text-primary" />
          </button>

          <div v-if="activeFilterCount > 0" class="border-t mt-1 pt-1">
            <button
              @click="clearAllFilters"
              class="w-full text-center text-xs text-destructive hover:underline py-1 cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import {
  Check,
  Clock,
  Plug,
  SlidersHorizontal,
  Trees,
  Wifi,
} from "lucide-vue-next";
import { ref, computed, onMounted, onUnmounted } from "vue";

const route = useRoute();
const router = useRouter();

const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

const quickFilters = [
  { key: "wifi", label: "WiFi Kencang", icon: Wifi },
  { key: "colokan", label: "Banyak Colokan", icon: Plug },
  { key: "open24h", label: "Buka 24 Jam", icon: Clock },
  { key: "outdoor", label: "Area Outdoor", icon: Trees },
];

const choosePages = [
  { key: "1", label: "Dashboard", path: "/" },
  { key: "2", label: "Tentang", path: "/tentang" },
];

const isActive = (key) => route.query[key] === "true";

const activeFilterCount = computed(() => {
  return quickFilters.filter((f) => isActive(f.key)).length;
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleFilter = (key) => {
  const currentQuery = { ...route.query };
  if (currentQuery[key] === "true") {
    delete currentQuery[key];
  } else {
    currentQuery[key] = "true";
  }
  router.push({ query: currentQuery });
};

const clearAllFilters = () => {
  const currentQuery = { ...route.query };
  quickFilters.forEach((f) => delete currentQuery[f.key]);
  router.push({ query: currentQuery });
};

const handleClickOutside = (event) => {
  if (
    dropdownRef.value &&
    event.target instanceof Node &&
    !dropdownRef.value.contains(event.target)
  ) {
    isDropdownOpen.value = false;
  }
};

const handleEscape = (event) => {
  if (event.key === "Escape") {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
  document.removeEventListener("keydown", handleEscape);
});
</script>
