<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
  >
    <div class="container flex h-16 items-center justify-between gap-4 px-4">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 font-bold text-xl text-primary"
      >
        <span>Nugas <span class="text-foreground">Spot</span></span>
      </NuxtLink>

      <div class="flex-1 max-w-md hidden md:block">
        <div class="relative">
          <Search
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
      class="flex justify-center items-center border-t py-2 px-4 relative gap-2"
    >
      <div class="flex items-center justify-center gap-2">
        <NuxtLink
          v-for="page in choosePages"
          :key="page.key"
          :to="page.path"
          class="border py-1 px-4 rounded-3xl text-xs font-medium transition-all duration-200 ease-in-out hover:bg-muted flex items-center gap-2 hover:scale-105 active:scale-95 bg-background text-foreground"
          active-class="!bg-neutral-500 !text-white !border-primary font-semibold shadow-sm"
        >
          <component :is="page.icon" class="w-4 h-4" />
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
            'flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-medium transition-all hover:scale-105 ease-in-out duration-300 cursor-pointer',
            isFilteredDisable
              ? 'opacity-50 bg-muted text-muted-foreground border-border cursor-none'
              : activeFilterCount > 0
                ? 'bg-neutral-500 text-white border-primary'
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
              'w-full flex items-center justify-between px-2.5 py-2 rounded-lg  hover:scale-105 ease-in-out duration-200 text-xs transition-all cursor-pointer text-left',
              isFilterActive(filter.key)
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-muted text-foreground',
            ]"
          >
            <div class="flex items-center gap-2">
              <component :is="filter.icon" />
              <span>{{ filter.label }}</span>
            </div>

            <Check
              v-if="isFilterActive(filter.key)"
              class="w-4 h-4 text-primary"
            />
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
  Earth,
  Info,
  Plug,
  Search,
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
  { key: "1", label: "Ekslpor", path: "/", icon: Earth },
  { key: "2", label: "Tentang", path: "/tentang", icon: Info },
];

const isFilterActive = (key) => route.query[key] === "true";

const isFilteredDisable = computed(() => route.path === "/tentang");

const activeFilterCount = computed(() => {
  return quickFilters.filter((f) => isFilterActive(f.key)).length;
});

const toggleDropdown = () => {
  if (isFilteredDisable.value) return;
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
