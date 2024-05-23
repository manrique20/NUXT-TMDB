<template>
  <div class="container mx-auto px-4 mt-10">
    <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
      <div class="col-span-1 md:col-span-2">
        <img class="w-full h-auto" :src="imgUrl" alt="Movie Poster" />
      </div>
      <div class="col-span-1 md:col-span-5 flex flex-col justify-between">
        <div>
          <h1 class="text-5xl font-bold text-white mb-4">
            {{ data?.title }}
          </h1>
          <div class="flex flex-wrap">
            <div
              v-for="genre in data?.genres"
              :key="genre.id"
              class="px-3 py-1 bg-gray-200 text-gray-800 rounded mr-2 mb-2"
            >
              {{ genre.name }}
            </div>
          </div>
          <div class="text-lg my-2 text-white mb-4">
            Release date: {{ data?.release_date }}
          </div>
          <div class="text-lg my-2 text-white mb-4">
            Duration: {{ data?.runtime }} mins
          </div>
          <div class="text-lg my-2 text-white mb-4">
            For adults?: {{ data?.adult ? "Yes" : "No" }}
          </div>
          <div class="text-lg my-2 text-white mb-4">
            Rating: {{ data?.vote_average.toFixed(1) }}
          </div>
        </div>
        <div class="mt-4">
          <p class="text-base text-white mb-4">{{ data?.overview }}</p>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <img src="../images/loading.gif" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useFetch, useRuntimeConfig } from "#imports";
import type { Movie } from "~/types/Movie";
import { useRoute } from "vue-router";

const route = useRoute();
const config = useRuntimeConfig();
const movieId = computed(() => route.query.id);
const api_key = config.public.apiKey;
const apiBaseUrl = config.public.apiBaseUrl;
const loading = ref(true);

const { data } = await useFetch<Movie>(
  `${apiBaseUrl}/movie/${movieId.value}?api_key=${api_key}`
);

const imgUrl = computed(() =>
  data.value?.poster_path
    ? `${config.public.imgBaseUrl}${data.value.poster_path}`
    : "https://via.placeholder.com/300x500"
);
loading.value = false;
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
