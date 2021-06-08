<template>
  <div :class="doneClass" class="row">
    <input v-model="todo.done" type="checkbox" @change="$emit('done-changed')">
    <input v-model="todo.name" required>
    <span class="btn del" @click="$emit('del-todo', $event, this.index)"><img alt="Удалить" src="/trash-bin.svg"></span>
  </div>
</template>

<script>
export default {
  name: "Toto",
  props: ['todo', 'index'],
  computed: {
    doneClass() {
      return this.todo.done ? 'done' : '';
    }
  }
}
</script>
