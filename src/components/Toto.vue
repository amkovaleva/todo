<template>
  <div class="row" :class="doneClass">
    <input v-model="todo.done" type="checkbox" @change="$emit('done-changed')">
    <input v-model="todo.name" required>
    <span class="btn del" @click="$emit('del-todo', $event, this.index)"><img src="/trash-bin.svg" alt="Удалить"></span>
  </div>
</template>

<script>
export default {
  name: "Toto",
  props: ['todo', 'index'],
  computed:{
    doneClass(){
      return this.todo.done ? 'done' : '';
    }
  }
}
</script>
