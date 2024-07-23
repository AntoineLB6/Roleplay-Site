<template>
  <div id="main">
        <Navbar />
    <div v-if="dontExist">
      <p>Utilisateur introuvable</p>
    </div>
    <div class="background" :style="'background-image: url(' + fiche.infoFiche.imageFond + ');'" v-if="loaded">
    <nuxt-link :to="{ name: 'fiches-pages-page', params: { page: 1 } }" class="btn btn-white btn-animate">Retour à la liste des Fiches</nuxt-link>
    <nuxt-link v-if="loged" :to="{ name: 'fiches-update-id', params: { id: this.$route.params.id } }" class="btn btn-white btn-animate" id="update-button">update</nuxt-link>
      <div id="ficheDisplayInfos">
      <h1>Fiche RP <span v-if="fiche.infoFiche.isPNJ">(PNJ)</span> de <img class="discordPP" :src="discordAccount.avatarURL" alt="PP">{{ discordAccount.tag }} :</h1>
      <p>
        <em>Nom :</em><br />
        {{ fiche.infoFiche.name }}
      </p>

      <div id="flexColum">
        <p>
        <em>Age</em><br />
        {{ fiche.infoFiche.age }}
      </p>
      <p id="sexe-container">
        <em>Sexe</em><br />
        <img v-if="fiche.infoFiche.orientation === 'heterosexuel'" src="/icon-hetero-white.png" alt="Icon Hetero" class="sexe-and-orientation-icons"> <img v-if="fiche.infoFiche.orientation === 'homosexuel'" src="/icon-homo-white.png" alt="Icon Homo" class="sexe-and-orientation-icons">
      </p>
      <p>
        <em>Orientation Sexuelle</em><br />
        <img v-if="fiche.infoFiche.sexe === 'homme'" src="/icon-male-white.png" alt="Icon Hetero" class="sexe-and-orientation-icons"> <img v-if="fiche.infoFiche.sexe === 'femme'" src="/icon-female-white.png" alt="Icon Homo" class="sexe-and-orientation-icons">
      </p>
      </div>

      <p>
        <em>Catégorie :</em><br />
        {{ fiche.infoFiche.category }}
      </p>

      <p>
        <em>Race :</em><br />
        {{ fiche.infoFiche.race }}
      </p>

      <p>
        <em>Familia :</em><br />
        {{ fiche.infoFiche.familia }}
      </p>

      <p>
        <em>Classe :</em><br />
        {{ fiche.infoFiche.classe }}
      </p>

      <p>
        <em>Niveau :</em><br />
        {{ fiche.infoFiche.niveau }}
      </p>

      <p>
        <em>Caractère :</em><br />
        {{ fiche.infoFiche.caractere }}
      </p>

      <p>
        <em>Histoire :</em><br />
        {{ fiche.infoFiche.histoire }}
      </p>

      <p>
        <em>Apparence :</em><br />
        {{ fiche.infoFiche.apparence }}
      </p>

      <p id="image-perso-container">
        <em>Image :</em><br />
        <img id="image-perso" :src="fiche.infoFiche.imagePerso" alt="Image du personnage lié à cette fiche" />
      </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loged: false,
      fiche: {},
      discordAccount: {},
      loaded: false,
      dontExist: false
    };
  },
  methods: {
    getFiche: async function () {
      if (process.client) {
        try {
          const data = await this.$axios.post(
            "http://localhost:5000/api/user/getfiche",
            { userID: this.$route.params.id }
          );
          this.fiche = data.data;
        } catch (err) {
          alert(err);
        }
      }
    },
    getDiscordInfos: async function () {
      if (process.client) {
        try {
          const data = await this.$axios.post(
            "http://localhost:5000/api/user/getdiscordinfos",
            { userID: this.$route.params.id }
          );
          this.discordAccount = data.data;
        } catch (err) {
          alert(err);
        }
      }
    },
  },
  async created() {
    if (process.client) {
      await this.getFiche();
      await this.getDiscordInfos();
      if (this.fiche === "Utilisateur introuvable") return this.dontExist = true
      else this.loaded = true;
      const userData = await this.$axios.get(
      "http://localhost:5000/api/user/getuser"
    );
    if (userData.data !== "Non connecté") {
      this.loged = true;
    }
    this.loaded = true;
    }
  }
};
</script>

<style>
#main {
  width: 100%;
}

#update-button {
  top: 7em;
  z-index: 2;
}

#ficheDisplayInfos {
  margin: 0 10%;
  padding: 1em 0;
}

#ficheDisplayInfos h1 {
  width: 80%;
  padding-bottom: 1em;
  border-bottom: solid 2px white;
  color: white;
  font-family: sans-serif;
}

#ficheDisplayInfos p {
  color: white;
  font-family: sans-serif;
  word-wrap: break-word;
}

#ficheDisplayInfos em {
  font-weight: bold;
  font-style: normal;
  font-family: sans-serif;
  line-height: 2em;
}

.background {
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}

#image-perso-container {
  position: absolute;
  top: 10em;
  right: 4em;
}

#image-perso {
  object-fit: cover;
  height: 300px;
  width: 400px;
}

.discordPP {
  height: 50px;
  width: 50px;
  vertical-align: bottom;
  margin-right: 10px;
  border-radius: 100%;
}

.sexe-and-orientation-icons {
  height: 50px;
  width: 50px;
  vertical-align: middle;
}

#flexColum {
  display: flex;
}

#flexColum p {
  margin: 0 1em;
  text-align: center;
}

#sexe-container {
  border-left: solid 2px white;
  border-right: solid 2px white;
  padding: 0 1em;
}

</style>
