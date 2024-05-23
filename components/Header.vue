<template>
  <div class="header">
    <NuxtLink to="/">
      <img class="imdb" src="../images/imdb.jpg" alt="IMDB" />
    </NuxtLink>
    <div class="search-bar">
      <input
        type="text"
        placeholder="Search for a movie..."
        v-model="searchTerm"
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch">
        <img class="loupe" src="../images/loupe.png" alt="loupe" />
      </button>
    </div>
    <nav>
      <ul>
        <NuxtLink to="/"> Inicio </NuxtLink>
        <li><a href="#"> Acerca de </a></li>
        <li><a href="#"> Contacto </a></li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const emits = defineEmits(['update:text']);
const searchTerm = ref('');
const router = useRouter();
const route = useRoute();

const handleSearch = () => {
  if (route.path !== '/') {
    router.push({ path: '/', query: { search: searchTerm.value } });
  } else {
    emits('update:text', searchTerm.value);
  }
};
</script>

<style scoped >
.header {
  background-color: rgb(18, 18, 18);
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

}

.header img.imdb {
    width: 100px;
    height: auto;
    margin-bottom: 10px;
  }

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
}

.search-bar input[type="text"] {
  border: none;
  outline: none;
  flex-grow: 1;
  padding: 5px;
}

.search-bar button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.search-bar img.loupe {
  width: 16px; /* Ajusta el tamaño de la lupa */
  height: 16px;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

nav li {
  display: inline-block;
  margin-right: 10px;
}

nav a {
  text-decoration: none;
  color: #ffffff;
}

@media (max-width: 640px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-bar {
    width: 100%;
  }

  nav ul {
    width: 100%;
    justify-content: space-between;
  }

  nav li {
    margin-right: 0;
  }
}
</style>
