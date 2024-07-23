<template>
  <div id="main" v-if="loaded">
    <Navbar />
    <nuxt-link :to="{ name: 'fiches-pages-page', params: { page: 1 } }" class="btn btn-white btn-animate">Retour à la liste des Fiches</nuxt-link>
    <div>
      <h1>Creation de Fiche RP :</h1>

      <p>
        <label for="userID">User ID</label><br />
        <input
          id="userID"
          v-model="infoFiche.userID"
          type="text"
          name="userID"
        />
      </p>

      <p>
        <label for="name">Name</label><br />
        <input id="name" v-model="infoFiche.name" type="text" name="name" />
      </p>

      <p>
        <label for="age">Age</label><br />
        <input
          id="age"
          v-model="infoFiche.age"
          type="number"
          name="age"
          min="0"
        />
      </p>

      <p>
        Sexe<br />
        <input
          type="radio"
          id="homme"
          value="homme"
          v-model="infoFiche.sexe"
          name="sexe"
        />
        <label for="homme">Homme</label><br />
        <input
          type="radio"
          id="femme"
          value="femme"
          v-model="infoFiche.sexe"
          name="sexe"
        />
        <label for="femme">Femme</label>
      </p>

      <p>
        Orientation Sexuelle<br />
        <input
          type="radio"
          id="heterosexuel"
          value="heterosexuel"
          v-model="infoFiche.orientation"
          name="orientation"
        />
        <label for="heterosexuel">Hétérosexuel</label><br />
        <input
          type="radio"
          id="homosexuel"
          value="homosexuel"
          v-model="infoFiche.orientation"
          name="orientation"
        />
        <label for="homosexuel">Homosexuel</label><br />
        <input
          type="radio"
          id="bisexuel"
          value="bisexuel"
          v-model="infoFiche.orientation"
          name="orientation"
        />
        <label for="bisexuel">Bisexuel</label>
      </p>

      <p>
        <label for="category">Catégorie</label><br />
        <select id="category" v-model="infoFiche.category" name="category">
          <option>Aventurier</option>
          <option>Dieu</option>
          <option>Citoyen</option>
        </select>
      </p>

      <p>
        <input
          type="checkbox"
          id="pnj"
          v-model="infoFiche.isPNJ"
          name="pnj"
        />
        <label for="pnj">Cochez si PNJ</label>
      </p>

      <p>
        <label for="race">Race</label><br />
        <select id="race" v-model="infoFiche.race" name="race">
          <option>Humain</option>
          <option>Demi-Loup</option>
          <option>Demi-Chat</option>
          <option>Demi-Mouton</option>
          <option>Demi-Raton Laveur</option>
          <option>Demi-Chien</option>
          <option>Nain</option>
          <option>Elfe</option>
          <option>Amazone</option>
          <option>Pallum</option>
        </select>
      </p>

      <p>
        <label for="familia">Familia</label><br />
        <select id="familia" v-model="infoFiche.familia" name="familia">
          <option>Loki</option>
          <option>Freya</option>
          <option>Ganesha</option>
          <option>Hephaïstos</option>
          <option>Ishtar</option>
          <option>Hermès</option>
          <option>Seth</option>
        </select>
      </p>

      <p>
        <label for="classe">Classe</label><br />
        <select id="classe" v-model="infoFiche.classe" name="classe">
          <option>Archer</option>
          <option>Assassin</option>
          <option>Guerrier</option>
          <option>Mage</option>
          <option>Pugiliste</option>
        </select>
      </p>

      <p>
        <label for="niveau">Niveau</label><br />
        <input
          id="niveau"
          v-model="infoFiche.niveau"
          type="number"
          name="niveau"
          min="0"
        />
      </p>

      <p>
        <label for="caractere">Caractère</label><br />
        <textarea
          id="caractere"
          v-model="infoFiche.caractere"
          name="caractere"
          rows="7"
          cols="150"
          placeholder="Votre Caractère"
        ></textarea>
      </p>

      <p>
        <label for="histoire">Histoire RP</label><br />
        <textarea
          id="histoire"
          v-model="infoFiche.histoire"
          name="histoire"
          rows="7"
          cols="150"
          placeholder="Votre Histoire"
        ></textarea>
      </p>

      <p>
        <label for="apparence">Apparence RP</label><br />
        <textarea
          id="apparence"
          v-model="infoFiche.apparence"
          name="apparence"
          rows="7"
          cols="150"
          placeholder="Votre Apparence"
        ></textarea>
      </p>

      <p>
        <label for="imageperso">Image du Personnage</label><br />
        <input
          id="imageperso"
          v-model="infoFiche.imageperso"
          type="text"
          name="imageperso"
        />
      </p>

      <p>
        <label for="imagefond">Image de Fond</label><br />
        <input
          id="imagefond"
          v-model="infoFiche.imagefond"
          type="text"
          name="imagefond"
        />
      </p>

      <p>
        <button id="submit" @click="[checkForm($event), submitForm()]">Créer la fiche</button>
      </p>

      <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      errors: [],
      infoFiche: {
        userID: null,
        name: null,
        age: null,
        sexe: null,
        orientation: null,
        category: null,
        isPNJ: false,
        race: null,
        familia: null,
        classe: null,
        niveau: null,
        caractere: null,
        histoire: null,
        apparence: null,
        imageperso: null,
        imagefond: null,
      },
    };
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];

      if (!this.infoFiche.userID) {
        this.errors.push("UserID Requis.");
      }
      if (!this.infoFiche.name) {
        this.errors.push("Nom Requis.");
      }
      if (!this.infoFiche.age) {
        this.errors.push("Âge Requis.");
      }
      if (!this.infoFiche.sexe) {
        this.errors.push("Sexe Requis.");
      }
      if (!this.infoFiche.orientation) {
        this.errors.push("Orientation Sexuelle Requise.");
      }
      if (!this.infoFiche.category) {
        this.errors.push("Catégorie Requise.");
      }
      if (!this.infoFiche.race) {
        this.errors.push("Race Requise.");
      }
      if (!this.infoFiche.familia) {
        this.errors.push("Familia Requise.");
      }
      if (!this.infoFiche.classe) {
        this.errors.push("Classe Requise.");
      }
      if (!this.infoFiche.niveau) {
        this.errors.push("Niveau Requis.");
      }
      if (!this.infoFiche.caractere) {
        this.errors.push("Caractère Requis.");
      }
      if (!this.infoFiche.histoire) {
        this.errors.push("Histoire RP Requise.");
      }
      if (!this.infoFiche.apparence) {
        this.errors.push("Apparence RP Requise.");
      }

      if (!this.errors.length) {
        return true;
      }

      e.preventDefault();
    },
    submitForm: function () {
      if (this.errors.length) return;
      this.$axios
        .post("http://localhost:5000/api/staff/create", this.infoFiche)
        .then(function () {
          document.location.href = "http://localhost:3000/fiches/pages/1";
        })
        .catch(function (error) {
          alert(error);
        });
    },
  },
  created() {
    this.loaded = true;
  }
};
</script>

<style>
#main {
  width: 100%;
}
</style>
