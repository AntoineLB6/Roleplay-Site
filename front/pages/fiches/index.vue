<template>
  <div id="main" v-if="loaded">
    <Navbar />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false
    };
  },
  async created() {
    if (process.client) {
      window.location.href = `${window.location.origin}/fiches/pages/1`;
      this.loaded = true;
    }
  }
};
</script>