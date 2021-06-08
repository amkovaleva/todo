<template>
  <div v-show="popUpInfo.open" class="popup-overlay">
    <div class="popup">
      <span class="close" @click="close">&#x2715;</span>
      <p class="title">{{ title }} </p>
      <p>{{ caption }}</p>

      <div v-show="!this.popUpInfo.justAlert" class="buttons">
        <span class="btn" @click="$popUpRes(true)"><b>ДА</b></span>
        <span class="btn" @click="$popUpRes(false)"><b>Нет</b></span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PopUp",
  inject: ['popUpInfo'],
  computed: {
    title() {
      return this.popUpInfo.justAlert ? this.popUpInfo.message : this.popUpInfo.title;
    },
    caption() {
      return this.popUpInfo.justAlert ? '' : `${this.popUpInfo.messageBase} ${this.popUpInfo.message}?`;
    }
  },
  methods: {
    close() {
      this.popUpInfo.open = false;
    }
  }
}
</script>
