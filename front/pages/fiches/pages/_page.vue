<template>
  <div id="main" v-if="loaded">
    <div id="ficheContainer">
    <div class="thisFicheContainer" v-for="fiche in fichePage" :key="fiche.infoFiche.name">
      <nuxt-link
        :to="{ name: 'fiches-id', params: { id: fiche.userID } }"
      >
        <img class="persoImage" :src="fiche.infoFiche.imagePerso" alt="Image du personnage lié à cette fiche" />
        <img class="imageNiveau" :src="'/' + fiche.infoFiche.niveau + '.jpg'" alt="Image du niveau" />
        <p class="ficheInfo">Nom : {{ fiche.infoFiche.name }}<br />User : {{ fiche.userID }}</p>
      </nuxt-link>
    </div>
    </div>
    
    <div id="pageNavContainer">
      <nuxt-link
        class="pageNav"
        :to="{ name: 'fiches-pages-page', params: { page: 1 } }"
      >
        <button id="firstPageNav" :disabled="pageNumber === 1">Première<br />Page</button>
      </nuxt-link>
      <nuxt-link
        class="pageNav"
        v-if="prevPage > 0"
        :to="{ name: 'fiches-pages-page', params: { page: prevPage } }"
      >
        <button :disabled="pageNumber === 1">{{pageNumber - 1}}</button>
      </nuxt-link>
      <nuxt-link
        class="pageNav"
        :to="{ name: 'fiches-pages-page', params: { page: 1 } }"
      >
        <button disabled>{{pageNumber}}</button>
      </nuxt-link>
      <nuxt-link
        class="pageNav"
        v-if="nextPage <= maxPage"
        :to="{ name: 'fiches-pages-page', params: { page: nextPage } }"
      >
        <button :disabled="pageNumber === maxPage">{{pageNumber + 1}}</button>
      </nuxt-link>
      <nuxt-link
        class="pageNav"
        :to="{ name: 'fiches-pages-page', params: { page: 1 } }"
      >
        <button disabled>...</button>
      </nuxt-link>
      <nuxt-link
        class="pageNav"
        :to="{ name: 'fiches-pages-page', params: { page: nextPage } }"
      >
        <button id="lastPageNav" :disabled="pageNumber === maxPage">Dernière<br />Page</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disablePNJ: Boolean,
    onlyEnablePNJ: Boolean,
    search: String,
    category: String,
  },
  data() {
    return {
      ficheList: [],
      fichePage: null,
      maxPage: null,
      prevPage: null,
      nextPage: null,
      pageNumber: parseInt(this.$route.params.page),
      loaded: true,
    };
  },
  methods: {
    getFicheList: async function () {
      if (process.client) {
        if (this.category === "Tous") {
          try {
            const data = await this.$axios.get(
              "http://localhost:5000/api/user/getallfiche"
            );
            this.ficheList = data.data;
          } catch (err) {
            alert(err);
          }
        } else {
          try {
            const data = await this.$axios.post(
              "http://localhost:5000/api/user/getcategoryfiche",
              { category: this.category }
            );
            this.ficheList = data.data;
          } catch (err) {
            alert(err);
          }
        }

        if (this.ficheList === "Collection vide") {
          this.ficheList = null;
          return alert("Une erreur est survenue pendant le chargement");
        }

        if (this.disablePNJ) {
          this.ficheList = this.ficheList.filter(
            (fiche) => !fiche.infoFiche.isPNJ
          );
        }
        if (this.onlyEnablePNJ) {
          this.ficheList = this.ficheList.filter(
            (fiche) => fiche.infoFiche.isPNJ
          );
        }
        if (this.search) {
          this.ficheList = this.ficheList.filter((fiche) =>
            fiche.infoFiche.name.startsWith(this.search)
          );
        }
        this.fichePage = this.ficheList.slice(
          this.pageNumber * 20 - 20,
          this.pageNumber * 20
        );

        this.maxPage = await Math.ceil(this.ficheList.length / 20);
        this.nextPage = (await this.pageNumber) + 1;
        this.prevPage = (await this.pageNumber) - 1;
      }
    },
    paramsReset: async function () {
      if (this.$route.params.page != 1) return this.$router.replace({ name: "fiches-pages-page", params: { page: 1 } })
    }
  },
  watch: {
    async category() {
      await this.paramsReset();
      await this.getFicheList();
    },
    async onlyEnablePNJ() {
      await this.paramsReset();
      await this.getFicheList();
    },
    async disablePNJ() {
      await this.paramsReset();
      await this.getFicheList();
    },
    async search() {
      await this.paramsReset();
      await this.getFicheList();
    },
    async "$route.params.page"() {
      await this.getFicheList();
    },
  },
  async beforeCreate() {
    if (process.client) {
      if (!this.$route.params.page)
        return window.location.href = await `${window.location.href}/1`;
    }
  },
  async created() {
    if (process.client) {
      await this.getFicheList();

      if (this.ficheList) {
        if (
          this.pageNumber > this.maxPage ||
          this.pageNumber < 1 ||
          isNaN(this.$route.params.page)
        )
          return alert("Une erreur a eut lieu pendant le chargement.");
      }
      this.loaded = true;
    }
  },
};
</script>

<style>

#ficheContainer {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 15%;
}

.thisFicheContainer {
  position: relative;
  margin: 1em 0;
}

.persoImage {
  vertical-align: middle;
  object-fit: cover;
  width: 15em;
  height: 15em;
}

.imageNiveau {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 5em;
  height: 5em;
  border-radius: 2em 2em 2em 0;
  z-index: 2;
}

.ficheInfo {
  position: absolute;
  bottom: 0;
  background-color: rgba(17, 17, 17, 0.658);
  width: 100%;
  margin-bottom: 0;
  text-align: left;
  color: #ffffff;
  padding-left: 5.2em;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5em;
  font-family: "madeMirage";
}

#pageNavContainer {
  display: flex;
  justify-content: center;
}

.pageNav button {
  height: 40px;
  padding: 0 2em;
  margin: 1em 0;
  background-color: rgb(90, 90, 90);
  color: rgb(248, 248, 248);
}

.pageNav button:disabled {
  background-color: rgb(110, 110, 110);
}

#firstPageNav {
  border-radius: 2em 0 0 2em;
}

#lastPageNav {
  border-radius: 0 2em 2em 0;
}

</style>
