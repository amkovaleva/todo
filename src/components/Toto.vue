<template>
  <div class="row">
    <input v-model="todo.done" type="checkbox">
    <input v-model="todo.name" required>
  </div>
</template>

<script>
export default {
  name: "Toto",
  props: ['todo'],
  data() {
    return {}
  }
}
</script>
