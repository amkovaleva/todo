<template>
  <div class="add-todo">
    <input v-model="newTodo" @keypress.enter="addTodo">
    <span class="btn" @click="addTodo"><span>&plus;</span><b>Добавить задачу</b></span>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  props: ['todos'],
  data() {
    return {
      defaultName: 'Новая задача',
      newTodo: '',
    }
  },
  methods: {
    addTodo() {
      this.todos.unshift({done: false, name: this.newTodo});
      this.newTodo = this.defaultName;
      this.$emit('todo-added');
    }
  },
  mounted() {
    this.newTodo = this.defaultName;
  }
}
</script>
