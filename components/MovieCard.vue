<template>
  <div class="h-140 w-68 border flex flex-col text-center text-white">
    <NuxtLink :to="`/movies?id=${movie?.id}`" class="mb-5 bg-green-600 inline-block">
      <img
        class="transform hover:translate-x-6 hover:-translate-y-6 delay-50 duration-100 inline-block"
        :src="imgURL"
        alt="Movie Poster"
      />
    </NuxtLink>
    <div class="text-2xl font-bold">
      {{ movie.title }}
    </div>
    <p class="text-m break-words text-wrap truncate overflow-hidden px-2">{{ movie.overview }}</p>
  </div>
</template>



<script setup lang="ts">
import { defineProps } from "vue";
import type { Movie } from "~/types/Movie";

const config = await useRuntimeConfig();

const props = defineProps<{
  movie: Movie;
}>();
const imgURL = computed(() =>
  props.movie?.poster_path != null
    ? `${config.public.imgBaseUrl}${props.movie.poster_path}`
    : "https://via.placeholder.com/300x500"
);
</script>

<style >
</style>
