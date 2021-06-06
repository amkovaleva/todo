<template>
  <router-view></router-view>
  <PopUp></PopUp>
</template>

<script>

import './assets/scss/app.scss';
import PopUp from "./components/PopUp.vue";

export default {
  name: 'App',
  components: {PopUp}
}
</script>
