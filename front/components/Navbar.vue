<template>
  <nav class="navbar">
    <nuxt-link :to="{ name: 'index' }" class="icon-link">
      <img class="icon" src="../static/icon.png" alt="Logo" />
    </nuxt-link>
    <ul>
      <li>Orario Familia Myth</li>
      <li><nuxt-link :to="{ name: 'fiches' }">Fiches</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'wiki' }">Wiki</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'shop' }">Shop</nuxt-link></li>
      <li v-if="!loged">
        <nuxt-link :to="{ name: 'login' }">Login</nuxt-link>
      </li>
      <li v-if="loged">{{ data.ID }}</li>
      <li v-if="loged"><a @click="logout">Se Déconnecter</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      loged: false,
      loaded: false,
      data: {},
    };
  },
  methods: {
    logout: async function (e) {
      if (process.client) {
        try {
          await this.$axios.get("http://localhost:5000/api/staff/logout");
          window.location.href = window.location.origin;
        } catch (err) {
          alert(err);
        }
      }
    },
  },
  async created() {
    const userData = await this.$axios.get(
      "http://localhost:5000/api/user/getuser"
    );
    if (userData.data !== "Non connecté") {
      this.data = userData.data;
      this.loged = true;
    }
    this.loaded = true;
  },
};
</script>

<style>
body {
  margin: 0;
}

.navbar {
  margin: 0;
  padding: 1em 0;
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 3;
}

.icon {
  width: 3em;
  height: 3em;
  border-radius: 2em;
}

.icon-link {
  border-radius: 2em;
}

.navbar ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
}

li a {
  margin: 0 0.5em;
  border-radius: 2em;
}

li a {
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.nuxt-link-active) {
  background-color: #111;
}

.nuxt-link-active:not(.icon-link, .pageNav) {
  background-color: #04aa6d;
}
</style>
