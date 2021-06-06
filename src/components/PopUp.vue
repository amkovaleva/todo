<template>
  <div v-show="popUpInfo.open" class="popup-overlay">
    <div class="popup">
      <span class="close" @click="close">&#x2715;</span>
      <p class="title">{{ popUpInfo.title }} </p>
      <p>{{ popUpInfo.messageBase }} {{ popUpInfo.message }}?</p>

      <div class="buttons">
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
  methods: {
    close() {
      this.popUpInfo.open = false;
    }
  }
}
</script>
