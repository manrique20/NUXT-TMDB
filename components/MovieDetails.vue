<template>
  <div class="movie-detail">
    <h1>{{ movie.title }}</h1>
    <img
      :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
      alt="movie poster"
    />
    <p>{{ movie.overview }}</p>
    <p>Release Date: {{ movie.release_date }}</p>
    <p>Rating: {{ movie.vote_average }}</p>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object,
  },
};
</script>

<style scoped>
.movie-detail img {
  width: 100%;
  height: auto;
}
</style>
