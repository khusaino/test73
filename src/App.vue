<template>
  <div class="app">
    <div class="app__left">
      <ToDoForm 
        :typeForm="{
          title: 'Добавить задачи',
          button: 'добавить задачу',
        }"
        :handleSave="addTask"
      />

      <div class="app__popap-main" v-if="popapOpen">
        <div class="app__close-popap" @click="closePopap">закрыть Х</div>
        <ToDoForm 
          :typeForm="{
            title: 'Изменить задачи',
            button: 'Изменить задачу',
          }"
          :editableTask="getEditableTask"
          :handleSave="hadleEditTask"
        />
      </div>
    </div>

    <Tasks :openFormEditableTask="openFormEditableTask"/>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from "vuex";

import ToDoForm from "./components/ToDoForm.vue";
import Tasks from "./components/Tasks.vue";
export default {
  components: {
    ToDoForm,
    Tasks
  },
  data() {
    return {
      editTaskId: null,
      popapOpen: false,
    };
  },
  created(){
    this.$store.dispatch('getToDoListFromStorage')
  },
  watch:{
    allTasks(val){
      localStorage.setItem(this.getStorageKey, JSON.stringify(val));
    }
  },
  computed: mapGetters(["getEditableTask", "allTasks", 'getStorageKey']),
  methods: {
    ...mapMutations(["createTask", "editTask", 'setIdOfEditableTask']),
    addTask(newTask) {
      this.createTask(newTask);
    },
    closePopap(){
      this.popapOpen = false
    },
    openFormEditableTask(id) {
      this.popapOpen = true;
      this.setIdOfEditableTask(id);
    },
    hadleEditTask(editedTask){
      this.editTask(editedTask);
      this.setIdOfEditableTask(null);
      this.closePopap();
    }
  },
};
</script>

<style src='./app.less' lang="less">
</style>

