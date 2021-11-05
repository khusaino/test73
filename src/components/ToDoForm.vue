<template>
  <div class="app__form form">
    <span class="form__title"> {{ typeForm.title }} </span>

    <input
      class="form__name"
      v-model="name"
      type="text"
      placeholder="Название"
    />

    <textarea
      class="form__desc"
      cols="30"
      rows="10"
      placeholder="Description"
      v-model="desc"
    ></textarea>

    <div class="form__priority priority">
      <button
        class="priority__btn"
        :style="{ background: priorety.color }"
        v-for="priorety of priorities"
        :key="priorety.index"
        @click="choosePriority(priorety.color, priorety.index)"
      >
        {{ priorety.desc }}
      </button>
    </div>

    <button class="form__save" @click="save">{{ typeForm.button }}</button>
  </div>
</template>

<script>
export default {
  name: 'ToDoForm',
  props: ["handleSave", "typeForm", "editableTask"],
  data() {
    return {
      priorities: [
        {
          color: "green",
          index: 3,
          desc: "Неважно",
        },
        {
          color: "yellow",
          index: 2,
          desc: "Срочно",
        },
        {
          color: "red",
          index: 1,
          desc: "Оч. важно",
        },
      ],
      name: "",
      desc: "",
      priority: {
        color: "green",
        index: 3,
      },
    };
  },
  created(){
    // заполняет поля редактируемой задачей
    if(this.editableTask){
      this.name = this.editableTask.name;
      this.desc = this.editableTask.desc;
      this.priority = this.editableTask.priority;
    }
  },
  methods: {
    choosePriority(color, index) {
      // выбор приоритета
      this.priority = {
        color,
        index,
      };
    },
    save() {
      const task = {
        priority: this.priority,
        name: this.name,
        desc: this.desc,
      };
      this.handleSave(task);
      this.name = '';
      this.desc = '';
      this.priority = {
        color: "green",
        index: 3,
      }
    },
  },
};
</script>
