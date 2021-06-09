<template>
  <h1>
    <router-link :to="{name:'Home'}">Главная</router-link>
    | Редактирование заметки:
  </h1>
  <input v-model="note.name" class="title" required @blur="$addVersion(note)">
  <div class="todos-container">
    <div class="todo-items">
      <AddTodo :todos="note.todos" @todo-added="$addVersion(note)"></AddTodo>
      <div class="added-todos">
        <Toto v-for="(todo, index) in note.todos" :index="index" :todo="todo"
              @done-changed="reorderTodos"
              @del-todo="delTodo"
              @blur-name="$addVersion(note)"></Toto>
      </div>
    </div>
    <div class="assign-place">
      <span class="btn small" @click="toggleAside">&#9776;</span>
      <span class="btn" @click="$saveNote(note, id);"><span>&#10003;</span><b>Сохранить заметку</b> </span>
      <span class="btn" @click="$deleteNote(id)">
        <span class="del"><img alt="Удалить" src="/trash-bin.svg"></span>
        <b>Удалить заметку</b>
      </span>
      <span class="btn" @click="moveVersion(true)"><span>&cularr;</span><b>Отменить изменение</b> </span>
      <span class="btn" @click="moveVersion(false)"><span>&curarr;</span><b>Вернуть изменение</b> </span>
    </div>
  </div>
</template>

<script>
import Toto from "./Toto.vue";
import AddTodo from "./AddTodo.vue";

export default {
  name: "Note",
  components: {AddTodo, Toto},
  props: ['id'],
  inject: ['notes', 'pressedKeys'],
  data() {
    return {
      note: {
        name: 'Новая заметка',
        todos: []
      },
      isBackCall: false,
    }
  },
  methods: {
    keyUp(event) {
      if (event.target.localName === 'input')
        return;

      if (this.pressedKeys.isCtrPressed && event.code === 'KeyZ') {
        this.moveVersion(!this.pressedKeys.isShiftPressed);
      }
    },
    moveVersion(isBack) {
      this.$moveVersion(isBack);
      this.note.name = this.$version().name;
      this.note.todos = this.$version().todos;
    },
    toggleAside() {
      document.getElementsByClassName('assign-place')[0].classList.toggle('collapsed');
    },
    reorderTodos() {
      this.note.todos = this.note.todos.sort((a, b) => a.done - b.done);
      this.$addVersion(this.note);
    },
    delTodo(event, index) {
      this.note.todos.splice(index, 1);
      this.$addVersion(this.note);
    },
  },
  mounted() {
    if (this.notes.has(`${this.id}`)) {
      this.note = this.notes.get(`${this.id}`)
    }
    this.$addVersion(this.note, true);
    document.addEventListener('keyup', this.keyUp);
  },
  unmounted() {
    document.removeEventListener('keyup', this.keyUp);
  }
}
</script>
