const storageKey = "toDoListKey0878";

export default {
  state: {
    tasks: [
      // {
      //   id: 1,
      //   status: false,
      //   priority: {
      //     color: "red",
      //     index: 1,
      //   },
      //   name: "Покушать",
      //   desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque totam ipsam accusamus beatae. Deleniti veritatis earum nemo dolorum sint accusamus?",
      // },
    ],
    idOfEditableTask: null,
    storageKey
  },
  actions: {
    getToDoListFromStorage(context) {
      // береи данные из хранилища
      const storage = localStorage.getItem(storageKey);
      if (storage) {
        context.commit("updateTasks", JSON.parse(storage));
      }
    },
  },
  mutations: {
    updateTasks(state, newTasks) {
      state.tasks = newTasks;
    },
    createTask(state, newTask) {
      // создает задачу
      newTask.status = false;
      newTask.id = state.tasks[0] ? state.tasks[0].id + 1 : 1;
      state.tasks = [ newTask, ...state.tasks];
    },
    changeTaskStatus(state, taskId) {
      // меняет статус задачи (выполнено или не выполнено)
      state.tasks = state.tasks.map((task) => {
        if (task.id === taskId) {
          task.status = !task.status;
        }
        return task
      });
    },
    deleteTask(state, taskId) {
      // удаляет задачу
      state.tasks = state.tasks.filter((task) => {
        return task.id !== taskId;
      });
    },
    editTask(state, editedTask) {
      // редактирует задачу
      state.tasks = state.tasks.map((task) => {
        if (task.id === state.idOfEditableTask) {
          editedTask.id = task.id;
          editedTask.status = task.status;
          return editedTask;
        } else {
          return task;
        }
      });
    },
    setIdOfEditableTask(state, taskId) {
      // задает id редактируемой задачи
      state.idOfEditableTask = taskId;
    },
  },
  getters: {
    allTasks(state) {
      return state.tasks;
    },
    getEditableTask(state) {
      // возвращает редактируемую задачу
      let res = {};
      state.tasks.forEach((task) => {
        if (state.idOfEditableTask === task.id) {
          res = task;
        }
      });
      return res;
    },
    getStorageKey(state){
      return state.storageKey
    }
  },
};
