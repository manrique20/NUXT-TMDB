<template>
  <div>
    <Header @update:text="handleUpdateText" @search="search" />
    <div class="flex flex-wrap justify-center gap-6 p-4 mb-5">
      <MovieCard
        v-for="result in results"
        :key="result.id"
        :movie="result"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 max-w-xs"
      />
    </div>
    <div v-if="noResults" class="text-center mt-10 text-white mb-4">
      <p>No results found.</p>
      <img class="mx-auto" src="../images/NoResultsFound.png" alt="No Results Found">
    </div>
    <div v-if="results?.length" class="flex justify-center">
      <button :disabled="disabledPrevious" @click="previousPage" class="px-4 py-2 text-m border rounded-lg text-white mb-4">Previous</button>
      <div class="px-4 py-2 text-m border rounded-lg text-white mb-4">{{ page }}</div>
      <button :disabled="disabledNext" @click="nextPage" class="px-4 py-2 text-m border rounded-lg text-white mb-4">Next</button>
    </div>
    <div v-if="loading">
      <img src="../images/loading.gif">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { useFetch, useRuntimeConfig } from "#imports";
import { useRoute, useRouter } from 'vue-router';
import type { APIResponse } from "~/types/APIResponse";
import type { Movie } from "~/types/Movie";
import MovieCard from "~/components/MovieCard.vue";
import Header from "~/components/Header.vue";

const config = await useRuntimeConfig();
const searchTerm = ref("");
const page = ref(1);

const loading = ref(false);

const results = ref<Movie[]>([]);
const noResults = ref(false);
const totalPages = ref(1);
const apiBaseUrl = config.public.apiBaseUrl;
const api_key = config.public.apiKey;

const route = useRoute();
const router = useRouter();

const disabledPrevious = computed(() => {
  return page.value === 1;
});

const disabledNext = computed(() => {
  return page.value >= totalPages.value;
});

const handleUpdateText = (newText: string) => {
  searchTerm.value = newText;
  search();
};

const search = async () => {
  loading.value=true;
  noResults.value = false;
  const { data, error } = await useFetch<APIResponse>(
    `${apiBaseUrl}/search/movie?query=${searchTerm.value}&api_key=${api_key}&page=${page.value}`
  );

  if (error.value) {
    console.error("Error fetching data:", error.value);
  } else {
    results.value = data.value?.results || [];
    totalPages.value = data.value?.total_pages || 1;
    if (results.value.length === 0) {
      noResults.value = true;
    }
  }
  loading.value=false;
};

const previousPage = () => {
  if (page.value > 1) {
    page.value--;
    search();
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    search();
  }
};

watch(searchTerm, async (newSearchTerm) => {
  if (newSearchTerm) {
    page.value = 1;
    await search();
  }
});

onMounted(() => {
  if (route.query.search) {
    searchTerm.value = route.query.search as string;
    search();
  }
});
</script>

<style scoped>
.card {
  justify-content: center;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
html{
  background-color: black;
}
</style>
