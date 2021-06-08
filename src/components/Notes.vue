<template>
  <router-link :to="{name: 'Note', params:{id: 0}}" class="btn">Создать заметку</router-link>
  <h1>Список заметок:</h1>

  <h2 v-if="!notes.size" class="title">Пока нет заметок.</h2>
  <div v-for="note in notes" class="note-item">
    <div class="head">
      <p class="title">{{ note[1].name }}</p>
      <span class="btn" @click="$deleteNote(note[0])">
        <span class="del"><img alt="Удалить" src="/trash-bin.svg"></span>
        <b>Удалить</b>
      </span>
      <router-link :to="{name: 'Note', params:{id: note[0]}}" class="btn"><span>&#9998;</span><b>Изменить</b>
      </router-link>
    </div>
    <div class="description">
      <div v-for="todo in note[1].todos.slice(0, 3)" :class="todo.done ? 'done' : ''" class="item">
        {{ todo.name }}
      </div>
      <div v-if="note[1].todos.length > 3">...</div>
    </div>
  </div>

</template>

<script>

export default {
  name: "Toto",
  inject: ['notes'],
  methods: {}
}

</script>