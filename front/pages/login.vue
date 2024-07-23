<template>
<div id="main" v-if="loaded">
    <Navbar />
    <h1>Se Connecter</h1>
    <div class="form">
        <p>
        <label for="ID">Identifiant</label><br />
        <input
          type="text"
          id="ID"
          v-model="infos.ID"
          name="ID"
          required
        />
      </p>
      <p>
        <label for="password">Clé secrète</label><br />
        <input
          type="password"
          id="password"
          v-model="infos.password"
          name="password"
          required
        />
      </p>
      <p>
        <button id="submit" @click="login">Se connecter</button>
      </p>
    </div>
</div>
</template>

<script>
export default {
    data() {
    return {
      loaded: false,
      infos: {
        ID: null,
        password: null
      }
    };
  },
  methods: {
    login: async function (e) {
      if (process.client) {
        try {
            await this.$axios.post("http://localhost:5000/api/user/login", this.infos)
            window.location.href = window.location.origin;
        } catch (err) {
            alert(err);
        }
      }
    },
  },
  created() {
    this.loaded = true;
  }
}
</script>

<style>
#main {
  position: absolute;
  top: 5em;
}
</style>