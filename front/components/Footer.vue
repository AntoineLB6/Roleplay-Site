<template>
  <footer v-if="loaded">
    <div class="footer-element">
      <h1>Nous contacter :</h1>
      <p id="contact">Notre E-Mail : orario-roleplay@gmail.com</p>
    </div>
    <div class="footer-element">
      <h1>Suivez-nous !</h1>
      <p><a href="https://discord.gg/VpaKNmfXge">
      <img class="logo" src="../static/discord_logo.png" alt="Logo Discord" />
      Notre Serveur Discord
      </a>
      <a href="https://www.instagram.com/orario.roleplay/">
      <img class="logo" src="../static/instagram_logo.png" alt="Logo Instagram" />
      Notre Page Instagram
      </a>
      <a href="https://twitter.com/OrarioRoleplay">
      <img class="logo" src="../static/twitter_logo.png" alt="Logo Twitter" />
      Notre Page Twitter
      </a>
      <a href="https://www.youtube.com/channel/UCWM0P3hvPWkZBDnEKUdDsJA">
      <img class="logo" src="../static/youtube_logo.png" alt="Logo Youtube" />
      Notre Chaîne Youtube
      </a></p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
    };
  },
  methods: {
  },
  async created() {
    this.loaded = true;
  },
};
</script>

<style>

footer {
  display: flex;
  justify-content: center;
  background-color: #333;
}

.footer-element {
  margin: 1% 5% 3%;
  font-family: 'driveCorps';
}

#contact {
  color: white;
}

.footer-element p {
  display: flex;
  font-size: 150%;
}

.footer-element a {
  margin: 0 0.5em;
  color: white;
}

h1 {
  font-weight: bold;
  color: black;
}

.logo {
  vertical-align: middle;
  width: 2em;
  height: 2em;
}

</style>