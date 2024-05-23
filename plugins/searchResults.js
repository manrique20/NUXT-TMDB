import { ref } from 'vue';

export default defineNuxtPlugin(() => {
  const searchTerm = ref('');
  const searchResults = ref([]);
  const noResults = ref(false);

  const setSearchResults = (results) => {
    searchResults.value = results;
    noResults.value = results.length === 0;
  };

  const setSearchTerm = (term) => {
    searchTerm.value = term;
  };

  return {
    provide: {
      searchResults,
      noResults,
      setSearchResults,
      setSearchTerm,
    },
  };
});
