<template>
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <div class="view">
      <input
        :checked="todo.done"
        class="toggle"
        type="checkbox"
        @change="toggleTodo( todo)">
      <label @dblclick="editing = true" v-text="todo.text"/>
      <button class="destroy" @click="deleteTodo( todo )"/>
    </div>
    <input
      v-focus="editing"
      v-show="editing"
      :value="todo.text"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit">
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

interface ITodo {
  text: string;
  done: boolean;
}

@Component({
  directives: {
    focus(el, {value}, {context}) {
      if (value) {
        context!.$nextTick(() => {
          el.focus();
        });
      }
    }
  }
})
export default class Todo extends Vue {
  @Prop({default: {text: '', done: false}}) todo!: ITodo;

  editing: boolean = false;

  @Emit('deleteTodo')
  deleteTodo(todo) {
    return todo;
  }

  @Emit('editTodo')
  editTodo({todo, value}) {
    return {todo, value};
  }

  @Emit('toggleTodo')
  toggleTodo(todo) {
    return todo;
  }

  doneEdit(e) {
    const value = e.target.value.trim();
    const {todo} = this;
    if (!value) {
      this.deleteTodo({
        todo
      });
    } else if (this.editing) {
      this.editTodo({
        todo,
        value
      });
      this.editing = false;
    }
  }

  cancelEdit(e) {
    e.target.value = this.todo.text;
    this.editing = false;
  }
}
</script>
