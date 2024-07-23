<template>
  <div id="main" v-if="loaded">
    <Navbar />

    <nuxt-link
      :to="{ name: 'fiches-create' }"
      class="btn"
      v-if="loged"
      >Create Fiche</nuxt-link
    >
    <div id="fiche-list">
      <h1>Liste Des Fiches Roleplay :</h1>

      <div id="ficheFilterContainer">
        <div>
          <div class="categoryContainer">
            <h2>Catégorie :</h2>
            <div class="categoryRadioContainer">
              <label class="radioCategory">
                <input
                  type="radio"
                  value="Tous"
                  v-model="category"
                  name="category"
                />
                <div class="categoryIcon">
                  <img src="/1.jpg" alt="Icone Tous" />
                  <h3>Tous</h3>
                </div>
              </label>
              <label class="radioCategory">
                <input
                  type="radio"
                  value="Aventurier"
                  v-model="category"
                  name="category"
                />
                <div class="categoryIcon">
                  <img src="/1.jpg" alt="Icone Aventurier" />
                  <h3>Aventurier</h3>
                </div>
              </label>
              <label class="radioCategory">
                <input
                  type="radio"
                  value="Dieu"
                  v-model="category"
                  name="category"
                />
                <div class="categoryIcon">
                  <img src="/1.jpg" alt="Icone Dieu" />
                  <h3>Dieu</h3>
                </div>
              </label>
              <label class="radioCategory">
                <input
                  type="radio"
                  value="Citoyen"
                  v-model="category"
                  name="category"
                />
                <div class="categoryIcon">
                  <img src="/1.jpg" alt="Icone Citoyen" />
                  <h3>Citoyen</h3>
                </div>
              </label>
            </div>
          </div>
          <div class="checkboxContainer">
            <div class="setBottom">
              <div class="centerLabel">
              <label class="switch">
                <input
                  type="checkbox"
                  id="notpnj"
                  v-model="disablePNJ"
                  name="notpnj"
                  @click="selectCheckbox"
                />
                <span class="slider round"></span>
              </label>
              <label for="notpnj" class="checkLabel">Disable PNJ</label>
              </div>
            </div>
            <div class="setBottom">
            <div class="centerLabel">
              <label class="switch">
                <input
                  type="checkbox"
                  id="onlypnj"
                  v-model="onlyEnablePNJ"
                  name="onlypnj"
                  @click="selectCheckbox"
                />
                <span class="slider round"></span>
              </label>
              <label for="onlypnj" class="checkLabel">Only Enable PNJ</label>
              </div>
            </div>
          </div>
        </div>
        <p id="searchContainer">
          <input
            id="searchInput"
            type="text"
            v-model="search"
            name="search"
            placeholder="Recherchez votre fiche"
          />
        </p>
      </div>
      <nuxt-child
        id="child"
        :disablePNJ="disablePNJ"
        :onlyEnablePNJ="onlyEnablePNJ"
        :search="search"
        :category="category"
      ></nuxt-child>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loged: false,
      loaded: false,
      disablePNJ: null,
      onlyEnablePNJ: null,
      search: null,
      category: "Tous",
      loaded: false,
    };
  },
  methods: {
    selectCheckbox: async function (event) {
      if (event.target.id === "notpnj") {
        if (this.onlyEnablePNJ) this.onlyEnablePNJ = false;
      } else {
        if (this.disablePNJ) this.disablePNJ = false;
      }
    },
  },
  async created() {
    const userData = await this.$axios.get(
      "http://localhost:5000/api/user/getuser"
    );
    if (userData.data !== "Non connecté") {
      this.loged = true;
    }
    this.loaded = true;
  },
};
</script>

<style>
#main {
  width: 100%;
}

#fiche-list h1 {
  font-family: "madeMirage";
  margin: 1em 1em;
  font-size: 3em;
}

#ficheFilterContainer {
  margin: 0 3em 1em;
  padding-bottom: 3em;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
}

#ficheFilterContainer div {
  display: flex;
}

#ficheFilterContainer p {
  margin: 0 3em;
}

.categoryContainer {
  flex-direction: column;
  align-items: center;
  margin-right: 2em;
}

.categoryContainer h2 {
  font-family: "madeMirage";
  width: 90%;
  padding-bottom: 0.5em;
  border-bottom: 1px solid black;
}

.categoryRadioContainer {
  border-radius: 10px;
  background-color: grey;
  box-shadow: 0 0 20px #68676767;
}

.radioCategory {
  border-radius: 30px;
  height: 3em;
  margin: 0.5em;
  text-align: center;
}

.radioCategory:hover {
  background-color: #535353a4;
  box-shadow: 0 0 20px #c3c3c367;
}

.categoryRadioContainer input {
  display: none;
}

.categoryIcon {
  padding: 0 0.5em;
  border-radius: inherit;
  align-items: center;
  height: 3em;
  font-family: sans-serif;
}

.categoryIcon img {
  border-radius: 100%;
  width: 2em;
  height: 2em;
  margin-right: 0.5em;
}

.radioCategory input:checked + .categoryIcon {
  background-color: white;
  box-shadow: 0 0 20px #c3c3c367;
}

.checkboxContainer {
  font-family: "copperPenny";
}

.setBottom {
  align-items: flex-end;
}

.centerLabel {
  align-items: center;
}

.switch {
  margin: 1em;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.checkLabel {
  vertical-align: middle;
}

#searchContainer {
  position: relative;
  width: 25%;
}

#searchInput {
  position: absolute;
  bottom: 0;
  height: 40%;
  width: 65%;
  font-size: 1.5em;
  border: none;
  border-bottom: 1px solid black;
}

#searchInput:focus {
  outline: none;
  border-bottom: 2px solid black;
}

.btn {
  background-color: rgb(19, 168, 255);
  color: rgb(248, 248, 248);
  animation: moveInBottom 2s ease-out;
  animation-fill-mode: backwards;
  font-size: 1em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 20px 60px;
  display: inline-block;
  position: absolute;
  top: 2.5em;
  right: 4em;
  border-radius: 100px;
  z-index: 2;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

@keyframes moveInBottom {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
