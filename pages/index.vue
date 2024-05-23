<template>
  <div>
    <Header @update:text="handleUpdateText" @search="search" />
    <div class="flex flex-wrap justify-center gap-6 p-4">
      <MovieCard
        v-for="result in results"
        :key="result.id"
        :movie="result"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 max-w-xs"
      />
    </div>
    <div v-if="noResults" class="text-center mt-10">
      <p>No results found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useFetch, useRuntimeConfig } from "#imports";
import type { APIResponse } from "~/types/APIResponse";
import type { Movie } from "~/types/Movie";
import MovieCard from "~/components/MovieCard.vue";
import Header from "~/components/Header.vue";

const config = await useRuntimeConfig();
const searchTerm = ref("");
const results = ref<Movie[]>([]);
const noResults = ref(false);
const apiBaseUrl = config.public.apiBaseUrl;
const api_key = config.public.apiKey;

const handleUpdateText = (newText: string) => {
  searchTerm.value = newText;
};

const search = async () => {
  noResults.value = false;
  const { data, error } = await useFetch<APIResponse>(
    `${apiBaseUrl}/search/movie?query=${searchTerm.value}&api_key=${api_key}`
  );

  if (error.value) {
    console.error("Error fetching data:", error.value);
  } else {
    results.value = data.value?.results || [];
    if (results.value.length === 0) {
      noResults.value = true;
    }
  }
};

watch(searchTerm, async (newSearchTerm) => {
  if (newSearchTerm) {
    await search();
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
</style>
