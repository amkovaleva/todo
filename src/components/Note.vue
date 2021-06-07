<template>
  <h1>
    <router-link :to="{name:'Home'}">Главная</router-link>
    | Редактирование заметки:
  </h1>
  <input v-model="note.name" class="title" required>
  <div class="todos-container">
    <div class="todo-items">
      <AddTodo :todos="note.todos"></AddTodo>
      <div class="added-todos">
        <Toto v-for="(todo, index) in note.todos" :todo="todo" :index="index"
              @done-changed="reorderTodos" @del-todo="delTodo"></Toto>
      </div>
    </div>
    <div class="assign-place">
      <span class="btn small" @click="toggleAside">&#9776;</span>
      <span class="btn" @click="$saveNote(note, id)"><span>&#10003;</span><b>Сохранить заметку</b> </span>
      <span class="btn" @click="$deleteNote(id)">
        <span class="del"><img src="/trash-bin.svg" alt="Удалить"></span>
        <b>Удалить заметку</b>
      </span>
      <span class="btn" @click="back"><span>&cularr;</span><b>Отменить изменение</b> </span>
      <span class="btn" @click="revertBack"><span>&curarr;</span><b>Вернуть изменение</b> </span>
    </div>
  </div>
</template>

<script>
import Toto from "./Toto.vue";
import AddTodo from "./AddTodo.vue";

export default {
  name: "Note",
  components: {AddTodo, Toto},
  props: {id: Number},
  inject: ['notes', 'pressedKeys'],
  data() {
    return {
      note: {
        name: 'Новая заметка',
        todos: []
      }
    }
  },
  methods: {
    back() {
      console.log('back!!')
    },
    revertBack() {
      console.log('revertBack!!')
    },
    keyUp(event) {
      if (this.pressedKeys.isCtrPressed && event.code === 'KeyZ')
        this.pressedKeys.isShiftPressed ? this.revertBack() : this.back();
    },
    toggleAside() {
      document.getElementsByClassName('assign-place')[0].classList.toggle('collapsed');
    },
    reorderTodos() {
      this.note.todos = this.note.todos.sort((a, b) => a.done - b.done);
    },
    delTodo(event, index){
      this.note.todos.splice(index, 1);
    }
  },
  mounted() {
    if (this.notes.has(`${this.id}`)) {
      this.note = this.notes.get(`${this.id}`)
    }
    document.addEventListener('keyup', this.keyUp);
  },
  unmounted() {
    document.removeEventListener('keyup', this.keyUp);
  }
}
</script>
