<template>
  <div class="app__tasks tasks">

    <div class="tasks__tabs tabs">
      <ul class="tabs__list">
        <li 
          class="tabs__item" 
          :class="{'tabs__item--active': tab.id === activeTab.id}"
          v-for="tab of tabs"
          :key="tab.id"
          @click="clickTab(tab)"
        >{{tab.title}}</li>
      </ul>
    </div>

    <div class="tasks__wrapper">
      <ul class="tasks__list">
        <li class="tasks__task task" v-for="task of filteredTasks" :key="task.id">

          <div
            class="task__priority"
            :style="{ background: task.priority.color }"
          ></div>

          <div class="task__main">
            <div class="task__top">
              <input
                class="task__status"
                type="checkbox"
                :checked="task.status"
                @change="changeTaskStatus(task.id)"
              />
              <span class="task__name">{{ task.name }}</span>
            </div>
            <p class="task__desc" v-if="task.desc">
              {{task.desc}}
            </p>
            <span v-else> no description </span>
          </div>

          <div class="task__handlers">
            <div class="task__edit task__icon" >
              <img src="../assets/edit.svg" alt="edit" @click="openFormEditableTask(task.id)"/>
            </div>
            <div class="task__delete task__icon" @click="deleteTask(task.id)">
              <img src="../assets/delete.svg" alt="delete" />
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: 'Tasks',
  props: ['openFormEditableTask'],
  data(){
    return{
      tabs: [
        {
          id: 1,
          title: 'текущие задачи',
          checkTask: (task)=>{
            return !task.status? task: false
          },
        },
        {
          id: 2,
          title: 'выполненные задачи',
          checkTask: (task)=>{
            return task.status? task: false
          },
        },
      ],
      activeTab: 1,
    }
  },
  created(){
    this.activeTab = this.tabs[0]
  },
  computed: {
    ...mapGetters(["allTasks"]),
    sortedTasks(){
      // сортировка по важнсти
      return Array.from(this.allTasks).sort((a, b) =>{
        return a.priority.index - b.priority.index;
      })
    },
    filteredTasks(){
      // фильтрация задач по условиям вкладки
      return this.sortedTasks.filter((task) => this.activeTab.checkTask(task))
    }
  },
  methods:{
    ...mapMutations(["changeTaskStatus", "deleteTask"]),
    clickTab(tab){
      this.activeTab = tab
    }
  }
}
</script>