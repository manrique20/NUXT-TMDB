<template>
  <div class="h-128 w-64 border flex flex-col text-center">
    <div class="mb-5 bg-green-600 inline-block">
      <img
        class="transform hover:translate-x-6 hover:-translate-y-6 delay-50 duration-100 inline-block"
        :src="imgURL"
        alt="Movie Poster"
      />
    </div>
    <div class="text-lg">
      {{ movie.title }}
    </div>
    <p class="text-m text-gray-500 break-words text-wrap truncate overflow-hidden px-2">{{ movie.overview }}</p>
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

<style ></style>
