<template>
  <div v-show="popUpInfo.open" class="popup-overlay">
    <div class="popup">
      <span class="close" @click="close">&#x2715;</span>
      <p class="title">{{ title }} </p>
      <p>{{ caption }}</p>

      <div v-show="!justAlert" class="buttons">
        <span class="btn" v-for="btn in popUpInfo.buttons"
              @click="if(btn.callBack) btn.callBack(popUpInfo.collBackParams); close();">
          <b>{{ btn.name }}</b>
        </span>
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
      return this.justAlert ? this.popUpInfo.message : this.popUpInfo.title;
    },
    caption() {
      return this.justAlert ? '' : `${this.popUpInfo.messageBase} ${this.popUpInfo.message}?`;
    },
    justAlert() {
      return this.popUpInfo.buttons.length === 0;
    }
  },
  methods: {
    close() {
      this.$closePopUp();
    }
  }
}
</script>
