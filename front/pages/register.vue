<template>
<div id="main" v-if="loaded">
    <Navbar />
    <h1>Créer un compte</h1>
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
        <button id="submit" @click="register">Créer le compte</button>
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
      },
      logedID: null
    };
  },
  methods: {
    register: async function (e) {
      if (process.client) {
        try {
            await this.$axios.post("http://localhost:5000/api/staff/register", { formData: this.infos, dbData: this.logedID })
            window.location.href = window.location.origin;
        } catch (err) {
            alert(err);
        }
      }
    },
  },
  async created() {
    if (process.client) {
    const userData = await this.$axios.get(
      "http://localhost:5000/api/user/getuser"
    );
    this.logedID = userData.data.ID;
    if (userData.data === "Non connecté" || userData.data.ID !== "juubi2") {
      window.location.href = window.location.origin;
      alert("Tu n'as pas l'accès à cet endroit !")
    }
    this.loaded = true;
    }
  },
}
</script>

<style>
#main {
  position: absolute;
  top: 5em;
}
</style>